#ifdef VS

/// input
#define USING_VERTEX
#define USING_NORMAL
#define USING_TEXCOORD0
#include "Library/VertexInput.glsl"

/// output
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#define USING_INOUT_SHADOWCOORD
#define USING_INOUT_FRAGPOS
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"
     #include "Library/Macro/NormalFinal.glsl"
     #include "Library/Macro/Texcoord0Final.glsl"
     #include "Library/Macro/ShadowCoordFinal.glsl"
     #include "Library/Macro/FragPosFinal.glsl"
}
#endif

#ifdef FS

/// input
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#define USING_INOUT_SHADOWCOORD
#define USING_INOUT_FRAGPOS
#include "Library/Varying.glsl"

/// Common (uniforms,samplers, transforms ... )
#define RECEIVED_SHADOW
#include "Library/Common.glsl"
#include "Library/Lighting.glsl"

void main()
{
    vec4 texColor = texture2D(u_diffuseTex,v_texcoord0.xy);
    vec3 environmentColor = GetEnvironmentColor(v_normal);
    vec3 lightColor = GetLightColor(v_normal);

    gl_FragColor = vec4((lightColor + environmentColor),texColor.a);
}

#endif
