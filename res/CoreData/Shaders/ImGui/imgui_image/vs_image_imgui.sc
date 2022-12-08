$input a_position, a_texcoord0, a_color0
$output v_texcoord0

#include "../../Library/Base/common.sh"

uniform mat4 CC_PMatrix;
uniform mat4 CC_MultiViewPMatrix[4];
uniform mat4 CC_MVMatrix;
uniform mat4 CC_MVPMatrix;
uniform mat4 CC_MultiViewMVPMatrix[4];
uniform mat3 CC_NormalMatrix;
uniform vec4 CC_Time;
uniform vec4 CC_SinTime;
uniform vec4 CC_CosTime;
uniform vec4 CC_Random01;


void main()
{
	vec4 pos = mul(u_viewProj, vec4(a_position.xy, 0.0, 1.0) );
	gl_Position = vec4(pos.x, pos.y, 0.0, 1.0);
	v_texcoord0 = a_texcoord0;
	v_texcoord0.y = 1.0 - v_texcoord0.y;
}

