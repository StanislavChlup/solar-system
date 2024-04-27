varying vec2 vUV;
uniform sampler2D tex;
varying vec3 norm;
varying vec3 pos;

float angleBetween(vec3 v1, vec3 v2) {
    float cosine = dot(normalize(v1), normalize(v2));
    float angle = clamp(0.5 + 0.5 * cosine, 0.0, 1.0);
    return angle;
}

void main(){
	vec3 sun = vec3(0.,0.,1000.);
	float mask = angleBetween(sun.xyz - pos.xyz, pos.xyz)*1.2 -0.3;
	gl_FragColor = vec4(mask * texture2D(tex, vUV).xyz, 1.0);
}