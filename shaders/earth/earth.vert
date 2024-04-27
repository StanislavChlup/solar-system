varying vec2 vUV;
varying vec3 norm;
varying vec3 pos;

void main(){
	vUV = uv;
	pos = (modelMatrix * vec4(position, 1)).xyz;
	norm = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}