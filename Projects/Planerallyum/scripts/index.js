let renderer, scene, camera, controls;
function main(){
    const Ada = document.getElementById('Ada'); Ada.borderColor = 'rgb(180,60,45)';
    const Desper = document.getElementById('Desper'); Desper.borderColor = 'rgb(85,69,80)';
    const Aroy = document.getElementById('Aroy'); Aroy.borderColor = 'rgb(25,102,255)';
    const Heie = document.getElementById('Heie'); Heie.borderColor = 'rgb(102,204,255)';
    const Weia = document.getElementById('Weia'); Weia.borderColor = 'rgb(32,161,129)';
    const Trichotus = document.getElementById('Trichotus'); Trichotus.borderColor = 'rgb(210,255,255)';
    const Xi = document.getElementById('Xi'); Xi.borderColor = 'rgb(60,160,255)';
    const DOMPs = [Ada, Desper, Aroy, Heie, Weia, Trichotus, Xi];
    function swap(p){
        for(let j=0;j<DOMPs.length;j++){
            if(Planets[j].name == p.name){
                Target = p;
                DOMPs[j].style.borderColor = DOMPs[j].borderColor;
            }else{
                DOMPs[j].style.borderColor = 'rgb(30,30,30)';
            }
        }
    }
    Ada.addEventListener('click',()=>{swap(Planets[0])});
    Desper.addEventListener('click',()=>{swap(Planets[1])});
    Aroy.addEventListener('click',()=>{swap(Planets[2])});
    Heie.addEventListener('click',()=>{swap(Planets[3])});
    Weia.addEventListener('click',()=>{swap(Planets[4])});
    Trichotus.addEventListener('click',()=>{swap(Planets[5])});
    Xi.addEventListener('click',()=>{swap(Planets[6])});
    
    function VecSubstr(e1,e2){
        return new THREE.Vector3(
            e1.x - e2.x,
            e1.y - e2.y,
            e1.z - e2.z
        );
    }
    const canvas = document.querySelector('#C');
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,8192);
    scene.add(camera);
    
    renderer = new THREE.WebGLRenderer({canvas:canvas,antialiasing:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000,0);
    renderer.autoClear=false;
    
    // background
    const BgGeometry = new THREE.SphereGeometry(4096,128,128);
    const BgMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('assets/galaxy.png'),
        side: THREE.BackSide
    });
    const BgMesh = new THREE.Mesh(BgGeometry,BgMaterial);
    BgMesh.position.set(0,0,0);
    scene.add(BgMesh);
    
    // light
    const ambientlight = new THREE.AmbientLight(0xffffff,.2);
    const pointerlight = new THREE.PointLight(0xffffff,.8);
    pointerlight.position.set(0,0,0);
    scene.add(ambientlight);
    scene.add(pointerlight);
    
    // star
    const StarGeometry = new THREE.SphereGeometry(5,64,64);
    const StarMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('assets/BlueStar.png'),
        emissive: 0x40a0ff,
        side: THREE.BackSide
    });
    const StarMesh = new THREE.Mesh(StarGeometry,StarMaterial);
    StarMesh.position.set(0,0,0);
    scene.add(StarMesh);
    
    // controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.target.set(-500,0,0);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    controls.maxDistance = 20;
    controls.minDistance = 2.5;
    controls.enablePan = false;
    camera.lookAt(new THREE.Vector3(-500,0,0));
    camera.position.set(-504,0,0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    
    // shaders
    var vertexShader=[
        'precision highp float;',
        'precision highp int;',
        
        'attribute vec4 a_position;',
        'varying vec4 v_position;',
        'varying mat4 v_model;',
        'uniform mat4 u_model;',
        'uniform mat4 u_projection;',
        'void main(){',
            'v_position = a_position;',
            'v_model = u_model;',
            'gl_Position = u_projection * u_model * a_position;',
        '}'
    ].join('\n');
    var fragmentShader=[
        '#define HIGHP',
        'precision highp float;',
        'precision highp int;',
        
        'const float PI = 3.14159263589793;',
        'const float MAX = 10000.0;',
        'const float PEAK = 0.1;',
        'const float FLARE = 0.0025;',
        'const float INTENSITY = 14.3;',
        'const float G_M = -0.85;',
        'const int numOutScatter = 3;',
        'const float fNumOutScatter = float(3);',
        'const int numInScatter = 3;',
        'const float fNumInScatter = float(3);',
        'varying vec4 v_position;',
        'varying mat4 v_model;',
        'uniform float u_innerRadius;',
        'uniform float u_outerRadius;',
        'uniform vec3 u_color;',
        'uniform vec2 u_resolution;',
        'uniform float u_time;',
        'uniform vec3 u_campos;',
        'uniform vec3 u_rcampos;',
        'uniform mat4 u_invproj;',
        'uniform vec3 u_light;',
        'vec2 rayIntersection(vec3 p, vec3 dir, float radius){',
            'float b = dot(p, dir);',
            'float c = dot(p, p) - radius * radius;',
            'float d = b * b - c;',
            'if(d < 0.0){',
                'return vec2(MAX, -MAX);',
            '}',
            'd = sqrt(d);',
            'float near = -b - d;',
            'float far = -b + d;',
            'return vec2(near, far);',
        '}',
        'float miePhase(float g, float c, float cc){',
            'float gg = g * g;',
            'float a = (1.0 - gg) * (1.0 + cc);',
            'float b = 1.0 + gg - 2.0 * g * c;',
            'b *= sqrt(b);',
            'b *= 2.0 + gg;',
            'return 1.5 * a / b;',
        '}',
        'float rayleighPhase(float cc){',
            'return 0.75 * (1.0 + cc);',
        '}',
        'float density(vec3 p){',
            'return exp(-(length(p) - u_innerRadius) * (4.0 / (u_outerRadius - u_innerRadius)));',
        '}',
        'float optic(vec3 p, vec3 q){',
            'vec3 step = (q - p) / fNumOutScatter;',
            'vec3 v = p + step * 0.5;',
            'float sum = 0.0;',
            'for(int i = 0; i < numOutScatter; i++){',
                'sum += density(v);',
                'v += step;',
            '}',
            'sum *= length(step)*(1.0 / (u_outerRadius - u_innerRadius));',
            'return sum;',
        '}',
        'vec3 inScatter(vec3 o, vec3 dir, vec2 e, vec3 l){',
            'float len = (e.y - e.x) / fNumInScatter;',
            'vec3 step = dir * len;',
            'vec3 p = o + dir * e.x;',
            'vec3 v = p + dir * (len * 0.5);',
            'vec3 sum = vec3(0.0);',
            'for(int i = 0; i < numInScatter; i++){',
                'vec2 f = rayIntersection(v, l, u_outerRadius);',
                'vec3 u = v + l * f.y;',
                'float n = (optic(p, v) + optic(v, u))*(PI * 4.0);',
                'sum += density(v) * exp(-n * (PEAK * u_color + FLARE));',
                'v += step;',
            '}',
            'sum *= len * (1.0 / (u_outerRadius - u_innerRadius));',
            'float c = dot(dir, -l);',
            'float cc = c * c;',
            'return sum * (PEAK * u_color * rayleighPhase(cc) + FLARE * miePhase(G_M, c, cc)) * INTENSITY;',
        '}',
        'vec3 rayDirection(){',
            'vec4 ray = v_model*v_position - vec4(u_campos, 1.0);',
            'return normalize(vec3(ray));',
        '}',
        'void main(){',
            'vec3 dir = rayDirection();',
            'vec3 eye = u_rcampos;',
            'vec3 l = u_light;',
            'vec2 e = rayIntersection(eye, dir, u_outerRadius);',
            'vec2 f = rayIntersection(eye, dir, u_innerRadius);',
            'e.y = min(e.y, f.x);',
            'vec3 result = inScatter(eye, dir, e, l);',
            'gl_FragColor = vec4(result, 1.0);',
            // 'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',
        '}'
    ].join('\n');
    
    // planets
    let Planets=[];
    let Atmospheres=[];
    let AtmoPos=[];
    let Clouds=[];
    let angs=[];
    function AddPlanet(name='Earth', radius=1, rot=.001, dst=100, pos=[-100,0,0], iang=0, shine=30, emissive=0x000000, displ=false, atmosphere=false, atmosphereRadIn=0, atmosphereRadOut=.1, atmosphereColor=new THREE.Vector3(1,1,1), clouds=false, cRot=.001){
        let PlanetGeometry = new THREE.SphereGeometry(radius,128,128);
        let PlanetMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('assets/'+name+'/map.png'),
            normalMap: new THREE.TextureLoader().load('assets/'+name+'/normal.png'),
            specularMap: new THREE.TextureLoader().load('assets/'+name+'/specular.png'),
            shininess: shine, emissive: emissive
        });
        if(emissive){PlanetMaterial.emissiveMap=new THREE.TextureLoader().load('assets/'+name+'/emissive.png')}
        if(displ){PlanetMaterial.displacementMap=new THREE.TextureLoader().load('assets/'+name+'/displacement.png');PlanetMaterial.displacementScale=.4}
        let PlanetMesh = new THREE.Mesh(PlanetGeometry,PlanetMaterial);
        PlanetMesh.position.set(pos[0],pos[1],pos[2]);
        PlanetMesh.scale.set(1,1,1);
        PlanetMesh.rotationSpeed = rot;
        PlanetMesh.name = name;
        PlanetMesh.dst = dst;
        PlanetMesh.ang = iang;
        angs.push(iang);
        Planets.push(PlanetMesh);
        scene.add(PlanetMesh);
        if(atmosphere){
            let AtmoGeometry = new THREE.SphereGeometry(1+radius,128,128);
            let PosAttr = AtmoGeometry.attributes.position;
            AtmoGeometry.setAttribute('a_position', new THREE.BufferAttribute(PosAttr.array, PosAttr.itemSize));
            let AtmoMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    u_model: {value: PlanetMesh.matrixWorld.elements},
                    u_projection: {value: new THREE.Matrix4().multiplyMatrices(camera.matrixWorldInverse,camera.projectionMatrix).elements},
                    u_invproj: {value: new THREE.Matrix4().multiplyMatrices(camera.matrixWorldInverse,camera.projectionMatrix).invert().elements},
                    u_innerRadius: {value: radius + atmosphereRadIn},
                    u_outerRadius: {value: radius + atmosphereRadOut},
                    u_color: {value: atmosphereColor},
                    u_resolution: {value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
                    u_time: {value: 0},
                    u_campos: {value: camera.position},
                    u_rcampos: {value: VecSubstr(camera.position,PlanetMesh.position)},
                    u_light: {value: VecSubstr(StarMesh.position,PlanetMesh.position).normalize()}
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.FrontSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                transparent: true
            });
            let AtmoMesh = new THREE.Mesh(AtmoGeometry,AtmoMaterial);
            AtmoMesh.position.set(pos[0],pos[1],pos[2]);
            Atmospheres.push(AtmoMaterial);
            AtmoPos.push(AtmoMesh);
            scene.add(AtmoMesh);
        }else{
            Atmospheres.push(false);
            AtmoPos.push(false);
        }
        if(clouds){
            let CloudGeometry =  new THREE.SphereGeometry(radius+.004,128,128);
            let CloudMaterial = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load('assets/'+name+'/clouds.png'),
                shininess: 0, specular: 0xffffff,
                transparent: true
            });
            let CloudMesh = new THREE.Mesh(CloudGeometry,CloudMaterial);
            CloudMesh.position.set(pos[0],pos[1],pos[2]);
            CloudMesh.rotationSpeed=cRot;
            Clouds.push(CloudMesh);
            scene.add(CloudMesh);
        }else{
            Clouds.push(false);
        }
    }
    function Update(p,a,ap,c){
        for(let i=0;i<a.length;i++){
            p[i].rotation.y+=p[i].rotationSpeed;
            p[i].ang+=.02/p[i].dst;
            nPos=[p[i].dst*Math.sin(p[i].ang),p[i].dst*Math.cos(p[i].ang)];
            let oldPos=window.structuredClone(Target.position);
            p[i].position.set(nPos[0],0,nPos[1]);
            if(Target==p[i]){
                controls.target.set(Target.position.x,0,Target.position.z);
                camera.lookAt(new THREE.Vector3(Target.position.x,0,Target.position.z));
                camera.position.x+=Target.position.x-oldPos.x;
                camera.position.z+=Target.position.z-oldPos.z;
            }
            camera.updateProjectionMatrix();
            camera.updateMatrixWorld();
            p[i].updateMatrixWorld();
            if(a[i]){
                ap[i].position.set(nPos[0],0,nPos[1]);
                a[i].uniforms['u_light'].value.copy(VecSubstr(StarMesh.position,p[i].position).normalize());
                a[i].uniforms['u_campos'].value.copy(camera.position);
                a[i].uniforms['u_rcampos'].value.copy(VecSubstr(camera.position,p[i].position));
                a[i].uniforms['u_model'].value=p[i].matrixWorld.elements;
                a[i].uniforms['u_projection'].value=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).elements;
                a[i].uniforms['u_invproj'].value=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).invert().elements;
            }
            if(c[i]){
                c[i].position.set(nPos[0],0,nPos[1]);
                c[i].rotation.y+=c[i].rotationSpeed;
            }
        }
    }
    AddPlanet('Ada', .8, .002, 80, [0,0,80], 0, 60, 0xff8000, true);
    AddPlanet('Desper', .7, -.0005, 175, [0,0,-175], Math.PI, 10, 0x000000, true);
    AddPlanet('Aroy', 1, -.001, 250, [0,0,250], 0, 15, 0x000000, true, true, .15, .5, new THREE.Vector3(.1,.4,1), false);
    AddPlanet('Heie', 1, -.0015, 500, [-500,0,0], 3*Math.PI/2, 15, 0x000000, false, true, -.01, .1, new THREE.Vector3(.2,.75,1), true, .001);
    AddPlanet('Weia', 1.4, -.001, 500, [500,0,0], Math.PI/2, 30, 0x000000, false, false, 0, .1, new THREE.Vector3(1,1,1), true, .002);
    AddPlanet('Trichotus', 1.5, -.0002, 1150, [1150,0,0], Math.PI/2, 45, 0x000000, true, true, .21, .4, new THREE.Vector3(.4,.8,.8));
    AddPlanet('Xi', 1.1, .0011, 1300, [0,0,-1300], Math.PI, 0, 0x000000, true);
    let Target = Planets[3];
    
    const animate=()=>{
        requestAnimationFrame(animate);
        StarMesh.rotation.y+=.002;
        Update(Planets,Atmospheres,AtmoPos,Clouds);
        renderer.render(scene,camera);
        controls.update();
    }
    animate();
    
    window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)});
    window.onload=()=>{document.getElementById('S').style.display='none'}
}
window.addEventListener('DOMContentLoaded',main);