function init(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth /window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth,window.innerHeight);

  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
  var planeMaterial = new THREE.MeshBasicMaterial({color : 0xcccccc});
  var plane = new THREE.Mesh(planeGeometry,planeMaterial);

  plane.rotation.x = - 0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.x = 0;
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4,4,4);
  var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
  var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube.position.x = -10;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4,20,20);
  var sphereMaterial = new THREE.MeshBasicMaterial({color : 0x7777ff, wireframe : true});
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  scene.add(sphere);

  camera.position.x = -50;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  document.getElementById("webGL-output").appendChild(renderer.domElement);
  renderer.render(scene,camera);
}

window.onload = init;