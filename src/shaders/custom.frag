#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

// separate colors into 3 points that ripple outwards
vec3 threePoints(vec2 coords) {
  float center_1 = distance(vec2(0.5 + 0.05*sin(u_time), 0.5 + 0.05*cos(u_time)), coords);
  float center_2 = distance(vec2(0.2, 0.2), coords);
  float center_3 = distance(vec2(0.7, 0.7), coords);

  float final_r = 5.0 * (0.3 + sin(center_1 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x + coords.y)));
  float final_g = 5.0 * (-0.2 + sin(center_2 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x + coords.y)));
  float final_b = 5.0 * (0.6 + sin(center_3 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x + coords.y)));
  vec3 final_rgb = vec3(final_r, final_g, final_b);

  return final_rgb;
}

vec3 threePoints(vec2 coords, vec2 mouse_coords) {
  float center_1 = distance(vec2(0.3 + 0.05*sin(u_time), 0.5 + 0.05*cos(u_time)), coords);
  float center_2 = distance(vec2(mouse_coords.x, 1.0 - mouse_coords.y), coords);
  float center_3 = distance(vec2(0.7, 0.5), coords);

  float final_r = 5.0 * (0.3 + sin(center_1 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x - coords.y)));
  float final_g = 5.0 * (-0.2 + sin(center_2 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x + coords.y)));
  float final_b = 5.0 * (0.6 + sin(center_3 * 40.0)) * abs(cos(u_time + 20.0 * (coords.x + coords.y)));
  vec3 final_rgb = vec3(final_r, final_g, final_b);

  return final_rgb;
}

// draw circles around point centered on mouse
vec3 followMouse(vec2 coords, vec2 mouse_coords) {
  float delta_dist = distance(vec2(mouse_coords.x, 1.0 - mouse_coords.y), vec2(coords.x, coords.y));

  float final_r = 0.8 - abs(cos(delta_dist * 40.0)) + 0.4 * cos(2.0 * u_time);
  float final_g = 0.8 - abs(sin(delta_dist * 40.0)) + 0.4 * cos(2.0 * u_time);
  float final_b = 0.8 - abs(sin(delta_dist * 40.0)) + 0.4 * sin(2.0 * u_time);
  vec3 final_rgb = vec3(final_r, final_g, final_b);

  return final_rgb;
}

void main() {
  // normalize screen coordinates
  vec2 coords = gl_FragCoord.xy/u_resolution.xy;
  vec2 mouse_coords = u_mouse.xy/u_resolution.xy;

  // generate rgb values from functions
  vec3 final_rgb = threePoints(coords, mouse_coords);

  // draw borders
  if (coords.x < 0.02 || coords.x > 0.98) {
    final_rgb = vec3(0.2 + 0.2*abs(sin(u_time)));
  }
  if (coords.y < 0.1 || coords.y > 0.9) {
    final_rgb = vec3(0.2 + 0.2*abs(sin(u_time)));
  }

  // output color
  gl_FragColor = vec4(final_rgb, 1.0);
}