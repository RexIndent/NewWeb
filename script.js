(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
/* ===== CONTENT: edit this object only ===== */
const DATA={
 me:{name:'Your Name',age:'21',dob:'January 1, 2005',town:'Your Hometown',bio:'I build immersive, playful web experiences where design, motion and code meet. Replace this blurb with your own story.'},
 skills:[{t:'Front-End',i:['HTML5','CSS3','JavaScript']},{t:'Creative Coding',i:['Three.js','WebGL','GSAP']},{t:'UI/UX Design',i:['Figma','Prototyping','Type']},{t:'Back-End',i:['Node.js','REST','SQL']},{t:'Craft & Tools',i:['Git','Testing','Performance']}],
 values:[{t:'Curiosity',p:'Every good thing starts with asking what happens if.'},{t:'Craft',p:'Small details are where people feel the care.'},{t:'Kindness',p:'Great work is built with and for people.'}],
 interests:[{t:'Cozy Games',p:'Flying through glowing skies with friends.'},{t:'Stargazing',p:'Finding patterns in the dark.'},{t:'Photography',p:'Collecting golden-hour light.'}],
 links:[['Email','mailto:you@example.com','✉'],['Facebook','https://www.facebook.com/','f'],['GitHub','https://github.com/','</>'],['TikTok','https://www.tiktok.com/','♪']],
 quote:'Reach for the sky — the stars were always meant to be connected.',
 /* MUSIC (code only): put your own audio path/URL in each src, e.g. 'audio/front.mp3'. Every track loops again when it finishes. Empty = silent. */
 music:[{id:'front',label:'Front page',src:''},{id:'core',label:'The Core (page end)',src:''},{id:'sections',label:'Archway sections',src:''}],
 musicVolume:.6};
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
let sp=0,mx=innerWidth/2,my=innerHeight/2,skyM,dome,stars,spS=0,zq=0,setDream=()=>{};const NT={v:0},DK={v:0},CAM={x:0,p:0},ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)}; // NT.v: 0 = golden hour, 1 = night; CAM.x: sideways camera pan
function initSky(){
 const R=new THREE.WebGLRenderer({canvas:$('#sky'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.25:1.5));
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(60,1,.1,900);S.fog=new THREE.Fog(0xe88a6a,30,300);
 const SUN='normalize(SD)';
 S.add(dome=new THREE.Mesh(new THREE.SphereGeometry(500,32,16),skyM=new THREE.ShaderMaterial({uniforms:{N:{value:0},W:{value:0},LM:{value:1},SS:{value:0},DY:{value:1},SD:{value:new THREE.Vector3(.2,.08,-1)}},side:THREE.BackSide,depthWrite:false,
  vertexShader:'varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`uniform float N,W,LM,SS,DY;uniform vec3 SD;varying vec3 v;void main(){vec3 n=normalize(v);float h=n.y,d=max(dot(n,${SUN}),0.);vec3 lo=mix(mix(vec3(1.,.62,.4),vec3(1.,.36,.28),SS),vec3(.78,.88,1.),DY*(1.-SS)),mi=mix(mix(vec3(.55,.25,.55),vec3(.85,.3,.55),SS),vec3(.4,.62,.95),DY*(1.-SS)),tp=mix(vec3(.07,.05,.25),vec3(.16,.36,.86),DY);vec3 c=mix(lo,mi,smoothstep(0.,.25,h));c=mix(c,tp,smoothstep(.2,.8,h));c+=vec3(1.,.8-.35*SS,.5-.3*SS)*pow(d,60.)*1.2+vec3(1.,.5-.2*SS,.3)*pow(d,6.)*(.35+.4*SS);c=mix(c,mix(mix(vec3(.08,.05,.22),vec3(.005,.01,.05),smoothstep(0.,.6,h)),mix(vec3(.98,.72,.9),vec3(.5,.55,.98),smoothstep(0.,.6,h)),LM),N);c=mix(c,mix(vec3(.1,.45,.5),vec3(.03,.02,.2),smoothstep(-.1,.6,h))+vec3(.15,.05,.2)*smoothstep(.5,0.,abs(h-.1)),W);gl_FragColor=vec4(c,1.);}`})));
 // low-poly land
 const g=new THREE.PlaneGeometry(500,420,70,56);g.rotateX(-Math.PI/2);const pa=g.attributes.position,col=[];
 for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i),y=Math.sin(x*.05)*6+Math.cos(z*.07+x*.02)*5+Math.sin(x*.13+z*.1)*2;pa.setY(i,y);const k=(y+13)/26;col.push(.24+.4*k,.52+.3*k,.5-.07*k)}
 g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();
 const land=new THREE.Mesh(g,new THREE.MeshLambertMaterial({vertexColors:true}));land.position.set(0,-14,-110);S.add(land);
 const hemi=new THREE.HemisphereLight(0xffc89a,0x30205a,.95);S.add(hemi);const dl=new THREE.DirectionalLight(0xffb070,1.1);dl.position.set(20,30,-40);S.add(dl);
 // volumetric-style clouds: clusters of soft sprites
 const cv=document.createElement('canvas');cv.width=cv.height=128;const cc=cv.getContext('2d'),gr=cc.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');cc.fillStyle=gr;cc.fillRect(0,0,128,128);
 const ccv=document.createElement('canvas');ccv.width=ccv.height=256;{const x=ccv.getContext('2d');let g5=x.createRadialGradient(128,150,10,128,150,118);g5.addColorStop(0,'rgba(170,185,220,.9)');g5.addColorStop(1,'rgba(170,185,220,0)');x.fillStyle=g5;x.fillRect(0,0,256,256);g5=x.createRadialGradient(108,100,6,118,112,112);g5.addColorStop(0,'rgba(255,255,255,1)');g5.addColorStop(.55,'rgba(255,255,255,.92)');g5.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g5;x.fillRect(0,0,256,256)} /* billowy puff: blue-grey shaded underside, bright sunlit top */
 const tex=new THREE.CanvasTexture(cv),ctex=new THREE.CanvasTexture(ccv),clouds=[];
 for(let c=0;c<16;c++){const grp=new THREE.Group();
  for(let i=0;i<6;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:ctex,color:new THREE.Color(1,1,1),transparent:true,opacity:.55,depthWrite:false,fog:false}));m.position.set((Math.random()-.5)*50,(Math.random()-.5)*8,(Math.random()-.5)*20);const s=30+Math.random()*30;m.scale.set(s,s*.55,1);grp.add(m)}
  grp.position.set((Math.random()-.5)*500,15+Math.random()*50,-80-Math.random()*220);S.add(grp);clouds.push(grp)}
 // stars
 const sv=[];for(let i=0;i<500;i++){const a=Math.random()*6.283,e=Math.random()*1.2+.2;sv.push(Math.cos(a)*Math.cos(e)*450,Math.sin(e)*450,Math.sin(a)*Math.cos(e)*450)}
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sv,3));const stM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{T:{value:0},O:{value:.7}},vertexShader:'attribute float ph;uniform float T;varying float tw;void main(){tw=.5+.5*sin(T*3.+ph*40.);gl_PointSize=1.5+3.5*tw;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z=gl_Position.w;}',fragmentShader:'uniform float O;varying float tw;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.95,.8,O*(.3+.7*tw)*(1.-d*2.));}'});
 sg.setAttribute('ph',new THREE.Float32BufferAttribute(Array.from({length:500},Math.random),1));S.add(stars=new THREE.Points(sg,stM));
 // winged child silhouettes
 /* TEXTURES for the Children of Light: coarse woven cloth with relief, tunics with embroidered zigzag hems in the child's colour, capes with fabric folds, a diamond lattice and white star marks, skin, a painted face, keys and drum leather */
 const tcache={},TX=(key,w,h,draw,raw)=>tcache[key]||(tcache[key]=(()=>{let c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);if(!raw){const t3=document.createElement('canvas');t3.width=w*3;t3.height=h*3;const tx=t3.getContext('2d');if('filter' in tx){const t4=document.createElement('canvas');t4.width=w*3;t4.height=h*3;const x4=t4.getContext('2d');for(let i=0;i<3;i++)for(let j=0;j<3;j++)x4.drawImage(c,i*w,j*h);tx.filter='blur(1.1px)';tx.drawImage(t4,0,0);const o=document.createElement('canvas');o.width=w;o.height=h;o.getContext('2d').drawImage(t3,-w,-h);c=o}} /* tiles are blurred 3x3 so edges stay seamless and every child texture is soft */
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=Math.min(4,R.capabilities.getMaxAnisotropy());return t})()),hx=c=>'#'+new THREE.Color(c).getHexString();
 const wrapDraw=(w,h,fn)=>{for(const ox of[-w,0,w])for(const oy of[-h,0,h])fn(ox,oy)};
 const speck=(x,w,h,n)=>{for(let i=0;i<n;i++){const px=Math.random()*w,py=Math.random()*h,r=1+Math.random()*2.2;x.fillStyle=Math.random()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)';x.beginPath();x.arc(px,py,r,0,6.283);x.fill()}};
 const blotch=(x,w,h,n,a)=>{for(let i=0;i<n;i++){const px=Math.random()*w,py=Math.random()*h,r=14+Math.random()*30,c0=Math.random()<.5?'255,255,255':'0,0,0';wrapDraw(w,h,(ox,oy)=>{const g=x.createRadialGradient(px+ox,py+oy,0,px+ox,py+oy,r);g.addColorStop(0,'rgba('+c0+','+a+')');g.addColorStop(1,'rgba('+c0+',0)');x.fillStyle=g;x.fillRect(px+ox-r,py+oy-r,r*2,r*2)})}};
 const fibers=(x,w,h,n)=>{x.lineWidth=1;for(let i=0;i<n;i++){const px=Math.random()*w,py=Math.random()*h,len=6+Math.random()*14;x.strokeStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)';x.beginPath();x.moveTo(px,py);x.lineTo(px+(Math.random()-.5)*4,py+len);x.stroke()}};
 const shade=(x,w,h,a)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(.5,'rgba(255,255,255,'+a*.5+')');g.addColorStop(1,'rgba(0,0,0,'+a+')');x.fillStyle=g;x.fillRect(0,0,w,h)};
 /* soft painted cloth: cloudy blotches and loose fibres, no regular grid lines that could read as polygon outlines */
 const clothTex=c=>TX('cloth'+c,128,128,(x,w,h)=>{x.fillStyle=hx(c);x.fillRect(0,0,w,h);blotch(x,w,h,26,.08);fibers(x,w,h,350);speck(x,w,h,200);shade(x,w,h,.2)});
 const tunicTex=c=>TX('tunic'+c,128,128,(x,w,h)=>{x.fillStyle='#f4eddc';x.fillRect(0,0,w,h);blotch(x,w,h,26,.08);fibers(x,w,h,350);const col=hx(c);x.strokeStyle=col;x.lineCap='round';x.shadowColor=col;x.shadowBlur=3;x.lineWidth=7;x.beginPath();for(let i=0;i<=w;i+=4){const yy=h*.88+Math.sin(i/w*Math.PI*8)*5;i?x.lineTo(i,yy):x.moveTo(i,yy)}x.stroke();x.lineWidth=5;x.globalAlpha=.8;x.beginPath();x.moveTo(0,h*.07);x.lineTo(w,h*.07);x.stroke();x.globalAlpha=1;x.shadowBlur=0;x.fillStyle='rgba(255,255,255,.9)';for(let i=8;i<w;i+=16){x.beginPath();x.arc(i,h*.88+Math.sin(i/w*Math.PI*8)*5,2,0,6.283);x.fill()}speck(x,w,h,150);shade(x,w,h,.2)});
 const skinTex=()=>TX('skin',64,64,(x,w,h)=>{x.fillStyle='#5e3a28';x.fillRect(0,0,w,h);speck(x,w,h,200);shade(x,w,h,.2)});
 const faceTex=()=>TX('face',256,128,(x,w,h)=>{x.fillStyle='#5e3a28';x.fillRect(0,0,w,h);speck(x,w,h,400);[-1,1].forEach(sd=>{const ex=w*.25+sd*w*.035,ey=h*.52;x.fillStyle='rgba(190,90,80,.25)';x.beginPath();x.ellipse(ex+sd*8,ey+16,11,6,0,0,6.283);x.fill();x.fillStyle='#1b0f0a';x.beginPath();x.ellipse(ex,ey,6,9,0,0,6.283);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(ex-1.5,ey-3,2,0,6.283);x.fill()});x.strokeStyle='#2a140c';x.lineWidth=2.5;x.beginPath();x.arc(w*.25,h*.66,6,.2,2.9);x.stroke()});
 const capeTex=(c,t)=>TX('cape'+c+'_'+t,128,256,(x,w,h)=>{const col=new THREE.Color(c),tc=new THREE.Color(t==null?0xffffff:t),g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,hx(col.clone().multiplyScalar(.78)));g.addColorStop(1,hx(col.clone().lerp(new THREE.Color(1,1,1),.4)));x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let i=0;i<8;i++){const a=x.createLinearGradient(i*w/8,0,(i+1)*w/8,0);a.addColorStop(0,'rgba(0,0,0,.12)');a.addColorStop(.5,'rgba(255,255,255,.08)');a.addColorStop(1,'rgba(0,0,0,.12)');x.fillStyle=a;x.fillRect(i*w/8,0,w/8,h)}
  blotch(x,w,h,30,.07);fibers(x,w,h,500);const rgb=Math.round(tc.r*255)+','+Math.round(tc.g*255)+','+Math.round(tc.b*255),hg=x.createLinearGradient(0,h*.84,0,h);hg.addColorStop(0,'rgba('+rgb+',0)');hg.addColorStop(.7,'rgba('+rgb+',.95)');hg.addColorStop(1,'rgba('+rgb+',1)');x.fillStyle=hg;x.fillRect(0,h*.84,w,h*.16);
  x.fillStyle='rgba(255,255,255,.97)';x.shadowColor='#fff';x.shadowBlur=8;[[.3,.18,12],[.55,.3,10],[.4,.44,8]].forEach(([a,b,r])=>{const cx=w*a,cy=h*b;x.beginPath();for(let k=0;k<8;k++){const rr=k%2?r*.3:r,an=k*Math.PI/4;x.lineTo(cx+Math.cos(an)*rr,cy+Math.sin(an)*rr)}x.closePath();x.fill()});x.shadowBlur=0;x.globalCompositeOperation='destination-in';const mh=x.createLinearGradient(0,0,w,0);mh.addColorStop(0,'rgba(0,0,0,0)');mh.addColorStop(.07,'rgba(0,0,0,1)');mh.addColorStop(.93,'rgba(0,0,0,1)');mh.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=mh;x.fillRect(0,0,w,h);const mv=x.createLinearGradient(0,h*.9,0,h);mv.addColorStop(0,'rgba(0,0,0,1)');mv.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=mv;x.fillRect(0,0,w,h);x.globalCompositeOperation='source-over'});
 const keysTex=()=>TX('keys',128,64,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#aab';for(let i=0;i<=w;i+=w/10)x.fillRect(i,0,1.5,h);x.fillStyle='#111';for(let i=0;i<10;i++)if(i%7!==2&&i%7!==6)x.fillRect(i*w/10+w/10*.65,0,w/10*.55,h*.6)});
 const drumTex=()=>TX('drum',128,128,(x,w,h)=>{x.fillStyle='#b8733f';x.fillRect(0,0,w,h);blotch(x,w,h,20,.1);const g=x.createRadialGradient(64,64,4,64,64,64);g.addColorStop(0,'rgba(255,230,190,.3)');g.addColorStop(1,'rgba(40,20,5,.25)');x.fillStyle=g;x.fillRect(0,0,w,h)});
 const lathe=(pts,seg)=>new THREE.LatheGeometry(new THREE.SplineCurve(pts.map(p=>new THREE.Vector2(p[0],p[1]))).getPoints(28),seg||24);
 const capeG=(w0,w1,len)=>{const pos=[],uv=[],idx=[],seg=30,rows=26;for(let j=0;j<=rows;j++){const v=j/rows,w=w0+(w1-w0)*Math.pow(v,.8);for(let i=0;i<=seg;i++){const u=i/seg*2-1,sc=Math.abs(Math.sin(u*Math.PI*3))*.14*Math.pow(v,6);pos.push(u*w,-len*v-sc*len*.2,u*u*.2*v+Math.sin(u*Math.PI*2.5+v*2)*.05*v);uv.push((u+1)/2,1-v)}}for(let j=0;j<rows;j++)for(let i=0;i<seg;i++){const a=j*(seg+1)+i,c=a+seg+1;idx.push(a,c,a+1,a+1,c,c+1)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();g.userData={rest:Float32Array.from(pos),len};return g};
 /* cloth motion: travelling waves down the fabric, pinned at the shoulders; no rigid swinging */
 const flutter=(m,t,amp,ph)=>{const gd2=m.geometry,p=gd2.attributes.position,r=gd2.userData.rest,L=gd2.userData.len;for(let i=0;i<p.count;i++){const x=r[i*3],y=r[i*3+1],z=r[i*3+2],v=Math.min(1,-y/L),w=Math.pow(v,1.4)*amp,a=Math.sin(t*2.1-v*3.4+ph),b=Math.sin(t*3.3+x*2.2-v*4.8+ph*1.7);p.setXYZ(i,x+b*.05*w,y+(1-Math.cos(a*.5))*.03*w,z+(a*.5+b*.28)*w*.55)}p.needsUpdate=true;gd2.computeVertexNormals()};
 const shapeUV=g=>{const p=g.attributes.position,u=[];for(let i=0;i<p.count;i++)u.push((p.getX(i)+1.05)/2.1,(p.getY(i)+1.95)/1.95);g.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));return g};
 const KV=[{cape:0xd8232a,trim:0xffffff,hair:'bun',inst:'none',h:1,belt:0xd9c9a3},{cape:0xf08a2c,trim:0xfff3dc,hair:'twin',inst:'keys',h:1.06,belt:0x8a5a3a},{cape:0x2fb3a5,trim:0xe9fffb,hair:'tail',inst:'lantern',h:.94,belt:0x1f6f7a},{cape:0x8a55d8,trim:0xf3eaff,hair:'twin',inst:'drum',h:1.02,belt:0xc9a3ff},{cape:0xe86aa6,trim:0xffffff,hair:'hood',inst:'none',h:.98,belt:0xffd1e6}],cream2=new THREE.MeshBasicMaterial({map:clothTex(0xf4eddc)}),skin2=new THREE.MeshBasicMaterial({map:faceTex()}),dark=new THREE.MeshBasicMaterial({color:0x1b1038}),wm=new THREE.MeshBasicMaterial({color:0xffe2a8,side:THREE.DoubleSide,transparent:true,opacity:.92}),flyers=[];
 const wgeo=(()=>{const sh=new THREE.Shape();sh.moveTo(0,.3);sh.bezierCurveTo(-1,1.15,-2.3,1.3,-3,.8);sh.bezierCurveTo(-2.9,.2,-2.6,-.4,-2.2,-.9);sh.quadraticCurveTo(-1.7,-.6,-1.3,-1.1);sh.quadraticCurveTo(-.9,-.7,-.4,-.9);sh.lineTo(0,-.2);sh.closePath();const g=new THREE.ShapeGeometry(sh,18),p=g.attributes.position,u=[];for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);u.push((x+3)/3.1,(y+1.2)/2.6);p.setXYZ(i,x,-Math.abs(x)*.07+Math.sin(y*2)*.05,y)}g.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));g.computeVertexNormals();return g})(); /* smooth feather-shaped wing */
 for(let i=0;i<6;i++){const f=new THREE.Group(),b=new THREE.Mesh(lathe([[.01,.8],[.12,.65],[.3,.3],[.35,-.1],[.3,-.55],[.01,-.8]],20),cream2);b.rotation.x=Math.PI/2;const h=new THREE.Mesh(new THREE.SphereGeometry(.34,20,14),skin2);h.position.z=-1;h.rotation.y=Math.PI;
  const wmi=new THREE.MeshBasicMaterial({map:capeTex(KV[i%5].cape),side:THREE.DoubleSide,transparent:true,opacity:.95}),L=new THREE.Mesh(wgeo,wmi),Rw=new THREE.Mesh(wgeo,wmi);Rw.scale.x=-1;
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffd48a,transparent:true,opacity:.8,depthWrite:false,fog:false}));glow.scale.set(5,5,1);
  f.add(b,h,L,Rw,glow);addDetail(f,L,Rw,KV[i%5]);const dir=i%2?1:-1;f.userData={dir,sp:6+Math.random()*5,L,Rw,y:8+Math.random()*22,ph:Math.random()*6};f.rotation.y=-dir*Math.PI/2;f.scale.setScalar(2);f.position.set((Math.random()-.5)*400,f.userData.y,-28-Math.random()*60);S.add(f);flyers.push(f)}
 /* DETAILED FLYERS: layered feather wings, flowing cape, hair, halo, arms, trailing legs and a sparkle trail */
 function addDetail(f,L,Rw,v){const B=c=>new THREE.MeshBasicMaterial({color:c,map:clothTex(0xffffff),side:THREE.DoubleSide,transparent:true,opacity:.85});
  [[.78,0xffffff,-.1],[.55,0xfff3dc,-.17]].forEach(([s,c,y])=>[L,Rw].forEach(w=>{const m=new THREE.Mesh(wgeo,B(c));m.scale.set(s,1,s);m.position.y=y;w.add(m)}));
  const cape=new THREE.Mesh(capeG(.45,.95,1.9),new THREE.MeshBasicMaterial({map:capeTex(v.cape,v.trim),side:THREE.DoubleSide,transparent:true,depthWrite:false}));cape.rotation.x=-1.3;cape.position.set(0,.05,.45);f.add(cape);f.cape=cape;
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.44,18,14),new THREE.MeshBasicMaterial({map:clothTex(0xffffff)}));hair.position.set(0,.1,-1);hair.rotation.x=-.3;f.add(hair);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(.22,14,10),new THREE.MeshBasicMaterial({map:clothTex(0xffffff)}));halo.position.set(0,.55,-1);f.add(halo);
  [-.4,.4].forEach(x=>{const a=new THREE.Mesh(lathe([[.01,.45],[.07,.4],[.075,0],[.06,-.38],[.01,-.46]],10),new THREE.MeshBasicMaterial({map:clothTex(0xf4eddc)}));a.rotation.x=1.2;a.position.set(x,-.15,-.6);f.add(a);const l=a.clone();l.position.set(x*.5,-.1,.95);l.rotation.x=-1.4;f.add(l)});
  for(let i=1;i<=3;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffe3a0,transparent:true,opacity:.5-i*.07,depthWrite:false,fog:false}));sp.scale.set(2.6-i*.3,2.6-i*.3,1);sp.position.z=1+i*1.4;f.add(sp)}}
 /* GREEN SCENERY: low-poly pine trees on the hills */
 const trees=[],hgt=(x,z)=>-14+Math.sin(x*.05)*6+Math.cos((z+110)*.07+x*.02)*5+Math.sin(x*.13+(z+110)*.1)*2;
 {const barkTex=TX('bark',128,256,(x,w,h)=>{x.fillStyle='#8a5a35';x.fillRect(0,0,w,h);for(let i=0;i<90;i++){const px=Math.random()*w,py=Math.random()*h,len=30+Math.random()*80,c=Math.random()<.6?'rgba(50,25,10,.55)':'rgba(220,160,100,.35)',lw=1+Math.random()*1.6;wrapDraw(w,h,(ox,oy)=>{x.strokeStyle=c;x.lineWidth=lw;x.beginPath();x.moveTo(px+ox,py+oy);x.bezierCurveTo(px+ox+4,py+oy+len*.3,px+ox-4,py+oy+len*.6,px+ox+2,py+oy+len);x.stroke()})}for(let i=0;i<70;i++){const px=Math.random()*w,py=Math.random()*h;wrapDraw(w,h,(ox,oy)=>{x.strokeStyle='rgba(40,20,8,.4)';x.lineWidth=1;x.beginPath();x.moveTo(px+ox,py+oy);x.lineTo(px+ox+9,py+oy+3);x.stroke()})}},true);
 /* foliage pads like the photo: clusters of jagged inked leaves in layered greens with ink hatching */
 const leafTex=TX('leaf',256,256,(x,w,h)=>{x.fillStyle='#2c6233';x.fillRect(0,0,w,h);const cols=['#2f7a36','#4a9645','#3b8540','#6ab04f','#25562c'];for(let i=0;i<260;i++){const px=Math.random()*w,py=Math.random()*h,r=9+Math.random()*9,an=Math.random()*6.283,c=cols[Math.random()*5|0];wrapDraw(w,h,(ox,oy)=>{x.save();x.translate(px+ox,py+oy);x.rotate(an);x.beginPath();for(let k=0;k<=12;k++){const t=k/12*Math.PI,sr=k%2?.7:1;x.lineTo(Math.cos(t)*r*1.4*sr,Math.sin(t)*r*.5*sr)}for(let k=12;k>=0;k--){const t=k/12*Math.PI,sr=k%2?.7:1;x.lineTo(Math.cos(t)*r*1.4*sr,-Math.sin(t)*r*.5*sr)}x.closePath();x.fillStyle=c;x.fill();x.strokeStyle='#12301a';x.lineWidth=1.3;x.stroke();x.restore()})}for(let i=0;i<120;i++){const px=Math.random()*w,py=Math.random()*h;wrapDraw(w,h,(ox,oy)=>{x.strokeStyle='rgba(10,40,20,.35)';x.lineWidth=1;x.beginPath();x.moveTo(px+ox,py+oy);x.lineTo(px+ox+10,py+oy+6);x.moveTo(px+ox+3,py+oy-2);x.lineTo(px+ox+12,py+oy+4);x.stroke()})}},true);
 barkTex.repeat.set(2,3);leafTex.repeat.set(3,2);
 const trunkC=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(.7,2.2,.2),new THREE.Vector3(-.5,4.2,-.3),new THREE.Vector3(.4,5.8,.3)]),trunkG=new THREE.TubeGeometry(trunkC,24,.5,12,false),padG=new THREE.SphereGeometry(1,22,14),barkM=new THREE.MeshLambertMaterial({map:barkTex}),leafM=new THREE.MeshLambertMaterial({map:leafTex}),pads=[[0,6.6,0,3.2,1.2,3],[-2.4,5.2,.9,2.5,.95,2.4],[2.6,5.6,-.7,2.3,.95,2.2],[.2,8,-.2,1.9,.85,1.8]];
  for(let i=0;i<30;i++){const x=(Math.random()-.5)*300,z=-16-Math.random()*160,g=new THREE.Group();g.add(new THREE.Mesh(trunkG,barkM));pads.forEach(p=>{const m=new THREE.Mesh(padG,leafM);m.position.set(p[0],p[1],p[2]);m.scale.set(p[3],p[4],p[5]);g.add(m)});g.rotation.y=Math.random()*6.28;g.position.set(x,hgt(x,z)-.3,z);g.scale.setScalar(.9+Math.random()*1.1);S.add(g);trees.push(g)}}
 /* WALKING CHILDREN OF LIGHT: game-style characters with head, hair, eyes, belt, cape, swinging arms/legs and a glowing lantern */
 function mkKid(v){const g=new THREE.Group(),M=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:8,specular:0x333333},o)),cream=M(0xffffff,{map:clothTex(0xf4eddc),bumpMap:clothTex(0xf4eddc),bumpScale:.8}),white=M(0xffffff,{map:clothTex(0xffffff),bumpMap:clothTex(0xffffff),bumpScale:.8,emissive:0x555555}),skin=M(0xffffff,{map:skinTex()}),faceM=M(0xffffff,{map:faceTex()}),capeM=M(0xffffff,{map:capeTex(v.cape,v.trim),bumpMap:capeTex(v.cape,v.trim),bumpScale:.8,side:THREE.DoubleSide,transparent:true,depthWrite:false,emissive:new THREE.Color(v.cape).multiplyScalar(.18)}),tunicM=M(0xffffff,{map:tunicTex(v.cape),bumpMap:clothTex(0xf4eddc),bumpScale:.8}),dk=M(0x2b1b44),gold=new THREE.MeshBasicMaterial({color:0xffe9a0});
  /* every part is a smooth curved surface (lathed profiles, high-resolution spheres, a gridded flowing cape): no visible facets */
  const piv=(x,y,z)=>{const p=new THREE.Group();p.position.set(x,y,z);g.add(p);return p};
  const limb=(x,y,len,mat,hand)=>{const p=piv(x,y,0);p.add(new THREE.Mesh(lathe([[.01,.1],[.1,.07],[.14,0],[.135,-len*.5],[.115,-len*.92],[.07,-len-.05],[.01,-len-.08]],18),mat));if(hand){const h=new THREE.Mesh(new THREE.SphereGeometry(.15,14,12),skin);h.position.y=-len-.03;p.add(h)}return p};
  const body=new THREE.Mesh(lathe([[.54,-.62],[.47,-.35],[.37,.1],[.4,.46],[.22,.62]],28),tunicM);body.position.y=1.45;g.add(body);
  const belt=new THREE.Mesh(new THREE.TorusGeometry(.47,.06,12,32),M(v.belt));belt.rotation.x=1.57;belt.position.y=1.15;g.add(belt);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.42,28,20),faceM);head.position.y=2.5;g.add(head);
  const hood=new THREE.Mesh(new THREE.SphereGeometry(.5,28,18,0,6.283,0,2.2),white);hood.position.set(0,2.55,-.1);hood.rotation.x=-.25;g.add(hood);
  if(v.hair==='bun'){const b=new THREE.Mesh(new THREE.SphereGeometry(.28,16,12),white);b.position.set(0,3.1,-.05);g.add(b)}
  else if(v.hair==='twin'){[-1,1].forEach(sd=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.24,16,12),white);b.position.set(sd*.34,3.0,-.08);g.add(b)})}
  else if(v.hair==='tail'){const tl=new THREE.Mesh(lathe([[.01,.5],[.1,.35],[.18,0],[.12,-.35],[.01,-.55]],16),white);tl.position.set(0,2.55,-.65);tl.rotation.x=-1.15;g.add(tl)}
  [-.16,.16].forEach(x=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),dk);e.position.set(x,2.52,.38);g.add(e)});
  const capeP=piv(0,2.05,-.38),cape=new THREE.Mesh(capeG(.4,1,1.7),capeM);capeP.add(cape);
  const armL=limb(-.55,2,.95,cream,true),armR=limb(.55,2,.95,cream,true),legL=limb(-.22,.85,.85,cream),legR=limb(.22,.85,.85,cream);
  [legL,legR].forEach(l=>{const ft=new THREE.Mesh(new THREE.SphereGeometry(.15,14,12),skin);ft.scale.set(1.1,.6,1.9);ft.position.set(0,-.9,.12);l.add(ft)}); /* bare feet */
  if(v.inst==='keys'){const kb=new THREE.Group(),bx=new THREE.Mesh(new THREE.BoxGeometry(1.05,.3,.5),M(0x2e5fb8)),ks=new THREE.Mesh(new THREE.BoxGeometry(.9,.04,.3),M(0xffffff,{map:keysTex()}));ks.position.set(0,.17,.03);kb.add(bx,ks);kb.position.set(0,1.95,-.66);kb.rotation.x=.35;g.add(kb)}
  else if(v.inst==='drum'){const dr=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.3,32),M(0xffffff,{map:drumTex()}));dr.rotation.x=1.5708;dr.position.set(0,1.9,-.68);g.add(dr)}
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xffe0a0,transparent:true,opacity:.8,depthWrite:false,fog:false}));glow.scale.set(5,5,1);glow.position.set(0,-1,.1);
  if(v.inst==='lantern'){const lamp=new THREE.Mesh(new THREE.SphereGeometry(.16,14,12),gold);lamp.position.set(0,-1,.1);armR.add(lamp,glow)}else glow.visible=false;
  g.userData={body,cape:capeP,capeMesh:cape,armL,armR,legL,legR,glow};return g}
 function stepKid(w,t,dt,wi=0){const u=w.userData;w.position.x+=u.dir*u.sp*dt;if(Math.abs(w.position.x)>35+Math.abs(w.position.z)*.75){u.dir*=-1;u.ry=u.dir>0?1.5708:-1.5708}
  w.rotation.y+=(u.ry-w.rotation.y)*Math.min(1,dt*4);w.position.z=u.z+Math.sin(t*.2+u.ph)*4;const ph=t*u.sp*2.2+u.ph,sw=Math.sin(ph);
  w.position.y=hgt(w.position.x,w.position.z)+Math.abs(sw)*.2;u.legL.rotation.x=sw*.7;u.legR.rotation.x=-sw*.7;u.armL.rotation.x=-sw*.6;
  u.armR.rotation.x=Math.sin(t*.25+u.ph)>.93?-2.5+Math.sin(t*9)*.35:sw*.35-.4; /* now and then a child waves hello */
  u.cape.rotation.x=.32+wi*.3+Math.sin(t*1.3+u.ph)*.05;if(!under)flutter(u.capeMesh,t,1+wi*1.6+u.sp*.12,u.ph);u.glow.material.opacity=.65+Math.sin(t*4+u.ph)*.2}
 const walkers=[...Array(5)].map((_,i)=>{const k=mkKid(KV[i]),dir=i%2?1:-1;Object.assign(k.userData,{dir,ry:dir>0?1.5708:-1.5708,sp:3+Math.random()*2,ph:Math.random()*6,z:-16-i*9-Math.random()*4});k.scale.setScalar(2.8*KV[i].h);k.position.set((Math.random()-.5)*60,0,k.userData.z);k.rotation.y=k.userData.ry;S.add(k);return k});
 /* ATMOSPHERE: drifting ground mist, wind-blown leaves, extra cloud layers */
 const cloudAt=(x,y,z,s0)=>{const grp=new THREE.Group();for(let i=0;i<7;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:new THREE.Color().setHSL(.05+Math.random()*.1,.6,.82),transparent:true,opacity:.55,depthWrite:false,fog:false}));m.position.set((Math.random()-.5)*60,(Math.random()-.5)*8,(Math.random()-.5)*30);const s=s0*(.8+Math.random()*.6);m.scale.set(s,s*.5,1);grp.add(m)}grp.position.set(x,y,z);S.add(grp);clouds.push(grp);return grp};
 /* (the old cloud floor is gone: scrolling now digs down through the ground) */
 const mist=[...Array(10)].map(()=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xf0b08a,transparent:true,opacity:.28,depthWrite:false,fog:false})),s=70+Math.random()*60;m.scale.set(s,s*.28,1);m.position.set((Math.random()-.5)*300,-6+Math.random()*10,-25-Math.random()*150);m.userData.s=3+Math.random()*3;S.add(m);return m});
 /* WONDER WORLD: light mode = rainbow, drifting pink petals, pastel dream skies. dark mode = glowing moon, fireflies, luminous mushrooms and a night aurora */
 
 const mc=document.createElement('canvas');mc.width=mc.height=256;{const x=mc.getContext('2d'),g3=x.createRadialGradient(128,128,40,128,128,128);g3.addColorStop(0,'rgba(255,250,225,1)');g3.addColorStop(.38,'rgba(255,245,210,.95)');g3.addColorStop(.4,'rgba(255,240,200,.35)');g3.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g3;x.fillRect(0,0,256,256);x.fillStyle='rgba(190,180,160,.35)';[[105,105,14],[145,120,10],[120,150,12],[150,150,7]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,6.283);x.fill()})}
 const moon=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(mc),transparent:true,opacity:0,depthWrite:false,fog:false}));moon.scale.set(80,80,1);moon.position.set(-95,85,-300);S.add(moon);
 const ffp=[],ffph=[];for(let i=0;i<180;i++){const x=(Math.random()-.5)*200,z=-8-Math.random()*90;ffp.push(x,hgt(x,z)+1.5+Math.random()*9,z);ffph.push(Math.random())}
 const ffg=new THREE.BufferGeometry();ffg.setAttribute('position',new THREE.Float32BufferAttribute(ffp,3));ffg.setAttribute('ph',new THREE.Float32BufferAttribute(ffph,1));
 const ffm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{T:{value:0},O:{value:0}},vertexShader:'attribute float ph;uniform float T;varying float tw;void main(){vec3 p=position;p.x+=sin(T*.5+ph*20.)*4.;p.y+=sin(T*.8+ph*30.)*2.;p.z+=cos(T*.4+ph*10.)*4.;tw=.5+.5*sin(T*2.5+ph*40.);gl_PointSize=4.+6.*tw;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',fragmentShader:'uniform float O;varying float tw;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.8,1.,.4,(1.-d*2.)*tw*O);}'});
 const fireflies=new THREE.Points(ffg,ffm);fireflies.frustumCulled=false;S.add(fireflies);
 const mush=[...Array(22)].map((_,i)=>{const gr2=new THREE.Group(),col=new THREE.Color().setHSL(i%2?.52:.85,.8,.6),cap=new THREE.Mesh(new THREE.SphereGeometry(1.2,10,6,0,6.283,0,1.57),new THREE.MeshBasicMaterial({color:col,fog:false})),st=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,1.3,6),new THREE.MeshBasicMaterial({color:0xf5ecff,fog:false})),gl=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:col,transparent:true,opacity:0,depthWrite:false,fog:false}));
  cap.position.y=1.3;st.position.y=.65;gl.scale.set(7,7,1);gl.position.y=1.4;gr2.add(st,cap,gl);const x=(Math.random()-.5)*190,z=-10-Math.random()*70;gr2.position.set(x,hgt(x,z),z);gr2.scale.setScalar(.9+Math.random()*1.4);gr2.userData={gl,ph:Math.random()*6};S.add(gr2);return gr2});
 const auroraMat=(H,k)=>new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{T:{value:0},H:{value:H},A:{value:0}},
  vertexShader:`varying vec2 u;uniform float T;void main(){u=uv;vec3 p=position;float w=sin(u.x*6.283*5.+T*.8+${k}.*2.)*18.+sin(u.x*6.283*11.-T*.5)*8.;p.xz+=normalize(p.xz)*w;p.y+=sin(u.x*6.283*7.+T*.6+${k}.)*10.*u.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
  fragmentShader:`varying vec2 u;uniform float H,A,T;void main(){float g=u.x*6.283;float r=.55+.45*sin(g*40.+T*1.2)*sin(g*13.-T*.6);float d=abs(g-3.14159-(${k}.-.5)*.7);float cov=1.-smoothstep(.35,1.15,d+.25*sin(g*9.+T*.25));float a=smoothstep(0.,.12,u.y)*pow(1.-u.y,2.)*(.3+.8*r)*cov*A*.5;vec3 c=.5+.5*cos(6.283*(H+vec3(0.,.12,.26)+u.y*.18));c=mix(c,vec3(1.),pow(1.-u.y,6.)*.12);gl_FragColor=vec4(c,a);}`});
 const moonDir=new THREE.Vector3();
 /* VISIBLE WIND: long air streaks that appear in gusts, plus 700 grass tufts that lean and ripple */
 const wc=document.createElement('canvas');wc.width=128;wc.height=8;{const x=wc.getContext('2d'),gg=x.createLinearGradient(0,0,128,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,'rgba(255,255,255,.9)');gg.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gg;x.fillRect(0,2,128,4)}
 const wtex=new THREE.CanvasTexture(wc),streaks=[...Array(46)].map(()=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(10+Math.random()*18,.35),new THREE.MeshBasicMaterial({map:wtex,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,side:THREE.DoubleSide}));m.userData={k:.6+Math.random()*.9,ph:Math.random()*6};m.position.set((Math.random()-.5)*280,-2+Math.random()*36,-3-Math.random()*75);S.add(m);return m});
 const bladeTex=TX('blade',128,256,(x,w,h)=>{for(let k=0;k<6;k++){const bx=w*(.12+.15*k)+(Math.random()-.5)*8,bw=7+Math.random()*5,bh=h*(.55+Math.random()*.4),lean=(Math.random()-.5)*26,g=x.createLinearGradient(0,h,0,h-bh);g.addColorStop(0,'#2f6b34');g.addColorStop(.5,'#6fae4a');g.addColorStop(1,'#d9e98a');x.fillStyle=g;x.beginPath();x.moveTo(bx-bw,h);x.quadraticCurveTo(bx-bw*.5+lean*.4,h-bh*.55,bx+lean,h-bh);x.quadraticCurveTo(bx+bw*.5+lean*.4,h-bh*.55,bx+bw,h);x.closePath();x.fill();x.strokeStyle='rgba(30,70,30,.25)';x.lineWidth=1;x.beginPath();x.moveTo(bx,h);x.quadraticCurveTo(bx+lean*.3,h-bh*.55,bx+lean,h-bh);x.stroke()}},true);
 /* painterly ground: loose brush strokes of light and shadow green over the hills (multiplies the hill colours) */
 const groundTex=TX('ground',256,256,(x,w,h)=>{x.fillStyle='#e8f0dc';x.fillRect(0,0,w,h);x.lineCap='round';for(let i=0;i<900;i++){const px=Math.random()*w,py=Math.random()*h,len=6+Math.random()*12,an=-1.57+(Math.random()-.5)*.9,l=Math.random(),lw=1+Math.random()*2,c=l<.4?'rgba(60,110,50,.18)':l<.75?'rgba(255,255,200,.22)':'rgba(40,90,60,.14)';wrapDraw(w,h,(ox,oy)=>{x.strokeStyle=c;x.lineWidth=lw;x.beginPath();x.moveTo(px+ox,py+oy);x.lineTo(px+ox+Math.cos(an)*len,py+oy+Math.sin(an)*len);x.stroke()})}},true);
 groundTex.repeat.set(70,58);land.material.map=groundTex;land.material.needsUpdate=true;
 const softDot=TX('dot',64,64,(x,w,h)=>{const g=x.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.55,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64)},true);
 const GN=1300,BLG=(()=>{const g=new THREE.PlaneGeometry(1.6,3.2);g.translate(0,1.6,0);return g})(); /* painted tapered blade clumps with soft gradients */
 const grass=new THREE.InstancedMesh(BLG,new THREE.MeshLambertMaterial({map:bladeTex,alphaTest:.35,side:THREE.DoubleSide}),GN),gd=new THREE.Object3D(),gp=[...Array(GN)].map(()=>{const x=(Math.random()-.5)*260,z=-9-Math.pow(Math.random(),1.4)*110;return{x,z,y:hgt(x,z)-.3,ph:Math.random()*6,s:.8+Math.random()*.7+Math.abs(z)*.012,ry:Math.random()*3.14}});grass.frustumCulled=false;S.add(grass);
 /* flowers (yellow dots, pink drifts) and a pale winding path */
 const FN=900,flMat=new THREE.MeshBasicMaterial({map:softDot,transparent:true,depthWrite:false,side:THREE.DoubleSide}),flowers=new THREE.InstancedMesh(new THREE.CircleGeometry(.55,8),flMat,FN),fd=new THREE.Object3D(),fcol=new THREE.Color();
 for(let i=0;i<FN;i++){const pink=i<260,x=pink?[-60,-25,20,55,85][i%5]+(Math.random()-.5)*30:(Math.random()-.5)*260,z=pink?[-40,-75,-55,-90,-35][i%5]+(Math.random()-.5)*16:-8-Math.pow(Math.random(),1.3)*115;
  fd.position.set(x,hgt(x,z)+.8,z);fd.scale.setScalar(pink?.8+Math.random()*.4:.9+Math.random()*.7);fd.updateMatrix();flowers.setMatrixAt(i,fd.matrix);flowers.setColorAt(i,fcol.set(pink?(Math.random()<.5?0xff8fc0:0xff6aa8):(Math.random()<.8?0xffd23a:0xffe98a)))}
 flowers.frustumCulled=false;S.add(flowers);
 const pth=(()=>{const n=140,pos=[],idx=[];for(let i=0;i<=n;i++){const z=-8-292*i/n,cx=Math.sin(z*.035)*34+Math.sin(z*.012)*46-10;for(const sd of[-1,1]){const x=cx+sd*3.2;pos.push(x,hgt(x,z)+.55,z)}if(i){const a2=(i-1)*2;idx.push(a2,a2+1,a2+3,a2,a2+3,a2+2)}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);return new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xc9ccd2,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))})();S.add(pth);
 const LN=110,LEAFG=(()=>{const sh=new THREE.Shape();sh.moveTo(-1.5,0);sh.bezierCurveTo(-.9,.95,.65,1,1.55,.05);sh.bezierCurveTo(.65,-.95,-.9,-.9,-1.5,0);const g=new THREE.ShapeGeometry(sh,10),p=g.attributes.position,c=[];for(let i=0;i<p.count;i++){const k=.72+.28*Math.min(1,Math.abs(p.getY(i))/.6);c.push(k,k,k)}g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));return g})(); /* a real leaf outline: pointed tip, rounded belly, darker centre vein */
 const leafMesh=new THREE.InstancedMesh(LEAFG,new THREE.MeshBasicMaterial({side:THREE.DoubleSide,vertexColors:true,fog:false}),LN),ld=new THREE.Object3D(),lcol=new THREE.Color(),hzL=new THREE.Color(.8,.82,.95);
 const shuf=n=>{const a=[...Array(n)].map((_,i)=>i);for(let i=n-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a},LAYC=[10,35,65],LST=[0,10,45],PERM=LAYC.map(n=>[shuf(n),shuf(n),shuf(n)]); /* stratified scatter: every layer's leaves are spread evenly in x, y and z, never clumped */
 const leaves=[...Array(LN)].map((_,i)=>{const lay=i<10?0:i<45?1:2,zf=[[-2,-70],[-70,-190],[-190,-355]][lay],ii=i-LST[lay],nn2=LAYC[lay],PP=PERM[lay],fx=(PP[0][ii]+Math.random())/nn2,fy=(PP[1][ii]+Math.random())/nn2,fz=(PP[2][ii]+Math.random())/nn2,r0=Math.random(),hue=r0<.45?.22+Math.random()*.09:r0<.8?.12+Math.random()*.05:.07+Math.random()*.03;return{lay,zr:zf,sc:1+lay*1.6,fd:[0,.25,.55][lay],pos:new THREE.Vector3((fx-.5)*(260+lay*260),-6+fy*(30+lay*24),zf[0]+fz*(zf[1]-zf[0])),rot:new THREE.Euler(),b:new THREE.Color().setHSL(hue,.62,.34+Math.random()*.16),p:new THREE.Color().setHSL(.13+Math.random()*.07,.68,.46+Math.random()*.1),ph:Math.random()*6,k:.4+Math.random()*1.2,rx:2+Math.random()*3,ry:1+Math.random()*3,rz:1+Math.random()*2}});leafMesh.frustumCulled=false;S.add(leafMesh);
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
 const sgr=pc.createLinearGradient(0,0,0,2048);[[0,'#4a3220'],[.05,'#53361f'],[.1,'#5c3d25'],[.2,'#704b2d'],[.3,'#86613f'],[.4,'#8d8573'],[.5,'#6f6c74'],[.58,'#4e4b5c'],[.65,'#38343f'],[.7,'#1c2340'],[1,'#0c1630']].forEach(([p,c])=>sgr.addColorStop(p,c));pc.fillStyle=sgr;pc.fillRect(0,0,512,2048);
 /* CARTOON STRATA: flat painted rocks with inked outlines and hatching, wavy ink layer lines, outlined roots, fossils and glowing crystals */
 const INK='#2a1a10',smoothPath=pts=>{const n=pts.length,mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],m0=mid(pts[n-1],pts[0]);pc.beginPath();pc.moveTo(m0[0],m0[1]);for(let i=0;i<n;i++){const m=mid(pts[i],pts[(i+1)%n]);pc.quadraticCurveTo(pts[i][0],pts[i][1],m[0],m[1])}pc.closePath()},blob=(cx,cy,rx,ry,j)=>smoothPath([...Array(9)].map((_,i)=>{const a=i/9*6.283,rr=1+(Math.random()-.5)*j;return[cx+Math.cos(a)*rx*rr,cy+Math.sin(a)*ry*rr]}));
 [260,520,820,1120,1380,1560].forEach((by,bi)=>{for(let pass=0;pass<2;pass++){pc.strokeStyle=pass?'rgba(255,230,170,.3)':INK;pc.lineWidth=pass?2:4;pc.beginPath();for(let x=0;x<=512;x+=8){const yy=by+pass*6+Math.sin(x/512*6.283*(2+bi%3)+bi)*10+Math.sin(x*.09+bi*2)*3;x?pc.lineTo(x,yy):pc.moveTo(x,yy)}pc.stroke()}pc.strokeStyle='rgba(42,26,16,.28)';pc.lineWidth=2;for(let k=0;k<40;k++){const hx2=R2(0,512),hy=by+R2(14,46);pc.beginPath();pc.moveTo(hx2,hy);pc.lineTo(hx2+9,hy+9);pc.stroke()}});
 pc.lineCap='round';for(let i=0;i<16;i++){const x=R2(0,512),y=R2(70,500),c1=[x+R2(-40,40),y+30],c2=[x+R2(-40,40),y+70],e=[x+R2(-35,35),y+R2(90,150)];[[INK,8],['#a06a38',4]].forEach(([c,lw])=>{pc.strokeStyle=c;pc.lineWidth=lw;pc.beginPath();pc.moveTo(x,y);pc.bezierCurveTo(c1[0],c1[1],c2[0],c2[1],e[0],e[1]);pc.stroke()})}
 for(let i=0;i<80;i++){const x=R2(0,512),y=R2(120,1350),rx=R2(10,30),ry=rx*R2(.6,.9),deep=y>620;pc.fillStyle=deep?`hsl(${R2(215,235)},${R2(10,20)}%,${R2(28,42)}%)`:`hsl(${R2(25,38)},${R2(18,30)}%,${R2(38,52)}%)`;blob(x,y,rx,ry,.35);pc.fill();pc.strokeStyle=INK;pc.lineWidth=3;pc.stroke();pc.strokeStyle='rgba(255,240,210,.45)';pc.lineWidth=3;pc.beginPath();pc.arc(x-rx*.15,y-ry*.15,rx*.62,3.5,4.7);pc.stroke();pc.strokeStyle='rgba(42,26,16,.35)';pc.lineWidth=2;for(let k=0;k<4;k++){pc.beginPath();pc.moveTo(x+rx*.1+k*4,y+ry*.45);pc.lineTo(x+rx*.35+k*4,y+ry*.7);pc.stroke()}}
 for(let i=0;i<70;i++){const x=R2(0,512),y=R2(540,800),r=R2(4,9);pc.fillStyle=`hsl(${R2(30,42)},${R2(15,30)}%,${R2(48,66)}%)`;pc.beginPath();pc.ellipse(x,y,r,r*R2(.65,.9),R2(0,3),0,6.283);pc.fill();pc.strokeStyle=INK;pc.lineWidth=2;pc.stroke()}
 for(let i=0;i<7;i++){const x=R2(40,470),y=R2(850,1100);[[INK,6],['#ece0c4',3]].forEach(([c,lw])=>{pc.strokeStyle=c;pc.lineWidth=lw;pc.beginPath();if(i%2){for(let a=0;a<12;a+=.25)pc.lineTo(x+Math.cos(a)*(2+a*2.6),y+Math.sin(a)*(2+a*2.6))}else{pc.moveTo(x-30,y);pc.lineTo(x+30,y);for(let k=-3;k<=3;k++){pc.moveTo(x+k*8,y);pc.lineTo(x+k*8+4,y-12);pc.moveTo(x+k*8,y);pc.lineTo(x+k*8+4,y+12)}}pc.stroke()})}
 for(let i=0;i<22;i++){const x=R2(20,490),y=R2(1150,1340),col=Math.random()<.4?'#ffd870':'#7fe9ff';for(let k=0;k<4;k++){const cx=x+k*9-14,h=R2(22,44),wd=R2(6,10);pc.shadowColor=col;pc.shadowBlur=10;pc.fillStyle=col;pc.beginPath();pc.moveTo(cx-wd,y);pc.lineTo(cx-wd*.7,y-h*.7);pc.lineTo(cx,y-h);pc.lineTo(cx+wd*.7,y-h*.7);pc.lineTo(cx+wd,y);pc.closePath();pc.fill();pc.shadowBlur=0;pc.strokeStyle='#1b2a4a';pc.lineWidth=2.5;pc.stroke();pc.fillStyle='rgba(255,255,255,.55)';pc.fillRect(cx-wd*.35,y-h*.8,wd*.35,h*.5)}}
 for(let r=0;r<14;r++)for(let x=-(r%2)*48;x<512;x+=96){const y=1380+r*48;pc.globalAlpha=Math.min(1,r/5);pc.fillStyle=`hsl(${R2(215,230)},${R2(30,45)}%,${R2(14,24)}%)`;pc.fillRect(x+2,y+2,92,44);pc.strokeStyle='#050b1c';pc.lineWidth=2.5;pc.strokeRect(x+2,y+2,92,44);pc.strokeStyle='rgba(130,170,230,.22)';pc.lineWidth=2;pc.beginPath();pc.moveTo(x+5,y+5);pc.lineTo(x+90,y+5);pc.stroke();if(Math.random()<.18){pc.strokeStyle='#7fd8ff';pc.shadowColor='#3a9bff';pc.shadowBlur=8;pc.lineWidth=2;pc.beginPath();pc.arc(x+48,y+24,R2(6,12),0,6.283);pc.moveTo(x+30,y+24);pc.lineTo(x+66,y+24);pc.stroke();pc.shadowBlur=0}}
 pc.globalAlpha=1;
 pc.fillStyle='rgba(111,240,255,.35)';for(let x=0;x<512;x+=32){pc.beginPath();pc.moveTo(x,1990);pc.lineTo(x+16,1970);pc.lineTo(x+32,1990);pc.fill()}
 for(let i=0;i<120;i++){const x=R2(0,512),y=R2(70,1650),r=R2(14,46),bl=pc.createRadialGradient(x,y,0,x,y,r);bl.addColorStop(0,Math.random()<.5?'rgba(0,0,0,.08)':'rgba(255,220,170,.06)');bl.addColorStop(1,'rgba(0,0,0,0)');pc.fillStyle=bl;pc.fillRect(x-r,y-r,r*2,r*2)}
 const stex=new THREE.CanvasTexture(sc);stex.wrapS=THREE.MirroredRepeatWrapping;stex.wrapT=THREE.ClampToEdgeWrapping;stex.repeat.set(2,1);stex.anisotropy=Math.min(4,R.capabilities.getMaxAnisotropy());
 const wallM=new THREE.MeshBasicMaterial({map:stex,side:THREE.BackSide,fog:false}),topM=new THREE.MeshBasicMaterial({visible:false}),floorM=new THREE.MeshBasicMaterial({color:0x040b1c,side:THREE.BackSide,fog:false});
 const shaft=new THREE.Mesh(new THREE.BoxGeometry(140,444,200),[wallM,wallM,topM,floorM,wallM,wallM]);shaft.position.set(0,-218,-50);S.add(shaft);shaft.visible=false; /* only drawn once the camera is under the ground, so no wall tops show at the surface */
 /* the ground's underside: the same terrain seen from below in dirt brown, so surface and underground are ONE continuous ground */
 {const dc=document.createElement('canvas');dc.width=dc.height=256;const d=dc.getContext('2d');d.fillStyle='#6a4a2e';d.fillRect(0,0,256,256);
 const wr=fn=>{for(const ox of[-256,0,256])for(const oy of[-256,0,256])fn(ox,oy)}; /* every mark is drawn 9 times so the tile wraps seamlessly */
 for(let i=0;i<900;i++){const x=R2(0,256),y=R2(0,256),r=R2(1,5),c=`hsl(${R2(20,36)},${R2(18,38)}%,${R2(16,46)}%)`,q=R2(.5,1),an=R2(0,3);wr((ox,oy)=>{d.fillStyle=c;d.beginPath();d.ellipse(x+ox,y+oy,r,r*q,an,0,6.283);d.fill()})}
 for(let i=0;i<14;i++){const x=R2(0,256),y=R2(0,256);wr((ox,oy)=>{d.strokeStyle='rgba(30,18,8,.55)';d.lineWidth=1.6;d.beginPath();d.moveTo(x+ox,y+oy);d.bezierCurveTo(x+ox+12,y+oy+10,x+ox-10,y+oy+22,x+ox+6,y+oy+40);d.stroke()})}
 for(let i=0;i<40;i++){const x=R2(0,256),y=R2(0,256),rx=R2(5,11),ry=rx*R2(.6,.9),an=R2(0,3),fc=`hsl(${R2(25,38)},${R2(15,28)}%,${R2(36,52)}%)`;wr((ox,oy)=>{d.fillStyle=fc;d.beginPath();d.ellipse(x+ox,y+oy,rx,ry,an,0,6.283);d.fill();d.strokeStyle='#2a1a10';d.lineWidth=2;d.stroke()})}
 const dtex=new THREE.CanvasTexture(dc);dtex.wrapS=dtex.wrapT=THREE.RepeatWrapping;dtex.repeat.set(36,30);dtex.anisotropy=Math.min(4,R.capabilities.getMaxAnisotropy());
 const under2=new THREE.Mesh(g.clone(),new THREE.MeshBasicMaterial({map:dtex,side:THREE.BackSide,fog:false}));under2.position.copy(land.position);S.add(under2)}
/* ANCIENT HALL = a complete buried building. The shaft ends in a stone roof slab with a skylight the camera falls through; below it is a full hall: floor, walls, vaulted ribs, two rows of pillars, tall glowing windows, constellation niches, a grand gateway, steps, shrines, glowing path, embers and a floating diamond */
 [...w2.children].forEach(c=>{if(c!==relic&&c!==rl)w2.remove(c)});
 gm.color.set(0x8fb4e8);gm.emissive.set(0x0a2a55);core.material.color.set(0x7ff0ff);
 const hall=new THREE.Group();w2.add(hall);const nodes=[],FY=-10,RY=116,HX=70;
 /* RUIN TEXTURES: mossy stacked stones with cracks and glyphs (inked, like the Sky and Nine Sols art), carved pillars and hanging emblem banners */
 const stoneTx=(key,base,lightFn,mossA,glyph)=>TX(key,256,256,(x,w,h)=>{x.fillStyle=base;x.fillRect(0,0,w,h);const rows=7,rh=h/rows;for(let r=0;r<rows;r++){const n=4+r%2,ws=[...Array(n)].map(()=>.6+Math.random()),tot=ws.reduce((a,b)=>a+b,0);let xx=0;ws.forEach(q=>{const sw=q/tot*w,y=r*rh;x.fillStyle=lightFn(Math.random());x.beginPath();const rr=7,X=xx+2,Y=y+2,W=sw-4,H=rh-4;x.moveTo(X+rr,Y);x.arcTo(X+W,Y,X+W,Y+H,rr);x.arcTo(X+W,Y+H,X,Y+H,rr);x.arcTo(X,Y+H,X,Y,rr);x.arcTo(X,Y,X+W,Y,rr);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=2;x.stroke();x.strokeStyle='rgba(255,255,255,.14)';x.beginPath();x.moveTo(X+rr,Y+2);x.lineTo(X+W-rr,Y+2);x.stroke();if(Math.random()<mossA){const g=x.createRadialGradient(X+W*.5,Y,1,X+W*.5,Y,W*.45);g.addColorStop(0,'rgba(60,170,130,.6)');g.addColorStop(1,'rgba(60,170,130,0)');x.fillStyle=g;x.fillRect(X,Y,W,H*.7)}if(glyph&&Math.random()<.07){x.strokeStyle='rgba(127,232,255,.8)';x.lineWidth=2;x.beginPath();x.arc(X+W/2,Y+H/2,H*.22,0,6.283);x.moveTo(X+W*.25,Y+H/2);x.lineTo(X+W*.75,Y+H/2);x.stroke()}xx+=sw})}x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=1.5;for(let i=0;i<10;i++){let px=Math.random()*w,py=Math.random()*h;x.beginPath();x.moveTo(px,py);for(let k=0;k<4;k++){px+=(Math.random()-.5)*14;py+=6+Math.random()*8;x.lineTo(px,py)}x.stroke()}},true);
 const hallStone=stoneTx('hallStone','#0a1330',k=>`hsl(222,30%,${15+k*11}%)`,.35,true),stoneN=stoneTx('stoneN','#777',k=>`hsl(220,6%,${58+k*20}%)`,.3,false),floorStone=stoneTx('floorStone','#04091a',k=>`hsl(222,30%,${8+k*8}%)`,.45,false);
 const rt=(t,rx,ry)=>{const c=t.clone();c.repeat.set(rx,ry);c.needsUpdate=true;return c};
 const pillarTex=TX('pillar',128,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'#16285a');g.addColorStop(.5,'#4a6fb8');g.addColorStop(1,'#16285a');x.fillStyle=g;x.fillRect(0,0,w,h);for(let y=0;y<h;y+=32){x.strokeStyle='rgba(0,0,0,.55)';x.lineWidth=3;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=2;x.beginPath();x.moveTo(0,y+3);x.lineTo(w,y+3);x.stroke()}for(let i=0;i<8;i++){const gg=x.createLinearGradient(i*w/8,0,(i+1)*w/8,0);gg.addColorStop(0,'rgba(0,0,0,.2)');gg.addColorStop(.5,'rgba(255,255,255,.08)');gg.addColorStop(1,'rgba(0,0,0,.2)');x.fillStyle=gg;x.fillRect(i*w/8,0,w/8,h)}for(let i=0;i<14;i++){const px=Math.random()*w,py=h*(.7+Math.random()*.3),r=12+Math.random()*18,g2=x.createRadialGradient(px,py,1,px,py,r);g2.addColorStop(0,'rgba(60,170,130,.65)');g2.addColorStop(1,'rgba(60,170,130,0)');x.fillStyle=g2;x.fillRect(px-r,py-r,r*2,r*2)}x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=1.5;for(let i=0;i<6;i++){let px=Math.random()*w,py=Math.random()*h;x.beginPath();x.moveTo(px,py);for(let k=0;k<4;k++){px+=(Math.random()-.5)*10;py+=8+Math.random()*10;x.lineTo(px,py)}x.stroke()}},true);
 const bannerTex=c=>TX('banner'+c,128,256,(x,w,h)=>{const col=new THREE.Color(c),g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,hx(col.clone().multiplyScalar(.7)));g.addColorStop(1,hx(col.clone().multiplyScalar(1.2)));x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='#d8b86a';x.lineWidth=3;x.strokeRect(8,8,w-16,h-16);x.lineWidth=1.5;x.strokeRect(14,14,w-28,h-28);const cx=w/2,cy=h*.42;x.fillStyle='#0d1018';x.beginPath();x.arc(cx,cy,42,0,6.283);x.fill();x.strokeStyle='#d8b86a';x.lineWidth=3;x.stroke();for(let i=0;i<24;i++){const a=i/24*6.283;x.lineWidth=i%2?1.5:2.5;x.beginPath();x.moveTo(cx+Math.cos(a)*30,cy+Math.sin(a)*30);x.lineTo(cx+Math.cos(a)*38,cy+Math.sin(a)*38);x.stroke()}x.lineWidth=2.5;x.beginPath();x.moveTo(cx-24,cy);x.quadraticCurveTo(cx,cy-18,cx+24,cy);x.quadraticCurveTo(cx,cy+18,cx-24,cy);x.stroke();x.fillStyle='#d8b86a';x.beginPath();x.ellipse(cx,cy,4,8,0,0,6.283);x.fill();for(let i=0;i<5;i++){x.fillStyle='rgba(216,184,106,.8)';x.fillRect(20+i*18,h*.78,8,h*.14)}},true);
 const banners=[];
 const stoneNA=rt(stoneN,.07,.07);
 const ADD={transparent:true,blending:THREE.AdditiveBlending,depthWrite:false},MB=(c,o)=>new THREE.MeshBasicMaterial(Object.assign({color:c,fog:false},o));
 const box=(w,h,d,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),MB(c,{map:stoneN}));m.position.set(x,y,z);hall.add(m);return m};
 const flat=(w,h,c,x,y,z,ry,rx,map)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),MB(c,{side:THREE.DoubleSide,map:map||null}));m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);hall.add(m);return m};
 flat(2*HX,200,0xffffff,0,FY+.2,50,0,-Math.PI/2,rt(floorStone,2*HX/32,200/32));
 flat(200,RY-FY,0xffffff,-HX+.3,(RY+FY)/2,50,Math.PI/2,0,rt(hallStone,200/40,(RY-FY)/40));flat(200,RY-FY,0xffffff,HX-.3,(RY+FY)/2,50,-Math.PI/2,0,rt(hallStone,200/40,(RY-FY)/40));flat(2*HX,RY-FY,0xffffff,0,(RY+FY)/2,-49.7,0,0,rt(hallStone,2*HX/40,(RY-FY)/40));
 /* roof slab with a skylight (the camera descends through it) */
 const rsh=new THREE.Shape();rsh.moveTo(-HX,-100);rsh.lineTo(HX,-100);rsh.lineTo(HX,100);rsh.lineTo(-HX,100);rsh.closePath();const hole=new THREE.Path();hole.moveTo(-18,-98);hole.lineTo(18,-98);hole.lineTo(18,-30);hole.lineTo(-18,-30);hole.closePath();rsh.holes.push(hole);
 const rg=new THREE.ExtrudeGeometry(rsh,{depth:14,bevelEnabled:false});rg.rotateX(-Math.PI/2);const roof=new THREE.Mesh(rg,MB(0xffffff,{map:rt(hallStone,1/40,1/40)}));roof.position.set(0,RY,50);hall.add(roof);
 const bm=new THREE.Mesh(new THREE.BoxGeometry(36,110,68),MB(0x59c8ff,Object.assign({side:THREE.BackSide,opacity:.11},ADD)));bm.position.set(0,RY+14+55,114);hall.add(bm);
 /* nave: two rows of pillars with capitals, bases and pointed vault ribs */
 const pm=MB(0xffffff,{map:rt(pillarTex,3,1)}),cm=MB(0x4c74c4);
 [-30,0,30,60,90,120].forEach(z=>{[-1,1].forEach(sd=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.6,88,20),pm);p.position.set(sd*38,34,z);hall.add(p);box(9,3,9,0x4c74c4,sd*38,78,z);box(8,3,8,0x4c74c4,sd*38,FY+1.5,z)});
  const rib=new THREE.Mesh(new THREE.TorusGeometry(38,2.2,6,28,Math.PI),MB(0x2b4a8a));rib.position.set(0,78,z);hall.add(rib)});
 const arch=(w,h,col,o)=>{const s=new THREE.Shape(),k=h*.72;s.moveTo(-w,0);s.lineTo(-w,k);s.quadraticCurveTo(-w*.85,k+(h-k)*.8,0,h);s.quadraticCurveTo(w*.85,k+(h-k)*.8,w,k);s.lineTo(w,0);return new THREE.Mesh(new THREE.ShapeGeometry(s,12),MB(col,Object.assign({map:stoneNA},o)))};
 const cmat=new THREE.MeshBasicMaterial(Object.assign({color:0x58c4ff,opacity:.95,fog:false},ADD));
 const seg=(a,b)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,a.distanceTo(b),5),cmat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());hall.add(m)};
 const fig=(P,axis)=>{const pts=[...Array(5)].map(()=>{const u=(Math.random()-.5)*11,v=(Math.random()-.5)*36;return axis==='z'?new THREE.Vector3(P.x,P.y+v,P.z+u):new THREE.Vector3(P.x+u,P.y+v,P.z)});
  pts.forEach((p,i)=>{if(i)seg(pts[i-1],p);const n=new THREE.Mesh(new THREE.OctahedronGeometry(1.4,0),cmat);n.position.copy(p);n.userData.ph=Math.random()*6;hall.add(n);nodes.push(n)});seg(pts[0],pts[3])};
 /* side walls: constellation niches, glowing windows and wall pilasters */
 [-30,0,30,60,90,120].forEach(z=>[-1,1].forEach(sd=>{const ry=-sd*Math.PI/2,o=arch(10,78,0x15356b),i2=arch(7,68,0x07173c),wn=arch(6,24,0x8fe8ff,Object.assign({opacity:.5,map:null},ADD));
  o.position.set(sd*(HX-.6),FY,z);i2.position.set(sd*(HX-1.6),FY,z);wn.position.set(sd*(HX-1),RY-34,z);o.rotation.y=i2.rotation.y=wn.rotation.y=ry;hall.add(o,i2,wn);fig(new THREE.Vector3(sd*(HX-2.4),FY+48,z),'z');
  box(6,RY-FY,8,0x1b4486,sd*(HX-3),(RY+FY)/2,z-15)}));
 /* back wall: grand gateway with a glowing doorway and flanking niches */
 const gw=arch(22,100,0x1d3f7d),gi=arch(17,92,0x7ff0ff,Object.assign({opacity:.35,map:null},ADD));gw.position.set(0,FY,-49.2);gi.position.set(0,FY,-49);hall.add(gw,gi);
 [-48,48].forEach(x=>{const o=arch(10,78,0x15356b),i2=arch(7,68,0x07173c);o.position.set(x,FY,-49.2);i2.position.set(x,FY,-49);hall.add(o,i2);fig(new THREE.Vector3(x,FY+48,-48.6),'x')});
 for(let i=0;i<4;i++)box(44-i*7,2,12,0x2c4a8a,0,FY+1+i*2,-18-i*7);
 /* glowing grassy path, shrines on the dais and the floating diamond */
 const pg=new THREE.PlaneGeometry(40,190,10,24);pg.rotateX(-Math.PI/2);const pp=pg.attributes.position,pcol=[];
 for(let i=0;i<pp.count;i++){const x=pp.getX(i),z=pp.getZ(i);pp.setY(i,Math.sin(x*.3+z*.1)*.6+Math.cos(z*.15)*.5);const k=.5+.5*Math.sin(z*.2+x*.4);pcol.push(.1+.1*k,.35+.25*k,.33+.2*k)}
 pg.setAttribute('color',new THREE.Float32BufferAttribute(pcol,3));const path=new THREE.Mesh(pg,MB(0xffffff,{vertexColors:true}));path.position.set(0,FY+.7,50);hall.add(path);
 const shm=MB(0xa9c0e6);
 [-8,0,8].forEach((x,i)=>{const s=new THREE.Group(),b=new THREE.Mesh(new THREE.BoxGeometry(3,6,2),shm),c=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,2,12),shm);c.rotation.x=Math.PI/2;c.position.y=3;s.add(b,c);s.position.set(x,FY+11,-36);s.scale.setScalar(i===1?1.4:1);hall.add(s)});
 const dia=new THREE.Mesh(new THREE.OctahedronGeometry(3,0),MB(0x7ff0ff));dia.scale.y=1.8;dia.position.set(0,38,-34);hall.add(dia);
 const dgl=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0x5fe0ff,transparent:true,opacity:.8,depthWrite:false,fog:false}));dgl.scale.set(22,22,1);dgl.position.copy(dia.position);hall.add(dgl);
 [-1,1].forEach(sd=>[-10,45,100].forEach((z,i)=>{const b=new THREE.Mesh(capeG(5,5,26),new THREE.MeshBasicMaterial({map:bannerTex(i%2?0x1f6f7a:0x4a2f8a),side:THREE.DoubleSide,fog:false}));b.position.set(sd*(HX-4),RY-6,z);b.rotation.y=-sd*Math.PI/2;hall.add(b);banners.push(b);const rod=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,12,10),MB(0x6a5a3a));rod.rotation.x=Math.PI/2;rod.position.set(sd*(HX-4),RY-5.4,z);hall.add(rod)})); /* hanging emblem banners */
 for(let i=0;i<16;i++){const s3=2+Math.random()*4,rb=box(s3*1.4,s3,s3*1.2,0x4c74c4,(Math.random()<.5?-1:1)*(30+Math.random()*30),FY+s3/2,-25+Math.random()*150);rb.rotation.set((Math.random()-.5)*.3,Math.random()*3,(Math.random()-.5)*.3)} /* fallen blocks */
 const dust=(n,col,size,spd,box2)=>{const pos=[],ph=[];for(let i=0;i<n;i++){pos.push((Math.random()-.5)*box2[0],Math.random()*box2[1],(Math.random()-.5)*box2[2]);ph.push(Math.random())}
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g2.setAttribute('ph',new THREE.Float32BufferAttribute(ph,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{T:{value:0},C:{value:new THREE.Color(col)}},vertexShader:`attribute float ph;uniform float T;varying float tw;void main(){vec3 p=position;p.y=mod(p.y+T*${spd.toFixed(2)}*(.5+ph),${box2[1].toFixed(1)});tw=.5+.5*sin(T*3.+ph*40.);gl_PointSize=${size.toFixed(1)}*(.6+tw);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:'uniform vec3 C;varying float tw;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(C,(1.-d*2.)*(.4+.6*tw));}'});
  const q=new THREE.Points(g2,m);q.frustumCulled=false;q.position.set(0,FY,50);hall.add(q);return m};
 const dmat=[dust(260,0xff4a2a,5,2,[130,120,190]),dust(700,0x9cc8ff,2.5,.6,[130,120,190]),dust(160,0x4fd8ff,3.5,.15,[34,4,150])];
 /* DISTANT MOUNTAINS + cloud banks that stay put but slowly billow (a sea-of-clouds horizon) */
 const MD=[[.46,.48,.74],[.58,.6,.82],[.7,.74,.9]],MN=[[.04,.05,.14],[.05,.06,.17],[.06,.08,.2]],MP=[[.46,.4,.66],[.55,.5,.74],[.66,.6,.82]];
 const mtn=[0,1,2].map(k=>{const n=110,pos=[],idx=[],vc=[];for(let i=0;i<=n;i++){const x=(i/n-.5)*1300,hh=34+k*8+Math.abs(Math.sin(i*.31+k*2.3))*60+Math.abs(Math.sin(i*.83+k))*38+Math.random()*14;pos.push(x,-70,0,x,hh,0);vc.push(.5,.5,.58,1.12,1.1,1.08);if(i){const a=(i-1)*2;idx.push(a,a+1,a+3,a,a+3,a+2)}}
  const g4=new THREE.BufferGeometry();g4.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g4.setAttribute('color',new THREE.Float32BufferAttribute(vc,3));g4.setIndex(idx);const m=new THREE.Mesh(g4,new THREE.MeshBasicMaterial({color:0x8888cc,vertexColors:true,side:THREE.DoubleSide,fog:false}));m.position.set(0,0,-370-k*38);m.userData.k=k;S.add(m);return m});
 const banks=[...Array(8)].map((_,i)=>{const g5=new THREE.Group();for(let j=0;j<6;j++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:ctex,color:new THREE.Color(1,1,1),transparent:true,opacity:.6,depthWrite:false,fog:false})),s=110+Math.random()*90;sp.scale.set(s,s*.45,1);sp.position.set((Math.random()-.5)*130,(Math.random()-.5)*14,(Math.random()-.5)*40);sp.userData={ph:Math.random()*6,y:sp.position.y,sx:s};g5.add(sp)}g5.position.set(-420+i*120+Math.random()*40,-6+Math.random()*26,-330-Math.random()*40);S.add(g5);return g5});
 /* THICK FOG at the foot of the mountains for depth */
 const fcv=document.createElement('canvas');fcv.width=4;fcv.height=128;{const x=fcv.getContext('2d'),gg=x.createLinearGradient(0,0,0,128);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.3,'rgba(255,255,255,.45)');gg.addColorStop(.6,'rgba(255,255,255,.85)');gg.addColorStop(1,'rgba(255,255,255,1)');x.fillStyle=gg;x.fillRect(0,0,4,128)}
 const ftex=new THREE.CanvasTexture(fcv),HZd=[.8,.82,.95],HZn=[.08,.1,.24],HZp=[.66,.6,.86],fogs=[0,1,2,3,4].map(k=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(1500,120+k*30),new THREE.MeshBasicMaterial({map:ftex,transparent:true,depthWrite:false,fog:false}));m.position.set(0,-10+k*8,-352-k*26);S.add(m);return m});
 const fogS=[...Array(16)].map(()=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,opacity:.55,depthWrite:false,fog:false})),s2=200+Math.random()*110;m.scale.set(s2,s2*.3,1);m.position.set((Math.random()-.5)*900,-20+Math.random()*40,-340-Math.random()*110);m.userData.s=1.5+Math.random()*2;S.add(m);return m});
 /* SIDE CLOUD WALLS: towering cumulus at the left and right edges that slowly rise from bottom to top */
 const sideC=[...Array(18)].map((_,i)=>{const side=i%2?1:-1,z=-70-Math.random()*170,s0=110+Math.random()*110,m=new THREE.Sprite(new THREE.SpriteMaterial({map:ctex,transparent:true,opacity:0,depthWrite:false,fog:false}));m.userData={side,x:side*(105+(-z-70)*.55+Math.random()*50),z,s0,sp:3+Math.random()*3.5,f:Math.random()};m.scale.set(s0,s0*.85,1);S.add(m);return m});
 /* RUINS: broken columns, arch fragments and block stacks climb out of the shaft walls and stand on the roof slab; denser and bluer toward the hall */
 {const R3=(a,b)=>a+Math.random()*(b-a),rm=d=>new THREE.MeshBasicMaterial({map:stoneN,color:new THREE.Color().setRGB(.62-.4*d,.6-.38*d,.66-.2*d),fog:false}),addm=(m,x,y,z)=>{m.position.set(x,y,z);S.add(m);return m};
  for(let i=0;i<80;i++){const y=R3(-300,-120),d=clamp((-120-y)/180);if(Math.random()>.3+.7*d)continue;const wl=Math.random(),side=wl<.4?-1:wl<.8?1:0,mat=rm(d*.9+.05),ty=Math.random(),x=side?side*(70-R3(1,4)):R3(-60,60),z=side?-150+R3(10,190):-146+R3(0,3);let m;
   if(ty<.4){m=new THREE.Mesh(new THREE.CylinderGeometry(R3(2.2,3.6),R3(2.6,4),R3(8,26),8),mat);m.rotation.z=(Math.random()-.5)*.25}
   else if(ty<.7){m=new THREE.Mesh(new THREE.BoxGeometry(R3(5,14),R3(3,9),R3(4,10)),mat);m.rotation.y=Math.random()*.4}
   else{m=new THREE.Mesh(new THREE.TorusGeometry(R3(8,15),R3(1.6,2.6),6,16,R3(1.2,2.6)),mat);m.rotation.y=-side*1.5708;m.rotateZ(R3(0,6.28))}
   addm(m,x,y,z);if(Math.random()<.18+.4*d){const gl=new THREE.Mesh(new THREE.BoxGeometry(R3(3,8),.5,.5),new THREE.MeshBasicMaterial({color:0x58c4ff,fog:false,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.9}));addm(gl,x-side*2,y+R3(-2,3),z+(side?0:2))}}
  for(let i=0;i<22;i++){const x=(Math.random()<.5?-1:1)*R3(27,62),z=R3(-140,40),h=R3(8,34),mat=rm(.95),c=new THREE.Mesh(new THREE.CylinderGeometry(R3(2.2,3.4),R3(3,4.2),h,8),mat);c.rotation.z=(Math.random()-.5)*.3;addm(c,x,-300+h/2,z);if(Math.random()<.5)addm(new THREE.Mesh(new THREE.BoxGeometry(R3(5,11),R3(2,5),R3(5,11)),mat),x+R3(-6,6),-300+R3(1,3),z+R3(-6,6))}
  [[-52,-100],[50,-60],[-48,10]].forEach(([x,z])=>{const mat=rm(.95);addm(new THREE.Mesh(new THREE.CylinderGeometry(3,3.6,30,8),mat),x-12,-285,z);addm(new THREE.Mesh(new THREE.CylinderGeometry(3,3.6,18,8),mat),x+12,-291,z);const ar=addm(new THREE.Mesh(new THREE.TorusGeometry(12,2.6,6,16,Math.PI*.55),mat),x-12,-270,z);ar.rotation.z=Math.PI*.45})}
 const w1=[land,grass,...streaks,...trees,...walkers,leafMesh,...mist,...flyers,...clouds,...mush,fireflies,moon,...mtn,...banks,...fogs,...fogS,...sideC,flowers,pth];let under=false; /* the surface world is hidden once the camera is underground */
 /* DREAM REALM: floating crystal islands, aurora ribbons and orbs high above the horizon; revealed when the camera pans up */
 const dream=new THREE.Group();dream.visible=false;S.add(dream);const isl=[];
 for(let i=0;i<10;i++){const g2=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:0x8866ff,flatShading:true}),top=new THREE.Mesh(new THREE.IcosahedronGeometry(5+Math.random()*5,0),m),bot=new THREE.Mesh(new THREE.ConeGeometry(4,10,6),m);top.scale.y=.45;bot.rotation.x=Math.PI;bot.position.y=-6;g2.add(top,bot);g2.position.set((Math.random()-.5)*190,125+Math.random()*90,-50-Math.random()*150);g2.userData={ph:Math.random()*6,y:g2.position.y};dream.add(g2);isl.push(g2)}
 const au=[0,1,2].map(k=>{const m=auroraMat(.75,k),p=new THREE.Mesh(new THREE.CylinderGeometry(330+k*40,330+k*40,420,160,24,true),m);S.add(p);m.mesh=p;return m});
 const ovg=new THREE.BufferGeometry(),ov=[];for(let i=0;i<350;i++)ov.push((Math.random()-.5)*300,100+Math.random()*160,-30-Math.random()*220);ovg.setAttribute('position',new THREE.Float32BufferAttribute(ov,3));const orbM=new THREE.PointsMaterial({size:3,sizeAttenuation:false,color:0xffffff,transparent:true,opacity:0,fog:false});dream.add(new THREE.Points(ovg,orbM));
 const pl=new THREE.PointLight(0xaa88ff,0,400);pl.position.set(0,150,-60);dream.add(pl);
 setDream=i=>{const h=[.75,.55,.9,.08,.4][i];au.forEach(m=>gsap.to(m.uniforms.H,{value:h,duration:1.4}));isl.forEach((g,j)=>g.children[0].material.color.setHSL((h+j*.03)%1,.6,.55))};setDream(0);
 const rs=()=>{R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};rs();addEventListener('resize',rs);
 const clk=new THREE.Clock();let nextPass=7,cT=0;
 (function loop(){const dt=Math.min(clk.getDelta(),.05),t=clk.elapsedTime;spS+=(sp-spS)*Math.min(1,dt*3);cT+=dt*(1-NT.v); /* eased scroll progress drives the descent */
  const wind=clamp(.4+.45*Math.sin(t*.5)+.2*Math.sin(t*1.9),.08,1),ph6=cT*6.283/36,shE=Math.cos(ph6)*(1-DK.v)-DK.v-NT.v*1.7,sxE=Math.sin(ph6)*(1-DK.v),cyc=1-ss(-.28,.38,shE),sunS=Math.exp(-Math.pow(shE/.22,2))*(1-DK.v),dayF=ss(-.1,.6,shE); /* wind gusts + a 36-second day/night cycle */
  clouds.forEach((c,i)=>{c.position.x+=dt*(2+i%4*.9)*(.6+wind*3);if(c.position.x>300)c.position.x=-300});
  walkers.forEach(w=>stepKid(w,t,dt,wind));const nv=Math.max(NT.v,DK.v*.92,cyc);skyM.uniforms.N.value=nv;skyM.uniforms.LM.value=1-DK.v;skyM.uniforms.W.value=ss(.45,.8,spS)*(1-NT.v);skyM.uniforms.SD.value.set(sxE,shE*.6+.02,-1);skyM.uniforms.SS.value=sunS;skyM.uniforms.DY.value=dayF;
  const lc=1-.65*nv*(.3+.7*DK.v);if(!under){leaves.forEach((u,i)=>{const p=u.pos;const sp2=1+Math.abs(p.z)/110;p.x+=(8+wind*38)*dt*u.k*sp2;p.y+=(Math.sin(t*1.7+u.ph)*2.6-1.1+wind*2.2)*dt;p.z+=Math.sin(t*.8+u.ph)*(2+wind*5)*dt;u.rot.x+=dt*u.rx*(1+wind*4);u.rot.y+=dt*u.ry;u.rot.z+=dt*u.rz;const bx=140+Math.abs(p.z)*.9;if(p.x>bx){p.x=-bx-Math.random()*bx*.5;p.y=-6+Math.random()*(30+u.lay*24);p.z=u.zr[0]+Math.random()*(u.zr[1]-u.zr[0])}if(p.y>36+u.lay*26){p.y=-6+Math.random()*6;p.x=(Math.random()-.5)*bx*1.4}if(p.y<-8)p.y=-6+Math.random()*(30+u.lay*24);ld.position.copy(p);ld.rotation.copy(u.rot);ld.scale.setScalar(u.sc);ld.updateMatrix();leafMesh.setMatrixAt(i,ld.matrix);lcol.copy(DK.v<.5?u.p:u.b).multiplyScalar(lc).lerp(hzL,u.fd);leafMesh.setColorAt(i,lcol)});leafMesh.instanceMatrix.needsUpdate=true;leafMesh.instanceColor.needsUpdate=true}
  trees.forEach((g,i)=>g.rotation.z=-wind*.12+Math.sin(t*1.6+i)*.05*(.5+wind*2.2));
  streaks.forEach(m=>{const u=m.userData,p=m.position;p.x+=(20+wind*90)*dt*u.k;p.y+=Math.sin(t*1.3+u.ph)*dt*3;if(p.x>150){p.x=-150;p.y=-2+Math.random()*36;p.z=-3-Math.random()*75}m.rotation.z=Math.sin(t*1.1+u.ph)*.06;m.material.opacity=Math.max(0,wind-.15)*.7*(1-.6*nv)});
  if(!under){gp.forEach((g,i)=>{gd.position.set(g.x,g.y,g.z);gd.rotation.set(0,g.ry,-wind*.75+Math.sin(t*3+g.ph)*.18*(.4+wind));gd.scale.set(g.s,g.s*(1+.15*Math.sin(t*5+g.ph)),g.s);gd.updateMatrix();grass.setMatrixAt(i,gd.matrix)});grass.instanceMatrix.needsUpdate=true}
  mist.forEach(m=>{m.position.x+=m.userData.s*dt*(.5+wind*3);if(m.position.x>170)m.position.x=-170;m.material.color.copy(S.fog.color);m.material.opacity=.22+.1*nv});
  w2.visible=spS>.2;dmat.forEach(m=>m.uniforms.T.value=t);if(under)banners.forEach((b,i)=>flutter(b,t,.7,i*1.7));nodes.forEach(n=>n.scale.setScalar(1+.45*Math.sin(t*3+n.userData.ph)));dia.rotation.y=t*.8;dia.position.y=38+Math.sin(t)*1.5;const cy=6-ss(.15,.75,spS)*(1-NT.v)*430,gy=hgt(0,30-spS*22)-.5,un=cy<gy;if(un!==under){under=un;w1.forEach(o=>o.visible=!un);shaft.visible=un}soilEl.style.opacity=Math.max(0,1-Math.abs(cy-gy)/16)*.7;relic.rotation.y=t*.25;relic.position.y=11+Math.sin(t*.8)*1.2;rings.forEach((r,i)=>{r.rotation.x+=dt*(.3+i*.2);r.rotation.z+=dt*(.2-i*.1)});core.scale.setScalar(1+.08*Math.sin(t*3));orbs.forEach((o,i)=>{const a=t*(.4+i*.1)+i*1.3,rr=18+i*2;o.position.set(Math.cos(a)*rr,Math.sin(a*1.3)*6,Math.sin(a)*rr)});const nk=nv*(.35+.65*DK.v);hemi.intensity=.95-.75*nk;dl.intensity=1.1-.95*nk;stM.uniforms.O.value=(.1+.9*nv)*(.3+.7*DK.v);stM.uniforms.T.value=t;
  S.fog.color.setRGB(.91+(.95-.93*DK.v-.91)*nv,.54+(.75-.73*DK.v-.54)*nv,.42+(.92-.88*DK.v-.42)*nv);
  clouds.forEach(c=>c.children.forEach(m=>{m.material.opacity=.7*(1-nv*(.25+.6*DK.v));m.material.color.setRGB(1-.25*nv,1-.28*sunS-.3*nv,1-.5*sunS-.15*nv)}));
  const dk=DK.v,nn=clamp((nv-.25)*1.5);const mdx=-sxE-.32*dk,mdy=-shE*.6+.02,mh=clamp(mdy*3);moonDir.set(mdx,mdy,-1).normalize().multiplyScalar(720);moon.material.opacity=clamp((mdy+.04)*10)*clamp(cyc*1.3)*(1-NT.v);moon.material.color.setRGB(1,.85+.15*mh,.7+.3*mh);moon.scale.setScalar(180*(1+.35*(1-mh)));ffm.uniforms.T.value=t;ffm.uniforms.O.value=Math.max(nn,dk);
  mush.forEach(m=>{m.userData.gl.material.opacity=(.25+.75*Math.max(nn,dk))*(.7+.3*Math.sin(t*2+m.userData.ph))});
  const H0=[0,1,2].map(i=>{const A=[1,.62,.4][i],B=[1,.36,.28][i],C=[.78,.88,1][i],l0=A+(B-A)*sunS,lo=l0+(C-l0)*dayF*(1-sunS),nd=[.08,.05,.22][i]+([.98,.72,.9][i]-[.08,.05,.22][i])*(1-DK.v);return lo+(nd-lo)*nv}); hzL.setRGB(H0[0],H0[1],H0[2]);flMat.color.setScalar(1-.55*nv);pth.material.color.setRGB(.79*(1-.6*nv),.8*(1-.6*nv),.82*(1-.5*nv)); /* H0 = the sky shader's horizon colour right now; far leaves fade toward it */
  sideC.forEach(m=>{const u=m.userData;u.f+=dt*u.sp/150;if(u.f>1){u.f-=1;u.x=u.side*(105+(-u.z-70)*.55+Math.random()*50)}const f=u.f;m.position.set(u.x+Math.sin(t*.2+u.s0)*6,-50+f*190,u.z);const sc=u.s0*(.85+.35*f);m.scale.set(sc,sc*.85,1);m.material.opacity=Math.pow(Math.sin(Math.PI*f),.6)*.9*(1-nv*(.25+.6*DK.v));m.material.color.setRGB(1-.25*nv,1-.28*sunS-.3*nv,1-.5*sunS-.15*nv)});
  mtn.forEach(m=>{const hz=[.3,.55,.8][m.userData.k];m.material.color.setRGB(...[0,1,2].map(i=>{const dOwn=[.3,.34,.58][i]+([.3,.14,.3][i]-[.3,.34,.58][i])*sunS,nOwn=[.3,.24,.5][i]+([.02,.03,.09][i]-[.3,.24,.5][i])*DK.v,own=dOwn+(nOwn-dOwn)*nv;return own+(H0[i]-own)*hz}))});
  banks.forEach(g=>g.children.forEach(sp=>{const u=sp.userData;sp.position.y=u.y+Math.sin(t*.22+u.ph)*3.5;sp.scale.x=u.sx*(1+.06*Math.sin(t*.27+u.ph));sp.scale.y=u.sx*.45*(1+.1*Math.sin(t*.31+u.ph*1.3));sp.material.opacity=.62*(1-nv*(.3+.5*DK.v));sp.material.color.setRGB(1-.25*nv,1-.28*sunS-.3*nv,1-.5*sunS-.15*nv)}));
  {const hc=H0.map(v=>Math.min(1,v+(1-v)*.1));fogs.forEach(f=>f.material.color.setRGB(hc[0],hc[1],hc[2]));fogS.forEach(f=>{f.position.x+=f.userData.s*dt*(.5+wind);if(f.position.x>460)f.position.x=-460;f.material.color.setRGB(hc[0],hc[1],hc[2])})}
  dream.visible=NT.v>.02;dream.scale.setScalar(.7+.3*NT.v);au.forEach(m=>{m.uniforms.T.value=t*.5;m.uniforms.A.value=NT.v});orbM.opacity=NT.v*.9;pl.intensity=2.2*NT.v;isl.forEach(g=>{g.position.y=g.userData.y+Math.sin(t*.6+g.userData.ph)*3;g.rotation.y+=dt*.2});
  /* random close fly-bys: a light child swoops past near the camera every 6-15s */
  if(t>nextPass){const f=flyers[Math.random()*flyers.length|0],u=f.userData;if(!u.near){u.near=true;u.sp0=u.sp;u.z0=f.position.z;u.sp=48;u.yn=4+Math.random()*10;f.scale.setScalar(4.5);f.position.z=16+Math.random()*6;f.position.x=-u.dir*240}nextPass=t+6+Math.random()*9}
  flyers.forEach(f=>{const u=f.userData;f.position.x+=u.dir*u.sp*dt;if(Math.abs(f.position.x)>260){f.position.x=-u.dir*260;if(u.near){u.near=false;u.sp=u.sp0;f.scale.setScalar(2);f.position.z=u.z0}}f.position.y=(u.near?u.yn:u.y)+Math.sin(t*1.2+u.ph)*2;const s=Math.sin(t*6+u.ph)*.7;u.L.rotation.z=s;u.Rw.rotation.z=-s;if(f.cape){f.cape.rotation.x=-1.3+Math.sin(t*2.2+u.ph)*.16;if(!under)flutter(f.cape,t,2.4,u.ph)}});
  C.position.set(Math.sin(t*.12)*4+(mx/innerWidth-.5)*6+CAM.x,6+CAM.p*.12+Math.sin(t*.2)-(my/innerHeight-.5)*2-ss(.15,.75,spS)*(1-NT.v)*430,30-spS*22);C.lookAt(CAM.x*.7,12+CAM.p-ss(.15,.75,spS)*(1-NT.v)*430,-100);dome.position.copy(C.position);stars.position.copy(C.position);au.forEach(m=>{m.mesh.visible=NT.v>.02;m.mesh.position.set(C.position.x,C.position.y+250,C.position.z)});moon.position.copy(C.position).add(moonDir);R.render(S,C);requestAnimationFrame(loop)})();
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
 const q=clamp((scrollY-zone.offsetTop)/(zone.offsetHeight-innerHeight)),t=clamp((q-.3)/.45);zq=q;
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
 if(el)(el._c||(el._c=$$('.ch',el))).forEach(c=>{const r=c.getBoundingClientRect(),d=Math.hypot(mx-(r.left+r.width/2),my-(r.top+r.height/2));if(d<110){const s=1+.9*(1-d/110);c.style.transform=`perspective(260px) scale(${s}) translateY(${-(s-1)*8}px) rotateY(${(mx-(r.left+r.width/2))/110*-28}deg) rotateX(${(my-(r.top+r.height/2))/110*28}deg)`;c.classList.toggle('hot',s>1.2);next.add(c)}});
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
/* cloud transition: puffs bloom to cover the screen, then drift apart and vanish */
const cf=$('#cloudfx'),base=document.createElement('div');base.className='cbase';cf.prepend(base);
const puffs=[...Array(24)].map((_,i)=>{const c=i%6,r=i/6|0,p=document.createElement('i');p.className='cp';p.style.cssText=`left:${c*20+Math.random()*6-3}%;top:${r*28+Math.random()*6-3}%;width:${46+Math.random()*24}vmax;height:${40+Math.random()*20}vmax`;cf.append(p);return p});
gsap.set(puffs,{xPercent:-50,yPercent:-50,scale:.1,opacity:0});gsap.set(base,{opacity:0});
const cloudIn=()=>gsap.timeline().to(puffs,{scale:1,opacity:1,duration:.9,stagger:{each:.025,from:'center'},ease:'power2.out'}).to(base,{opacity:1,duration:.5},.5);
const cloudOut=()=>gsap.timeline().to(base,{opacity:0,duration:.5}).to(puffs,{scale:1.9,opacity:0,x:()=>gsap.utils.random(-320,320),y:()=>gsap.utils.random(-220,220),duration:1.1,stagger:.02,ease:'power2.in'},0).set(puffs,{scale:.1,x:0,y:0});
function openPortal(id,btn){if(busy)return;busy=true;saved=scrollY;document.body.classList.add('lock');
 const stone=btn.firstElementChild,r=stone.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 burst(cx,cy,200);front.style.transformOrigin=`${cx}px ${cy+scrollY}px`; /* zoom is centred on the archway you clicked */
 const sw=()=>{front.style.visibility='hidden';$$('.sec').forEach(s=>s.classList.toggle('on',s.id==='sec-'+id));portal.style.display='block';back.style.display='block';$('#prev').style.display=$('#next').style.display='grid';portal.scrollTop=0;gsap.set('#front',{clearProps:'transform,filter'});cur=id;setShape(ORDER.indexOf(id));setDream(ORDER.indexOf(id));gsap.to(CAM,{p:150,duration:2.4,ease:'power2.inOut'});gsap.to(NT,{v:1,duration:2.4,ease:'sine.inOut'});gsap.to('#nc',{opacity:1,duration:1.6});gsap.set([portal,back,'#prev','#next'],{opacity:0})};
 gsap.timeline().to('#front',{scale:5,x:innerWidth/2-cx,y:innerHeight/2-cy,duration:1.4,ease:'power3.in'},0).to('#const',{opacity:0,duration:.8},.3)
 .add(cloudIn(),.6).add(sw,1.75).add(cloudOut(),1.8)
 .to(portal,{opacity:1,duration:1.1,ease:'power2.out'},1.85).fromTo(portal,{scale:1.12},{scale:1,duration:1.1,ease:'power3.out'},1.85).to([back,'#prev','#next'],{opacity:1,duration:.7},2.1).add(()=>busy=false)}
