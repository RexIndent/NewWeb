(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ac = new AbortController(), sig = { signal: ac.signal }; // one controller removes every listener
let W = innerWidth, H = innerHeight, raf = 0, open = null, mx = W / 2, my = H / 2;
const dpr = Math.min(devicePixelRatio || 1, 2);

/* ---------- 3D sky: gradient, clouds, low-poly land, winged children ---------- */
const sky = $('#sky'); let renderer, scene, cam; const kids = [], clouds = [];
function initSky() {
  if (!window.THREE) { sky.style.background = 'linear-gradient(#1d1b4a,#c46a8a,#ffd48a)'; return; }
  renderer = new THREE.WebGLRenderer({ canvas: sky, antialias: true });
  renderer.setPixelRatio(dpr);
  scene = new THREE.Scene();
  cam = new THREE.PerspectiveCamera(60, W / H, .1, 400); cam.position.set(0, 2, 30);
  const bg = new THREE.PlaneGeometry(420, 260), c = new THREE.Color(), cols = [0x1d1b4a, 0x1d1b4a, 0xffc98a, 0xffc98a];
  bg.setAttribute('color', new THREE.Float32BufferAttribute(cols.flatMap(h => c.set(h).toArray()), 3));
  const bgm = new THREE.Mesh(bg, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false })); bgm.position.z = -150; scene.add(bgm);
  // soft cloud puff texture drawn once on a 2D canvas
  const pc = document.createElement('canvas'); pc.width = pc.height = 128; const g = pc.getContext('2d');
  const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64); rg.addColorStop(0, '#fff'); rg.addColorStop(1, '#fff0');
  g.fillStyle = rg; g.fillRect(0, 0, 128, 128); const tex = new THREE.CanvasTexture(pc);
  for (let i = 0; i < 46; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: i % 3 ? 0xffd9c0 : 0xf0a3a0, opacity: .35 + Math.random() * .3, depthWrite: false }));
    s.scale.setScalar(20 + Math.random() * 30); s.position.set((Math.random() - .5) * 160, -6 + Math.random() * 30, -60 + Math.random() * 70);
    scene.add(s); clouds.push(s);
  }
  scene.add(new THREE.AmbientLight(0xb8a8e0, .8)); const sun = new THREE.DirectionalLight(0xffc98a, 1.1); sun.position.set(-20, 10, 20); scene.add(sun);
  const lm = new THREE.MeshLambertMaterial({ color: 0x4a3a78, flatShading: true });
  for (let i = 0; i < 16; i++) { const m = new THREE.Mesh(new THREE.ConeGeometry(5 + Math.random() * 7, 8 + Math.random() * 12, 5), lm);
    m.position.set(-90 + i * 12 + Math.random() * 6, -17 + Math.random() * 3, -20 - Math.random() * 30); scene.add(m); }
  const wing = new THREE.Shape(); wing.moveTo(0, 0); wing.lineTo(1.8, .7); wing.lineTo(1.3, -.6);
  const wg = new THREE.ShapeGeometry(wing), gm = new THREE.MeshBasicMaterial({ color: 0xfff2c9, side: THREE.DoubleSide, transparent: true, opacity: .85 });
  for (let i = 0; i < 6; i++) {
    const grp = new THREE.Group(), body = new THREE.Mesh(new THREE.ConeGeometry(.25, 1.2, 6), gm); body.rotation.x = Math.PI / 2; grp.add(body);
    const mk = sx => { const p = new THREE.Group(), w = new THREE.Mesh(wg, gm); p.add(w); p.scale.x = sx; grp.add(p); return p; };
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffd48a, blending: THREE.AdditiveBlending, depthWrite: false })); glow.scale.setScalar(5); grp.add(glow);
    // incommensurate frequencies => Lissajous-style path that effectively never repeats
    kids.push({ grp, l: mk(1), r: mk(-1), f: [.11 + Math.random() * .1, .17 + Math.random() * .1, .07 + Math.random() * .08], ph: [Math.random() * 6, Math.random() * 6, Math.random() * 6] });
    scene.add(grp);
  }
  size3d();
}
const kidPos = (k, t, v) => v.set(Math.sin(t * k.f[0] + k.ph[0]) * 34, 6 + Math.sin(t * k.f[1] + k.ph[1]) * 6, Math.sin(t * k.f[2] + k.ph[2]) * 14 - 4);
function size3d() { if (!renderer) return; renderer.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); }
function draw3d(t) {
  if (!renderer) return;
  clouds.forEach((s, i) => { s.position.x += .01 + (i % 5) * .004; if (s.position.x > 90) s.position.x = -90; });
  const a = new THREE.Vector3(), b = new THREE.Vector3();
  kids.forEach((k, i) => { kidPos(k, t, a); kidPos(k, t + .1, b); k.grp.position.copy(a); k.grp.lookAt(b); // face direction of travel
    const fl = Math.sin(t * 9 + i) * .55; k.l.rotation.z = fl; k.r.rotation.z = -fl; });
  cam.position.x = lerp(cam.position.x, (mx / W - .5) * 4, .03); cam.position.y = lerp(cam.position.y, 2 - (my / H - .5) * 2, .03); cam.lookAt(0, 3, 0);
  renderer.render(scene, cam);
}

