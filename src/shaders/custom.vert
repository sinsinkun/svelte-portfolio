#ifdef GL_ES
precision mediump float;
#endif

/*
--- threeJS provided preset variables ---
// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;

// default vertex attributes provided by BufferGeometry
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
*/

varying vec3 vert_normal;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 4.0, 1.0);
  vert_normal = normal;
}