function closePortal(){if(busy||portal.style.display!=='block')return;busy=true;burst(innerWidth/2,innerHeight/2,180);
 gsap.timeline().add(cloudIn(),0).to([portal,back,'#prev','#next'],{opacity:0,duration:.7,ease:'power2.in'},.4)
 .add(()=>{portal.style.display='none';back.style.display='none';$('#prev').style.display=$('#next').style.display='none';front.style.visibility='';document.body.classList.remove('lock');scrollTo(0,saved);gsap.set('#front,#const',{opacity:1});gsap.to(NT,{v:0,duration:2.4,ease:'sine.inOut'});gsap.to(CAM,{p:0,duration:2,ease:'power2.inOut'});gsap.to('#nc',{opacity:0,duration:1.2})},1.3)
 .add(cloudOut(),1.35).add(()=>busy=false)}
$$('.archway-portal').forEach(b=>b.addEventListener('click',()=>openPortal(b.dataset.id,b)));
back.addEventListener('click',closePortal);addEventListener('keydown',e=>e.key==='Escape'&&closePortal());

/* ===== NIGHT CONSTELLATIONS: 3D star field that sways side to side; stars light up and link to the cursor ===== */
const nc=$('#nc'),nx=nc.getContext('2d'),NC={spin:0,px:0,hue:45},dr=$('#dream'),ST=[...Array(innerWidth<700?85:130)].map(()=>({x:(Math.random()-.5)*2,y:(Math.random()-.5)*1.5,z:(Math.random()-.5)*2,tx:0,ty:0,tz:0,r:1+Math.random()*1.6}));
/* a different constellation shape + colour per archway: sphere, spiral galaxy, torus, lattice cube, wave sheet */
const SH=[(i,n)=>{const y=1-2*i/(n-1),r=Math.sqrt(1-y*y),a=i*2.4;return[Math.cos(a)*r*.9,y*.8,Math.sin(a)*r*.9]},
(i,n)=>{const a=i*.38,r=.08+i/n*.95;return[Math.cos(a)*r,(Math.random()-.5)*.12,Math.sin(a)*r]},
(i,n)=>{const u=i*2.4,w=i*.62,R=.7+.3*Math.cos(w);return[Math.cos(u)*R,.45*Math.sin(w),Math.sin(u)*R]},
(i,n)=>[((i%5)/4-.5)*1.6,((i/5|0)%5/4-.5)*1.3,((i/25|0)%5/4-.5)*1.6],
(i,n)=>{const x=((i%12)/11-.5)*2,z=((i/12|0)/10-.5)*2;return[x,Math.sin(x*4+z*3)*.25,z]}],HUE=[45,190,320,30,140];
function setShape(k){ST.forEach((s,i)=>{const p=SH[k](i,ST.length);s.tx=p[0];s.ty=p[1];s.tz=p[2]});gsap.to(NC,{hue:HUE[k],duration:1.2})}setShape(0);
const nr=()=>{nc.width=innerWidth;nc.height=innerHeight};nr();addEventListener('resize',nr);
const GLOW=document.createElement('canvas');GLOW.width=GLOW.height=64;{const g9=GLOW.getContext('2d'),r9=g9.createRadialGradient(32,32,0,32,32,32);r9.addColorStop(0,'rgba(255,248,230,.9)');r9.addColorStop(.3,'rgba(255,230,190,.35)');r9.addColorStop(1,'rgba(255,220,180,0)');g9.fillStyle=r9;g9.fillRect(0,0,64,64)}
/* section constellation extras: shooting stars, a pulsing white dwarf with moving rings, and bright children of light with white trails */
const SSt=[],KD=[...Array(4)].map((_,i)=>({u:Math.random(),sp:.045+Math.random()*.03,dir:i%2?1:-1,y0:.15+Math.random()*.6,A:40+Math.random()*60,f:1+Math.random()*1.5,ph:Math.random()*6,tr:[]}));
let nb=0,lt=0,dwf=0,nxS=8000;
function extras(t,v){const w=nc.width,h=nc.height,dt=Math.min(.05,(t-lt)/1000||0);lt=t;dwf*=.96;
 if(t>nb){const n=3+Math.random()*4|0;for(let i=0;i<n;i++)SSt.push({x:w*(.3+Math.random()*.8),y:-30-Math.random()*h*.3,vx:-(9+Math.random()*9),vy:4+Math.random()*5,d:i*9+Math.random()*10});nb=t+2200+Math.random()*3500}
 nx.save();nx.globalAlpha=v;nx.lineCap='round';
 for(let i=SSt.length-1;i>=0;i--){const s=SSt[i];if(s.d>0){s.d--;continue}s.x+=s.vx;s.y+=s.vy;const sp=Math.hypot(s.vx,s.vy),L=sp*9,ux=s.vx/sp,uy=s.vy/sp,gg=nx.createLinearGradient(s.x,s.y,s.x-ux*L,s.y-uy*L);
  gg.addColorStop(0,'rgba(255,255,255,.95)');gg.addColorStop(1,'rgba(255,255,255,0)');nx.strokeStyle=gg;nx.lineWidth=2;nx.beginPath();nx.moveTo(s.x,s.y);nx.lineTo(s.x-ux*L,s.y-uy*L);nx.stroke();
  nx.fillStyle='#fff';nx.shadowColor='#fff';nx.shadowBlur=12;nx.beginPath();nx.arc(s.x,s.y,2,0,6.283);nx.fill();nx.shadowBlur=0;if(s.x<-200||s.y>h+200)SSt.splice(i,1)}
 const wx=w*(w<700?.82:.9),wy=h*.3,pu=Math.min(1.7,.5+.5*Math.sin(t*.004)+dwf),wg=nx.createRadialGradient(wx,wy,0,wx,wy,60+70*dwf);
 wg.addColorStop(0,'rgba(255,255,255,'+(.7+.3*pu)+')');wg.addColorStop(.25,'rgba(190,220,255,.4)');wg.addColorStop(1,'rgba(150,190,255,0)');nx.fillStyle=wg;nx.beginPath();nx.arc(wx,wy,60+70*dwf,0,6.283);nx.fill();
 nx.fillStyle='#fff';nx.shadowColor='#bcdcff';nx.shadowBlur=18+14*pu;nx.beginPath();nx.arc(wx,wy,3+2.2*pu,0,6.283);nx.fill();nx.shadowBlur=0;
 for(let i=0;i<3;i++){const rx=26+i*17,ry=rx*.34,rot=t*.0006*(i%2?-1:1)+i*1.1;nx.strokeStyle='rgba(200,225,255,'+(.55-i*.12)+')';nx.lineWidth=1.4;nx.beginPath();nx.ellipse(wx,wy,rx,ry,rot,0,6.283);nx.stroke();
  const p=t*.0022*(1+i*.4)+i*2,bx=wx+rx*Math.cos(p)*Math.cos(rot)-ry*Math.sin(p)*Math.sin(rot),by=wy+rx*Math.cos(p)*Math.sin(rot)+ry*Math.sin(p)*Math.cos(rot);
  nx.fillStyle='#fff';nx.shadowColor='#fff';nx.shadowBlur=8;nx.beginPath();nx.arc(bx,by,1.8,0,6.283);nx.fill();nx.shadowBlur=0}
 KD.forEach(k=>{k.u+=k.sp*dt;if(k.u>1.15){k.u=-.15;k.y0=.15+Math.random()*.6;k.tr.length=0}
  let x=k.dir>0?k.u*w:w-k.u*w,y=k.y0*h+Math.sin(k.u*6.283*k.f+k.ph)*k.A,sc=1;
  if(!k.mode&&t>nxS&&x>w*.1&&x<w*.95){k.mode=1;k.q=0;k.sx=x;k.sy=y;nxS=t+7000+Math.random()*7000} /* every so often one child spirals into the white dwarf */
  if(k.mode){k.q+=dt*.38;const e=Math.min(1,k.q*k.q*(3-2*k.q)),an=e*5,vx=k.sx-wx,vy=k.sy-wy;x=wx+(vx*Math.cos(an)-vy*Math.sin(an))*(1-e);y=wy+(vx*Math.sin(an)+vy*Math.cos(an))*(1-e);sc=1-e*.75;if(k.q>=1){k.mode=0;dwf=1.2;k.u=-.15;k.y0=.15+Math.random()*.6;k.tr.length=0;return}}
  const pv=k.tr[k.tr.length-1]||[x,y];k.tr.push([x,y]);if(k.tr.length>46)k.tr.shift();
  for(let j=1;j<k.tr.length;j++){nx.strokeStyle='rgba(255,255,255,'+j/k.tr.length*.75+')';nx.lineWidth=1+j/k.tr.length*4;nx.beginPath();nx.moveTo(k.tr[j-1][0],k.tr[j-1][1]);nx.lineTo(k.tr[j][0],k.tr[j][1]);nx.stroke()}
  nx.save();nx.translate(x,y);nx.rotate(Math.atan2(y-pv[1],x-pv[0])||(k.dir>0?0:Math.PI));nx.scale(sc,sc);nx.fillStyle='#fff';nx.shadowColor='#fff';nx.shadowBlur=k.mode?24:12;
  const fl=Math.sin(t*.014+k.ph)*.7;[-1,1].forEach(sd=>{nx.save();nx.rotate(sd*(.55+fl*.5));nx.beginPath();nx.ellipse(-9,0,13,3.4,0,0,6.283);nx.fill();nx.restore()});
  nx.beginPath();nx.ellipse(-3,0,9,3.2,0,0,6.283);nx.fill();nx.beginPath();nx.arc(6,0,4.2,0,6.283);nx.fill();nx.beginPath();nx.moveTo(-8,0);nx.lineTo(-24,-4);nx.lineTo(-22,4);nx.closePath();nx.fill();nx.restore()});
 nx.restore()}
