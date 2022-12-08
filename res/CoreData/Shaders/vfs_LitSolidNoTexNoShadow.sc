#ifdef VS

/// input
#define USING_VERTEX
#define USING_NORMAL
#define USING_TEXCOORD0
#include "Library/VertexInput.glsl"

/// output
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"
     #include "Library/Macro/NormalFinal.glsl"
     #include "Library/Macro/Texcoord0Final.glsl"
}
#endif

#ifdef FS

/// input
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#include "Library/Varying.glsl"

/// Common (uniforms,samplers, transforms ... )
#include "Library/Common.glsl"
#include "Library/Lighting.glsl"

void main()
{

    vec3 environmentColor = GetEnvironmentColor(v_normal);
    vec3 lightColor = GetLightColor(v_normal);

    gl_FragColor = vec4((lightColor + environmentColor) * u_matDiffColor.rgb,1.0);
}

#endif
