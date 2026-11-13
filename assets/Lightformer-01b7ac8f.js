import{N as J,au as K,av as Q,D as W,aw as Z,ax as F,ay as C,az as U,aA as $,v as j,am as ee,aB as re,aC as te,s as ne,aD as ae,c as x,aE as oe,ap as ie,u as se,aF as le,aG as ce,_ as Y,at as ue,V as de}from"./react-three-fiber.esm-227a59f8.js";import{r as i}from"./index-a62ff58e.js";import{m as me}from"./react-merge-refs.esm-239dbb3c.js";const he=e=>e&&e.isCubeTexture;class _e extends J{constructor(o,l){var u,s;const n=he(o),d=((u=n?(s=o.image[0])===null||s===void 0?void 0:s.width:o.image.width)!=null?u:1024)/4,p=Math.floor(Math.log2(d)),v=Math.pow(2,p),k=3*Math.max(v,16*7),R=4*v,P=[n?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/k}`,`#define CUBEUV_TEXEL_HEIGHT ${1/R}`,`#define CUBEUV_MAX_MIP ${p}.0`],L=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,I=P.join(`
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
        `,A={map:{value:o},height:{value:(l==null?void 0:l.height)||15},radius:{value:(l==null?void 0:l.radius)||100}},G=new K(1,16),y=new Q({uniforms:A,fragmentShader:I,vertexShader:L,side:W});super(G,y)}set radius(o){this.material.uniforms.radius.value=o}get radius(){return this.material.uniforms.radius.value}set height(o){this.material.uniforms.height.value=o}get height(){return this.material.uniforms.height.value}}class ge extends Z{constructor(o){super(o),this.type=F}parse(o){const d=function(r,m){switch(r){case 1:console.error("THREE.RGBELoader Read Error: "+(m||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(m||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(m||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(m||""))}return-1},R=`
`,P=function(r,m,f){m=m||1024;let g=r.pos,h=-1,t=0,E="",a=String.fromCharCode.apply(null,new Uint16Array(r.subarray(g,g+128)));for(;0>(h=a.indexOf(R))&&t<m&&g<r.byteLength;)E+=a,t+=a.length,g+=128,a+=String.fromCharCode.apply(null,new Uint16Array(r.subarray(g,g+128)));return-1<h?(f!==!1&&(r.pos+=t+h+1),E+a.slice(0,h)):!1},L=function(r){const m=/^#\?(\S+)/,f=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,_=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,g=/^\s*FORMAT=(\S+)\s*$/,h=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,t={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let E,a;if(r.pos>=r.byteLength||!(E=P(r)))return d(1,"no header found");if(!(a=E.match(m)))return d(3,"bad initial token");for(t.valid|=1,t.programtype=a[1],t.string+=E+`
`;E=P(r),E!==!1;){if(t.string+=E+`
`,E.charAt(0)==="#"){t.comments+=E+`
`;continue}if((a=E.match(f))&&(t.gamma=parseFloat(a[1])),(a=E.match(_))&&(t.exposure=parseFloat(a[1])),(a=E.match(g))&&(t.valid|=2,t.format=a[1]),(a=E.match(h))&&(t.valid|=4,t.height=parseInt(a[1],10),t.width=parseInt(a[2],10)),t.valid&2&&t.valid&4)break}return t.valid&2?t.valid&4?t:d(3,"missing image size specifier"):d(3,"missing format specifier")},I=function(r,m,f){const _=m;if(_<8||_>32767||r[0]!==2||r[1]!==2||r[2]&128)return new Uint8Array(r);if(_!==(r[2]<<8|r[3]))return d(3,"wrong scanline width");const g=new Uint8Array(4*m*f);if(!g.length)return d(4,"unable to allocate buffer space");let h=0,t=0;const E=4*_,a=new Uint8Array(4),T=new Uint8Array(E);let z=f;for(;z>0&&t<r.byteLength;){if(t+4>r.byteLength)return d(1);if(a[0]=r[t++],a[1]=r[t++],a[2]=r[t++],a[3]=r[t++],a[0]!=2||a[1]!=2||(a[2]<<8|a[3])!=_)return d(3,"bad rgbe scanline format");let S=0,w;for(;S<E&&t<r.byteLength;){w=r[t++];const B=w>128;if(B&&(w-=128),w===0||S+w>E)return d(3,"bad scanline data");if(B){const M=r[t++];for(let H=0;H<w;H++)T[S++]=M}else T.set(r.subarray(t,t+w),S),S+=w,t+=w}const X=_;for(let B=0;B<X;B++){let M=0;g[h]=T[B+M],M+=_,g[h+1]=T[B+M],M+=_,g[h+2]=T[B+M],M+=_,g[h+3]=T[B+M],h+=4}z--}return g},A=function(r,m,f,_){const g=r[m+3],h=Math.pow(2,g-128)/255;f[_+0]=r[m+0]*h,f[_+1]=r[m+1]*h,f[_+2]=r[m+2]*h,f[_+3]=1},G=function(r,m,f,_){const g=r[m+3],h=Math.pow(2,g-128)/255;f[_+0]=U.toHalfFloat(Math.min(r[m+0]*h,65504)),f[_+1]=U.toHalfFloat(Math.min(r[m+1]*h,65504)),f[_+2]=U.toHalfFloat(Math.min(r[m+2]*h,65504)),f[_+3]=U.toHalfFloat(1)},y=new Uint8Array(o);y.pos=0;const b=L(y);if(b!==-1){const r=b.width,m=b.height,f=I(y.subarray(y.pos),r,m);if(f!==-1){let _,g,h;switch(this.type){case C:h=f.length/4;const t=new Float32Array(h*4);for(let a=0;a<h;a++)A(f,a*4,t,a*4);_=t,g=C;break;case F:h=f.length/4;const E=new Uint16Array(h*4);for(let a=0;a<h;a++)G(f,a*4,E,a*4);_=E,g=F;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:r,height:m,data:_,header:b.string,gamma:b.gamma,exposure:b.exposure,type:g}}}return null}setDataType(o){return this.type=o,this}load(o,l,u,s){function n(c,d){switch(c.type){case C:case F:c.encoding=$,c.minFilter=j,c.magFilter=j,c.generateMipmaps=!1,c.flipY=!0;break}l&&l(c,d)}return super.load(o,n,u,s)}}const D={sunset:"venice/venice_sunset_1k.hdr",dawn:"kiara/kiara_1_dawn_1k.hdr",night:"dikhololo/dikhololo_night_1k.hdr",warehouse:"empty-wharehouse/empty_warehouse_01_1k.hdr",forest:"forrest-slope/forest_slope_1k.hdr",apartment:"lebombo/lebombo_1k.hdr",studio:"studio-small-3/studio_small_03_1k.hdr",city:"potsdamer-platz/potsdamer_platz_1k.hdr",park:"rooitou/rooitou_park_1k.hdr",lobby:"st-fagans/st_fagans_interior_1k.hdr"},fe="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/";function q({files:e=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"],path:o="",preset:l=void 0,encoding:u=void 0,extensions:s}={}){if(l){if(!(l in D))throw new Error("Preset must be one of: "+Object.keys(D).join(", "));e=D[l],o=fe}const n=Array.isArray(e),d=ee(n?ae:ge,n?[e]:e,v=>{v.setPath(o),s&&s(v)}),p=n?d[0]:d;return p.mapping=n?re:te,p.encoding=u??n?ne:$,p}const Ee=e=>e.current&&e.current.isScene,pe=e=>Ee(e)?e.current:e;function V(e,o,l,u,s=0){const n=pe(o||l),c=n.background,d=n.environment,p=n.backgroundBlurriness||0;return e!=="only"&&(n.environment=u),e&&(n.background=u),e&&n.backgroundBlurriness!==void 0&&(n.backgroundBlurriness=s),()=>{e!=="only"&&(n.environment=d),e&&(n.background=c),e&&n.backgroundBlurriness!==void 0&&(n.backgroundBlurriness=p)}}function N({scene:e,background:o=!1,blur:l,map:u}){const s=x(n=>n.scene);return i.useLayoutEffect(()=>{if(u)return V(o,e,s,u,l)},[s,e,u,o,l]),null}function O({background:e=!1,scene:o,blur:l,...u}){const s=q(u),n=x(c=>c.scene);return i.useLayoutEffect(()=>V(e,o,n,s,l),[s,e,o,n,l]),null}function ve({children:e,near:o=1,far:l=1e3,resolution:u=256,frames:s=1,map:n,background:c=!1,blur:d,scene:p,files:v,path:k,preset:R=void 0,extensions:P}){const L=x(r=>r.gl),I=x(r=>r.scene),A=i.useRef(null),[G]=i.useState(()=>new oe),y=i.useMemo(()=>{const r=new ie(u);return r.texture.type=F,r},[u]);i.useLayoutEffect(()=>(s===1&&A.current.update(L,G),V(c,p,I,y.texture,d)),[e,G,y.texture,p,I,c,s,L]);let b=1;return se(()=>{(s===1/0||b<s)&&(A.current.update(L,G),b++)}),i.createElement(i.Fragment,null,le(i.createElement(i.Fragment,null,e,i.createElement("cubeCamera",{ref:A,args:[o,l,y]}),v||R?i.createElement(O,{background:!0,files:v,preset:R,path:k,extensions:P}):n?i.createElement(N,{background:!0,map:n,extensions:P}):null),G))}function Re(e){var o,l,u,s;const n=q(e),c=e.map||n;i.useMemo(()=>ce({GroundProjectedEnvImpl:_e}),[]);const d=i.useMemo(()=>[c],[c]),p=(o=e.ground)==null?void 0:o.height,v=(l=e.ground)==null?void 0:l.radius,k=(u=(s=e.ground)==null?void 0:s.scale)!==null&&u!==void 0?u:1e3;return i.createElement(i.Fragment,null,i.createElement(N,Y({},e,{map:c})),i.createElement("groundProjectedEnvImpl",{args:d,scale:k,height:p,radius:v}))}function Be(e){return e.ground?i.createElement(Re,e):e.map?i.createElement(N,e):e.children?i.createElement(ve,e):i.createElement(O,e)}const Me=i.forwardRef(({args:e,map:o,toneMapped:l=!1,color:u="white",form:s="rect",intensity:n=1,scale:c=1,target:d,children:p,...v},k)=>{const R=i.useRef(null);return i.useLayoutEffect(()=>{!p&&!v.material&&(ue(R.current.material,{color:u}),R.current.material.color.multiplyScalar(n))},[u,n,p,v.material]),i.useLayoutEffect(()=>{d&&R.current.lookAt(Array.isArray(d)?new de(...d):d)},[d]),c=Array.isArray(c)&&c.length===2?[c[0],c[1],1]:c,i.createElement("mesh",Y({ref:me([R,k]),scale:c},v),s==="circle"?i.createElement("ringGeometry",{args:[0,1,64]}):s==="ring"?i.createElement("ringGeometry",{args:[.5,1,64]}):s==="rect"?i.createElement("planeGeometry",null):i.createElement(s,{args:e}),p||(v.material?null:i.createElement("meshBasicMaterial",{toneMapped:l,map:o,side:W})))});export{Be as E,Me as L};