(function ncLoop(t){const v=NT.v;dr.style.opacity=v*.9;nx.clearRect(0,0,nc.width,nc.height);
 if(v>.01){extras(t,v);const a=Math.sin(t*.0004)*.7+NC.spin,co=Math.cos(a),si=Math.sin(a),f=Math.min(innerWidth,innerHeight*1.4)*.8,cx=innerWidth/2+NC.px,cy=innerHeight/2;
  const q=ST.map(s=>{s.x+=(s.tx-s.x)*.04;s.y+=(s.ty-s.y)*.04;s.z+=(s.tz-s.z)*.04;const X=s.x*co+s.z*si,Z=-s.x*si+s.z*co,k=1/(2.2-Z);return{x:cx+X*f*k,y:cy+s.y*f*k,k,r:s.r}});
  nx.lineWidth=1;
  q.forEach((p,i)=>{for(let j=i+1;j<q.length;j++){const d=Math.hypot(p.x-q[j].x,p.y-q[j].y);if(d<95){nx.strokeStyle=`hsla(${NC.hue},100%,85%,${(1-d/95)*.45*v})`;nx.beginPath();nx.moveTo(p.x,p.y);nx.lineTo(q[j].x,q[j].y);nx.stroke()}}
   const dm=Math.hypot(p.x-mx,p.y-my),h=dm<140?1-dm/140:0;
   if(h>0){nx.strokeStyle=`rgba(127,233,255,${h*.8*v})`;nx.beginPath();nx.moveTo(p.x,p.y);nx.lineTo(mx,my);nx.stroke()}
   {const rr=(p.r+h*3.5)*p.k*1.6*(1+.45*Math.sin(t*.005+i*1.7));nx.globalAlpha=v*(.5+.5*Math.min(1,h*2+.3));nx.drawImage(GLOW,p.x-rr*3.4,p.y-rr*3.4,rr*6.8,rr*6.8);nx.globalAlpha=v;nx.fillStyle=h>0?'#fff':'hsl('+NC.hue+',100%,90%)';nx.beginPath();nx.arc(p.x,p.y,rr,0,6.283);nx.fill();nx.globalAlpha=1}})}
 requestAnimationFrame(ncLoop)})(0);

