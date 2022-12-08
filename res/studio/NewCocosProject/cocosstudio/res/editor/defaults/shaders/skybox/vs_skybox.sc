$input a_position
$output v_FragPos


#if defined(INSTANCED)
$input i_data0
$input i_data1
$input i_data2
$input i_data3
#endif


#include "../../../../CoreData/Shaders/Library/Base/common.sh"

uniform mat4 u_worldMatrix;


void main()
{
    v_FragPos = mul(u_worldMatrix ,  vec4(a_position.xyz,1.0));
    gl_Position = mul(mul(u_viewProj ,u_worldMatrix) ,  vec4(a_position.xyz,1.0));
}
