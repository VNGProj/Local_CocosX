#ifdef VS

/// input
#define USING_VERTEX
#define USING_NORMAL
#define USING_TEXCOORD0
#define USING_TEXCOORD1
#include "Library/VertexInput.glsl"

/// output
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#define USING_INOUT_SHADOWCOORD
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#define GPU_SKINNING
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"
     #include "Library/Macro/NormalFinal.glsl"
     #include "Library/Macro/Texcoord0Final.glsl"
     #include "Library/Macro/ShadowCoordFinal.glsl"
}
#endif

#ifdef FS

/// input
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#define USING_INOUT_SHADOWCOORD
#include "Library/Varying.glsl"

/// Common (uniforms,samplers, transforms ... )
#include "Library/Common.glsl"
#include "Library/Lighting.glsl"

void main()
{
    vec4 texColor = texture2D(u_diffuseTex,v_texcoord0);
    gl_FragColor = vec4(texColor.rgb,1.0);
}

#endif
