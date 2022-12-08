#ifdef VS

$input a_position
$input a_color0
$input a_normal
$input a_tangent
$input a_texcoord0
$input a_texcoord1

// defined output
$output v_color0
$output v_texcoord0
$output v_texcoord1
$output v_WorldP
$output v_WorldN
$output v_WorldT
$output v_WorldB
$output v_ScreenUV

#include "../Library/Base/common.sh"

uniform mat4 u_worldMatrix;
uniform mat4 u_viewProjMatrix;


uniform mat4 uMatCamera;
uniform mat4 uMatProjection;
uniform vec4 mUVInversed;

void main()
{

    vec3 worldPos = a_position.xyz;
    // uv
    v_texcoord0 = vec4(a_texcoord0.x,a_texcoord0.y,0.0,0.0);
    v_texcoord0.y = mUVInversed.x + mUVInversed.y * v_texcoord0.y;
    v_texcoord1 = vec4(a_texcoord1.x,a_texcoord1.y,0.0,0.0);
    v_texcoord1.y = mUVInversed.x + mUVInversed.y * v_texcoord1.y;

    // NBT
    vec3 worldNormal = (a_normal - vec3(0.5, 0.5, 0.5)) * 2.0;
    vec3 worldTangent = (a_tangent - vec3(0.5, 0.5, 0.5)) * 2.0;
    vec3 worldBinormal = cross(worldNormal, worldTangent);

    v_WorldN = worldNormal;
    v_WorldB = worldBinormal;
    v_WorldT = worldTangent;
    vec3 pixelNormalDir = vec3(0.5, 0.5, 1.0);

   vec4 cameraPos = uMatCamera * vec4(worldPos, 1.0);
   	cameraPos = cameraPos / cameraPos.w;

   	gl_Position = uMatProjection * cameraPos;

    v_WorldP = worldPos;
    v_color0 = a_color0;

    v_ScreenUV.xy = gl_Position.xy / gl_Position.w;
    v_ScreenUV.xy = vec2(v_ScreenUV.x + 1.0, v_ScreenUV.y + 1.0) * 0.5;
}

#endif


#ifdef FS
$input v_color0
$input v_texcoord0
$input v_texcoord1
$input v_WorldP
$input v_WorldN
$input v_WorldT
$input v_WorldB
$input v_ScreenUV

/// ----- UNIFORM
#include "../Library/Base/common.sh"

SAMPLER2D(ColorTexture,0);
SAMPLER2D(NormalTexture,1);

uniform vec4 LightDirection;
uniform vec4 LightColor;
uniform vec4 LightAmbient;

// Materials
uniform vec4 u_time;
// end materials
/// ----------  END UNIFORM


void main()
{

    vec3 texNormal = (texture2D(NormalTexture, v_texcoord0.xy).xyz - 0.5) * 2.0;
    mat3 normalMatrix = mat3(v_WorldT.xyz, v_WorldB.xyz, v_WorldN.xyz );
    vec3 localNormal = normalize( normalMatrix * texNormal );
    float diffuse = max(0.0, dot(localNormal, LightDirection.xyz));

    gl_FragColor = v_color0 * texture2D(ColorTexture, v_texcoord0.xy);
    gl_FragColor.xyz = gl_FragColor.xyz * (LightColor.xyz * diffuse + LightAmbient.xyz);

    if(gl_FragColor.w <= 0.0) discard;

}

#endif
