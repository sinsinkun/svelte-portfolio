#ifdef GL_ES
precision mediump float;
#endif

void main() {
  gl_Position = vec4( position, 0.0 );
}