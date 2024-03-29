#ifdef VS

/// input
#define USING_VERTEX
#define USING_TEXCOORD1
#define USING_INSTANCING
#include "Library/VertexInput.glsl"
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#define GPU_SKINNING
#define INSTANCING
#include "Library/Common.glsl"

void main()
{
    #include "Library/Macro/PositionFinal.glsl"
   // move to uv space
   float u = (gl_Position.x + 1.0) / 2.0;
   float v = (gl_Position.y + 1.0) / 2.0;
   float t0 = u_cascadedViewport[0];
   float t1 = u_cascadedViewport[1];
   float t2 = u_cascadedViewport[2];
   float t3 = u_cascadedViewport[3];

   u =  t0 + (t2 - t0) * u;
   v =  t1 + (t3 - t1) * v;

   gl_Position.x = u * 2.0 - 1.0;
   gl_Position.y = v * 2.0 - 1.0;
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
