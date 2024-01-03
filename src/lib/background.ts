import * as THREE from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import { winW, winH, mouseCoords, viewType } from "./mediaQuery";
import customFrag from "../shaders/custom.frag?raw";
import customVert from "../shaders/custom.vert?raw";

// media query variables
export const isCanvas: Writable<boolean> = writable(false);
let win = { w:0, h:0, x:0, y:0, viewType:"", isCanvas:false };
winW.subscribe(x => win.w = x);
winH.subscribe(x => win.h = x);
mouseCoords.subscribe(coords => {
  win.x = coords.x;
  win.y = coords.y;
})
viewType.subscribe(x => win.viewType = x);
isCanvas.subscribe(x => win.isCanvas = x);

// THREE variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, win.w/win.h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const timer = new THREE.Clock();

// THREE helper variables
const vec = new THREE.Vector3();
const pos = new THREE.Vector3();
const darkColor = new THREE.Color(0x4a4a53);
const lightColor = new THREE.Color(0xb6b6d6);
const useLightTheme = (): boolean => document?.body?.dataset?.theme === "light";

// custom material
const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new THREE.Vector2() },
  u_mouse: { type: "v2", value: new THREE.Vector2() },
}
const customMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: customVert,
  fragmentShader: customFrag,
});

// default materials
const cubeMaterial = new THREE.MeshStandardMaterial({ color:0x6baaff });
const planeMaterial = new THREE.MeshStandardMaterial({ color:0xdfdfdf });

export function init(ref: HTMLDivElement) {
  if (!document || !ref) return;
  if (win.viewType === "xs" || win.viewType === "sm") return;
  if (!WebGL.isWebGLAvailable()) {
    console.warn("No WebGL support");
    return;
  }

  // setup scene
  camera.position.z = 100;
  renderer.setSize(win.w, win.h);
  renderer.shadowMap.enabled = true;
  ref.appendChild( renderer.domElement );

  const ambient = new THREE.AmbientLight(0x4f4f4f, 5);
  const light = new THREE.PointLight(0xd0d0ff, 2000);
  light.castShadow = true;
  light.shadow.mapSize = new THREE.Vector2(900, 900);
  light.position.set(0, 10, 30);

  // add objects
  const cube = createCube();
  const plane = createPlane();
  scene.add(ambient, light, cube, plane);
  animate();
}

function animate(): void {
  requestAnimationFrame(animate);
  timer.getElapsedTime();

  const cube = scene.children[2] as THREE.Mesh;
  const plane = scene.children[3] as THREE.Mesh;

  // toggle bg color based on theme
  if (!win.isCanvas) {
    plane.material = planeMaterial;
    const planeMat = plane.material as THREE.MeshStandardMaterial;
    if (useLightTheme()) planeMat.color.set(lightColor);
    else planeMat.color.set(darkColor);
  } else {
    plane.material = customMaterial;
  }

  // keep canvas size updated with window size
  camera.aspect = win.w/win.h;
  camera.updateProjectionMatrix();
  renderer.setSize(win.w, win.h);
  calcMousePos();

  // handle cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.set(
    pos.x + 3 * Math.sin(2 * timer.elapsedTime),
    pos.y + 3 * Math.cos(2 * timer.elapsedTime),
    pos.z
  );
  clearVecs();

  // update uniform values
  uniforms.u_mouse.value.x = win.x;
  uniforms.u_mouse.value.y = win.y;
  uniforms.u_resolution.value.x = win.w;
  uniforms.u_resolution.value.y = win.h;
  uniforms.u_time.value = timer.elapsedTime;

  // render new frame
  renderer.render( scene, camera );
}

// -- HELPER FUNCTIONS --
function createCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = cubeMaterial;
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  return cube;
}

function createPlane(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(160, 100);
  const material = planeMaterial;

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

export function restartAnimation(): void {
  requestAnimationFrame(animate);
}