/* ---------- Star constellations + quote ripping (2D canvas) ---------- */
const fx = $('#fx'), c2 = fx.getContext('2d'), QUOTE = 'Even the darkest sky keeps a light for those who keep walking.';
const rng = s => () => (s = s * 16807 % 2147483647) / 2147483647;
function mkNodes(n, seed) { // random stars; each links to its nearest earlier star so the graph is connected
  const r = rng(seed), a = [], e = [];
  for (let i = 0; i < n; i++) a.push({ x: .04 + r() * .92, y: .06 + r() * .88, s: .8 + r() * 1.8, p: r() * 6 });
  for (let i = 1; i < n; i++) { let b = 0, bd = 9; for (let j = 0; j < i; j++) { const d = (a[i].x - a[j].x) ** 2 + (a[i].y - a[j].y) ** 2; if (d < bd) { bd = d; b = j; } } e.push([i, b]); }
  return { a, e };
}
const conA = mkNodes(34, 7), conB = mkNodes(70, 99); let quote = null;
function drawCon(c, reveal, al, t) {
  if (al <= 0 || reveal <= 0) return; const k = reveal * c.a.length;
  c2.lineWidth = 1;
  for (const [i, j] of c.e) { const v = clamp(k - i); if (!v) continue; const A = c.a[i], B = c.a[j];
    c2.strokeStyle = `rgba(255,226,160,${.4 * v * al})`; c2.beginPath(); c2.moveTo(B.x * W, B.y * H); c2.lineTo(lerp(B.x, A.x, v) * W, lerp(B.y, A.y, v) * H); c2.stroke(); }
  c2.shadowColor = '#ffd48a'; c2.shadowBlur = 10;
  c.a.forEach((n, i) => { const v = clamp(k - i); if (!v) return; c2.fillStyle = `rgba(255,243,224,${(.6 + .4 * Math.sin(t * 2 + n.p)) * v * al})`;
    c2.beginPath(); c2.arc(n.x * W, n.y * H, n.s * v, 0, 7); c2.fill(); });
  c2.shadowBlur = 0;
}
function buildQuote() { // render the quote to an offscreen canvas, then cut it into jagged shards
  const qw = Math.min(W * .86, 900), qh = Math.min(H * .5, 360), fs = clamp(W / 22, 24, 54), oc = document.createElement('canvas'); oc.width = qw; oc.height = qh;
  const g = oc.getContext('2d'); g.font = `${fs}px Marcellus, Georgia, serif`; g.textAlign = 'center'; g.fillStyle = '#fff3e0'; g.shadowColor = '#ffd48a'; g.shadowBlur = 16;
  const lines = []; let ln = ''; QUOTE.split(' ').forEach(w => { if (g.measureText(ln + w).width > qw * .92 && ln) { lines.push(ln.trim()); ln = ''; } ln += w + ' '; }); lines.push(ln.trim());
  lines.forEach((l, i) => g.fillText(l, qw / 2, qh / 2 + (i - (lines.length - 1) / 2) * fs * 1.4 + fs * .3));
  const C = 9, R = 5, r = rng(5), V = []; // shared jittered vertex grid => shards tile with no gaps
  for (let y = 0; y <= R; y++) for (let x = 0; x <= C; x++) V.push([x / C * qw + (x && x < C ? (r() - .5) * qw / C * .7 : 0), y / R * qh + (y && y < R ? (r() - .5) * qh / R * .7 : 0)]);
  const P = []; for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) { const i = y * (C + 1) + x, poly = [V[i], V[i + 1], V[i + C + 2], V[i + C + 1]];
    P.push({ poly, cx: poly.reduce((s, p) => s + p[0], 0) / 4, cy: poly.reduce((s, p) => s + p[1], 0) / 4, t: y / R * .5 + r() * .5, rot: (r() - .5) * 3, dx: (r() - .5) * W * .3 }); }
  quote = { oc, P, qw, qh };
}
function drawQuote(al, rip) {
  if (!quote || al <= 0) return; const { oc, P, qw, qh } = quote, ox = (W - qw) / 2, oy = (H - qh) / 2;
  P.forEach(p => { const pr = clamp((rip - p.t * .7) / .3); if (pr >= 1) return;
    c2.save(); c2.globalAlpha = al * (1 - pr * .6);
    c2.translate(ox + p.cx + p.dx * pr, oy + p.cy + pr * pr * H * .8); c2.rotate(p.rot * pr); c2.translate(-p.cx, -p.cy); // shard pivots about its centre while falling
    c2.beginPath(); p.poly.forEach(([x, y], i) => i ? c2.lineTo(x, y) : c2.moveTo(x, y)); c2.closePath(); c2.clip();
    c2.drawImage(oc, 0, 0); if (pr > 0) { c2.strokeStyle = `rgba(255,243,224,${.6 * pr})`; c2.lineWidth = 3; c2.stroke(); } c2.restore(); });
}
const cp = $('#cp');
function drawFx(t) {
  c2.setTransform(dpr, 0, 0, dpr, 0, 0); c2.clearRect(0, 0, W, H);
  if (!open) { cp.style.opacity = 0; return; }
  const s = open.scrollTop, ch = $('.content', open).offsetHeight, start = ch - H * .5, f = clamp((s - start) / Math.max(1, open.scrollHeight - H - start));
  drawCon(conA, clamp(s / Math.max(1, ch - H * .4)), 1 - clamp((f - .3) / .3), t);   // grows while scrolling content
  drawCon(conB, clamp((f - .35) / .45), 1, t);                                      // final constellation revealed under the shards
  drawQuote(clamp((f - .02) / .15), clamp((f - .3) / .4));
  cp.style.opacity = clamp((f - .82) / .12);
}
function size2d() { fx.width = W * dpr; fx.height = H * dpr; buildQuote(); }

