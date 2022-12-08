#ifdef VS

/// input
#define USING_VERTEX
#define USING_INSTANCING
#include "Library/VertexInput.glsl"

// output
#include "Library/Varying.glsl"

#define INSTANCING
/// Common (uniforms , transforms ... )
#include "Library/Common.glsl"

void main()
{
   #include "Library/Macro/PositionFinal.glsl"
}

#endif


/// Frag shader
#ifdef FS

#include "Library/Common.glsl"

void main()
{
    gl_FragColor = vec4_splat(0.0);
}

#endif
