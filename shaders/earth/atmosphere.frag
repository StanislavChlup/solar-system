varying vec3 norm;

void main(){
	float intensity = pow(0.6 - dot(norm, vec3(0,0,1)), 2.0);
	gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}