/* ===== SECTION-TO-SECTION NAVIGATION (camera pans, constellations swing) ===== */
const ORDER=['skills','values','interests','connect'];let cur='skills';
function go(dir){if(busy||portal.style.display!=='block')return;busy=true;const i=(ORDER.indexOf(cur)+dir+ORDER.length)%ORDER.length,from=$('#sec-'+cur),to=$('#sec-'+ORDER[i]);cur=ORDER[i];setShape(i);setDream(i);
 /* camera pans one way and eases back to centre; the constellation swings and slides the opposite way. Old tweens are killed so rapid clicks never leave things off-centre. */
 gsap.killTweensOf(CAM,'x');gsap.timeline().to(CAM,{x:dir*38,duration:.7,ease:'power2.inOut'}).to(CAM,{x:0,duration:1.2,ease:'power2.inOut'});
 gsap.killTweensOf(NC,'spin,px');gsap.to(NC,{spin:NC.spin+dir*1.1,duration:1.6,ease:'power2.inOut'});gsap.timeline().to(NC,{px:-dir*170,duration:.7,ease:'power2.inOut'}).to(NC,{px:0,duration:1.2,ease:'power2.inOut'});
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
const root=document.documentElement,setTheme=(d,fx)=>{root.dataset.theme=d?'dark':'light';$('#theme').textContent=d?'☀':'☾';try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}gsap.to(DK,{v:d?1:0,duration:2,ease:'power2.inOut'});if(fx){const r=$('#theme').getBoundingClientRect();burst(r.left+22,r.top+22,90)}};
$('#theme').onclick=()=>setTheme(root.dataset.theme!=='dark',true);let svt=null;try{svt=localStorage.getItem('theme')}catch(e){}setTheme(svt?svt==='dark':matchMedia('(prefers-color-scheme:dark)').matches);
/* project carousels: auto-slide side to side on their own; hold and drag with the mouse to take over (touch swipes natively) */
const tracks=$$('.track').map(el=>({el,pos:0,d:1,drag:false,x0:0,s0:0,pause:0}));
tracks.forEach(T=>{const e=T.el;e.addEventListener('pointerdown',ev=>{if(ev.pointerType==='touch')return;T.drag=true;T.x0=ev.clientX;T.s0=e.scrollLeft;e.classList.add('grab');e.setPointerCapture(ev.pointerId)});
 e.addEventListener('pointermove',ev=>{if(T.drag){e.scrollLeft=T.s0-(ev.clientX-T.x0);T.pos=e.scrollLeft}});
 ['pointerup','pointercancel'].forEach(n=>e.addEventListener(n,()=>{T.drag=false;e.classList.remove('grab')}));
 e.addEventListener('touchstart',()=>T.pause=performance.now()+2500,{passive:true})});
