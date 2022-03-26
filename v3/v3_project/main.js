import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
var clock = new THREE.Clock();

const scene = new THREE.Scene;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera); 


// const geometry = new THREE.TorusGeometry(10,3,16,100);
// const material = new THREE.MeshStandardMaterial({color: 0xff7777 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

function addStar(){
  
  const geometry = new THREE.SphereGeometry(0.5,75,75);

  const texture = new THREE.TextureLoader().load('gradient.jpg');
  
  const material = new THREE.MeshStandardMaterial({
    map:texture
  });
  const star = new THREE.Mesh(geometry,material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

// Array(200).fill().forEach(addStar);


let  mixer;
const fbxLoader = new FBXLoader()
fbxLoader.load(
    'Walking.fbx',
    (object) => {
      object.traverse(function(child){
        if( child.material ) {
          child.material = new THREE.MeshPhongMaterial( { 
            color: 0xffffff,
            wireframe: true,
            vertexColors: 0x000000
            } );      
        }
        });
        object.scale.set(.1, .1, .1);
        console.log(object.animations);
        console.log(object.animations[0]);
        
        mixer = new THREE.AnimationMixer( object);
        const clips = object.animations;

        const clip = THREE.AnimationClip.findByName(clips,'mixamo.com');
        const action = mixer.clipAction(clip);
        action.play();
// mixamo.com
        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)



const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);

function animate(){
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.002;
  // torus.rotation.z += 0.001;

  mixer.update( clock.getDelta() );
  controls.update();

  renderer.render(scene, camera);
}

animate();