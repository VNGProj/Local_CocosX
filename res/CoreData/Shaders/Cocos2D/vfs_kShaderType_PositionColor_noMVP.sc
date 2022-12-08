#ifdef VS
$input a_position,a_color0
$output v_fragmentColor


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

uniform mat4 u_viewProjMatrix;
uniform mat4 u_worldMatrix;
void main()
{
    gl_Position = mul(u_viewProjMatrix, vec4(a_position.xyz,1.0));
    v_fragmentColor = a_color0;
}


#endif

#ifdef FS
$input v_fragmentColor


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


void main()
{

    gl_FragColor = v_fragmentColor;
}


#endif
