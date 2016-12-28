var scene;
var camera;
var renderer;

function init(){
  var stats = initStats();

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xffffff, 0.5, 100 );
  // scene.fog=new THREE.FogExp2( 0xffffff, 0.01 );
  scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  const controls1 = new controls();
  var gui = new dat.GUI();
  gui.add(controls1,'rotationSpeed',0,0.5);
  gui.add(controls1,'addCube');
  gui.add(controls1,'removeCube');
  gui.add(controls1,'outputObjects');
  gui.add(controls1,'numberOfObjects').listen();

  renderScene();

  function controls(){
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function(){
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if(lastObject instanceof THREE.Mesh){
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    this.addCube = function(){
      var cubeSize = Math.ceil((Math.random() * 10));
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({color : Math.random() * 0xffffff});
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = "cube-" + scene.children.length;

      //position the cube randomly in the scene
      cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
      cube.position.y = Math.round((Math.random() * 5));
      cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

      //add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    }

    this.outputObjects = function(){
      console.log(scene.children);
    }
  }

  function renderScene(){
    stats.update();

    //rotate the cube around it axes
    scene.traverse(function(e){
      if(e instanceof THREE.Mesh && e != plane){
        e.rotation.x += controls1.rotationSpeed;
        e.rotation.y += controls1.rotationSpeed;
        e.rotation.z += controls1.rotationSpeed;
      }
    });

    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  function initStats(){
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
  }
}

//when on resize change the aspect ratio
function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);

window.onload = init;
