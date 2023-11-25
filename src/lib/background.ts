import * as THREE from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { winW, winH, mouseCoords } from "./mediaQuery";

// media query variables
let win = { w:0, h:0, x:0, y:0 };
winW.subscribe(x => win.w = x);
winH.subscribe(x => win.h = x);
mouseCoords.subscribe(coords => {
  win.x = coords.x;
  win.y = coords.y;
})

// THREE variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, win.w/win.h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// THREE helper variables
const objects: Array<THREE.Mesh> = [];
const vec = new THREE.Vector3();
const pos = new THREE.Vector3();

export function init(ref: HTMLDivElement) {
  if (!document) return;
  if (!WebGL.isWebGLAvailable()) {
    console.warn("No WebGL support");
    return;
  }
  if (!ref) return;

  // setup scene
  camera.position.z = 100;
  scene.background = new THREE.Color(0x2a2a33);
  renderer.setSize(win.w, win.h);
  ref.appendChild( renderer.domElement );

  // add objects
  const cube = addCube();
  objects.push(cube);
  animate();
}

function addCube() {
  const geometry = new THREE.BoxGeometry(6, 6, 6);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  return cube;
}

function animate() {
  requestAnimationFrame( animate );
  renderer.setSize(win.w, win.h);
  calcMousePos();

  // handle object 0 (cube)
  objects[0].rotation.x += 0.01;
  objects[0].rotation.y += 0.01;
  objects[0].position.set(pos.x, pos.y, pos.z);
  // render new frame
  renderer.render( scene, camera );
  // cleanup
  clearVecs();
}

function calcMousePos(zPos:number = 0) {
  if (win.x && win.y) vec.set(2*(win.x/win.w) - 1, 1 - 2*(win.y/win.h), 0.5);
  else vec.set(0, 0, 0);
  vec.unproject(camera);
  vec.sub(camera.position).normalize();
  const distance = (zPos - camera.position.z) / vec.z;
  pos.copy(camera.position).add(vec.multiplyScalar(distance));
}

function clearVecs() {
  vec.set(0,0,0);
  pos.set(0,0,0);
}