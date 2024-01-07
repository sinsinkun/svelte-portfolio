#ifdef GL_ES
precision mediump float;
#endif

/*
--- threeJS provided preset variables ---
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
*/

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec3 vert_normal;

void main() {

  vec3 final_rgb = vec3(0.5, 0.5, 0.5) * dot(vert_normal, vec3(0.0, 0.0, 1.0));
  // output color
  gl_FragColor = vec4(final_rgb, 1.0);
}