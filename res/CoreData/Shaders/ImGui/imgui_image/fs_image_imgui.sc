$input v_texcoord0

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

uniform vec4 u_imageLodEnabled;

SAMPLER2D(s_texColor, 0);

#define u_imageLod     u_imageLodEnabled.x
#define u_imageEnabled u_imageLodEnabled.y

void main()
{
	vec3 color = texture2DLod(s_texColor, v_texcoord0, u_imageLod).xyz;
	float alpha = 0.2 + 0.8*u_imageEnabled;
	gl_FragColor = vec4(color, alpha);
}