(function proj(now){tracks.forEach(T=>{const e=T.el;if(T.drag||now<T.pause||e.offsetParent===null)return;const max=e.scrollWidth-e.clientWidth;if(max<=0)return;if(Math.abs(e.scrollLeft-T.pos)>2)T.pos=e.scrollLeft;T.pos+=T.d*.7;if(T.pos>=max){T.pos=max;T.d=-1}if(T.pos<=0){T.pos=0;T.d=1}e.scrollLeft=T.pos});requestAnimationFrame(proj)})(0);

/* ===== MUSIC (code only): 3 tracks crossfade by page: front page, the core at the end, archway sections. Set the paths in DATA.music. Each track repeats forever. ===== */
const MU=DATA.music.map(m=>{const a=new Audio();a.loop=true;a.preload='auto';a.volume=0;if(m.src)a.src=m.src;a.addEventListener('ended',()=>{a.currentTime=0;a.play().catch(()=>{})}); /* safety net: restart from the beginning when it ends */return Object.assign({},m,{a,v:0})});
let mstarted=false,lastVol=.6;
{const vr=$('#volr'),vb=$('#volbtn'),ic=v=>v<.01?'🔇':v<.4?'🔈':v<.75?'🔉':'🔊';let sv=NaN;try{sv=parseFloat(localStorage.getItem('musicVol'))}catch(e){}
 if(!isNaN(sv))DATA.musicVolume=sv;vr.value=DATA.musicVolume;vb.textContent=ic(DATA.musicVolume);
 const set=v=>{DATA.musicVolume=v;vr.value=v;vb.textContent=ic(v);try{localStorage.setItem('musicVol',v)}catch(e){}};
 vr.oninput=()=>{set(+vr.value);if(+vr.value>0)lastVol=+vr.value};vb.onclick=()=>{mstarted=true;if(DATA.musicVolume>0){lastVol=DATA.musicVolume;set(0)}else set(lastVol||.6)}}
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>mstarted=true,{once:true})); /* browsers only allow audio after a user gesture */
(function mloop(){const z=portal.style.display==='block'?'sections':(zq>.25?'core':'front');
 MU.forEach(m=>{const tgt=(m.id===z&&mstarted&&m.a.getAttribute('src'))?DATA.musicVolume:0;m.v+=(tgt-m.v)*.04;if(Math.abs(tgt-m.v)<.002)m.v=tgt;m.a.volume=clamp(m.v);
  if(tgt>0&&m.a.paused)m.a.play().catch(()=>{});else if(m.v===0&&tgt===0&&!m.a.paused)m.a.pause()});
 requestAnimationFrame(mloop)})();
