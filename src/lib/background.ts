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
const objects: Array<THREE.Mesh> = [];

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
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  return cube;
}

function animate() {
  requestAnimationFrame( animate );
  renderer.setSize(win.w, win.h);

  objects[0].rotation.x += 0.01;
  objects[0].rotation.y += 0.01;
  // render new frame
  renderer.render( scene, camera );
}