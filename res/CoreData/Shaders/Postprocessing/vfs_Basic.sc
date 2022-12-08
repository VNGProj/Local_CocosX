#ifdef VS

/// input
#define USING_VERTEX
#define USING_TEXCOORD0
#include "../Library/VertexInput.glsl"

/// output
#define USING_INOUT_TEXCOORD0
#include "../Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "../Library/Common.glsl"

void main()
{
     gl_Position = vec4(a_position.xyz,1.0);
     v_texcoord0 = a_texcoord0.xy;
}
#endif

#ifdef FS

/// input
#define USING_INOUT_TEXCOORD0
#include "../Library/Varying.glsl"

/// Common (uniforms,samplers, transforms ... )
#include "../Library/Common.glsl"
#include "../Library/Lighting.glsl"

void main()
{
    vec4 texColor = texture2D(u_diffuseTex,v_texcoord0);
    gl_FragColor = texColor;
}

#endif
