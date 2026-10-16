/* ===== LIBRA PAGE ===== */
(()=>{
const $=s=>document.querySelector(s),R=Math.random,root=document.documentElement,
 rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cl=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---- theme (shares the front page's saved choice) ---- */
const setTheme=d=>{root.dataset.theme=d?'dark':'light';$('#theme').textContent=d?'☀':'☾';try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}};
let sv=null;try{sv=localStorage.getItem('theme')}catch(e){}
setTheme(sv?sv==='dark':true);
$('#theme').onclick=()=>{setTheme(root.dataset.theme!=='dark');burst(innerWidth-40,40,40)};

/* ---- opening scene: black → distant white light → white dwarf with 5 planets → zoom in → black → page ---- */
{const I=$('#intro'),cv=$('#ic'),x=cv.getContext('2d');let w,h,t0=null,fin=false,bg=[];
 const fit=()=>{w=cv.width=innerWidth;h=cv.height=innerHeight;bg=[...Array(170)].map(()=>({x:R(),y:R(),r:R()*1.1+.2,p:R()*6.28}))};fit();addEventListener('resize',fit);
 const PL=[{r:1.5,s:4,c:['#e2ded8','#5e5a56'],o:.5},{r:2.2,s:6.5,c:['#fff0c0','#b08a38'],o:2.4},{r:3,s:7,c:['#a8dcff','#1a4a96'],o:4.1},{r:3.9,s:5.5,c:['#ffb890','#862a1a'],o:5.6},{r:5,s:12,c:['#ffe6b0','#a8662a'],o:1.2,ring:1}];
 document.body.classList.add('lock');
 const done=()=>{if(fin)return;fin=true;I.classList.add('out');document.body.classList.remove('lock');document.body.classList.add('ready');setTimeout(()=>I.remove(),2000)};
 $('#skip').onclick=done;addEventListener('keydown',e=>{if(e.key==='Escape')done()});
 const e3=u=>u*u*(3-2*u),c01=v=>cl(v,0,1);
 function planet(p,px,py,sz,a){const d=Math.hypot(px,py)||1,g=x.createRadialGradient(-px/d*sz*.45,-py/d*sz*.45,sz*.1,0,0,sz*1.05);g.addColorStop(0,p.c[0]);g.addColorStop(1,p.c[1]);
  x.save();x.translate(px,py);x.globalAlpha=a;
  if(p.ring){x.strokeStyle='rgba(255,226,168,.65)';x.lineWidth=Math.max(1,sz*.16);x.beginPath();x.ellipse(0,0,sz*1.9,sz*.55,-.3,0,6.283);x.stroke()}
  x.fillStyle=g;x.beginPath();x.arc(0,0,sz,0,6.283);x.fill();
  if(p.ring){x.beginPath();x.ellipse(0,0,sz*1.9,sz*.55,-.3,0,Math.PI);x.stroke()}x.restore()}
 function frame(n){if(fin)return;if(t0===null)t0=n;const t=(n-t0)/1000;x.globalAlpha=1;x.fillStyle='#000';x.fillRect(0,0,w,h);
  let z=.08,al=0,wh=0,bk=0;
  if(t>=2&&t<6){al=c01((t-2)/1.6);z=.08+.92*e3(c01((t-2)/4))}   /* a patch of light appears and we move toward it */
  else if(t>=6&&t<11){al=1;z=1+(t-6)*.012}                      /* ~5 seconds: hold on the star and its planets */
  else if(t>=11){const u=c01((t-11)/2.2);al=1;z=1.06*Math.pow(95,u*u);wh=c01((u-.55)/.45)} /* dive into the white dwarf */
  if(t>13.2){bk=c01((t-13.2)/1);wh=1}
  if(t>14.4)return done();
  const U=Math.min(w,h)*.085,rs=U*.15*z,sc=1+.25*Math.min(z,8);
  if(al>0)for(const s of bg){const a=al*(.35+.65*Math.abs(Math.sin(t*.8+s.p)));x.fillStyle=`rgba(255,255,255,${a})`;x.beginPath();x.arc(w/2+(s.x-.5)*w*sc,h/2+(s.y-.5)*h*sc,s.r,0,6.283);x.fill()}
  x.save();x.translate(w/2,h/2);x.rotate(-.22);
  const pa=c01((z-.35)/.5)*al,tp=Math.max(0,t-2),drawP=back=>{for(const p of PL){const th=p.o+tp*.9/Math.pow(p.r,1.5),rx=p.r*U*z,py=Math.sin(th)*rx*.34;if((py<0)===back){planet(p,Math.cos(th)*rx,py,p.s*U/72*z,pa)}}};
  if(pa>0){x.strokeStyle=`rgba(190,220,255,${.2*pa})`;x.lineWidth=1;for(const p of PL){x.beginPath();x.ellipse(0,0,p.r*U*z,p.r*U*z*.34,0,0,6.283);x.stroke()}drawP(true)}
  const hz=28+U*2.4*z,hg=x.createRadialGradient(0,0,0,0,0,hz);hg.addColorStop(0,`rgba(255,255,255,${.95*al})`);hg.addColorStop(.14,`rgba(205,228,255,${.5*al})`);hg.addColorStop(1,'rgba(150,190,255,0)');
  x.fillStyle=hg;x.fillRect(-hz,-hz,hz*2,hz*2);
  if(al>0){const L=Math.min(U*9*z+70,w),th=Math.max(1,rs*.2),fl=x.createLinearGradient(-L,0,L,0);fl.addColorStop(0,'rgba(255,255,255,0)');fl.addColorStop(.5,`rgba(255,255,255,${.5*al})`);fl.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=fl;x.fillRect(-L,-th/2,L*2,th);
   x.fillStyle=`rgba(255,255,255,${al})`;x.beginPath();x.arc(0,0,Math.max(1.4,rs*(1+.04*Math.sin(t*3))),0,6.283);x.fill()}
  if(pa>0)drawP(false);
  x.restore();
  if(wh>0){x.fillStyle=`rgba(255,255,255,${wh})`;x.fillRect(0,0,w,h)}
  if(bk>0){x.fillStyle=`rgba(0,0,0,${bk})`;x.fillRect(0,0,w,h)}
  requestAnimationFrame(frame)}
 if(rm)done();else requestAnimationFrame(frame);setTimeout(done,20000)}

/* ---- magnified letters ---- */
document.querySelectorAll('.mag').forEach(e=>{const t=e.textContent;e.setAttribute('aria-label',t);e.textContent='';
 t.split(' ').forEach((w,i,a)=>{const s=document.createElement('span');s.className='wd';s.setAttribute('aria-hidden','true');
  [...w].forEach(c=>{const k=document.createElement('span');k.className='ch';k.textContent=c;s.append(k)});e.append(s);if(i<a.length-1)e.append(' ')})});
const chars=[...document.querySelectorAll('.ch')];let mx=innerWidth/2,my=innerHeight/2,moved=false;
function magnify(){moved=false;for(const c of chars){const r=c.getBoundingClientRect();if(r.bottom<-150||r.top>innerHeight+150)continue;
 const d=Math.hypot(mx-(r.left+r.width/2),my-(r.top+r.height/2)),k=Math.max(0,1-d/120);
 c.style.transform=k>0?`scale(${1+.9*k}) translateY(${-8*k}px)`:'';c.classList.toggle('hot',d<60)}}

/* ---- butterfly cursor ---- */
const bf=$('#bf');let bx=-99,by=-99,ox=0;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;bf.style.opacity=1;if(!moved){moved=true;requestAnimationFrame(magnify)}});
document.addEventListener('mouseleave',()=>bf.style.opacity=0);

