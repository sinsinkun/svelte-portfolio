import { page } from '$app/stores';
import type { Page } from '@sveltejs/kit';

import * as THREE from "three";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { winW, winH, mouseCoords, viewType } from "./mediaQuery";
import { createNoise2D } from "simplex-noise";

// media query variables
let win = { w:0, h:0, x:0, y:0, viewType:"" };
winW.subscribe(x => win.w = x);
winH.subscribe(x => win.h = x);
mouseCoords.subscribe(coords => {
  win.x = coords.x;
  win.y = coords.y;
})
viewType.subscribe(x => win.viewType = x);

let newPage = false, isCanvas = false;
page.subscribe((e: Page) => {
  if (!newPage) newPage = true;
  if (e.route?.id === "/canvas") isCanvas = true;
  else isCanvas = false;
})

// THREE variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, win.w/win.h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const timer = new THREE.Clock();

// THREE helper variables
const vec = new THREE.Vector3();
const pos = new THREE.Vector3();
const darkColor = new THREE.Color(0x4a4a53);
const lightColor = new THREE.Color(0xa1d0eb);
const useLightTheme = (): boolean => document?.body?.dataset?.theme === "light";

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
  const light = new THREE.PointLight(0x70a0ff, 2000);
  light.castShadow = true;
  light.shadow.mapSize = new THREE.Vector2(900, 900);
  light.position.set(-15, 10, 15);
  const light2 = new THREE.PointLight(0xffdfd0, 1000);
  light2.castShadow = true;
  light2.shadow.mapSize = new THREE.Vector2(900, 900);
  light2.position.set(15, 10, 15);

  // add objects
  // const cube = createCube();
  const plane = createPlane();
  const circ = createIsland();
  scene.add(ambient, light, light2, plane, circ);
  animate();
}

function animate(): void {
  requestAnimationFrame(animate);
  timer.getElapsedTime();

  // toggle bg color based on theme
  // const cube = scene.children[2] as THREE.Mesh;
  const plane = scene.children[3] as THREE.Mesh;
  const island = scene.children[4] as THREE.Mesh;
  const planeMat = plane.material as THREE.MeshStandardMaterial;
  if (useLightTheme()) {
    planeMat.color.set(lightColor);
  } else {
    planeMat.color.set(darkColor);
  }

  // keep canvas size updated with window size
  camera.aspect = win.w/win.h;
  camera.updateProjectionMatrix();
  renderer.setSize(win.w, win.h);
  calcMousePos();

  // handle cube
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube.position.set(
  //   pos.x + 3 * Math.sin(2 * timer.elapsedTime),
  //   pos.y + 3 * Math.cos(2 * timer.elapsedTime),
  //   pos.z
  // );
  // clearVecs();

  // handle island
  island.rotation.y += 0.001;

  // replace island on new page load
  if (newPage) {
    const nisland = createIsland();
    scene.remove(island);
    scene.add(nisland);
    newPage = false;
  }

  // render new frame
  renderer.render( scene, camera );
}

// -- HELPER FUNCTIONS --
function createCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshStandardMaterial({ color:0x6baaff });
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  return cube;
}

function createPlane(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshStandardMaterial({ color:0xdfdfdf });

  const plane = new THREE.Mesh(geometry, material);
  // plane.receiveShadow = true;
  plane.position.z = -100;
  return plane;
}

function createIsland(): THREE.Group {
  let geoGroup1 = new THREE.PlaneGeometry(0, 0); // color group 1
  let geoGroup2 = new THREE.PlaneGeometry(0, 0); // color group 2
  let geoGroup3 = new THREE.PlaneGeometry(0, 0); // color group 3
  let geoGroup4 = new THREE.PlaneGeometry(0, 0); // color group 4
  // create individual hexes
  for (let i=-50; i<50; i++) {
    for (let j=-50; j<50; j++) {
      if (i * i + j * j > 90) continue;
      const noise = createNoise2D();
      const h = noise(i * 0.01, j * 0.01) * 8 + 2;
      if (h < 0) continue;
      const a = createHex(h, i, j);
      if (h < 1) {
        // @ts-ignore
        geoGroup1 = BufferGeometryUtils.mergeGeometries([geoGroup1, a]);
      } else if (h < 2) {
        // @ts-ignore
        geoGroup2 = BufferGeometryUtils.mergeGeometries([geoGroup2, a]);
      } else if (h < 4) {
        // @ts-ignore
        geoGroup3 = BufferGeometryUtils.mergeGeometries([geoGroup3, a]);
      } else {
        // @ts-ignore
        geoGroup4 = BufferGeometryUtils.mergeGeometries([geoGroup4, a]);
      }
    }
  }
  // add materials
  const material1 = new THREE.MeshStandardMaterial({ color: 0x544343 });
  const material2 = new THREE.MeshStandardMaterial({ color: 0xD4B483 });
  const material3 = new THREE.MeshStandardMaterial({ color: 0x639832 });
  const material4 = new THREE.MeshStandardMaterial({ color: 0x77966D });

  // convert to meshes
  const mesh1 = new THREE.Mesh(geoGroup1, material1);
  mesh1.receiveShadow = true;
  mesh1.castShadow = true;
  const mesh2 = new THREE.Mesh(geoGroup2, material2);
  mesh2.receiveShadow = true;
  mesh2.castShadow = true;
  const mesh3 = new THREE.Mesh(geoGroup3, material3);
  mesh3.receiveShadow = true;
  mesh3.castShadow = true;
  const mesh4 = new THREE.Mesh(geoGroup4, material4);
  mesh4.receiveShadow = true;
  mesh4.castShadow = true;

  const island = new THREE.Group();
  island.add(mesh1, mesh2, mesh3, mesh4);
  island.scale.fromArray([1.5, 1.5, 1.5]);
  island.rotateX(0.8);
  return island;
}

function createHex(h: number, px: number, py: number): THREE.CylinderGeometry {
  let geo = new THREE.CylinderGeometry(1, 1, h, 6, 1, false);
  // hexagonal displacement for x and z
  geo.translate((px + (py % 2) * 0.5) * 1.77, h * 0.5, py * 1.535);
  return geo;
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