/* smooth wheel scrolling (mouse wheels only; trackpads and touch already scroll smoothly) */
let st=0,sa=false;
addEventListener('wheel',e=>{if(document.body.classList.contains('lock')||e.ctrlKey||e.deltaMode!==0||Math.abs(e.deltaY)<40||!Number.isInteger(e.deltaY))return;e.preventDefault();if(!sa)st=scrollY;st=clamp(st+e.deltaY,0,document.documentElement.scrollHeight-innerHeight);if(!sa){sa=true;requestAnimationFrame(sstep)}},{passive:false});
function sstep(){const d=st-scrollY;if(Math.abs(d)<1){scrollTo(0,st);sa=false;return}scrollTo(0,scrollY+Math.sign(d)*Math.max(1,Math.abs(d)*.12));requestAnimationFrame(sstep)}
/* ===== LOADING SCREEN + CURTAIN PULL-DOWN ===== */
const loader=$('#loader'),lcv=$('#lcv'),lg=lcv.getContext('2d'),L={sp:.22,fl:0};let ldead=false,lt0=0;
const lrs=()=>{lcv.width=innerWidth;lcv.height=innerHeight};lrs();addEventListener('resize',lrs);
/* procedural cloud sprites: soft blue-grey shaded underside, sunlit warm tops, flat misty base */
const CS=[...Array(6)].map(()=>{const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d'),ps=[...Array(28)].map(()=>({x:70+Math.random()*372,y:150-Math.sin(Math.random()*3.14)*50*Math.random()-Math.random()*30,r:26+Math.sin(Math.random()*3.14)*52}));
 ps.forEach(p=>{const q=g.createRadialGradient(p.x,p.y+12,0,p.x,p.y+12,p.r);q.addColorStop(0,'rgba(140,155,200,.5)');q.addColorStop(1,'rgba(140,155,200,0)');g.fillStyle=q;g.beginPath();g.arc(p.x,p.y+12,p.r,0,6.283);g.fill()});
 ps.forEach(p=>{const q=g.createRadialGradient(p.x-p.r*.2,p.y-p.r*.4,0,p.x,p.y-p.r*.1,p.r);q.addColorStop(0,'rgba(255,251,246,.95)');q.addColorStop(.6,'rgba(255,238,228,.5)');q.addColorStop(1,'rgba(255,230,220,0)');g.fillStyle=q;g.beginPath();g.arc(p.x,p.y-p.r*.1,p.r,0,6.283);g.fill()});
 g.globalCompositeOperation='destination-in';const m=g.createLinearGradient(0,60,0,215);m.addColorStop(0,'#000');m.addColorStop(.7,'#000');m.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=m;g.fillRect(0,0,512,256);return c});
