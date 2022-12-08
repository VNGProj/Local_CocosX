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

#define LENGTH 0.0025

vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(image, uv) * 0.29411764705882354;
  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color;
}
vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;
  color += texture2D(image, uv) * 0.1964825501511404;
  color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
  color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
  return color;
}

void main()
{

      gl_FragColor = blur13(u_diffuseTex,v_texcoord0,vec2(960.0,640.0),vec2(1.0,1.0));
}

#endif
