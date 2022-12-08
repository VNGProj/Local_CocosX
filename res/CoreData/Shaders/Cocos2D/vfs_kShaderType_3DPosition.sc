#ifdef VS
$input a_position, a_color0
$output v_color

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

#include "../Library/Base/common.sh"

uniform mat4 u_worldMatrix;
uniform mat4 u_viewProjMatrix;

void main()
{
    gl_Position = mul(mul(u_viewProj , u_worldMatrix), vec4(a_position.xyz, 1.0));
    v_color = a_color0;
}



#endif

#ifdef FS
$input v_color
#include "../Library/Base/common.sh"

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

//SAMPLER2D (CC_Texture0,0);

uniform vec4 u_color;


void main()
{
    gl_FragColor = vec4(v_color.rgb,1.0);
}


#endif
