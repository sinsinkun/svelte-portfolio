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
const darkColor = new THREE.Color(0x2a2a33);
const lightColor = new THREE.Color(0xb6b6d6);
const useLightTheme = (): boolean => document?.body?.dataset?.theme === "light";
let count = 0;

export function init(ref: HTMLDivElement) {
  if (!document || !ref) return;
  if (!WebGL.isWebGLAvailable()) {
    console.warn("No WebGL support");
    return;
  }

  // setup scene
  camera.position.z = 100;
  renderer.setSize(win.w, win.h);
  renderer.shadowMap.enabled = true;
  ref.appendChild( renderer.domElement );

  const ambient = new THREE.AmbientLight(0x333333, 0.5);
  const light = new THREE.PointLight(0xd0d0ff, 1, 1000, 0.1);
  light.position.set(0, 0, 100);
  scene.add(ambient, light);

  // add objects
  const cube = addCube();
  const plane = addPlane();
  objects.push(cube, plane);
  animate();
}

function addCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshStandardMaterial({ color:0xddeeff });
  const cube = new THREE.Mesh( geometry, material );
  scene.add(cube);
  return cube;
}

function addPlane(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(200, 200, 40, 40);
  const material = new THREE.MeshStandardMaterial({ color:0xffffff, wireframe:true });
  const plane = new THREE.Mesh(geometry, material);
  // plane.position.z = -10;
  scene.add(plane);
  return plane;
}

async function animate() {
  requestAnimationFrame(animate);

  // toggle bg color based on theme
  if (useLightTheme()) scene.background = lightColor;
  else scene.background = darkColor;

  // keep canvas size updated with window size
  camera.aspect = win.w/win.h;
  camera.updateProjectionMatrix();
  renderer.setSize(win.w, win.h);
  calcMousePos();

  // handle object 0 (cube)
  objects[0].rotation.x += 0.01;
  objects[0].rotation.y += 0.01;
  objects[0].position.set(pos.x, pos.y, pos.z);
  clearVecs();

  // handle object 1 (plane)
  const position = objects[1].geometry.attributes.position;
  for (let i=0; i < position.count; i++) {
    vec.fromBufferAttribute(position, i);
    position.setXYZ(
      i, 
      vec.x, 
      vec.y, 
      -10 + 2 * Math.sin(i + count * 0.0001)
    );
    position.needsUpdate = true;
    count += 0.1;
  }
  if (count > 1000000) {
    console.log("reset loop", count);
    count = 0;
  }

  // render new frame
  renderer.render( scene, camera );
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