/* ---- the sky: twinkling stars, shiny sparkles, shooting stars, comets ---- */
const sp=$('#sp'),c=sp.getContext('2d'),cols=['255,246,214','180,235,255','255,190,225','255,225,150'];
let W,H,S=[],F=[],M=[],P=[],nextComet=6,pn=0; /* pn: how far the view has tilted down while leaving */
function resize(){W=sp.width=innerWidth;H=sp.height=innerHeight;
 S=[...Array(Math.round(W*H/3000))].map(()=>({x:R()*W,y:R()*H,r:R()*1.2+.3,p:R()*6.28,s:R()*2+.6,h:cols[R()*4|0]}));
 F=[...Array(Math.max(14,Math.round(W*H/26000)))].map(()=>({x:R()*W,y:R()*H,r:5+R()*9,p:R()*6.28,s:.5+R()*1.2,h:cols[R()*4|0],d:.05+R()*.2,a:R()*3}))}
resize();addEventListener('resize',resize);
function burst(x,y,n){for(let i=0;i<n;i++){const a=R()*6.283,s=1+R()*6;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,r:1+R()*2.4,h:cols[R()*4|0]})}}
addEventListener('pointerdown',e=>{if(e.target.closest('a,button'))return;burst(e.clientX,e.clientY,30)});
function star8(x,y,r,rot){c.beginPath();for(let i=0;i<8;i++){const q=i%2?r*.2:r,a=rot+i*Math.PI/4;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath();c.fill()}
function sky(t,dt){c.clearRect(0,0,W,H);const sy=scrollY;
 for(const s of S){const a=.4+.6*(rm?.8:Math.sin(t*.001*s.s+s.p)),y=((s.y-sy*s.r*.1-pn*(160+s.r*260))%H+H)%H;c.fillStyle=`rgba(${s.h},${a})`;c.beginPath();c.arc(s.x,y,s.r,0,6.283);c.fill()}
 for(const s of F){const a=rm?.9:.55+.45*Math.sin(t*.0014*s.s+s.p),y=((s.y-sy*s.d-pn*(140+s.d*1400))%H+H)%H,r=s.r*(.7+.5*a);
  c.shadowColor=`rgb(${s.h})`;c.shadowBlur=18;c.fillStyle=`rgba(${s.h},${a})`;star8(s.x,y,r,rm?0:t*.0002*s.s+s.a);
  c.fillStyle=`rgba(255,255,255,${a})`;c.beginPath();c.arc(s.x,y,1.6,0,6.283);c.fill();c.shadowBlur=0}
 if(!rm){nextComet-=dt;if(M.length<5&&R()<dt*1.3){const d=R()<.5?1:-1;M.push({x:R()*W,y:R()*H*.45,vx:d*(560+R()*460),vy:300+R()*320,l:1,w:2,k:.09,h:'127,233,255'})}
  if(nextComet<=0){nextComet=12+R()*10;const d=R()<.5?1:-1;M.push({x:d>0?-40:W+40,y:R()*H*.3,vx:d*(420+R()*120),vy:190+R()*80,l:1.6,w:4,k:.2,h:R()<.5?'255,126,182':'255,215,140'})}}
 M=M.filter(m=>m.l>0&&m.x>-300&&m.x<W+300&&m.y<H+300);
 for(const m of M){m.x+=m.vx*dt;m.y+=m.vy*dt;m.l-=dt*(m.w>3?.45:.95);const a=Math.min(1,m.l),g=c.createLinearGradient(m.x,m.y,m.x-m.vx*m.k,m.y-m.vy*m.k);
  g.addColorStop(0,`rgba(255,255,255,${a})`);g.addColorStop(.3,`rgba(${m.h},${a*.6})`);g.addColorStop(1,`rgba(${m.h},0)`);
  c.strokeStyle=g;c.lineWidth=m.w;c.lineCap='round';c.beginPath();c.moveTo(m.x,m.y);c.lineTo(m.x-m.vx*m.k,m.y-m.vy*m.k);c.stroke();
  c.fillStyle=`rgba(255,255,255,${a})`;c.shadowColor=`rgb(${m.h})`;c.shadowBlur=m.w*6;c.beginPath();c.arc(m.x,m.y,m.w*.9,0,6.283);c.fill();c.shadowBlur=0}
 P=P.filter(q=>q.l>0);
 for(const q of P){q.x+=q.vx;q.y+=q.vy;q.vx*=.95;q.vy*=.95;q.l-=dt*1.4;c.fillStyle=`rgba(${q.h},${Math.max(0,q.l)})`;c.shadowColor='#ffd88a';c.shadowBlur=10;c.beginPath();c.arc(q.x,q.y,q.r,0,6.283);c.fill();c.shadowBlur=0}}

/* ---- three.js ---- */
let A,B,pv,halo,venus,beam,pans,sg,cStars=[],drag=false,rot=0,vel=.5,wL=1,wR=1,ang=0,av=0,lastState='';
const BASE=rm?0:.5,PY=1.5,CY=[[203,78],[369,129],[411,301],[154,221],[116,244],[62,273],[308,379],[313,411]],CE=[[0,1],[1,2],[0,2],[0,3],[3,4],[4,5],[2,6],[6,7]];
if(!window.THREE){document.querySelectorAll('.three').forEach(e=>e.replaceWith(Object.assign(document.createElement('p'),{className:'note',textContent:'3D needs three.js to load.'})))}
else{
const V=(x,y,z=0)=>new THREE.Vector3(x,y,z);
const glow=(()=>{const k=document.createElement('canvas');k.width=k.height=64;const x=k.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
 g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,240,200,.6)');g.addColorStop(1,'rgba(255,200,160,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(k)})();
function envMap(r){try{const k=document.createElement('canvas');k.width=512;k.height=256;const x=k.getContext('2d'),g=x.createLinearGradient(0,0,0,256);
 g.addColorStop(0,'#dff1ff');g.addColorStop(.45,'#5a3f9a');g.addColorStop(.55,'#150b30');g.addColorStop(1,'#ffb98a');x.fillStyle=g;x.fillRect(0,0,512,256);
 for(let i=0;i<16;i++){x.fillStyle=`rgba(255,255,255,${.5+R()*.5})`;x.fillRect(R()*512,30+R()*150,14+R()*50,6+R()*20)}
 const t=new THREE.CanvasTexture(k);t.mapping=THREE.EquirectangularReflectionMapping;const p=new THREE.PMREMGenerator(r),e=p.fromEquirectangular(t).texture;p.dispose();return e}catch(e){return null}}
function mk(cv,fov,z){const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),sc=new THREE.Scene(),cm=new THREE.PerspectiveCamera(fov,1,.1,100);cm.position.set(0,0,z);
 const en=envMap(r);if(en)sc.environment=en;sc.add(new THREE.AmbientLight(0x8a8ac0,en?.4:.9));
 [[0x7fe9ff,-5,4,6],[0xff7eb6,5,-2,6],[0xffffff,0,6,8]].forEach(l=>{const p=new THREE.PointLight(l[0],1.3,40);p.position.set(l[1],l[2],l[3]);sc.add(p)});
 const fit=()=>{r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(cv.clientWidth,cv.clientHeight,false);cm.aspect=cv.clientWidth/cv.clientHeight;cm.updateProjectionMatrix()};
 fit();addEventListener('resize',fit);const o={r,sc,cm,on:true};new IntersectionObserver(e=>o.on=e[0].isIntersecting).observe(cv);return o}
const gold=()=>new THREE.MeshStandardMaterial({color:0xffd58a,metalness:1,roughness:.22,emissive:0x3a2208,envMapIntensity:1.3});
const dust=(n,r0,r1,h)=>{const a=[];for(let i=0;i<n;i++){const t=R()*6.283,r=r0+R()*(r1-r0);a.push(Math.cos(t)*r,(R()-.5)*h,Math.sin(t)*r)}
 return new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(a,3)),new THREE.PointsMaterial({color:0xfff2c8,size:.08,map:glow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}))};

