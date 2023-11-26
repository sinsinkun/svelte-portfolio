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
const vec = new THREE.Vector3();
const pos = new THREE.Vector3();
const darkColor = new THREE.Color(0x2a2a33);
const lightColor = new THREE.Color(0xb6b6d6);
const useLightTheme = (): boolean => document?.body?.dataset?.theme === "light";

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

  const ambient = new THREE.AmbientLight(0x4f4f4f, 1);
  const light = new THREE.PointLight(0xd0d0ff, 1, 100, 0.5);
  light.castShadow = true;
  light.position.set(0, 10, 25);

  // add objects
  const cube = createCube();
  const plane = createPlane();
  scene.add(ambient, light, cube, plane);
  animate();
  console.log(scene.children);
}

function animate(): void {
  requestAnimationFrame(animate);

  // toggle bg color based on theme
  const pLight = scene.children[1] as THREE.PointLight;
  const cube = scene.children[2] as THREE.Mesh;
  const plane = scene.children[3] as THREE.Mesh;
  const planeMat = plane.material as THREE.MeshStandardMaterial;
  if (useLightTheme()) {
    scene.background = lightColor;
    pLight.decay = 0.1;
    planeMat.color.set(0xffffff);
  } else {
    scene.background = darkColor;
    pLight.decay = 0.5;
    planeMat.color.set(0xdfdfdf);
  }

  // keep canvas size updated with window size
  camera.aspect = win.w/win.h;
  camera.updateProjectionMatrix();
  renderer.setSize(win.w, win.h);
  calcMousePos();

  // handle cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.set(pos.x, pos.y, pos.z);
  clearVecs();

  // render new frame
  renderer.render( scene, camera );
}

// -- HELPER FUNCTIONS --
function createCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshStandardMaterial({ color:0xabcaff });
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  return cube;
}

function createPlane(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(200, 200, 40, 40);
  const material = new THREE.MeshStandardMaterial({ color:0xdfdfdf });
  // const material = new THREE.ShaderMaterial({
  //   uniforms: {},
  //   vertexShader: planeVert,
	//   fragmentShader: planeFrag
  // });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.position.z = -10;
  return plane;
}

function calcMousePos(zPos:number = 0): void {
  if (win.x && win.y) vec.set(2*(win.x/win.w) - 1, 1 - 2*(win.y/win.h), 0.5);
  else vec.set(0, 0, 0);
  vec.unproject(camera);
  vec.sub(camera.position).normalize();
  const distance = (zPos - camera.position.z) / vec.z;
  pos.copy(camera.position).add(vec.multiplyScalar(distance));
}

function clearVecs(): void {
  vec.set(0,0,0);
  pos.set(0,0,0);
}