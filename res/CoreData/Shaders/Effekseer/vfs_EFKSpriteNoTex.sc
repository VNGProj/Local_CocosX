#ifdef VS

$input a_position
$input a_color0
$input a_texcoord0

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
   vec4 cameraPos = uMatCamera * vec4(a_position.xyz,1.0);
   	cameraPos = cameraPos / cameraPos.w;

   	gl_Position = uMatProjection * cameraPos;

   	v_vaPos = gl_Position;

   	vec4 cameraPosU = cameraPos + vec4(0.0, 1.0, 0.0, 0.0);
    vec4 cameraPosR = cameraPos + vec4(1.0, 0.0, 0.0, 0.0);

    v_vaPosR = uMatProjection * cameraPosR;
    v_vaPosU = uMatProjection * cameraPosU;

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

SAMPLER2D(uTexture0,0);

// Materials
uniform vec4 u_time;
// end materials
/// ----------  END UNIFORM


void main()
{
    gl_FragColor = v_vaPos;
    if(gl_FragColor.w <= 0.0) discard;

}

#endif