/* the Libra sign: metallic gold, slow 360 turn, drag to spin faster */
A=mk($('#gc'),40,9.5);const gm=gold(),gg=new THREE.Group();pv=new THREE.Group();
gg.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([[-2,0],[-1.1,0],[-.9,.35],[-.85,.9],[-.5,1.35],[0,1.5],[.5,1.35],[.85,.9],[.9,.35],[1.1,0],[2,0]].map(p=>V(...p))),240,.17,18),gm));
const bar=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,4,18),gm);bar.rotation.z=Math.PI/2;bar.position.y=-.7;gg.add(bar);
[-2,2].forEach(x=>[0,-.7].forEach(y=>{const s=new THREE.Mesh(new THREE.SphereGeometry(.17,18,12),gm);s.position.set(x,y,0);gg.add(s)}));
gg.position.y=-.4;pv.add(gg);pv.rotation.x=.14;A.sc.add(pv);
const orbit=new THREE.Group();orbit.rotation.set(.5,0,.3);A.sc.add(orbit);
orbit.add(new THREE.Mesh(new THREE.TorusGeometry(3.7,.012,8,200),new THREE.MeshBasicMaterial({color:0xffd58a,transparent:true,opacity:.4})).rotateX(Math.PI/2));
venus=new THREE.Group();const vm=new THREE.Mesh(new THREE.SphereGeometry(.24,24,16),new THREE.MeshStandardMaterial({color:0xffd9ea,emissive:0xff7eb6,emissiveIntensity:.6,roughness:.4}));
const vg=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:0xff9ed0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));vg.scale.setScalar(1.6);venus.add(vm,vg);venus.position.x=3.7;orbit.add(venus);orbit.userData.o=orbit;
halo=dust(220,3,4.6,2);A.sc.add(halo);A.orbit=orbit;
const gc=$('#gc');let lx=0;
gc.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;gc.setPointerCapture(e.pointerId)});
gc.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lx;lx=e.clientX;rot+=dx*.012;vel=cl(dx*.7,-40,40)});
['pointerup','pointercancel'].forEach(n=>gc.addEventListener(n,()=>drag=false));

