import{r as l,j as f}from"./index-a31822ea.js";import{M as ce,I as ue,S as de,D as Z,a as me,H as A,F as V,b as U,L as ee,c as J,_ as O,d as he,u as fe,C as pe,E as ge,s as Ee,e as _e,f as D,g as ve,W as ye,h as te,i as Re,j as xe,k as we,V as be,l as Me,m as re,n as ne}from"./react-three-fiber.esm-e76f8b6f.js";import{m as Be}from"./react-merge-refs.esm-239dbb3c.js";import{F as Se}from"./Float-153c3319.js";import{t as ke}from"./BufferGeometryUtils-ff931a97.js";const Pe=e=>e&&e.isCubeTexture;class Ie extends ce{constructor(r,i){var o,n;const t=Pe(r),u=((o=t?(n=r.image[0])===null||n===void 0?void 0:n.width:r.image.width)!=null?o:1024)/4,h=Math.floor(Math.log2(u)),v=Math.pow(2,h),b=3*Math.max(v,16*7),x=4*v,M=[t?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/b}`,`#define CUBEUV_TEXEL_HEIGHT ${1/x}`,`#define CUBEUV_MAX_MIP ${h}.0`],w=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,C=M.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <encodings_fragment>
        }
        `,L={map:{value:r},height:{value:(i==null?void 0:i.height)||15},radius:{value:(i==null?void 0:i.radius)||100}},j=new ue(1,16),B=new de({uniforms:L,fragmentShader:C,vertexShader:w,side:Z});super(j,B)}set radius(r){this.material.uniforms.radius.value=r}get radius(){return this.material.uniforms.radius.value}set height(r){this.material.uniforms.height.value=r}get height(){return this.material.uniforms.height.value}}class Te extends me{constructor(r){super(r),this.type=A}parse(r){const u=function(s,p){switch(s){case 1:console.error("THREE.RGBELoader Read Error: "+(p||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(p||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(p||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(p||""))}return-1},x=`
`,M=function(s,p,y){p=p||1024;let _=s.pos,g=-1,d=0,R="",m=String.fromCharCode.apply(null,new Uint16Array(s.subarray(_,_+128)));for(;0>(g=m.indexOf(x))&&d<p&&_<s.byteLength;)R+=m,d+=m.length,_+=128,m+=String.fromCharCode.apply(null,new Uint16Array(s.subarray(_,_+128)));return-1<g?(y!==!1&&(s.pos+=d+g+1),R+m.slice(0,g)):!1},w=function(s){const p=/^#\?(\S+)/,y=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,E=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,_=/^\s*FORMAT=(\S+)\s*$/,g=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,d={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let R,m;if(s.pos>=s.byteLength||!(R=M(s)))return u(1,"no header found");if(!(m=R.match(p)))return u(3,"bad initial token");for(d.valid|=1,d.programtype=m[1],d.string+=R+`
`;R=M(s),R!==!1;){if(d.string+=R+`
`,R.charAt(0)==="#"){d.comments+=R+`
`;continue}if((m=R.match(y))&&(d.gamma=parseFloat(m[1])),(m=R.match(E))&&(d.exposure=parseFloat(m[1])),(m=R.match(_))&&(d.valid|=2,d.format=m[1]),(m=R.match(g))&&(d.valid|=4,d.height=parseInt(m[1],10),d.width=parseInt(m[2],10)),d.valid&2&&d.valid&4)break}return d.valid&2?d.valid&4?d:u(3,"missing image size specifier"):u(3,"missing format specifier")},C=function(s,p,y){const E=p;if(E<8||E>32767||s[0]!==2||s[1]!==2||s[2]&128)return new Uint8Array(s);if(E!==(s[2]<<8|s[3]))return u(3,"wrong scanline width");const _=new Uint8Array(4*p*y);if(!_.length)return u(4,"unable to allocate buffer space");let g=0,d=0;const R=4*E,m=new Uint8Array(4),F=new Uint8Array(R);let X=y;for(;X>0&&d<s.byteLength;){if(d+4>s.byteLength)return u(1);if(m[0]=s[d++],m[1]=s[d++],m[2]=s[d++],m[3]=s[d++],m[0]!=2||m[1]!=2||(m[2]<<8|m[3])!=E)return u(3,"bad rgbe scanline format");let G=0,P;for(;G<R&&d<s.byteLength;){P=s[d++];const I=P>128;if(I&&(P-=128),P===0||G+P>R)return u(3,"bad scanline data");if(I){const T=s[d++];for(let K=0;K<P;K++)F[G++]=T}else F.set(s.subarray(d,d+P),G),G+=P,d+=P}const le=E;for(let I=0;I<le;I++){let T=0;_[g]=F[I+T],T+=E,_[g+1]=F[I+T],T+=E,_[g+2]=F[I+T],T+=E,_[g+3]=F[I+T],g+=4}X--}return _},L=function(s,p,y,E){const _=s[p+3],g=Math.pow(2,_-128)/255;y[E+0]=s[p+0]*g,y[E+1]=s[p+1]*g,y[E+2]=s[p+2]*g,y[E+3]=1},j=function(s,p,y,E){const _=s[p+3],g=Math.pow(2,_-128)/255;y[E+0]=U.toHalfFloat(Math.min(s[p+0]*g,65504)),y[E+1]=U.toHalfFloat(Math.min(s[p+1]*g,65504)),y[E+2]=U.toHalfFloat(Math.min(s[p+2]*g,65504)),y[E+3]=U.toHalfFloat(1)},B=new Uint8Array(r);B.pos=0;const k=w(B);if(k!==-1){const s=k.width,p=k.height,y=C(B.subarray(B.pos),s,p);if(y!==-1){let E,_,g;switch(this.type){case V:g=y.length/4;const d=new Float32Array(g*4);for(let m=0;m<g;m++)L(y,m*4,d,m*4);E=d,_=V;break;case A:g=y.length/4;const R=new Uint16Array(g*4);for(let m=0;m<g;m++)j(y,m*4,R,m*4);E=R,_=A;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:s,height:p,data:E,header:k.string,gamma:k.gamma,exposure:k.exposure,type:_}}}return null}setDataType(r){return this.type=r,this}load(r,i,o,n){function t(a,u){switch(a.type){case V:case A:a.encoding=ee,a.minFilter=J,a.magFilter=J,a.generateMipmaps=!1,a.flipY=!0;break}i&&i(a,u)}return super.load(r,t,o,n)}}const S=1e-5;function je(e,r,i){const o=new he,n=i-S;return o.absarc(S,S,S,-Math.PI/2,-Math.PI,!0),o.absarc(S,r-n*2,S,Math.PI,Math.PI/2,!0),o.absarc(e-n*2,r-n*2,S,Math.PI/2,0,!0),o.absarc(e-n*2,S,S,0,-Math.PI/2,!0),o}const Q=l.forwardRef(function({args:[r=1,i=1,o=1]=[],radius:n=.05,steps:t=1,smoothness:a=4,creaseAngle:u=.4,children:h,...v},b){const x=l.useMemo(()=>je(r,i,n),[r,i,n]),M=l.useMemo(()=>({depth:o-n*2,bevelEnabled:!0,bevelSegments:a*2,steps:t,bevelSize:n-S,bevelThickness:n,curveSegments:a}),[o,n,a]),w=l.useRef();return l.useLayoutEffect(()=>{w.current&&(w.current.center(),ke(w.current,u))},[x,M]),l.createElement("mesh",O({ref:b},v),l.createElement("extrudeGeometry",{ref:w,args:[x,M]}),h)}),H={sunset:"venice/venice_sunset_1k.hdr",dawn:"kiara/kiara_1_dawn_1k.hdr",night:"dikhololo/dikhololo_night_1k.hdr",warehouse:"empty-wharehouse/empty_warehouse_01_1k.hdr",forest:"forrest-slope/forest_slope_1k.hdr",apartment:"lebombo/lebombo_1k.hdr",studio:"studio-small-3/studio_small_03_1k.hdr",city:"potsdamer-platz/potsdamer_platz_1k.hdr",park:"rooitou/rooitou_park_1k.hdr",lobby:"st-fagans/st_fagans_interior_1k.hdr"},Le="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/";function oe({files:e=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"],path:r="",preset:i=void 0,encoding:o=void 0,extensions:n}={}){if(i){if(!(i in H))throw new Error("Preset must be one of: "+Object.keys(H).join(", "));e=H[i],r=Le}const t=Array.isArray(e),u=fe(t?_e:Te,t?[e]:e,v=>{v.setPath(r),n&&n(v)}),h=t?u[0]:u;return h.mapping=t?pe:ge,h.encoding=o??t?Ee:ee,h}const Ce=e=>e.current&&e.current.isScene,Fe=e=>Ce(e)?e.current:e;function Y(e,r,i,o,n=0){const t=Fe(r||i),a=t.background,u=t.environment,h=t.backgroundBlurriness||0;return e!=="only"&&(t.environment=o),e&&(t.background=o),e&&t.backgroundBlurriness!==void 0&&(t.backgroundBlurriness=n),()=>{e!=="only"&&(t.environment=u),e&&(t.background=a),e&&t.backgroundBlurriness!==void 0&&(t.backgroundBlurriness=h)}}function q({scene:e,background:r=!1,blur:i,map:o}){const n=D(t=>t.scene);return l.useLayoutEffect(()=>{if(o)return Y(r,e,n,o,i)},[n,e,o,r,i]),null}function ae({background:e=!1,scene:r,blur:i,...o}){const n=oe(o),t=D(a=>a.scene);return l.useLayoutEffect(()=>Y(e,r,t,n,i),[n,e,r,t,i]),null}function Ge({children:e,near:r=1,far:i=1e3,resolution:o=256,frames:n=1,map:t,background:a=!1,blur:u,scene:h,files:v,path:b,preset:x=void 0,extensions:M}){const w=D(s=>s.gl),C=D(s=>s.scene),L=l.useRef(null),[j]=l.useState(()=>new ve),B=l.useMemo(()=>{const s=new ye(o);return s.texture.type=A,s},[o]);l.useLayoutEffect(()=>(n===1&&L.current.update(w,j),Y(a,h,C,B.texture,u)),[e,j,B.texture,h,C,a,n,w]);let k=1;return te(()=>{(n===1/0||k<n)&&(L.current.update(w,j),k++)}),l.createElement(l.Fragment,null,Re(l.createElement(l.Fragment,null,e,l.createElement("cubeCamera",{ref:L,args:[r,i,B]}),v||x?l.createElement(ae,{background:!0,files:v,preset:x,path:b,extensions:M}):t?l.createElement(q,{background:!0,map:t,extensions:M}):null),j))}function Ae(e){var r,i,o,n;const t=oe(e),a=e.map||t;l.useMemo(()=>xe({GroundProjectedEnvImpl:Ie}),[]);const u=l.useMemo(()=>[a],[a]),h=(r=e.ground)==null?void 0:r.height,v=(i=e.ground)==null?void 0:i.radius,b=(o=(n=e.ground)==null?void 0:n.scale)!==null&&o!==void 0?o:1e3;return l.createElement(l.Fragment,null,l.createElement(q,O({},e,{map:a})),l.createElement("groundProjectedEnvImpl",{args:u,scale:b,height:h,radius:v}))}function Ue(e){return e.ground?l.createElement(Ae,e):e.map?l.createElement(q,e):e.children?l.createElement(Ge,e):l.createElement(ae,e)}const N=l.forwardRef(({args:e,map:r,toneMapped:i=!1,color:o="white",form:n="rect",intensity:t=1,scale:a=1,target:u,children:h,...v},b)=>{const x=l.useRef(null);return l.useLayoutEffect(()=>{!h&&!v.material&&(we(x.current.material,{color:o}),x.current.material.color.multiplyScalar(t))},[o,t,h,v.material]),l.useLayoutEffect(()=>{u&&x.current.lookAt(Array.isArray(u)?new be(...u):u)},[u]),a=Array.isArray(a)&&a.length===2?[a[0],a[1],1]:a,l.createElement("mesh",O({ref:Be([x,b]),scale:a},v),n==="circle"?l.createElement("ringGeometry",{args:[0,1,64]}):n==="ring"?l.createElement("ringGeometry",{args:[.5,1,64]}):n==="rect"?l.createElement("planeGeometry",null):l.createElement(n,{args:e}),h||(v.material?null:l.createElement("meshBasicMaterial",{toneMapped:i,map:r,side:Z})))}),W=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,c={kw:"#C084FC",cls:"#22D3EE",str:"#86EFAC",attr:"#93C5FD",txt:"#E2E8F0",dim:"#475569"},se=[[["const ",c.kw],["henrick",c.cls],[" = {",c.txt]],[["  role",c.attr],[": ",c.txt],['"full stack dev"',c.str],[",",c.txt]],[["  degree",c.attr],[": ",c.txt],['"B.Sc. Computer Science"',c.str],[",",c.txt]],[["  stack",c.attr],[": [",c.txt],['"react"',c.str],[", ",c.txt],['"next"',c.str],[", ",c.txt],['"node"',c.str],[", ",c.txt],['"gcp"',c.str],["],",c.txt]],[["  rn",c.attr],[": [",c.txt],['"shipping web apps"',c.str],[", ",c.txt],['"messing with Three.js"',c.str],["],",c.txt]],[["  offline",c.attr],[": [",c.txt],['"video games"',c.str],[", ",c.txt],['"puzzles"',c.str],["],",c.txt]],[["  vibe",c.attr],[": ",c.txt],[`"if it works, don't touch it"`,c.str],[",",c.txt]],[["};",c.txt]],[],[["export default ",c.kw],["henrick",c.cls],[";",c.txt]]],z=se.reduce((e,r)=>e+r.reduce((i,[o])=>i+o.length,0)+1,0),$=1024,ie=660,De=(e,r,i)=>{e.fillStyle="#0B1224",e.fillRect(0,0,$,ie),e.fillStyle="#111A33",e.fillRect(0,0,$,54),["#F87171","#FBBF24","#34D399"].forEach((h,v)=>{e.fillStyle=h,e.beginPath(),e.arc(30+v*28,27,9,0,Math.PI*2),e.fill()}),e.fillStyle="#0B1224",e.fillRect(130,10,190,44),e.fillStyle="#3B82F6",e.fillRect(130,10,190,3),e.font="500 22px ui-monospace, Menlo, Consolas, monospace",e.fillStyle=c.txt,e.fillText("henrick.js",155,40),e.font="500 27px ui-monospace, Menlo, Consolas, monospace";const o=44,n=78;let t=104,a=r,u=null;se.forEach((h,v)=>{e.fillStyle=c.dim,e.fillText(String(v+1).padStart(2," "),18,t);let b=n;for(const[x,M]of h){if(a<=0)break;const w=x.slice(0,a);a-=w.length,e.fillStyle=M,e.fillText(w,b,t),b+=e.measureText(w).width}a>0&&(a-=1),u===null&&a<=0&&(u=[b,t]),t+=o}),i&&u&&(e.fillStyle="#3B82F6",e.fillRect(u[0]+2,u[1]-26,13,32))},Ve=()=>{const{canvas:e,texture:r}=l.useMemo(()=>{const o=document.createElement("canvas");o.width=$,o.height=ie;const n=new re(o);return n.colorSpace=ne,n.anisotropy=8,{canvas:o,texture:n}},[]),i=l.useRef({chars:W?z:0,acc:0,hold:0,last:""});return l.useEffect(()=>()=>r.dispose(),[r]),te((o,n)=>{const t=i.current;if(t.acc+=n,!W)if(t.chars<z)for(;t.acc>.022&&t.chars<z;)t.chars+=1,t.acc-=.022;else t.hold+=n,t.hold>6&&(t.chars=0,t.hold=0),t.acc=0;const a=Math.floor(o.clock.elapsedTime*2)%2===0,u=`${t.chars}-${a}`;u!==t.last&&(De(e.getContext("2d"),t.chars,a),r.needsUpdate=!0,t.last=u)}),r},He=()=>l.useMemo(()=>{const e=document.createElement("canvas");e.width=1024,e.height=400;const r=e.getContext("2d");r.fillStyle="#0A0F1E",r.fillRect(0,0,1024,400),[14,14,13,12].forEach((n,t)=>{const a=68.4931506849315,u=(1024-n*a)/2;for(let h=0;h<n;h++)r.fillStyle="#1E293B",r.fillRect(u+h*a+4,14+t*78,a-8,66),r.fillStyle="rgba(59,130,246,0.55)",r.fillRect(u+h*a+4,14+t*78+62,a-8,4)}),r.fillStyle="#1E293B",r.fillRect(300,14+4*78,424,66);const o=new re(e);return o.colorSpace=ne,o},[]),Ne=()=>{const e=Ve(),r=He(),i={color:"#1E293B",metalness:.85,roughness:.28};return f.jsxs("group",{rotation:[.18,-.28,0],position:[0,-.75,0],scale:.88,children:[f.jsx(Q,{args:[3.4,.12,2.3],radius:.05,smoothness:4,children:f.jsx("meshStandardMaterial",{...i})}),f.jsxs("mesh",{"rotation-x":-Math.PI/2,position:[0,.062,-.35],children:[f.jsx("planeGeometry",{args:[3,1.17]}),f.jsx("meshBasicMaterial",{map:r,toneMapped:!1})]}),f.jsxs("mesh",{"rotation-x":-Math.PI/2,position:[0,.062,.7],children:[f.jsx("planeGeometry",{args:[1.1,.6]}),f.jsx("meshStandardMaterial",{color:"#0F172A",metalness:.6,roughness:.4})]}),f.jsxs("group",{position:[0,.06,-1.13],"rotation-x":-.22,children:[f.jsx(Q,{args:[3.4,2.2,.08],radius:.04,smoothness:4,position:[0,1.1,0],children:f.jsx("meshStandardMaterial",{...i})}),f.jsxs("mesh",{position:[0,1.12,.042],children:[f.jsx("planeGeometry",{args:[3.2,2.06]}),f.jsx("meshBasicMaterial",{map:e,toneMapped:!1})]}),f.jsx("pointLight",{position:[0,1.1,1.2],intensity:1.2,distance:4,color:"#3B82F6"})]})]})},ze=({isMobile:e})=>f.jsx("group",{scale:e?1.15:1.25,position:[e?0:-.1,e?.1:.2,0],children:f.jsx(Se,{speed:W?0:1.4,rotationIntensity:.25,floatIntensity:.6,children:f.jsx(Ne,{})})}),Xe=()=>{const e=typeof window<"u"&&window.matchMedia("(max-width: 640px)").matches;return f.jsxs(Me,{dpr:[1,1.5],camera:{position:[0,1.4,8],fov:42},children:[f.jsx("ambientLight",{intensity:.35}),f.jsx("directionalLight",{position:[3,5,4],intensity:1}),f.jsx("pointLight",{position:[-5,2,3],intensity:1,color:"#22D3EE"}),f.jsxs(Ue,{resolution:128,children:[f.jsx(N,{form:"rect",intensity:3,color:"#3B82F6",position:[-4,2,4],scale:[4,3,1],target:[0,0,0]}),f.jsx(N,{form:"rect",intensity:2.5,color:"#22D3EE",position:[4,3,3],scale:[3,2,1],target:[0,0,0]}),f.jsx(N,{form:"rect",intensity:1.5,color:"#ffffff",position:[0,6,-2],scale:[6,1,1],target:[0,0,0]})]}),f.jsx(ze,{isMobile:e})]})};export{Xe as default};
