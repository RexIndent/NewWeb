(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
/* ===== CONTENT: edit this object only ===== */
const DATA={
 me:{name:'Your Name',age:'21',dob:'January 1, 2005',town:'Your Hometown',bio:'I build immersive, playful web experiences where design, motion and code meet. Replace this blurb with your own story.'},
 skills:[{t:'Front-End',i:['HTML5','CSS3','JavaScript']},{t:'Creative Coding',i:['Three.js','WebGL','GSAP']},{t:'UI/UX Design',i:['Figma','Prototyping','Type']},{t:'Back-End',i:['Node.js','REST','SQL']},{t:'Craft & Tools',i:['Git','Testing','Performance']}],
 values:[{t:'Curiosity',p:'Every good thing starts with asking what happens if.'},{t:'Craft',p:'Small details are where people feel the care.'},{t:'Kindness',p:'Great work is built with and for people.'}],
 interests:[{t:'Cozy Games',p:'Flying through glowing skies with friends.'},{t:'Stargazing',p:'Finding patterns in the dark.'},{t:'Photography',p:'Collecting golden-hour light.'}],
 links:[['Email','mailto:you@example.com','✉'],['Facebook','https://www.facebook.com/','f'],['GitHub','https://github.com/','</>'],['TikTok','https://www.tiktok.com/','♪']],
 quote:'Reach for the sky — the stars were always meant to be connected.'};
const ph=(t,h)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},70%,55%)"/><stop offset="1" stop-color="hsl(${h+60},70%,28%)"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><circle cx="200" cy="125" r="46" fill="rgba(255,255,255,.35)"/><text x="200" y="240" font-size="24" fill="#fff" text-anchor="middle" font-family="sans-serif">${t}</text></svg>`);