/* the scales: centered, weighing a gem against a star until they balance */
B=mk($('#sc'),38,11.5);sg=new THREE.Group();const sm=gold(),add=(g,p)=>{const m=new THREE.Mesh(g,sm);m.position.set(...p);sg.add(m)};
add(new THREE.CylinderGeometry(.09,.13,3.2,16),[0,-.1,0]);add(new THREE.CylinderGeometry(1,1.3,.2,36),[0,-1.75,0]);add(new THREE.SphereGeometry(.17,18,12),[0,PY+.1,0]);
beam=new THREE.Group();beam.position.y=PY;sg.add(beam);beam.add(new THREE.Mesh(new THREE.BoxGeometry(3.8,.1,.12),sm));
[-1.9,1.9].forEach(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.12,16,10),sm);e.position.x=x;beam.add(e)});
const lm=new THREE.LineBasicMaterial({color:0xffd58a});
pans=[-1,1].map(s=>{const g=new THREE.Group(),ch=[];
 for(let k=0;k<3;k++){const a=k*2.094+1.57;ch.push(V(0,0),V(.85*Math.cos(a),-1.5,.85*Math.sin(a)))}
 g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ch),lm));
 const d=new THREE.Mesh(new THREE.SphereGeometry(.85,32,12,0,6.283,Math.PI/2,Math.PI/2),new THREE.MeshStandardMaterial({color:0xffd58a,metalness:1,roughness:.25,emissive:0x3a2208,side:THREE.DoubleSide,envMapIntensity:1.3}));d.scale.y=.35;d.position.y=-1.5;g.add(d);
 const it=new THREE.Mesh(s<0?new THREE.IcosahedronGeometry(.36,0):new THREE.SphereGeometry(.32,24,16),new THREE.MeshStandardMaterial({color:s<0?0x7fe9ff:0xff7eb6,emissive:s<0?0x1a6a80:0x802050,metalness:.4,roughness:.15}));
 const ig=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:s<0?0x7fe9ff:0xff7eb6,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));ig.scale.setScalar(1.8);it.add(ig);g.add(it);sg.add(g);return{g,it,s}});
