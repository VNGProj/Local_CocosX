
#ifdef VS

#define USING_VERTEX

#include "Library/VertexInput.glsl"
#include "Library/Varying.glsl"
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
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}

#endif
