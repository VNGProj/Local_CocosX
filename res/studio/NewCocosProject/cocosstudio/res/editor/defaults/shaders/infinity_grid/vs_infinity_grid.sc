$input a_position, a_normal,a_texcoord0
$output v_FragPos,v_nearPoint,v_farPoint


#if defined(INSTANCED)
$input i_data0
$input i_data1
$input i_data2
$input i_data3
#endif


#include "../../../../CoreData/Shaders/Library/Base/common.sh"

uniform mat4 u_worldMatrix;


vec3 UnprojectPoint(float x, float y, float z, mat4 view, mat4 projection) {
    mat4 viewInv = inverse(view);
    mat4 projInv = inverse(projection);
    vec4 unprojectedPoint =  mul(mul(viewInv , projInv),  vec4(x, y, z, 1.0));
    return unprojectedPoint.xyz / unprojectedPoint.w;
}

vec3 gridPlane[6] = vec3[] (
    vec3(-1, -1, 0), vec3(1, -1, 0), vec3(-1, 1, 0),
    vec3(1, 1, 0), vec3(1, -1, 0), vec3(1, 1, 0)
);

void main()
{

    vec4 position = vec4(a_position.xyz,1.0);
    vec3 p = position.xyz;
    v_nearPoint = UnprojectPoint(p.x,p.y,0.0,u_view,u_proj);
    v_farPoint = UnprojectPoint(p.x,p.y,1.0,u_view,u_proj);

    v_FragPos = mul(mul(u_view ,u_worldMatrix) ,  position);
    mat4 mvp = u_viewProj ;
    gl_Position = position;
}

