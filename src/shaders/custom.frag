#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  // normalize screen coordinates
  vec2 coords = gl_FragCoord.xy/u_resolution.xy;
  vec2 mouse_coords = u_mouse.xy/u_resolution.xy;
  vec2 border = vec2(0.1, 0.9);

  // split screen at mouse position
  float final_r = smoothstep(0.48, 0.52, coords.x - mouse_coords.x + 0.5);
  float final_g = smoothstep(0.48, 0.52, (coords.y + mouse_coords.y) / 2.0);
  float final_b = 0.7 + 0.3 * sin(2.0 * u_time);

  if (coords.x < 0.05 || coords.x > 0.95) {
    final_r = final_b * 0.5;
    final_g = final_b * 0.5;
    // final_b = 0.0;
  }
  if (coords.y < 0.1 || coords.y > 0.9) {
    final_r = final_b * 0.5;
    final_g = final_b * 0.5;
    // final_b = 0.0;
  }

  // output color
  gl_FragColor = vec4(final_r, final_g, final_b, 1.0);
}