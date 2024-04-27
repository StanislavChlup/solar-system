varying vec3 norm;

void main(){
	norm = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}