sg.position.y=-.3;B.sc.add(sg);
/* Libra constellation glowing behind the scales */
const con=new THREE.Group();con.position.z=-4;
const cp=CY.map(p=>V((p[0]-236)*.022,-(p[1]-245)*.022));
con.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(CE.flatMap(e=>[cp[e[0]],cp[e[1]]])),new THREE.LineBasicMaterial({color:0xffe6b4,transparent:true,opacity:.45})));
cp.forEach((p,i)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:i%2?0xbfefff:0xfff2c8,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));s.position.copy(p);s.userData.k=i;con.add(s);cStars.push(s)});
B.sc.add(con);B.con=con;B.sc.add(dust(160,3,5.5,5));
}

/* ---- scales physics: weights change, the beam swings and settles to balance ---- */
const stEl=$('#state'),CYC=9;let cycN=-1;
function weigh(t){const n=Math.floor(t/CYC),u=t-n*CYC;
 if(n!==cycN){cycN=n;wL=.7+R()*.6;const o=R()<.5?-1:1;wR0=Math.max(.5,Math.min(1.6,wL+o*(.45+R()*.3)))}
 const k=cl((u-1.2)/4.6,0,1),e=k*k*(3-2*k);wR=wR0+(wL-wR0)*e}
let wR0=1;

