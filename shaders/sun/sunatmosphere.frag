varying vec3 norm;

void main(){
	vec3 pos = vec3(0,0,1000);
	float intensity = pow(0.6 - dot(norm, vec3(0,0,0.5)), 2.0);
	gl_FragColor = vec4(1.0, 0.7, 0.6, 0.7) * intensity;
}