const LC=[...Array(46)].map(()=>({s:CS[Math.random()*6|0],x:(Math.random()-.5)*3.2,y:(Math.random()-.4)*1.6,z:.3+Math.random()*6}));
function lloop(now){if(ldead)return;const dt=Math.min(.05,(now-lt0)/1000||0);lt0=now;const W=lcv.width,H=lcv.height;lg.clearRect(0,0,W,H);
 lg.globalCompositeOperation='lighter';const sg2=lg.createRadialGradient(W*.64,H*.4,0,W*.64,H*.4,W*.5);sg2.addColorStop(0,'rgba(255,222,170,'+(.55+.08*Math.sin(now*.0006))+')');sg2.addColorStop(1,'rgba(255,180,140,0)');lg.fillStyle=sg2;lg.fillRect(0,0,W,H);lg.globalCompositeOperation='source-over';
 LC.sort((a,b)=>b.z-a.z).forEach(c=>{c.z-=L.sp*dt;c.x+=dt*.015;if(c.z<.22){c.z=6.2;c.x=(Math.random()-.5)*3.2;c.y=(Math.random()-.4)*1.6}
  const sw=W*.55/c.z,sh=sw*.5,sx=W/2+c.x*W*.35/c.z-sw/2,sy=H*.5+c.y*H*.35/c.z-sh/2,al=Math.min(1,(6.2-c.z)/1.6)*Math.min(1,(c.z-.22)/.5);lg.globalAlpha=Math.max(0,al)*.95;lg.drawImage(c.s,sx,sy,sw,sh)});
 lg.globalAlpha=1;if(L.fl>0){lg.fillStyle='rgba(255,248,240,'+L.fl+')';lg.fillRect(0,0,W,H)}
 requestAnimationFrame(lloop)}
requestAnimationFrame(lloop);
if(window.gsap){const o={p:0};gsap.to(o,{p:100,duration:4,ease:'power1.inOut',onUpdate:()=>{$('#pct').textContent=Math.round(o.p)+'%';$('#cfr').setAttribute('y',130-1.3*o.p);L.sp=.22+o.p*.006},onComplete:()=>
 gsap.timeline().to('.lcenter',{scale:1.6,opacity:0,duration:.8,ease:'power2.in'}).to(L,{sp:7,duration:1.6,ease:'power2.in'},0).to(L,{fl:.9,duration:.7,ease:'power1.in'},1).to(loader,{opacity:0,duration:.9,ease:'power1.inOut'},1.5).from('.hero>*',{y:50,opacity:0,stagger:.15,duration:1,ease:'power3.out'},'-=.6').add(()=>{ldead=true;loader.remove()})})}
else{ldead=true;loader.remove()}
onScroll();
})();