/* ---- main loop ---- */
/* ---- leaving: a 3D meteor streaks past → the camera turns to follow it → it falls onto a planet → white flash → front page ---- */
let leaving=false;
$('#back').addEventListener('click',e=>{if(rm||leaving||!window.THREE)return;e.preventDefault();leaving=true;leave($('#back').href)});
function leave(url){document.body.classList.add('leaving','lock');
 const mainEl=$('main'),w=innerWidth,h=innerHeight,cv=Object.assign(document.createElement('canvas'),{id:'out3'});document.body.append(cv);
 mainEl.style.transformOrigin=`50% ${scrollY+h/2}px`;
 const rd=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,w/h,.1,5000);
 rd.setPixelRatio(Math.min(devicePixelRatio,2));rd.setSize(w,h,false);
 const V=THREE.Vector3,e3=u=>u*u*(3-2*u),c01=v=>cl(v,0,1),add=THREE.AdditiveBlending;
 const gk=document.createElement('canvas');gk.width=gk.height=64;{const x=gk.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,240,210,.6)');g.addColorStop(1,'rgba(255,200,160,0)');x.fillStyle=g;x.fillRect(0,0,64,64)}
 const gt=new THREE.CanvasTexture(gk),spr=(col,s,o)=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:gt,color:col,transparent:true,opacity:o,depthWrite:false,blending:add}));m.scale.set(s,s,1);sc.add(m);return m};
 /* lights */
 sc.add(new THREE.AmbientLight(0x4a3a80,.7));const sun=new THREE.DirectionalLight(0xffe2c8,1.1);sun.position.set(.5,.8,-1);sc.add(sun);
 /* the planet: painted sphere with a glowing atmosphere */
 const P=new V(380,-330,900),PR=300,pt=document.createElement('canvas');pt.width=1024;pt.height=512;
 {const x=pt.getContext('2d'),g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,'#c9a6ff');g.addColorStop(.3,'#6a4bb8');g.addColorStop(.62,'#3a2a8a');g.addColorStop(1,'#d58ab0');x.fillStyle=g;x.fillRect(0,0,1024,512);
  for(let i=0;i<80;i++){x.fillStyle=`rgba(${R()<.5?'120,230,220':'255,160,200'},${.12+R()*.22})`;x.beginPath();x.ellipse(R()*1024,R()*512,20+R()*90,8+R()*30,R()*3,0,6.283);x.fill()}
  for(let i=0;i<50;i++){x.fillStyle=`rgba(255,255,255,${.06+R()*.12})`;x.beginPath();x.ellipse(R()*1024,R()*512,40+R()*120,4+R()*10,0,0,6.283);x.fill()}}
 const planet=new THREE.Mesh(new THREE.SphereGeometry(PR,72,48),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(pt),roughness:.85,metalness:0}));planet.position.copy(P);sc.add(planet);
 const atmo=new THREE.Mesh(new THREE.SphereGeometry(PR*1.14,48,32),new THREE.ShaderMaterial({transparent:true,side:THREE.BackSide,depthWrite:false,blending:add,
  vertexShader:'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec3 n;void main(){float i=pow(max(0.,.74-dot(n,vec3(0.,0.,1.))),3.);gl_FragColor=vec4(1.,.5,.68,1.)*i*2.2;}'}));atmo.position.copy(P);sc.add(atmo);
 /* the meteor: a jagged glowing rock with a hot glow, a long fiery tail and its own light */
 const rg=new THREE.IcosahedronGeometry(2,1),pa=rg.attributes.position;for(let i=0;i<pa.count;i++){const v=new V().fromBufferAttribute(pa,i);v.multiplyScalar(1+.3*Math.sin(v.x*3.1+v.y*2.3)*Math.cos(v.z*2.7));pa.setXYZ(i,v.x,v.y,v.z)}rg.computeVertexNormals();
 const rock=new THREE.Mesh(rg,new THREE.MeshStandardMaterial({color:0x2a1d26,emissive:0xff7a30,emissiveIntensity:1,roughness:.8,flatShading:true})),
  hot=spr(0xffffff,16,1),halo=spr(0x9fe6ff,46,.7),mLight=new THREE.PointLight(0xffb070,0,2600);sc.add(rock,mLight);
 const trail=[...Array(64)].map(()=>spr(0xbfeaff,10,.7)),hist=[];
 /* the impact */
 const n=new V(-.45,.35,-.82).normalize(),IMP=P.clone().addScaledVector(n,PR),B=new V(8,-3,-6),CP=new V(70,-40,230);
 const flash=spr(0xfff1c8,10,0),ring=new THREE.Mesh(new THREE.RingGeometry(1,1.12,64),new THREE.MeshBasicMaterial({color:0xffe2b0,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:add}));
 ring.position.copy(IMP).addScaledVector(n,2);ring.lookAt(IMP.clone().add(n));sc.add(ring);
 const NS=240,sp3=new Float32Array(NS*3),sv=[...Array(NS)].map(()=>new V()),sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp3,3));
 const sparks=new THREE.Points(sg,new THREE.PointsMaterial({map:gt,color:0xffc070,size:9,transparent:true,depthWrite:false,blending:add,opacity:0}));sparks.frustumCulled=false;sc.add(sparks);
 const chunks=[...Array(34)].map((_,i)=>{const m=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),new THREE.MeshStandardMaterial({color:[0x3a2a34,0x6a5650,0x4a3a3c][i%3],roughness:1,flatShading:true,transparent:true,opacity:0}));m.visible=false;m.userData={v:new V(),r:new V(R()*4,R()*4,R()*4)};sc.add(m);return m});
 const look=new V(0,0,-100),F=new V(0,0,-100),wash=document.createElement('div');wash.style.cssText='position:fixed;inset:0;z-index:70;background:#fff;opacity:0;pointer-events:none';document.body.append(wash);
 let boom=false,bt=0,t0=null,go=false,tp=0;const pos=new V();
 function explode(){boom=true;bt=0;[rock,hot,halo,...trail].forEach(o=>o.visible=false);flash.position.copy(IMP);sparks.material.opacity=1;
  for(let i=0;i<NS;i++){sp3[i*3]=IMP.x;sp3[i*3+1]=IMP.y;sp3[i*3+2]=IMP.z;sv[i].copy(n).multiplyScalar(30+R()*150).add(new V((R()-.5)*110,(R()-.5)*110,(R()-.5)*110))}
  chunks.forEach(c=>{c.position.copy(IMP);c.visible=true;c.material.opacity=1;const k=2+R()*5;c.scale.set(k,k*(.6+R()*.6),k);c.userData.v.copy(n).multiplyScalar(25+R()*90).add(new V((R()-.5)*90,(R()-.5)*90,(R()-.5)*90))})}
 function frame(nw){if(t0===null)t0=nw;const t=(nw-t0)/1000,dt=Math.min(.05,t-tp||.016);tp=t;
  pn=e3(c01((t-1.7)/1.5)); /* the view turns to look back */
  const pass=c01((t-1.55)/.4);mainEl.style.transform=`scale(${1+pass*.25})`;mainEl.style.opacity=1-pass; /* the texts vanish as the star flashes past */
  if(!boom)wash.style.opacity=.7*Math.max(0,1-Math.abs(t-1.9)/.3);
  if(!boom){let q=0;
   if(t<1.9){const u=Math.pow(t/1.9,2.4);pos.set(B.x*u,B.y*u,-900+(900+B.z)*u)}  /* starts as a speck at the centre, then rushes at the screen */
   else{q=c01((t-1.9)/2.7);const e=Math.pow(q,1.4),a=1-e;pos.set(a*a*B.x+2*a*e*CP.x+e*e*IMP.x,a*a*B.y+2*a*e*CP.y+e*e*IMP.y,a*a*B.z+2*a*e*CP.z+e*e*IMP.z)}
   rock.position.copy(pos);hot.position.copy(pos);halo.position.copy(pos);mLight.position.copy(pos);mLight.intensity=3.5*q*q;
   rock.rotation.x+=dt*7;rock.rotation.y+=dt*4.5;rock.scale.setScalar(t<1.9?1.3:Math.max(.5,3-q*2.2));
   const dist=pos.length();hot.scale.setScalar(t<1.9?Math.min(16,3+dist*.02)*(1+.2*Math.sin(t*40)):(16+8*Math.sin(t*40))*(.9+q));halo.scale.setScalar(t<1.9?Math.min(46,8+dist*.05):46+60*q);halo.material.color.setHex(q>.7?0xff9050:0x9fe6ff);
   hist.push(pos.clone());if(hist.length>200)hist.shift();
   trail.forEach((m,i)=>{const p=hist[Math.max(0,hist.length-1-i*3)],f=i/trail.length;m.position.copy(p);m.scale.setScalar((t<1.9?9:6+4*q)*(1-f*.85));m.material.opacity=.8*Math.pow(1-f,1.5);m.material.color.setHex(f<.25?0xffffff:f<.6?0xffc890:0x8fd0ff)});
   if(q>=1)explode()
  }else{
   bt+=dt;const fu=c01(bt/1);flash.scale.setScalar(20+480*Math.sqrt(fu));flash.material.opacity=1-fu;mLight.position.copy(IMP).addScaledVector(n,40);mLight.intensity=8*(1-fu);
   const ru=c01(bt/.95);ring.scale.setScalar(10+PR*.5*Math.sqrt(ru));ring.material.opacity=.9*(1-ru);
   for(let i=0;i<NS;i++){const v=sv[i];v.addScaledVector(n,-55*dt);sp3[i*3]+=v.x*dt;sp3[i*3+1]+=v.y*dt;sp3[i*3+2]+=v.z*dt}sg.attributes.position.needsUpdate=true;sparks.material.opacity=Math.max(0,1-bt/1.5);
   chunks.forEach(c=>{const u=c.userData;u.v.addScaledVector(n,-60*dt);c.position.addScaledVector(u.v,dt);c.rotation.x+=u.r.x*dt;c.rotation.y+=u.r.y*dt;c.material.opacity=Math.max(0,1-bt/1.6)});
   wash.style.opacity=c01((bt-.5)/.8)}
  /* the camera is forced to turn and follow the star down */
  const th=pn*Math.PI,yaw=new V(Math.sin(th),0,-Math.cos(th)).multiplyScalar(1000),w2=e3(c01((t-2.9)/1.2)),aim=boom?IMP.clone():IMP.clone().multiplyScalar(.6).addScaledVector(pos,.4);
  look.copy(yaw).lerp(aim,w2);
  const sh=(boom?Math.max(0,1-bt/1.1)*3:0)+(t<1.9?c01((t-.9)/1)*.4:0);cam.position.set((R()-.5)*sh,(R()-.5)*sh,0);
  cam.lookAt(look);cam.rotateZ(Math.sin(pn*Math.PI)*.2);planet.rotation.y+=dt*.03;rd.render(sc,cam);
  if(boom&&bt>1.5&&!go){go=true;location.href=url;return}
  requestAnimationFrame(frame)}
 requestAnimationFrame(frame)}

