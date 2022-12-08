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

uniform vec4 u_billboardCenter;

void main()
{
    // orientation invariant
    // https://www.geeks3d.com/20140807/billboarding-vertex-shader-glsl/

    mat4 modelView = mat4(u_modelView);
    // First colunm.
    modelView[0][0] = 1.0; 
    modelView[0][1] = 0.0; 
    modelView[0][2] = 0.0; 

    // Second colunm.
    modelView[1][0] = 0.0; 
    modelView[1][1] = 1.0; 
    modelView[1][2] = 0.0; 

    // Thrid colunm.
    modelView[2][0] = 0.0; 
    modelView[2][1] = 0.0; 
    modelView[2][2] = 1.0;

    // fixed-size billboard
    // https://stackoverflow.com/questions/41767490/how-to-transform-vertices-in-vertex-shader-to-get-a-3d-billboard

    vec4 viewPos = mul(u_modelView, u_billboardCenter);
    float dist = -viewPos.z * 0.005;
    //gl_Position = mul(u_proj, (viewPos + vec4(a_position.xy*dist, 0, 0)));
    
    gl_Position = mul(u_proj, mul(modelView, vec4(a_position.xyz * dist, 1.0)));

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
    vec4 texColor = texture2D(u_diffuseTex, v_texcoord0);
    gl_FragColor = vec4(texColor.rgb, texColor.a);
}

#endif
