$input v_FragPos,v_nearPoint,v_farPoint

uniform mat4 u_worldMatrix;
uniform vec4 u_nearfar;
#include "../../../../CoreData/Shaders/Library/Base/common.sh"

vec4 grid(vec3 fragPos3D, float scale, bool drawAxis) {
    vec2 coord = fragPos3D.xz * scale;
    vec2 derivative = fwidth(coord);
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / derivative;
    float line = min(grid.x, grid.y);
    float minimumz = min(derivative.y, 1);
    float minimumx = min(derivative.x, 1);
    vec4 color = vec4(0.0, 0.0, 0.0, (2.0 - min(line, 2.0)) * 0.1);
    // z axis
    if(fragPos3D.x > -1 * minimumx && fragPos3D.x < 1 * minimumx)
        {color.z = 1.0;color.w = (2.0 - min(line, 2.0));}
    // x axis
    if(fragPos3D.z > -1 * minimumz && fragPos3D.z < 1 * minimumz)
        {color.x = 1.0;color.w = (2.0 - min(line, 2.0));}
    return color;
}



float computeDepth(vec3 pos) {
    vec4 clip_space_pos = mul(mul(u_proj , u_view) , vec4(pos.xyz, 1.0));
    return (clip_space_pos.z / clip_space_pos.w);
}



float computeLinearDepth(vec3 pos) {
float near =u_nearfar.x;
float far  = u_nearfar.y;
    vec4 clip_space_pos = mul(mul(u_proj , u_view) , vec4(pos.xyz, 1.0));
    float clip_space_depth = (clip_space_pos.z / clip_space_pos.w) * 2.0 - 1.0; // put back between -1 and 1
    float linearDepth = (2.0 * near * far) / (far + near - clip_space_depth * (far - near)); // get linear value between 0.01 and 100
    return linearDepth / far; // normalize
}


float computeDepth2(vec3 pos) {
	vec4 clip_space_pos =  mul(mul(u_proj , u_view) , vec4(pos.xyz, 1.0));
	float clip_space_depth = clip_space_pos.z / clip_space_pos.w;

	float far = gl_DepthRange.far;
	float near = gl_DepthRange.near;

	float depth = (((far-near) * clip_space_depth) + near + far) / 2.0;

	return depth;
}

void main()
{
    float t = -v_nearPoint.y / (v_farPoint.y - v_nearPoint.y);
        vec3 fragPos3D = v_nearPoint + t * (v_farPoint - v_nearPoint);
        gl_FragDepth = computeDepth2(fragPos3D);
        gl_FragColor = grid(fragPos3D, 1.0 ,true) * float(t > -0.001);

         float linearDepth = computeLinearDepth(fragPos3D);
            float fading = max(0, (0.25 - linearDepth));
            gl_FragColor.a *= fading;

}


