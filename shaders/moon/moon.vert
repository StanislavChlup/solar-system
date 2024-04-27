varying vec2 vUV;
varying vec3 norm;
varying vec3 pos;
uniform vec3 loc;

void main(){
	vUV = uv;
	pos = (modelMatrix * vec4(position, 1)).xyz - loc;
	norm = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}