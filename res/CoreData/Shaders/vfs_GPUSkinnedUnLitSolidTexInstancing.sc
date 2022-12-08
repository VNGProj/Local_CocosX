#ifdef VS

/// input
#define USING_VERTEX
#define USING_NORMAL
#define USING_TEXCOORD0
#define USING_TEXCOORD1
#define USING_INSTANCING
#include "Library/VertexInput.glsl"

/// output
#define USING_INOUT_TEXCOORD0

#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#define GPU_SKINNING
#define INSTANCING
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"
     #include "Library/Macro/Texcoord0Final.glsl"
}
#endif

#ifdef FS

/// input
#define USING_INOUT_TEXCOORD0
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