let T0=0,rx=0,ry=0;const rig=$('#rig');
function loop(ms){const t=ms/1000,dt=Math.min(.05,t-T0||.016);T0=t;sky(ms,dt);
 bx+=(mx-bx)*.2;by+=(my-by)*.2;ox+=((mx-bx)*.05-ox)*.2;bf.style.transform=`translate(${bx-32}px,${by-32}px) rotate(${cl(ox*6,-30,30)}deg)`;
 if(A&&A.on){if(!drag){rot+=vel*dt;vel+=(BASE-vel)*Math.min(1,dt*1.2)}pv.rotation.y=rot;halo.rotation.y=-t*.05;A.orbit.rotation.y=t*.35;venus.position.set(3.7*Math.cos(t*.9),0,3.7*Math.sin(t*.9));A.r.render(A.sc,A.cm)}
 if(B&&B.on){weigh(rm?8:t);const u=(rm?8:t)%CYC,target=-(wR-wL)*.5;
  if(rm)ang=target;else{av+=((target-ang)*30-av*5)*dt;ang+=av*dt}
  beam.rotation.z=ang;
  pans.forEach(p=>{const w=p.s<0?wL:wR,drop=rm?0:Math.max(0,1-u/.9);p.g.position.set(p.s*1.9*Math.cos(ang),PY+p.s*1.9*Math.sin(ang),0);p.g.rotation.z=rm?0:.05*Math.sin(t*1.7+p.s);
   p.it.scale.setScalar(w);p.it.rotation.y=t;p.it.position.y=-1.45+.33*w+drop*drop*2.4});
  sg.rotation.y=rm?0:.3*Math.sin(t*.25)+(mx/innerWidth-.5)*.5;B.con.rotation.y=-sg.rotation.y*.6;
  cStars.forEach(s=>s.scale.setScalar(rm?1:1.1+.45*Math.sin(t*1.6+s.userData.k*2)));
  const bal=Math.abs(wR-wL)<.05&&u>5.8?'Balanced ✦':'Weighing…';if(bal!==lastState){lastState=bal;stEl.textContent=bal}
  rx+=((-(my/innerHeight-.5)*7)-rx)*.08;ry+=(((mx/innerWidth-.5)*12)-ry)*.08;rig.style.setProperty('--rx',rx.toFixed(2)+'deg');rig.style.setProperty('--ry',ry.toFixed(2)+'deg');
  B.r.render(B.sc,B.cm)}
 requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* ---- reveal on scroll ---- */
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
})();
/* a11y: hide decorative bits; skip the intro for reduced-motion users */
document.querySelectorAll('.card i,#bf,#neb').forEach(e=>e.setAttribute('aria-hidden','true'));
if(matchMedia('(prefers-reduced-motion:reduce)').matches){const s=document.getElementById('skip');s&&s.click()}
