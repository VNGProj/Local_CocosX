#ifdef VS

/// input
#include "Library/VertexInput.glsl"

/// output
#include "Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "Library/Common.glsl"

void main()
{
     #include "Library/Macro/PositionFinal.glsl"
     #include "Library/Macro/NormalFinal.glsl"
     #include "Library/Macro/ShadowCoordFinal.glsl"
     #include "Library/Macro/FragPosFinal.glsl"

     // receive shadow
     #include "Library/Macro/ShadowCoordFinal.glsl"

     // modify texcoords with extradata
     int ballID = 15;
     int offsetX = ballID - (ballID / 8) * 8;
     int offsetY = 1 - ballID / 8;


     v_texcoord0.xy = a_texcoord0.xy;
     v_texcoord0.x = v_texcoord0.x / 8.0 + float(offsetX) / 8.0;
     v_texcoord0.y = (1.0 - v_texcoord0.y) * 0.5 + float(offsetY) * 0.5;

}
#endif

#ifdef FS

/// input
#include "Library/Varying.glsl"

/// Common (uniforms,samplers, transforms ... )
#include "Library/Common.glsl"
#include "Library/Lighting.glsl"

void main()
{
      vec4 texColor = texture2D(u_diffuseTex,v_texcoord0.xy);
      vec3 environmentColor = GetEnvironmentColor(v_normal);
      vec3 lightColor = GetLightColor(v_normal);

      gl_FragColor = vec4((lightColor + environmentColor) * texColor.rgb,1.0);
}

#endif