/* ===== RENDER CONTENT ===== */
const M=DATA.me;$('#name').textContent=M.name;$('#bio').textContent=M.bio;$('#author').src=ph('Author Photo',260);
$('#facts').innerHTML=[['Name',M.name],['Age',M.age],['Born',M.dob],['Hometown',M.town]].map(([a,b])=>`<dt>${a}</dt><dd class="mag">${b}</dd>`).join('');
$('#skills-grid').innerHTML=DATA.skills.map((s,i)=>`<article class="card"><div class="skill-photo-placeholder" data-placeholder="Skill Photo" data-magnify style="background-image:url('${ph(s.t,i*55)}')"></div><h3 class="mag">${s.t}</h3><ul class="tags">${s.i.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');
$('#values-grid').innerHTML=DATA.values.map(v=>`<article class="card"><h3 class="mag">${v.t}</h3><p class="mag">${v.p}</p></article>`).join('');
$('#interests-grid').innerHTML=DATA.interests.map((v,i)=>`<article class="card"><div class="interest-photo-placeholder" data-placeholder="Interest Photo" data-magnify style="background-image:url('${ph(v.t,200+i*50)}')"></div><h3 class="mag">${v.t}</h3><p class="mag">${v.p}</p></article>`).join('');
$('#soc').innerHTML=DATA.links.map(l=>`<li><a href="${l[1]}" target="_blank" rel="noopener"><i>${l[2]}</i>${l[0]}</a></li>`).join('');
$('#copy').textContent=`© 2026 ${M.name}. All rights reserved.`;
/* About Me lives on the front page, between the hero and the archways */
$('#gate').before($('#about'));
/* archways: one row each, archway left, delighted comment right */
const ARCH=[['skills','Skills','Where code, pixels and a little magic hold hands.'],['values','Values','The compass behind every late night and every launch.'],['interests','Interests','The things that fill my cup when the screen goes dark.'],['connect','Connect','Send a signal. I would love to hear what you are dreaming up!']];
$('.portals').innerHTML=ARCH.map(a=>`<button class="archway-portal" data-id="${a[0]}"><span class="arch-stone"><i class="key"></i><span class="arch-glow"><b class="ray"></b><i class="rune">✦ ◇ ✦</i></span><i class="pil l"></i><i class="pil r"></i><i class="base"></i></span><span class="cm"><h3 class="mag">${a[1]}</h3><p class="mag">${a[2]}</p></span></button>`).join('');
/* 4 projects at the bottom of every archway section */
const PROJ=[['Aurora Landing','A WebGL landing page that follows your cursor like a firefly.'],['Starlight Journal','A calm notes app that turns your entries into constellations.'],['Skyward Shop','A speedy, friendly storefront with buttery page transitions.'],['Lantern Chat','A tiny real-time chat that glows when someone is typing.']];
$$('.sec').forEach(s=>s.insertAdjacentHTML('beforeend',`<div class="proj"><h3 class="mag">Projects</h3><div class="track">${PROJ.map((p,i)=>`<figure class="pc"><div class="pph" data-placeholder="Project Photo" style="background-image:url('${ph(p[0],i*70+20)}')"></div><figcaption><b>${p[0]}</b><span>${p[1]}</span></figcaption></figure>`).join('')}</div></div>`));
function split(el){[...el.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(w=>{if(!w.trim()){f.append(w);return}const s=document.createElement('span');s.className='w';[...w].forEach(c=>{const l=document.createElement('span');l.className='ch';l.textContent=c;s.append(l)});f.append(s)});n.replaceWith(f)}else if(n.nodeType===1)split(n)})}
$$('.mag').forEach(split);

/* ===== 3D SKY (Three.js) ===== */
let sp=0,mx=innerWidth/2,my=innerHeight/2,skyM,dome,stars,spS=0,setDream=()=>{};const NT={v:0},DK={v:0},CAM={x:0,p:0},ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)}; // NT.v: 0 = golden hour, 1 = night; CAM.x: sideways camera pan
function initSky(){
 const R=new THREE.WebGLRenderer({canvas:$('#sky'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.75));
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(60,1,.1,900);S.fog=new THREE.Fog(0xe88a6a,30,300);
 const SUN='normalize(SD)';
 S.add(dome=new THREE.Mesh(new THREE.SphereGeometry(500,32,16),skyM=new THREE.ShaderMaterial({uniforms:{N:{value:0},W:{value:0},SD:{value:new THREE.Vector3(.2,.08,-1)}},side:THREE.BackSide,depthWrite:false,
  vertexShader:'varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`uniform float N,W;uniform vec3 SD;varying vec3 v;void main(){vec3 n=normalize(v);float h=n.y,d=max(dot(n,${SUN}),0.);vec3 c=mix(vec3(1.,.62,.4),vec3(.55,.25,.55),smoothstep(0.,.25,h));c=mix(c,vec3(.07,.05,.25),smoothstep(.2,.8,h));c+=vec3(1.,.8,.5)*pow(d,60.)*1.2+vec3(1.,.5,.3)*pow(d,6.)*.35;c=mix(c,mix(vec3(.08,.05,.22),vec3(.005,.01,.05),smoothstep(0.,.6,h)),N);c=mix(c,mix(vec3(.1,.45,.5),vec3(.03,.02,.2),smoothstep(-.1,.6,h))+vec3(.15,.05,.2)*smoothstep(.5,0.,abs(h-.1)),W);gl_FragColor=vec4(c,1.);}`})));
 // low-poly land
 const g=new THREE.PlaneGeometry(500,420,70,56);g.rotateX(-Math.PI/2);const pa=g.attributes.position,col=[];
 for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i),y=Math.sin(x*.05)*6+Math.cos(z*.07+x*.02)*5+Math.sin(x*.13+z*.1)*2;pa.setY(i,y);const k=(y+13)/26;col.push(.16+.2*k,.42+.34*k,.14+.12*k)}
 g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();
 const land=new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true}));land.position.set(0,-14,-110);S.add(land);
 const hemi=new THREE.HemisphereLight(0xffc89a,0x30205a,.95);S.add(hemi);const dl=new THREE.DirectionalLight(0xffb070,1.1);dl.position.set(20,30,-40);S.add(dl);
 // volumetric-style clouds: clusters of soft sprites
 const cv=document.createElement('canvas');cv.width=cv.height=128;const cc=cv.getContext('2d'),gr=cc.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');cc.fillStyle=gr;cc.fillRect(0,0,128,128);
 const tex=new THREE.CanvasTexture(cv),clouds=[];
 for(let c=0;c<24;c++){const grp=new THREE.Group();
  for(let i=0;i<9;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:new THREE.Color().setHSL(.04+Math.random()*.09,.7,.8-i*.012),transparent:true,opacity:.55,depthWrite:false,fog:false}));m.position.set((Math.random()-.5)*50,(Math.random()-.5)*8,(Math.random()-.5)*20);const s=30+Math.random()*30;m.scale.set(s,s*.55,1);grp.add(m)}
  grp.position.set((Math.random()-.5)*500,15+Math.random()*50,-80-Math.random()*220);S.add(grp);clouds.push(grp)}
 // stars
 const sv=[];for(let i=0;i<500;i++){const a=Math.random()*6.283,e=Math.random()*1.2+.2;sv.push(Math.cos(a)*Math.cos(e)*450,Math.sin(e)*450,Math.sin(a)*Math.cos(e)*450)}
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sv,3));const stM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{T:{value:0},O:{value:.7}},vertexShader:'attribute float ph;uniform float T;varying float tw;void main(){tw=.5+.5*sin(T*3.+ph*40.);gl_PointSize=1.5+3.5*tw;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float O;varying float tw;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.95,.8,O*(.3+.7*tw)*(1.-d*2.));}'});
 sg.setAttribute('ph',new THREE.Float32BufferAttribute(Array.from({length:500},Math.random),1));S.add(stars=new THREE.Points(sg,stM));
 // winged child silhouettes
 const dark=new THREE.MeshBasicMaterial({color:0x1b1038}),wm=new THREE.MeshBasicMaterial({color:0xffe2a8,side:THREE.DoubleSide,transparent:true,opacity:.92}),flyers=[];
 const wgeo=new THREE.BufferGeometry();wgeo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,.3,-2.8,.5,.8,-1.8,0,-.9],3));
 for(let i=0;i<6;i++){const f=new THREE.Group(),b=new THREE.Mesh(new THREE.ConeGeometry(.35,1.6,5),dark);b.rotation.x=Math.PI/2;const h=new THREE.Mesh(new THREE.IcosahedronGeometry(.32,0),dark);h.position.z=-1;
  const L=new THREE.Mesh(wgeo,wm),Rw=new THREE.Mesh(wgeo,wm);Rw.scale.x=-1;
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffd48a,transparent:true,opacity:.8,depthWrite:false,fog:false}));glow.scale.set(5,5,1);
  f.add(b,h,L,Rw,glow);addDetail(f,L,Rw);const dir=i%2?1:-1;f.userData={dir,sp:6+Math.random()*5,L,Rw,y:8+Math.random()*22,ph:Math.random()*6};f.rotation.y=-dir*Math.PI/2;f.position.set((Math.random()-.5)*400,f.userData.y,-35-Math.random()*90);S.add(f);flyers.push(f)}
 /* DETAILED FLYERS: layered feather wings, flowing cape, hair, halo, arms, trailing legs and a sparkle trail */
 function addDetail(f,L,Rw){const B=c=>new THREE.MeshBasicMaterial({color:c,side:THREE.DoubleSide,transparent:true,opacity:.85});
  [[.78,0xfff3c8,-.1],[.55,0x9fe8ff,-.17]].forEach(([s,c,y])=>[L,Rw].forEach(w=>{const m=new THREE.Mesh(wgeo,B(c));m.scale.set(s,1,s);m.position.y=y;w.add(m)}));
  const cape=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.9,1,3),new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(Math.random(),.8,.6),side:THREE.DoubleSide}));cape.rotation.x=1.3;cape.position.set(0,-.05,.95);f.add(cape);f.cape=cape;
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.36,6,5,0,6.283,0,1.8),new THREE.MeshBasicMaterial({color:0x3a2250}));hair.position.set(0,.1,-1);hair.rotation.x=-.3;f.add(hair);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(.32,.03,5,14),new THREE.MeshBasicMaterial({color:0xfff0b0}));halo.rotation.x=Math.PI/2;halo.position.set(0,.6,-1);f.add(halo);
  [-.4,.4].forEach(x=>{const a=new THREE.Mesh(new THREE.CylinderGeometry(.07,.06,.9,4),new THREE.MeshBasicMaterial({color:0x1b1038}));a.rotation.x=1.2;a.position.set(x,-.15,-.6);f.add(a);const l=a.clone();l.position.set(x*.5,-.1,.95);l.rotation.x=-1.4;f.add(l)});
  for(let i=1;i<=6;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffe3a0,transparent:true,opacity:.5-i*.07,depthWrite:false,fog:false}));sp.scale.set(2.6-i*.3,2.6-i*.3,1);sp.position.z=1+i*1.4;f.add(sp)}}
 /* GREEN SCENERY: low-poly pine trees on the hills */
 const trees=[],hgt=(x,z)=>-14+Math.sin(x*.05)*6+Math.cos((z+110)*.07+x*.02)*5+Math.sin(x*.13+(z+110)*.1)*2;
 {const tg=new THREE.ConeGeometry(2.2,6,6),tk=new THREE.CylinderGeometry(.35,.5,2,5),tm=new THREE.MeshLambertMaterial({color:0x2e9a52,flatShading:true}),trm=new THREE.MeshLambertMaterial({color:0x6b4a2f});
  for(let i=0;i<55;i++){const x=(Math.random()-.5)*300,z=-16-Math.random()*160,g=new THREE.Group(),c1=new THREE.Mesh(tg,tm),c2=new THREE.Mesh(tg,tm),k1=new THREE.Mesh(tk,trm);c1.position.y=4.5;c2.position.y=7;c2.scale.setScalar(.7);k1.position.y=1;g.add(k1,c1,c2);g.position.set(x,hgt(x,z)-.3,z);g.scale.setScalar(1+Math.random()*1.3);S.add(g);trees.push(g)}}
 /* WALKING CHILDREN OF LIGHT: game-style characters with head, hair, eyes, belt, cape, swinging arms/legs and a glowing lantern */
 function mkKid(h){const g=new THREE.Group(),M=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c,flatShading:true},o)),cc=new THREE.Color().setHSL((h+.45)%1,.65,.62),skin=M(0xffdcc0),robe=M(new THREE.Color().setHSL(h,.5,.6)),capeM=M(cc,{side:THREE.DoubleSide,emissive:new THREE.Color().setHSL((h+.45)%1,.8,.2)}),dk=M(0x2b1b44),gold=new THREE.MeshBasicMaterial({color:0xffe9a0});
  const piv=(x,y,z)=>{const p=new THREE.Group();p.position.set(x,y,z);g.add(p);return p},limb=(x,y,len,mat)=>{const p=piv(x,y,0),m=new THREE.Mesh(new THREE.CylinderGeometry(.13,.11,len,5),mat);m.position.y=-len/2;p.add(m);return p};
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.38,.6,1.4,7),robe);body.position.y=1.5;g.add(body);
  const belt=new THREE.Mesh(new THREE.TorusGeometry(.5,.07,5,10),M(0xffc46b));belt.rotation.x=1.57;belt.position.y=1.3;g.add(belt);
  const head=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,1),skin);head.position.y=2.6;g.add(head);
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.5,8,6,0,6.283,0,1.8),dk);hair.position.set(0,2.66,-.06);g.add(hair);
  [-.17,.17].forEach(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.06,6,6),dk);e.position.set(x,2.6,.4);g.add(e)});
  const star=new THREE.Mesh(new THREE.OctahedronGeometry(.12),gold);star.position.set(0,3.25,0);g.add(star);
  const capeP=piv(0,2.1,-.35),cape=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.9,1,3),capeM);cape.position.y=-.95;capeP.add(cape);
  const armL=limb(-.55,2,.9,robe),armR=limb(.55,2,.9,robe),legL=limb(-.22,.85,.9,dk),legR=limb(.22,.85,.9,dk);
  const lamp=new THREE.Mesh(new THREE.BoxGeometry(.2,.28,.2),gold);lamp.position.set(0,-1,.1);armR.add(lamp);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffe0a0,transparent:true,opacity:.8,depthWrite:false,fog:false}));glow.scale.set(5,5,1);glow.position.set(0,-1,.1);armR.add(glow);
  g.userData={body,cape:capeP,armL,armR,legL,legR,glow};return g}
 function stepKid(w,t,dt){const u=w.userData;w.position.x+=u.dir*u.sp*dt;if(Math.abs(w.position.x)>95){u.dir*=-1;u.ry=u.dir>0?1.5708:-1.5708}
  w.rotation.y+=(u.ry-w.rotation.y)*Math.min(1,dt*4);w.position.z=u.z+Math.sin(t*.2+u.ph)*4;const ph=t*u.sp*2.2+u.ph,sw=Math.sin(ph);
  w.position.y=hgt(w.position.x,w.position.z)+Math.abs(sw)*.2;u.legL.rotation.x=sw*.7;u.legR.rotation.x=-sw*.7;u.armL.rotation.x=-sw*.6;
  u.armR.rotation.x=Math.sin(t*.25+u.ph)>.93?-2.5+Math.sin(t*9)*.35:sw*.35-.4; /* now and then a child waves hello */
  u.cape.rotation.x=.3+Math.abs(sw)*.15+Math.sin(t*3+u.ph)*.08;u.glow.material.opacity=.65+Math.sin(t*4+u.ph)*.2}
 const walkers=[...Array(5)].map((_,i)=>{const k=mkKid((i*.19+.05)%1),dir=i%2?1:-1;Object.assign(k.userData,{dir,ry:dir>0?1.5708:-1.5708,sp:3+Math.random()*2,ph:Math.random()*6,z:-22-Math.random()*40});k.scale.setScalar(1.7);k.position.set((Math.random()-.5)*140,0,k.userData.z);k.rotation.y=k.userData.ry;S.add(k);return k});
 /* ATMOSPHERE: drifting ground mist, wind-blown leaves, extra cloud layers */
 const cloudAt=(x,y,z,s0)=>{const grp=new THREE.Group();for(let i=0;i<7;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:new THREE.Color().setHSL(.05+Math.random()*.1,.6,.82),transparent:true,opacity:.55,depthWrite:false,fog:false}));m.position.set((Math.random()-.5)*60,(Math.random()-.5)*8,(Math.random()-.5)*30);const s=s0*(.8+Math.random()*.6);m.scale.set(s,s*.5,1);grp.add(m)}grp.position.set(x,y,z);S.add(grp);clouds.push(grp);return grp};
 /* (the old cloud floor is gone: scrolling now digs down through the ground) */
 const mist=[...Array(14)].map(()=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xf0b08a,transparent:true,opacity:.28,depthWrite:false,fog:false})),s=70+Math.random()*60;m.scale.set(s,s*.28,1);m.position.set((Math.random()-.5)*300,-6+Math.random()*10,-25-Math.random()*150);m.userData.s=3+Math.random()*3;S.add(m);return m});
 const leaves=[...Array(90)].map(()=>{const hue=Math.random()<.6?.28+Math.random()*.08:.07+Math.random()*.06,m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.85),new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(hue,.7,.5),side:THREE.DoubleSide,fog:false}));m.userData={b:m.material.color.clone(),ph:Math.random()*6,k:.6+Math.random()*.8,rx:2+Math.random()*3,ry:1+Math.random()*3,rz:1+Math.random()*2};m.position.set((Math.random()-.5)*260,-4+Math.random()*34,-4-Math.random()*80);S.add(m);return m});
 /* WORLD TWO (revealed as you scroll): ancient ruins above a sea of clouds, with the old relic at the core */
 const w2=new THREE.Group();w2.position.set(0,-430,-100);w2.visible=false;S.add(w2);
 const sm=new THREE.MeshLambertMaterial({color:0x8a8070,flatShading:true}),mos=new THREE.MeshLambertMaterial({color:0x4f8a4a,flatShading:true}),gm=new THREE.MeshPhongMaterial({color:0xb08d3c,emissive:0x2a1c04,shininess:60,flatShading:true});
 const pf=new THREE.Mesh(new THREE.CylinderGeometry(36,40,4,10),sm);pf.position.y=-4;w2.add(pf);const moss=new THREE.Mesh(new THREE.CylinderGeometry(30,30,.4,10),mos);moss.position.y=-1.9;w2.add(moss);
 for(let i=0;i<9;i++){const a=i/9*6.283,h=8+Math.random()*18,c=new THREE.Mesh(new THREE.CylinderGeometry(1.7,2.1,h,7),sm);c.position.set(Math.cos(a)*30,-2+h/2,Math.sin(a)*30);c.rotation.z=(Math.random()-.5)*.14;w2.add(c);if(h>16){const cap=new THREE.Mesh(new THREE.BoxGeometry(4.6,1.4,4.6),sm);cap.position.set(c.position.x,-2+h,c.position.z);w2.add(cap)}}
 const ped=new THREE.Mesh(new THREE.CylinderGeometry(3,6,5,6),sm);w2.add(ped);
 const relic=new THREE.Group();relic.position.y=11;w2.add(relic);
 const rings=[14,11,8].map((r,i)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.55,8,56),gm);m.rotation.set(i*1.05,i*.6,0);relic.add(m);if(i===0)for(let k=0;k<24;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(.6,1.8,.7),gm),a=k/24*6.283;b.position.set(Math.cos(a)*r,Math.sin(a)*r,0);b.rotation.z=a;m.add(b)}return m});
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(3.4,1),new THREE.MeshBasicMaterial({color:0x9ff0ff}));relic.add(core);
 const cg=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0x9ff0ff,transparent:true,opacity:.9,depthWrite:false,fog:false}));cg.scale.set(30,30,1);relic.add(cg);
 const orbs=[...Array(6)].map(()=>{const o=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,0),gm);relic.add(o);return o});
 const rl=new THREE.PointLight(0xffd88a,1.8,170);rl.position.set(0,12,12);w2.add(rl);
 /* UNDERGROUND: a cross-section shaft painted with strata: grass, topsoil, subsoil, clay, gravel, fossil limestone, ore-veined granite, bedrock, then ancient relic walls */
 const sc=document.createElement('canvas');sc.width=512;sc.height=2048;const pc=sc.getContext('2d'),R2=(a,b)=>a+Math.random()*(b-a),soilEl=$('#soil');
 const sgr=pc.createLinearGradient(0,0,0,2048);[[0,'#3a7a2c'],[.05,'#4f6a2a'],[.1,'#5c3d25'],[.2,'#704b2d'],[.3,'#86613f'],[.4,'#8d8573'],[.5,'#6f6c74'],[.62,'#4e4b5c'],[.75,'#38343f'],[.86,'#1c2340'],[1,'#0c1630']].forEach(([p,c])=>sgr.addColorStop(p,c));pc.fillStyle=sgr;pc.fillRect(0,0,512,2048);
 pc.lineWidth=3;for(let i=0;i<70;i++){const y=R2(60,1650);pc.strokeStyle=Math.random()<.5?'rgba(0,0,0,.07)':'rgba(255,255,255,.04)';pc.beginPath();for(let x=0;x<=512;x+=16)pc.lineTo(x,y+Math.sin(x*.04+i)*7);pc.stroke()}
 for(let i=0;i<6000;i++){pc.fillStyle=Math.random()<.5?'rgba(0,0,0,.14)':'rgba(255,255,255,.07)';pc.fillRect(R2(0,512),R2(0,1700),R2(2,7),R2(1,4))}
 pc.strokeStyle='#3a2414';pc.lineWidth=2;for(let i=0;i<14;i++){pc.beginPath();const x=R2(0,512),y=R2(80,420);pc.moveTo(x,y);pc.bezierCurveTo(x+R2(-40,40),y+30,x+R2(-40,40),y+60,x+R2(-30,30),y+R2(80,140));pc.stroke()}
 for(let i=0;i<90;i++){pc.fillStyle=`hsl(35,8%,${R2(40,62)}%)`;pc.beginPath();pc.ellipse(R2(0,512),R2(630,810),R2(3,9),R2(2,6),R2(0,3),0,6.283);pc.fill()}
 pc.strokeStyle='rgba(230,220,200,.5)';for(let i=0;i<8;i++){const x=R2(30,480),y=R2(840,1090);pc.beginPath();for(let a=0;a<12;a+=.3)pc.lineTo(x+Math.cos(a)*a*1.8,y+Math.sin(a)*a*1.8);pc.stroke()}
 pc.shadowBlur=10;for(let i=0;i<70;i++){pc.fillStyle=Math.random()<.5?'#6ff0ff':'#ffd060';pc.shadowColor=pc.fillStyle;pc.fillRect(R2(0,512),R2(1130,1690),R2(2,5),R2(2,5))}pc.shadowBlur=0;
 for(let r=0;r<9;r++)for(let x=-(r%2)*48;x<512;x+=96){const y=1640+r*48;pc.globalAlpha=Math.min(1,r/4);pc.fillStyle=`hsl(${R2(215,230)},${R2(30,45)}%,${R2(14,24)}%)`;pc.fillRect(x+2,y+2,92,44);if(Math.random()<.18){pc.strokeStyle='#7fd8ff';pc.shadowColor='#3a9bff';pc.shadowBlur=8;pc.lineWidth=2;pc.beginPath();pc.arc(x+48,y+24,R2(6,12),0,6.283);pc.moveTo(x+30,y+24);pc.lineTo(x+66,y+24);pc.stroke();pc.shadowBlur=0}}
 pc.globalAlpha=1;
 pc.fillStyle='rgba(111,240,255,.35)';for(let x=0;x<512;x+=32){pc.beginPath();pc.moveTo(x,1990);pc.lineTo(x+16,1970);pc.lineTo(x+32,1990);pc.fill()}
 const stex=new THREE.CanvasTexture(sc);stex.wrapS=stex.wrapT=THREE.RepeatWrapping;stex.repeat.set(2,1);
 const wallM=new THREE.MeshBasicMaterial({map:stex,side:THREE.BackSide,fog:false}),topM=new THREE.MeshBasicMaterial({visible:false}),floorM=new THREE.MeshBasicMaterial({color:0x040b1c,side:THREE.BackSide,fog:false});
 const shaft=new THREE.Mesh(new THREE.BoxGeometry(200,444,240),[wallM,wallM,topM,floorM,wallM,wallM]);shaft.position.set(0,-218,-40);S.add(shaft);shaft.visible=false; /* only drawn once the camera is under the ground, so no wall tops show at the surface */
 /* the ground's underside: the same terrain seen from below in dirt brown, so surface and underground are ONE continuous ground */
 {const ug=g.clone(),uc=[],up=ug.attributes.position;for(let i=0;i<up.count;i++){const k=.5+.5*Math.sin(up.getX(i)*.08+up.getZ(i)*.11);uc.push(.3+.14*k,.19+.1*k,.1+.06*k)}ug.setAttribute('color',new THREE.Float32BufferAttribute(uc,3));const under2=new THREE.Mesh(ug,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide,fog:false}));under2.position.copy(land.position);S.add(under2)}
/* ANCIENT HALL (inspired by the constellation-hall look): tall nested pointed arches, glowing blue constellation figures, drifting red embers, star dust, a glowing grassy path, small shrines and a floating cyan diamond */
 [...w2.children].forEach(c=>{if(c!==relic&&c!==rl)w2.remove(c)});
 gm.color.set(0x8fb4e8);gm.emissive.set(0x0a2a55);core.material.color.set(0x7ff0ff);
 const hall=new THREE.Group();w2.add(hall);const nodes=[];
 const flat=(w,h,c,x,y,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:c,fog:false}));m.position.set(x,y,z);m.rotation.y=ry;hall.add(m);return m};
 flat(190,170,0x0a1a3c,-53,60,0,Math.PI/2);flat(190,170,0x0a1a3c,53,60,0,-Math.PI/2);flat(220,170,0x091733,0,60,-96,0);flat(110,190,0x040b1c,0,-3,0,0).rotation.x=-Math.PI/2;
 const arch=(w,h,col)=>{const s=new THREE.Shape(),k=h*.72;s.moveTo(-w,0);s.lineTo(-w,k);s.quadraticCurveTo(-w*.85,k+(h-k)*.8,0,h);s.quadraticCurveTo(w*.85,k+(h-k)*.8,w,k);s.lineTo(w,0);return new THREE.Mesh(new THREE.ShapeGeometry(s,12),new THREE.MeshBasicMaterial({color:col,fog:false}))};
 const cmat=new THREE.MeshBasicMaterial({color:0x58c4ff,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,fog:false});
 const seg=(a,b)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,a.distanceTo(b),5),cmat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());hall.add(m)};
 const fig=(P,axis)=>{const pts=[...Array(7)].map(()=>{const u=(Math.random()-.5)*11,v=(Math.random()-.5)*36;return axis==='z'?new THREE.Vector3(P.x,P.y+v,P.z+u):new THREE.Vector3(P.x+u,P.y+v,P.z)});
  pts.forEach((p,i)=>{if(i)seg(pts[i-1],p);const n=new THREE.Mesh(new THREE.OctahedronGeometry(1.4,0),cmat);n.position.copy(p);n.userData.ph=Math.random()*6;hall.add(n);nodes.push(n)});seg(pts[0],pts[3])};
 [-60,-30,0,30,60].forEach(z=>[-1,1].forEach(sd=>{const ry=-sd*Math.PI/2,o=arch(10,78,0x15356b),i2=arch(7,68,0x07173c);o.position.set(sd*51.8,-2,z);i2.position.set(sd*50.8,-2,z);o.rotation.y=i2.rotation.y=ry;hall.add(o,i2);fig(new THREE.Vector3(sd*49.6,38,z),'z')}));
 [-45,0,45].forEach(x=>{const o=arch(15,105,0x15356b),i2=arch(11,92,0x07173c);o.position.set(x,-2,-93.8);i2.position.set(x,-2,-92.8);hall.add(o,i2);fig(new THREE.Vector3(x,50,-91.8),'x')});
 [-45,-15,15,45].forEach(z=>[-1,1].forEach((sd,j)=>{const p=new THREE.Mesh(new THREE.BoxGeometry(8,170,10),new THREE.MeshBasicMaterial({color:j?0x16397a:0x1b4486,fog:false}));p.position.set(sd*50,60,z);hall.add(p)}));
 const pg=new THREE.PlaneGeometry(40,190,10,24);pg.rotateX(-Math.PI/2);const pp=pg.attributes.position,pcol=[];
 for(let i=0;i<pp.count;i++){const x=pp.getX(i),z=pp.getZ(i);pp.setY(i,Math.sin(x*.3+z*.1)*.6+Math.cos(z*.15)*.5);const k=.5+.5*Math.sin(z*.2+x*.4);pcol.push(.1+.1*k,.35+.25*k,.33+.2*k)}
 pg.setAttribute('color',new THREE.Float32BufferAttribute(pcol,3));const path=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({vertexColors:true,fog:false}));path.position.y=-1;hall.add(path);
 const shm=new THREE.MeshBasicMaterial({color:0xa9c0e6,fog:false});
 [-8,0,8].forEach((x,i)=>{const s=new THREE.Group(),b=new THREE.Mesh(new THREE.BoxGeometry(3,6,2),shm),c=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,2,12),shm);c.rotation.x=Math.PI/2;c.position.y=3;s.add(b,c);s.position.set(x,2,-60);s.scale.setScalar(i===1?1.4:1);hall.add(s)});
 const dia=new THREE.Mesh(new THREE.OctahedronGeometry(3,0),new THREE.MeshBasicMaterial({color:0x7ff0ff,fog:false}));dia.scale.y=1.8;dia.position.set(0,26,-60);hall.add(dia);
 const dgl=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0x5fe0ff,transparent:true,opacity:.8,depthWrite:false,fog:false}));dgl.scale.set(22,22,1);dgl.position.copy(dia.position);hall.add(dgl);
 const dust=(n,col,size,spd,box)=>{const pos=[],ph=[];for(let i=0;i<n;i++){pos.push((Math.random()-.5)*box[0],Math.random()*box[1],(Math.random()-.5)*box[2]-10);ph.push(Math.random())}
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g2.setAttribute('ph',new THREE.Float32BufferAttribute(ph,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{T:{value:0},C:{value:new THREE.Color(col)}},vertexShader:`attribute float ph;uniform float T;varying float tw;void main(){vec3 p=position;p.y=mod(p.y+T*${spd.toFixed(2)}*(.5+ph),${box[1].toFixed(1)});tw=.5+.5*sin(T*3.+ph*40.);gl_PointSize=${size.toFixed(1)}*(.6+tw);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:'uniform vec3 C;varying float tw;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(C,(1.-d*2.)*(.4+.6*tw));}'});
  const q=new THREE.Points(g2,m);q.frustumCulled=false;hall.add(q);return m};
 const dmat=[dust(260,0xff4a2a,5,2,[100,100,170]),dust(700,0x9cc8ff,2.5,.6,[100,110,170]),dust(160,0x4fd8ff,3.5,.15,[34,4,150])];
 const w1=[land,...trees,...walkers,...leaves,...mist,...flyers,...clouds];let under=false; /* the surface world is hidden once the camera is underground */
 /* DREAM REALM: floating crystal islands, aurora ribbons and orbs high above the horizon; revealed when the camera pans up */
 const dream=new THREE.Group();dream.visible=false;S.add(dream);const isl=[];
 for(let i=0;i<10;i++){const g2=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:0x8866ff,flatShading:true}),top=new THREE.Mesh(new THREE.IcosahedronGeometry(5+Math.random()*5,0),m),bot=new THREE.Mesh(new THREE.ConeGeometry(4,10,6),m);top.scale.y=.45;bot.rotation.x=Math.PI;bot.position.y=-6;g2.add(top,bot);g2.position.set((Math.random()-.5)*190,125+Math.random()*90,-50-Math.random()*150);g2.userData={ph:Math.random()*6,y:g2.position.y};dream.add(g2);isl.push(g2)}
 const au=[0,1].map(k=>{const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{T:{value:0},H:{value:.75},A:{value:0}},vertexShader:`varying vec2 u;uniform float T;void main(){u=uv;vec3 p=position;p.y+=sin(p.x*.05+T+${k}.)*10.;p.z+=sin(p.x*.03+T*.7)*14.;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:'varying vec2 u;uniform float H,A;void main(){vec3 c=.5+.5*cos(6.283*(H+u.x*.25+vec3(0.,.33,.67)));gl_FragColor=vec4(c,pow(u.y,1.5)*(1.-u.y)*2.2*A);}'});const p=new THREE.Mesh(new THREE.PlaneGeometry(320,70,48,1),m);p.position.set(0,170+k*40,-210-k*40);dream.add(p);return m});
 const ovg=new THREE.BufferGeometry(),ov=[];for(let i=0;i<350;i++)ov.push((Math.random()-.5)*300,100+Math.random()*160,-30-Math.random()*220);ovg.setAttribute('position',new THREE.Float32BufferAttribute(ov,3));const orbM=new THREE.PointsMaterial({size:3,sizeAttenuation:false,color:0xffffff,transparent:true,opacity:0,fog:false});dream.add(new THREE.Points(ovg,orbM));
 const pl=new THREE.PointLight(0xaa88ff,0,400);pl.position.set(0,150,-60);dream.add(pl);
 setDream=i=>{const h=[.75,.55,.9,.08,.4][i];au.forEach(m=>gsap.to(m.uniforms.H,{value:h,duration:1.4}));isl.forEach((g,j)=>g.children[0].material.color.setHSL((h+j*.03)%1,.6,.55))};setDream(0);
 const rs=()=>{R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};rs();addEventListener('resize',rs);
 const clk=new THREE.Clock();let nextPass=7;
 (function loop(){const dt=Math.min(clk.getDelta(),.05),t=clk.elapsedTime;spS+=(sp-spS)*Math.min(1,dt*3); /* eased scroll progress drives the descent */
  const wind=clamp(.5+.5*Math.sin(t*.55)*Math.sin(t*.21+1)+.25*Math.sin(t*1.7),0,1),cyc=ss(.3,.7,.5-.5*Math.cos(t*6.283/36)); /* wind gusts + a 36-second day/night cycle */
  clouds.forEach((c,i)=>{c.position.x+=dt*(2+i%4*.9)*(.6+wind*1.4);if(c.position.x>300)c.position.x=-300});
  walkers.forEach(w=>stepKid(w,t,dt));const nv=Math.max(NT.v,DK.v*.85,cyc);skyM.uniforms.N.value=nv;skyM.uniforms.W.value=ss(.45,.8,spS)*(1-NT.v);skyM.uniforms.SD.value.set(.2,.3*(1-cyc)-.04,-1);
  const lc=1-.65*nv;leaves.forEach(l=>{const u=l.userData,p=l.position;p.x+=(4+wind*18)*dt*u.k;p.y+=(Math.sin(t*1.7+u.ph)*2.2-.5)*dt;p.z+=Math.sin(t*.8+u.ph)*2*dt;l.rotation.x+=dt*u.rx*(1+wind*2);l.rotation.y+=dt*u.ry;l.rotation.z+=dt*u.rz;if(p.x>140){p.x=-140;p.y=-2+Math.random()*32}if(p.y<-8)p.y=30;l.material.color.copy(u.b).multiplyScalar(lc)});
  trees.forEach((g,i)=>g.rotation.z=Math.sin(t*1.3+i)*.035*(.4+wind*1.6));
  mist.forEach(m=>{m.position.x+=m.userData.s*dt*(.5+wind);if(m.position.x>170)m.position.x=-170;m.material.color.copy(S.fog.color);m.material.opacity=.22+.1*nv});
  w2.visible=spS>.2;dmat.forEach(m=>m.uniforms.T.value=t);nodes.forEach(n=>n.scale.setScalar(1+.45*Math.sin(t*3+n.userData.ph)));dia.rotation.y=t*.8;dia.position.y=26+Math.sin(t)*1.5;const cy=6-ss(.15,.75,spS)*(1-NT.v)*430,gy=hgt(0,30-spS*22)-.5,un=cy<gy;if(un!==under){under=un;w1.forEach(o=>o.visible=!un);shaft.visible=un}soilEl.style.opacity=Math.max(0,1-Math.abs(cy-gy)/16)*.7;relic.rotation.y=t*.25;relic.position.y=11+Math.sin(t*.8)*1.2;rings.forEach((r,i)=>{r.rotation.x+=dt*(.3+i*.2);r.rotation.z+=dt*(.2-i*.1)});core.scale.setScalar(1+.08*Math.sin(t*3));orbs.forEach((o,i)=>{const a=t*(.4+i*.1)+i*1.3,rr=18+i*2;o.position.set(Math.cos(a)*rr,Math.sin(a*1.3)*6,Math.sin(a)*rr)});hemi.intensity=.95-.75*nv;dl.intensity=1.1-.95*nv;stM.uniforms.O.value=.1+.9*nv;stM.uniforms.T.value=t;S.fog.color.setRGB(.91-.89*nv,.54-.52*nv,.42-.38*nv);clouds.forEach(c=>c.children.forEach(m=>m.material.opacity=.55*(1-.85*nv)));
  dream.visible=NT.v>.02;dream.scale.setScalar(.7+.3*NT.v);au.forEach(m=>{m.uniforms.T.value=t*.5;m.uniforms.A.value=NT.v});orbM.opacity=NT.v*.9;pl.intensity=2.2*NT.v;isl.forEach(g=>{g.position.y=g.userData.y+Math.sin(t*.6+g.userData.ph)*3;g.rotation.y+=dt*.2});
  /* random close fly-bys: a light child swoops past near the camera every 6-15s */
  if(t>nextPass){const f=flyers[Math.random()*flyers.length|0],u=f.userData;if(!u.near){u.near=true;u.sp0=u.sp;u.z0=f.position.z;u.sp=48;u.yn=4+Math.random()*10;f.scale.setScalar(2.6);f.position.z=16+Math.random()*6;f.position.x=-u.dir*240}nextPass=t+6+Math.random()*9}
  flyers.forEach(f=>{const u=f.userData;f.position.x+=u.dir*u.sp*dt;if(Math.abs(f.position.x)>260){f.position.x=-u.dir*260;if(u.near){u.near=false;u.sp=u.sp0;f.scale.setScalar(1);f.position.z=u.z0}}f.position.y=(u.near?u.yn:u.y)+Math.sin(t*1.2+u.ph)*2;const s=Math.sin(t*6+u.ph)*.7;u.L.rotation.z=s;u.Rw.rotation.z=-s;if(f.cape)f.cape.rotation.x=1.3+Math.sin(t*5+u.ph)*.28});
  C.position.set(Math.sin(t*.12)*4+(mx/innerWidth-.5)*6+CAM.x,6+CAM.p*.12+Math.sin(t*.2)-(my/innerHeight-.5)*2-ss(.15,.75,spS)*(1-NT.v)*430,30-spS*22);C.lookAt(CAM.x*.7,12+CAM.p-ss(.15,.75,spS)*(1-NT.v)*430,-100);dome.position.copy(C.position);stars.position.copy(C.position);R.render(S,C);requestAnimationFrame(loop)})();
}
try{initSky()}catch(e){document.body.style.background='linear-gradient(#1b1040,#ff9a6b)'}

/* ===== CONSTELLATIONS (scroll-driven) ===== */
const NS='http://www.w3.org/2000/svg',mk=(p,t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p.append(e);return e};
let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const N=16,pts=[...Array(N)].map((_,i)=>[8+i*(84/(N-1))+(rnd()-.5)*6,12+rnd()*76]);
const cl=pts.slice(1).map((p,i)=>mk($('#const'),'line',{x1:pts[i][0],y1:pts[i][1],x2:p[0],y2:p[1],pathLength:1}));
const cn=pts.map(p=>mk($('#const'),'circle',{cx:p[0],cy:p[1],r:.55,opacity:0}));cn.forEach((c,i)=>c.style.animationDelay=-i*.37+'s');
/* FINAL CONSTELLATION: a true 3D star lattice spinning at constant speed */
const G=$('#grand'),gx=G.getContext('2d'),GN=44,GP=[...Array(GN)].map((_,i)=>{const y=1-2*i/(GN-1),r=Math.sqrt(1-y*y),a=i*2.4;return[Math.cos(a)*r,y,Math.sin(a)*r]}),GE=[];
GP.forEach((p,i)=>GP.forEach((o,j)=>{if(j>i&&Math.hypot(p[0]-o[0],p[1]-o[1],p[2]-o[2])<.62)GE.push([i,j])}));
const gr2=()=>{G.width=innerWidth;G.height=innerHeight};gr2();addEventListener('resize',gr2);
(function gLoop(t){if(+G.style.opacity>.01){const w=G.width,h=G.height,R=Math.min(w,h)*.4,a=t*.0006,co=Math.cos(a),si=Math.sin(a),ct=Math.cos(.4),st=Math.sin(.4);gx.clearRect(0,0,w,h);
 const pj=GP.map(([x,y,z])=>{const X=x*co+z*si,Z=-x*si+z*co,Y=y*ct-Z*st,Z2=y*st+Z*ct,k=1/(2.6-Z2);return[w/2+X*R*k*2.2,h/2+Y*R*k*2.2,k]});
 gx.lineWidth=1;gx.strokeStyle='rgba(255,230,180,.5)';GE.forEach(([i,j])=>{gx.beginPath();gx.moveTo(pj[i][0],pj[i][1]);gx.lineTo(pj[j][0],pj[j][1]);gx.stroke()});
 pj.forEach((p,i)=>{gx.fillStyle='#fff6d6';gx.shadowColor='#ffd88a';gx.shadowBlur=14;gx.beginPath();gx.arc(p[0],p[1],5.8*p[2]*(1+.4*Math.sin(t*.006+i*2.1)),0,6.283);gx.fill()});gx.shadowBlur=0}
 requestAnimationFrame(gLoop)})(0);




/* ===== QUOTE TEARING: jagged SVG-free clip-path strips that rip apart ===== */
const stage=$('#stage'),NSP=9,edges=[...Array(NSP+1)].map((_,k)=>[...Array(11)].map(()=>k&&k<NSP?+(rnd()*3-1.5).toFixed(2):0));
const strips=[...Array(NSP)].map((_,i)=>{const d=document.createElement('div'),y0=i*100/NSP,y1=(i+1)*100/NSP;d.className='strip';
 const top=edges[i].map((j,x)=>`${x*10}% ${y0+j}%`),bot=edges[i+1].map((j,x)=>`${x*10}% ${y1+j}%`).reverse();
 d.style.clipPath=`polygon(${[...top,...bot].join(',')})`;d.innerHTML=`<p>${DATA.quote}</p>`;stage.prepend(d);return d});
const zone=$('#zone');
function onScroll(){
 const h=document.documentElement.scrollHeight-innerHeight;sp=h>0?scrollY/h:0;const u=sp*(N+1);
 cn.forEach((c,i)=>c.style.opacity=clamp(u-i));cl.forEach((l,i)=>l.style.strokeDashoffset=1-clamp(u-i-.5));
 const q=clamp((scrollY-zone.offsetTop)/(zone.offsetHeight-innerHeight)),t=clamp((q-.3)/.45);
 strips.forEach((s,i)=>{const d=i%2?1:-1,k=.6+(i%3)*.25;s.style.transform=`translate(${d*t*t*110*k}vw,${(i-4)*t*18}px) rotate(${d*t*14*k}deg)`;s.style.opacity=clamp(1.2-t)});
 const gq=clamp((q-.35)/.3);G.style.opacity=gq;G.style.transform=`scale(${.9+.1*gq})`;$('#copy').style.opacity=clamp((q-.85)/.12);
}
let tick=false;addEventListener('scroll',()=>{moved=true;if(!tick){tick=true;requestAnimationFrame(()=>{tick=false;onScroll()})}},{passive:true});
addEventListener('resize',onScroll);

/* ===== BUTTERFLY CURSOR + MAGNIFY + IDLE WANDER ===== */
const bf=$('#bf'),B={x:mx,y:my,r:0,mode:'follow',k:.18};let last=performance.now(),moved=true,hot=new Set(),seen=false;
addEventListener('pointermove',e=>{if(B.mode==='wander'&&Math.hypot(e.clientX-mx,e.clientY-my)>6){B.mode='follow';B.k=.04}mx=e.clientX;my=e.clientY;moved=true;last=performance.now();if(!seen){seen=true;B.x=mx;B.y=my;bf.style.opacity=1}});
function wander(now){B.mode='wander';B.t0=now;const r=()=>[60+Math.random()*(innerWidth-120),60+Math.random()*(innerHeight-120)];B.P=[[B.x,B.y],...Array.from({length:9},r)]}
function magnify(){
 if(!moved)return;moved=false;const t=document.elementFromPoint(mx,my),el=t&&t.closest('.mag'),next=new Set();
 if(el)(el._c||(el._c=$$('.ch',el))).forEach(c=>{const r=c.getBoundingClientRect(),d=Math.hypot(mx-(r.left+r.width/2),my-(r.top+r.height/2));if(d<110){const s=1+.9*(1-d/110);c.style.transform=`scale(${s}) translateY(${-(s-1)*8}px)`;c.classList.toggle('hot',s>1.2);next.add(c)}});
 hot.forEach(c=>{if(!next.has(c)){c.style.transform='';c.classList.remove('hot')}});hot=next;
 const im=t&&t.closest('[data-magnify]');$$('.zoom').forEach(z=>z!==im&&z.classList.remove('zoom'));
 if(im){const r=im.getBoundingClientRect();im.style.transformOrigin=`${(mx-r.left)/r.width*100}% ${(my-r.top)/r.height*100}%`;im.classList.add('zoom')}
 bf.classList.toggle('lens',!!(el||im));bf.classList.toggle('click',!!(t&&t.closest('a,button,.archway-portal')));
}
(function bfLoop(now){
 if(seen){let nx=B.x,ny=B.y;
  if(B.mode==='follow'){if(now-last>15000)wander(now);else{nx+=(mx-B.x)*B.k;ny+=(my-B.y)*B.k;B.k=Math.min(.18,B.k+.002)}}
  if(B.mode==='wander'){const u=(now-B.t0)/10000;if(u>=1){B.mode='follow';B.k=.03;last=now}else{const s=Math.min(2,u*3|0),v=u*3-s,[a,b,c,d]=B.P.slice(s*3,s*3+4),m=1-v,w=i=>m**3*a[i]+3*m*m*v*b[i]+3*m*v*v*c[i]+v**3*d[i];nx=w(0);ny=w(1)}}
  const vx=nx-B.x,vy=ny-B.y;B.x=nx;B.y=ny;
  const tr=B.mode==='wander'?Math.atan2(vx,-vy)*57.3:clamp(vx*2,-25,25);B.r+=(((tr-B.r+540)%360)-180)*.15;
  bf.style.transform=`translate3d(${B.x}px,${B.y}px,0) translate(-50%,-50%) rotate(${B.r}deg)`;magnify()}
 requestAnimationFrame(bfLoop)})(performance.now());

/* ===== PARTICLE DISPERSAL ===== */
const fx=$('#fx'),fc=fx.getContext('2d');let P=[],run=false;
const fs=()=>{fx.width=innerWidth;fx.height=innerHeight};fs();addEventListener('resize',fs);
function burst(x,y,n){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=2+Math.random()*9;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,s:10+Math.random()*16,c:['#fff6d6','#ffd88a','#bfefff'][i%3]})}if(!run){run=true;requestAnimationFrame(fxLoop)}}
/* click sprinkle: a little burst of stars where you click or tap */
function sprinkle(x,y){for(let i=0;i<9;i++){const a=Math.random()*6.283,s=1+Math.random()*4;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.5,l:.8,s:8+Math.random()*10,c:['#fff6d6','#ffd88a','#bfefff'][i%3]})}if(!run){run=true;requestAnimationFrame(fxLoop)}}
addEventListener('pointerdown',e=>sprinkle(e.clientX,e.clientY));
function fxLoop(){fc.clearRect(0,0,fx.width,fx.height);P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.96;p.vy=p.vy*.96-.05;p.l-=.012;fc.globalAlpha=Math.max(p.l,0);fc.fillStyle=p.c;fc.shadowColor=p.c;fc.shadowBlur=12;fc.font=p.s+'px serif';fc.fillText('✦',p.x,p.y)});fc.globalAlpha=1;fc.shadowBlur=0;if(P.length)requestAnimationFrame(fxLoop);else run=false}

/* ===== ARCHWAY PORTAL TRANSITIONS ===== */
const front=$('#front'),portal=$('#portal'),back=$('#back');let busy=false,saved=0;
function openPortal(id,btn){if(busy)return;busy=true;saved=scrollY;const stone=btn.firstElementChild,r=stone.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,240);
 front.style.filter='url(#warp)';front.style.transformOrigin=`${r.left+r.width/2}px ${r.top+scrollY+r.height/2}px`;
 gsap.timeline().to(stone,{scale:1.8,duration:1.2,ease:'power3.in'},0).to('#front',{scale:2.4,yPercent:-16,duration:1.3,ease:'power3.in'},0).to('#wd',{attr:{scale:280},duration:1.3,ease:'power2.in'},0).to('#front,#const',{opacity:0,duration:.8,ease:'power2.in'},.5)
 .add(()=>{front.style.visibility='hidden';document.body.classList.add('lock');$$('.sec').forEach(s=>s.classList.toggle('on',s.id==='sec-'+id));portal.style.display='block';back.style.display='block';portal.scrollTop=0;gsap.set(stone,{clearProps:'transform'});gsap.set('#front',{clearProps:'transform,filter'});gsap.set('#wd',{attr:{scale:0}});cur=id;setShape(ORDER.indexOf(id));setDream(ORDER.indexOf(id));gsap.to(CAM,{p:150,duration:2.4,ease:'power2.inOut'});$('#prev').style.display=$('#next').style.display='grid';gsap.to(NT,{v:1,duration:1.6});gsap.to('#nc',{opacity:1,duration:1.6})})
 .fromTo(portal,{opacity:0,scale:1.15},{opacity:1,scale:1,duration:1,ease:'power3.out'}).fromTo(back,{y:-30,opacity:0},{y:0,opacity:1,duration:.6},'-=.4').fromTo(['#prev','#next'],{opacity:0},{opacity:1,duration:.6},'<').add(()=>busy=false)}
function closePortal(){if(busy||portal.style.display!=='block')return;busy=true;burst(innerWidth/2,innerHeight/2,180);
 gsap.timeline().to([portal,back,'#prev','#next'],{opacity:0,duration:.7,ease:'power2.in'}).add(()=>{portal.style.display='none';back.style.display='none';$('#prev').style.display=$('#next').style.display='none';front.style.visibility='';document.body.classList.remove('lock');scrollTo(0,saved);gsap.to(NT,{v:0,duration:1.6});gsap.to(CAM,{p:0,duration:2,ease:'power2.inOut'});gsap.to('#nc',{opacity:0,duration:1.2})})
 .to('#front,#const',{opacity:1,duration:1}).add(()=>busy=false)}
$$('.archway-portal').forEach(b=>b.addEventListener('click',()=>openPortal(b.dataset.id,b)));
back.addEventListener('click',closePortal);addEventListener('keydown',e=>e.key==='Escape'&&closePortal());

/* ===== NIGHT CONSTELLATIONS: 3D star field that sways side to side; stars light up and link to the cursor ===== */
const nc=$('#nc'),nx=nc.getContext('2d'),NC={spin:0,hue:45},dr=$('#dream'),ST=[...Array(innerWidth<700?85:130)].map(()=>({x:(Math.random()-.5)*2,y:(Math.random()-.5)*1.5,z:(Math.random()-.5)*2,tx:0,ty:0,tz:0,r:1+Math.random()*1.6}));
/* a different constellation shape + colour per archway: sphere, spiral galaxy, torus, lattice cube, wave sheet */
const SH=[(i,n)=>{const y=1-2*i/(n-1),r=Math.sqrt(1-y*y),a=i*2.4;return[Math.cos(a)*r*.9,y*.8,Math.sin(a)*r*.9]},
(i,n)=>{const a=i*.38,r=.08+i/n*.95;return[Math.cos(a)*r,(Math.random()-.5)*.12,Math.sin(a)*r]},
(i,n)=>{const u=i*2.4,w=i*.62,R=.7+.3*Math.cos(w);return[Math.cos(u)*R,.45*Math.sin(w),Math.sin(u)*R]},
(i,n)=>[((i%5)/4-.5)*1.6,((i/5|0)%5/4-.5)*1.3,((i/25|0)%5/4-.5)*1.6],
(i,n)=>{const x=((i%12)/11-.5)*2,z=((i/12|0)/10-.5)*2;return[x,Math.sin(x*4+z*3)*.25,z]}],HUE=[45,190,320,30,140];
function setShape(k){ST.forEach((s,i)=>{const p=SH[k](i,ST.length);s.tx=p[0];s.ty=p[1];s.tz=p[2]});gsap.to(NC,{hue:HUE[k],duration:1.2})}setShape(0);
const nr=()=>{nc.width=innerWidth;nc.height=innerHeight};nr();addEventListener('resize',nr);
(function ncLoop(t){const v=NT.v;dr.style.opacity=v*.9;nx.clearRect(0,0,nc.width,nc.height);
 if(v>.01){const a=Math.sin(t*.0004)*.7+NC.spin,co=Math.cos(a),si=Math.sin(a),f=Math.min(innerWidth,innerHeight*1.4)*.8,cx=innerWidth/2,cy=innerHeight/2;
  const q=ST.map(s=>{s.x+=(s.tx-s.x)*.04;s.y+=(s.ty-s.y)*.04;s.z+=(s.tz-s.z)*.04;const X=s.x*co+s.z*si,Z=-s.x*si+s.z*co,k=1/(2.2-Z);return{x:cx+X*f*k,y:cy+s.y*f*k,k,r:s.r}});
  nx.lineWidth=1;
  q.forEach((p,i)=>{for(let j=i+1;j<q.length;j++){const d=Math.hypot(p.x-q[j].x,p.y-q[j].y);if(d<95){nx.strokeStyle=`hsla(${NC.hue},100%,85%,${(1-d/95)*.45*v})`;nx.beginPath();nx.moveTo(p.x,p.y);nx.lineTo(q[j].x,q[j].y);nx.stroke()}}
   const dm=Math.hypot(p.x-mx,p.y-my),h=dm<140?1-dm/140:0;
   if(h>0){nx.strokeStyle=`rgba(127,233,255,${h*.8*v})`;nx.beginPath();nx.moveTo(p.x,p.y);nx.lineTo(mx,my);nx.stroke()}
   nx.fillStyle=h>0?'#fff':`hsl(${NC.hue},100%,88%)`;nx.shadowColor=`hsl(${NC.hue},100%,70%)`;nx.shadowBlur=6+h*22;nx.globalAlpha=v;nx.beginPath();nx.arc(p.x,p.y,(p.r+h*3.5)*p.k*1.6*(1+.45*Math.sin(t*.005+i*1.7)),0,6.283);nx.fill();nx.globalAlpha=1;nx.shadowBlur=0})}
 requestAnimationFrame(ncLoop)})(0);

/* ===== SECTION-TO-SECTION NAVIGATION (camera pans, constellations swing) ===== */
const ORDER=['skills','values','interests','connect'];let cur='skills';
function go(dir){if(busy||portal.style.display!=='block')return;busy=true;const i=(ORDER.indexOf(cur)+dir+ORDER.length)%ORDER.length,from=$('#sec-'+cur),to=$('#sec-'+ORDER[i]);cur=ORDER[i];setShape(i);setDream(i);
 gsap.to(CAM,{x:dir*38,duration:.8,ease:'power2.inOut',yoyo:true,repeat:1});gsap.to(NC,{spin:NC.spin+dir*1.1,duration:1.6,ease:'power2.inOut'});
 gsap.to(from,{x:-dir*140,opacity:0,duration:.4,onComplete:()=>{from.classList.remove('on');gsap.set(from,{clearProps:'all'});to.classList.add('on');portal.scrollTop=0;gsap.fromTo(to,{x:dir*140,opacity:0},{x:0,opacity:1,duration:.5,clearProps:'all',onComplete:()=>busy=false})}})}
$('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
/* drag the archway row left/right with a mouse (touch and trackpads scroll natively) */
const pr=$('.portals');let dn=false,sx=0,sl=0,dm=0;
pr.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dn=true;sx=e.clientX;sl=pr.scrollLeft;dm=0});
addEventListener('pointermove',e=>{if(dn){dm=Math.abs(e.clientX-sx);pr.scrollLeft=sl-(e.clientX-sx)}});
addEventListener('pointerup',()=>dn=false);
pr.addEventListener('click',e=>{if(dm>6){e.stopPropagation();e.preventDefault();dm=0}},true);
/* auto-slide the archway row side to side; hovering steers it by cursor position, and archways tilt toward the cursor */
let ad=1,hov=false,pos=0;const fine=matchMedia('(pointer:fine)').matches;
pr.addEventListener('pointerenter',e=>hov=e.pointerType!=='touch');pr.addEventListener('pointerleave',()=>hov=false);
(function slide(){if(!dn&&portal.style.display!=='block'){const max=pr.scrollWidth-pr.clientWidth;if(Math.abs(pr.scrollLeft-pos)>2)pos=pr.scrollLeft;
 if(max>0){let v=ad*.9;if(hov){const r=pr.getBoundingClientRect();v=((mx-r.left)/r.width-.5)*8}pos=clamp(pos+v,0,max);pr.scrollLeft=pos;if(!hov){if(pos>=max-1)ad=-1;if(pos<=1)ad=1}}
 if(fine)$$('.arch-stone').forEach(s=>{const r=s.getBoundingClientRect();s.style.rotate=`y ${clamp((mx-(r.left+r.width/2))/400,-1,1)*18}deg`})}
 requestAnimationFrame(slide)})();
/* dark mode toggle (follows system preference first) */
const root=document.documentElement,setTheme=d=>{root.dataset.theme=d?'dark':'light';$('#theme').textContent=d?'☀':'☾';gsap.to(DK,{v:d?1:0,duration:1.2})};
$('#theme').onclick=()=>setTheme(root.dataset.theme!=='dark');setTheme(matchMedia('(prefers-color-scheme:dark)').matches);
/* project carousels: auto-slide side to side on their own; hold and drag with the mouse to take over (touch swipes natively) */
const tracks=$$('.track').map(el=>({el,pos:0,d:1,drag:false,x0:0,s0:0,pause:0}));
tracks.forEach(T=>{const e=T.el;e.addEventListener('pointerdown',ev=>{if(ev.pointerType==='touch')return;T.drag=true;T.x0=ev.clientX;T.s0=e.scrollLeft;e.classList.add('grab');e.setPointerCapture(ev.pointerId)});
 e.addEventListener('pointermove',ev=>{if(T.drag){e.scrollLeft=T.s0-(ev.clientX-T.x0);T.pos=e.scrollLeft}});
 ['pointerup','pointercancel'].forEach(n=>e.addEventListener(n,()=>{T.drag=false;e.classList.remove('grab')}));
 e.addEventListener('touchstart',()=>T.pause=performance.now()+2500,{passive:true})});
(function proj(now){tracks.forEach(T=>{const e=T.el;if(T.drag||now<T.pause||e.offsetParent===null)return;const max=e.scrollWidth-e.clientWidth;if(max<=0)return;if(Math.abs(e.scrollLeft-T.pos)>2)T.pos=e.scrollLeft;T.pos+=T.d*.7;if(T.pos>=max){T.pos=max;T.d=-1}if(T.pos<=0){T.pos=0;T.d=1}e.scrollLeft=T.pos});requestAnimationFrame(proj)})(0);

/* smooth wheel scrolling (mouse wheels only; trackpads and touch already scroll smoothly) */
let st=0,sa=false;
addEventListener('wheel',e=>{if(document.body.classList.contains('lock')||e.ctrlKey||e.deltaMode!==0||Math.abs(e.deltaY)<40||!Number.isInteger(e.deltaY))return;e.preventDefault();if(!sa)st=scrollY;st=clamp(st+e.deltaY,0,document.documentElement.scrollHeight-innerHeight);if(!sa){sa=true;requestAnimationFrame(sstep)}},{passive:false});
function sstep(){const d=st-scrollY;if(Math.abs(d)<1){scrollTo(0,st);sa=false;return}scrollTo(0,scrollY+Math.sign(d)*Math.max(1,Math.abs(d)*.12));requestAnimationFrame(sstep)}
/* ===== LOADING SCREEN + CURTAIN PULL-DOWN ===== */
const loader=$('#loader');
if(window.gsap){const o={p:0};gsap.to(o,{p:100,duration:3.2,ease:'power1.inOut',onUpdate:()=>$('#pct').textContent=Math.round(o.p)+'%',onComplete:()=>
 gsap.timeline().to('.orb,#loader>div:last-child',{opacity:0,duration:.4}).to(loader,{yPercent:100,duration:1.8,ease:'expo.inOut'}).from('.hero>*',{y:50,opacity:0,stagger:.15,duration:1,ease:'power3.out'},'-=.9').add(()=>loader.remove())})}
else loader.remove();
onScroll();
})();