/* ---------- Butterfly cursor: follow -> wander (after 15 s idle, 10 s long) -> return ---------- */
const bf = $('#bf'); let bx = mx, by = my, vx = 0, vy = 0, mode = 'follow', last = performance.now(), wStart = 0, frame = 0, hot = null;
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; last = performance.now(); }, sig);
function stepBf(now, t) {
  let tx = mx, ty = my, k = .05;
  if (mode === 'follow' && now - last >= 15000) { mode = 'wander'; wStart = now; }
  if (mode === 'wander') { // sum of sines at unrelated frequencies = smooth, life-like, non-repeating flight
    tx = W / 2 + Math.sin(t * .7) * W * .38 + Math.sin(t * 1.9) * W * .08; ty = H / 2 + Math.sin(t * .9 + 1) * H * .33 + Math.cos(t * 2.3) * H * .07;
    if (now - wStart >= 10000) mode = 'return';
  } else if (mode === 'return') { k = .03; if (Math.hypot(mx - bx, my - by) < 12) { mode = 'follow'; last = now; } }
  // damped spring: acceleration toward target minus drag => gentle overshoot, like a flutter
  vx += (tx - bx) * k * .3 - vx * .16; vy += (ty - by) * k * .3 - vy * .16 + Math.sin(t * 13) * .12;
  bx += vx; by += vy;
  bf.style.transform = `translate3d(${bx}px,${by}px,0) rotate(${clamp(vx * 3, -35, 35)}deg)`;
  if (open && ++frame % 4 === 0) { // magnify whatever the butterfly is over
    const el = document.elementFromPoint(bx, by), n = el && el.closest('h2,h3,p,li,img,.chip');
    if (n !== hot) { hot && hot.classList.remove('hot'); hot = n && open.contains(n) ? n : null; hot && hot.classList.add('hot'); }
  } else if (!open && hot) { hot.classList.remove('hot'); hot = null; }
}

