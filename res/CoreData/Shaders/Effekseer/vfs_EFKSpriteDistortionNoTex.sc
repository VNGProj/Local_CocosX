#ifdef VS

$input a_position
$input a_color0
$input a_texcoord0
$input a_bitangent
$input a_tangent

// defined output
$output v_color0
$output v_texcoord0
$output v_vaPos
$output v_vaPosR
$output v_vaPosU

#include "../Library/Base/common.sh"

uniform mat4 u_worldMatrix;
uniform mat4 u_viewProjMatrix;
uniform mat4 uMatCamera;
uniform mat4 uMatProjection;
uniform vec4 mUVInversed;

void main()
{

    vec4 localBinormal = vec4( a_position.x + a_bitangent.x, a_position.y + a_bitangent.y, a_position.z + a_bitangent.z, 1.0 );
    vec4 localTangent = vec4( a_position.x + a_tangent.x, a_position.y + a_tangent.y, a_position.z + a_tangent.z, 1.0 );

    localBinormal = uMatCamera * localBinormal;
    localTangent = uMatCamera * localTangent;

    vec4 cameraPos = uMatCamera * vec4(a_position.xyz,1.0);
   	cameraPos = cameraPos / cameraPos.w;

   	localBinormal = localBinormal / localBinormal.w;
    localTangent = localTangent / localTangent.w;

    localBinormal = cameraPos + normalize(localBinormal - cameraPos);
    localTangent = cameraPos + normalize(localTangent - cameraPos);

   	gl_Position = uMatProjection * cameraPos;

   	v_vaPos = gl_Position;

   	vec4 cameraPosU = cameraPos + vec4(0.0, 1.0, 0.0, 0.0);
    vec4 cameraPosR = cameraPos + vec4(1.0, 0.0, 0.0, 0.0);

    v_vaPosR = uMatProjection * localTangent;
    v_vaPosU = uMatProjection * localBinormal;

    v_vaPos = v_vaPos / v_vaPos.w;
    v_vaPosR = v_vaPosR / v_vaPosR.w;
    v_vaPosU = v_vaPosU / v_vaPosU.w;

    v_color0 = a_color0;
    v_texcoord0 = vec4(a_texcoord0.x,a_texcoord0.y,0.0,0.0);
    v_texcoord0.y = mUVInversed.x + mUVInversed.y * v_texcoord0.y;


}

#endif


#ifdef FS
$input v_color0
$input v_texcoord0
$input v_vaPos
$input v_vaPosR
$input v_vaPosU

/// ----- UNIFORM
#include "../Library/Base/common.sh"

SAMPLER2D(uBackTexture0,0);

uniform	vec4	g_scale;
uniform	vec4	mUVInversedBack;

// end materials
/// ----------  END UNIFORM


void main()
{
	vec4 color = v_color0;
	color.xyz = vec3(1.0,1.0,1.0);

   vec2 pos = v_vaPos.xy / v_vaPos.w;
   vec2 posU = v_vaPosU.xy / v_vaPosU.w;
   vec2 posR = v_vaPosR.xy / v_vaPosR.w;


   	vec2 uv = pos + (posR - pos) * (color.x * 2.0 - 1.0) * v_color0.x * g_scale.x + (posU - pos) * (color.y * 2.0 - 1.0) * v_color0.y * g_scale.x;
   	uv.x = (uv.x + 1.0) * 0.5;
   	uv.y = (uv.y + 1.0) * 0.5;
   	//uv.y = 1.0 - (uv.y + 1.0) * 0.5;

   	uv.y = mUVInversedBack.x + mUVInversedBack.y * uv.y;

   	color.xyz = texture2D(uBackTexture0, uv).xyz;

    gl_FragColor = color;
    if(gl_FragColor.w <= 0.0) discard;

}

#endif
