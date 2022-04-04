
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader'

// Loading Manager
// https://threejs.org/docs/#api/en/loaders/managers/LoadingManager

export class Person{
  constructor(path){
    this.path = path;
    this.object=null;
    // this.mixer=null;
    this.load();
  }

  load(){
    let mixer;
    
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        'Walking.fbx',
        (object) => {
          object.traverse(function(child){
            if( child.material ) {
              child.material = new THREE.MeshPhongMaterial( { 
                color: 0xffffff,
                // wireframe: true,
                vertexColors: 0x000000
                } );      
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
  }

  getobj(object){
    var p = new Promise(function(object){
      return object;
    })
    p.then(function(a) {
      console.log('Promise p resolved with data: ', a);
  })
  }
  getSize(){
    const box3 = new THREE.Box3().setFromObject(this.object);
    const size = new THREE.Vector3();
    return box3.getSize(size);
  }


  isDone(object){
    console.log(object);
    while (true){
      if(typeof object == "object" ){
        break;
      }
      console.log('not done');
      setTimeout(1000);
    }

  }

  render(){
// const loader = new THREE.ObjectLoader();

//     const object = loader.load(this.path);
//     console.log('object3',object);
  }
} 

/*
      (object) => {
        object.traverse(function (child) {
          if (child.material) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              // wireframe: true,
              vertexColors: 0x000000
            });
          }
        });
        object.scale.set(.2, .2, .2);

        mixer = new THREE.AnimationMixer(object);
        const clips = object.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'Armature|Armature|mixamo.com|Layer0');
        const action = mixer.clipAction(clip);
        action.play();
        // console.log(object);
        this.object = object;
        this.mixer = mixer;
        
        
        // scene.add(object);
      }

*/