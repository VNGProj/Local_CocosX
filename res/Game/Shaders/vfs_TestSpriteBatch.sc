#ifdef VS

/// input
#define USING_VERTEX
#define USING_TEXCOORD0
#include "Library/VertexInput.glsl"

/// output
#define USING_INOUT_TEXCOORD0
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"

     vec2 texcoord0 = a_texcoord0;
     #if BGFX_SHADER_LANGUAGE_GLSL
         //texcoord0.y = 1.0 - texcoord0.y;
     #endif
     v_texcoord0 = texcoord0.xy;
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
    gl_FragColor = vec4(texColor);
}

#endif