/* ---------- Portal transitions ---------- */
const home = $('#home'), closeBtn = $('#close');
function openSec(id, btn) {
  if (open) return; open = $('#' + id); const r = btn.getBoundingClientRect(), o = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
  open.hidden = false; open.scrollTop = 0; closeBtn.hidden = false; home.style.pointerEvents = 'none';
  if (!window.gsap || reduce) { home.style.opacity = 0; return; }
  gsap.timeline().set(open, { transformOrigin: o }).set(home, { transformOrigin: o })
    .to(home, { scale: 3, opacity: 0, duration: .9, ease: 'power3.in' }) // front page rushes toward the viewer and dissolves
    .fromTo(open, { scale: .25, opacity: 0 }, { scale: 1, opacity: 1, duration: .9, ease: 'power3.out' }, '-=.45');
}
function closeSec() {
  if (!open) return; const p = open; open = null; closeBtn.hidden = true;
  const done = () => { p.hidden = true; home.style.pointerEvents = ''; };
  if (!window.gsap || reduce) { home.style.opacity = 1; return done(); }
  gsap.timeline({ onComplete: done }).to(p, { scale: .25, opacity: 0, duration: .7, ease: 'power3.in' }) // exact reverse of opening
    .to(home, { scale: 1, opacity: 1, duration: .8, ease: 'power3.out' }, '-=.3');
}
$$('.arch').forEach(b => b.addEventListener('click', () => openSec(b.dataset.open, b), sig));
closeBtn.addEventListener('click', closeSec, sig);
addEventListener('keydown', e => { if (e.key === 'Escape') closeSec(); }, sig);

/* ---------- Boot ---------- */
function loop(ms) { raf = requestAnimationFrame(loop); const t = ms / 1000; draw3d(t); drawFx(t); stepBf(ms, t); }
addEventListener('resize', () => { W = innerWidth; H = innerHeight; size3d(); size2d(); }, sig);
addEventListener('pagehide', () => { ac.abort(); cancelAnimationFrame(raf); }, { once: true });
cp.textContent = `© ${new Date().getFullYear()} Your Name. All rights reserved.`;
initSky(); size2d(); raf = requestAnimationFrame(loop);
const bar = $('#bar'), loader = $('#loader'); let prog = 0;
const timer = setInterval(() => { // holds at 90% until the page has truly finished loading
  prog = Math.min(document.readyState === 'complete' ? 100 : 90, prog + Math.random() * 5 + 1); bar.style.width = prog + '%';
  if (prog < 100) return; clearInterval(timer);
  if (window.gsap && !reduce) { gsap.to(loader, { yPercent: 100, duration: 1.8, ease: 'elastic.out(1,.75)', onComplete: () => loader.hidden = true }); gsap.from('.arch', { y: 60, opacity: 0, stagger: .1, duration: 1, delay: .5, ease: 'power3.out' }); }
  else loader.hidden = true;
}, 50);
})();