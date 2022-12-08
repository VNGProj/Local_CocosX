#ifdef VS
$input a_position, a_texcoord0, a_color0
$output v_texCoord, v_fragmentColor


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
void main()
{
    gl_Position = mul(mul(u_viewProjMatrix,CC_MVMatrix) , vec4(a_position.xyz,1.0));
    v_texCoord = a_texcoord0;
    v_fragmentColor = a_color0;
}


#endif

#ifdef FS
$input v_texCoord, v_fragmentColor

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

SAMPLER2D (CC_Texture0,0);




void main()
{
     gl_FragColor = vec4( v_fragmentColor.rgb,v_fragmentColor.a) * texture2D(CC_Texture0, v_texCoord).a ;
}



#endif
