window.addEventListener('DOMContentLoaded',()=>{
let renderer, scene, camera, sphereBg, nucleus, stars, controls, container = document.getElementById('CanvasContainer'), timeout_Debounce, noise = new SimplexNoise(), cameraSpeed = 0, blobScale = 2;

init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,.01,1000);
    camera.position.set(0,0,400);
    
    const directionalLight = new THREE.DirectionalLight("#fff", 2);
    directionalLight.position.set(0,50,0);
    scene.add(directionalLight);
    
    let ambientLight = new THREE.AmbientLight("#ff0000",1);
    ambientLight.position.set(0, 20, 20); scene.add(ambientLight);
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // OrbitControl
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 4;
    controls.maxDistance = 400;
    controls.minDistance = 100;
    controls.enablePan = false;
    const loader = new THREE.TextureLoader();
    const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    const textureStar = loader.load('https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png');
    const texture1 = loader.load('https://i.ibb.co/F8by6wW/p2-b3gnym.png');
    const texture2 = loader.load('https://i.ibb.co/yYS2yx5/p3-ttfn70.png');
    const texture4 = loader.load('https://i.ibb.co/yWfKkHh/p4-avirap.png');
    
    /* Nucleus */
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30,20);
    let lambertMaterial = new THREE.MeshPhongMaterial({map:texturenucleus});
    nucleus = new THREE.Mesh(icosahedronGeometry,lambertMaterial);
    scene.add(nucleus);
    
    /* Sphere Background */
    textureSphereBg.anisotropy = 16;
    let geometrySphereBg = new THREE.SphereBufferGeometry(150,50,50);
    let materialSphereBg = new THREE.MeshBasicMaterial({side: THREE.BackSide, map: textureSphereBg});
    sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    scene.add(sphereBg);
    
    /* Moving Stars */
    let starsGeometry = new THREE.Geometry();
    for(let i = 0; i < 50; i++){
        let particleStar = randomPointSphere(150);
        particleStar.velocity = THREE.MathUtils.randInt(50,200);
        particleStar.startX = particleStar.x;
        particleStar.startY = particleStar.y;
        particleStar.startZ = particleStar.z;
        starsGeometry.vertices.push(particleStar);
    }
    let starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: "#ffdfdf",
        transparent: true,
        opacity: .8,
        map: textureStar,
        blending: THREE.AdditiveBlending
    });
    starsMaterial.depthWrite = false;
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    /* Fixed Stars */
    function createStars(texture, size, total){
        let pointGeometry = new THREE.Geometry();
        let pointMaterial = new THREE.PointsMaterial({
            size: size,
            map: texture,
            blending:
            THREE.AdditiveBlending
        });
        for(let i = 0; i < total; i++){
            let radius = THREE.MathUtils.randInt(149, 70);
            let particles = randomPointSphere(radius);
            pointGeometry.vertices.push(particles);
        }
        return new THREE.Points(pointGeometry, pointMaterial);
    }
    
    scene.add(createStars(texture1, 15, 20));
    scene.add(createStars(texture2, 5, 5));
    scene.add(createStars(texture1, 7, 5));
    function randomPointSphere(radius){
        let theta = 2*Math.PI*Math.random();
        let phi = Math.acos(2*Math.random()-1);
        let dx = 0+(radius*Math.sin(phi)*Math.cos(theta));
        let dy = 0+(radius*Math.sin(phi)*Math.sin(theta));
        let dz = 0+(radius*Math.cos(phi));
        return new THREE.Vector3(dx,dy,dz);
    }
}

function animate(){
    //Stars Animation
    stars.geometry.vertices.forEach(function(v){
        v.x += (0-v.x) / v.velocity;
        v.y += (0-v.y) / v.velocity;
        v.z += (0-v.z) / v.velocity;
        v.velocity -= .5;
        if(v.x <= 4 && v.x >= -4 && v.z <= 4 && v.z >= -4){
            v.x = v.startX;
            v.y = v.startY;
            v.z = v.startZ;
            v.velocity = THREE.MathUtils.randInt(50,200);
        }
    });
    
    //Nucleus Animation
    nucleus.geometry.vertices.forEach(function(v){
        let time = Date.now();
        v.normalize();
        let distance = nucleus.geometry.parameters.radius + Math.sin(16*v.x*v.y*v.z + time * .002) * blobScale;
        v.multiplyScalar(distance);
    });
    nucleus.geometry.verticesNeedUpdate = true;
    nucleus.geometry.normalsNeedUpdate = true;
    nucleus.geometry.computeVertexNormals();
    nucleus.geometry.computeFaceNormals();
    nucleus.rotation.y += .002;
    
    //Sphere Beckground Animation
    sphereBg.rotation.y += .002;
    controls.update();
    
    stars.geometry.verticesNeedUpdate = true;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

/* Resize */
window.addEventListener('resize',()=>{
    clearTimeout(timeout_Debounce);
    timeout_Debounce = setTimeout(onWindowResize,80);
});

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

/* Fullscreen btn */
// let fullscreen;
// let fsEnter = document.getElementById('fullscr');
// fsEnter.addEventListener('click', function(e){
//     e.preventDefault();
//     if(!fullscreen){
//         fullscreen = true;
//         document.documentElement.requestFullscreen();
//         fsEnter.innerHTML = 'Exit Fullscreen';
//     }else{
//         fullscreen = false;
//         document.exitFullscreen();
//         fsEnter.innerHTML = 'Go Fullscreen';
//     }
// });
});
window.onload=()=>{
    document.getElementById('B').style.display = 'none';
}