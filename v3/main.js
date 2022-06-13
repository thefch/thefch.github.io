import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader';
import { FlakesTexture } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/textures/FlakesTexture';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/RGBELoader';
const clock = new THREE.Clock();
const manager = new THREE.LoadingManager();
let camera, scene, renderer, controls, mixer;
let light1,light2,light3,light4;

window.addEventListener( 'resize', onWindowResize, false );


function init(){
  // renderer
  scene = new THREE.Scene;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector('#bg'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  camera.position.setZ(100);
  camera.position.setY(100);
  camera.position.setX(20);

  
  renderer.render(scene,camera); 

  // lights
  // const pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(10,10,10);
  // scene.add(pointLight);

  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(lightHelper);

  const gridHelper = new THREE.GridHelper(10000,1000);
  scene.add(gridHelper);

  
  async function returnFBX(pathname, scene) {
      const loader = new THREE.ObjectLoader( manager );
      return await loader.load( pathname, function ( object ) {
        return object;
      } );
  }
  
  let afterloadObject = returnFBX('Walking.fbx',scene);
  console.log(afterloadObject);
  console.log('afterloadObject');

//   const loader = new THREE.OBJLoader( manager );
//   loader.load( 'Walking.fbx', function ( object ) {

// 	//

// } );

  let envmaploader = new THREE.PMREMGenerator(renderer);
  new RGBELoader().load('country_club_4k.hdr',function(hdrmap){
    let envmap = envmaploader.fromCubemap(hdrmap);
    let texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    const mat = {
      clearcoat: 1.0,
      clearcoatRoughness:0.1,
      metalness:0.9,
      roughness:0.2,
      color:0x808080,
      normalMap:texture,
      normalScale:new THREE.Vector2(0.15,0.15),
      envMap:envmap.texture
    }

    //model
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        'Walking.fbx',
        (object) => {
          object.traverse(function(child){
            if( child.material ) {
              child.material = new THREE.MeshPhysicalMaterial(mat);      
              // child.material = new THREE.MeshPhongMaterial( { 
              //   color: 0xffffff,
              //   // wireframe: true,
              //   vertexColors: 0x000000,
              //   } );      
            }
            });
            object.scale.set(.2, .2, .2);
            
            mixer = new THREE.AnimationMixer( object);
            const clips = object.animations;
            const clip = THREE.AnimationClip.findByName(clips,'Armature|Armature|mixamo.com|Layer0');
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
    
  })

  
  const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
  light1 = new THREE.PointLight( 0xff0040, 2, 50 );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
  scene.add( light1 );

  light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
  scene.add( light2 );

  light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
  light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
  scene.add( light3 );

  light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
  scene.add( light4 );

  controls = new OrbitControls(camera, renderer.domElement);
  scene.add(controls);

}



function render(){
  const delta = clock.getDelta();
  if ( mixer ) mixer.update( delta );
  const time = Date.now() * 0.0005;
  light1.position.x = Math.sin( time * 0.7 ) * 30;
  light1.position.y = Math.cos( time * 0.5 ) * 40;
  light1.position.z = Math.cos( time * 0.3 ) * 30;

  light2.position.x = Math.cos( time * 0.3 ) * 30;
  light2.position.y = Math.sin( time * 0.5 ) * 40;
  light2.position.z = Math.sin( time * 0.7 ) * 30;

  light3.position.x = Math.sin( time * 0.7 ) * 30;
  light3.position.y = Math.cos( time * 0.3 ) * 40;
  light3.position.z = Math.sin( time * 0.5 ) * 30;

  light4.position.x = Math.sin( time * 0.3 ) * 30;
  light4.position.y = Math.cos( time * 0.7 ) * 40;
  light4.position.z = Math.sin( time * 0.5 ) * 30;
}


function animate(){
  requestAnimationFrame(animate);

  render();
  controls.update();

  renderer.render(scene, camera);
}


function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



init();
animate();