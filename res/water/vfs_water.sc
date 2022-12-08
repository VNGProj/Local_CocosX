#ifdef VS

/// input
#define USING_VERTEX
#define USING_NORMAL
#define USING_TEXCOORD0
#include "../CoreData/Shaders/Library/VertexInput.glsl"

#define USING_INOUT_POSITION
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#include "../CoreData/Shaders/Library/Varying.glsl"

/// Common (uniforms , transforms ... )
#include "../CoreData/Shaders/Library/Common.glsl"

void main()
{
   #include "../CoreData/Shaders/Library/Macro/PositionFinal.glsl"
   #include "../CoreData/Shaders/Library/Macro/NormalFinal.glsl"
   #include "../CoreData/Shaders/Library/Macro/Texcoord0Final.glsl" 
   v_position = gl_Position;
}

#endif


/// Frag shader
#ifdef FS

#define USING_INOUT_POSITION
#define USING_INOUT_NORMAL
#define USING_INOUT_TEXCOORD0
#include "../CoreData/Shaders/Library/Varying.glsl"

#include "../CoreData/Shaders/Library/Common.glsl"

SAMPLER2D(u_PerlinNoiseTex,0);
SAMPLER2D(u_WaterDistortionTex,0);

void main()
{
	vec2 uv = v_texcoord0;
	uv.x += u_time.z * 0.002;
	vec2 distortion = (texture2D(u_WaterDistortionTex,uv).xy * 2.0 - 1.0) * 0.37;
	
	vec2 uvSurface = v_texcoord0;
	//uvSurface = uvSurface + distortion;
	//uvSurface.x *= 4.0;
	//uvSurface.y *= 8.0;
	//uvSurface = uvSurface + distortion;
	
	//uvSurface = fract(uvSurface);
	
	uvSurface = uvSurface + (u_time.z + 1.0 ) * 0.5;
	uvSurface = fract(uvSurface); 
	
	
	float sampleNoise = texture2D(u_PerlinNoiseTex,uvSurface).r;
	vec4 baseWaterColor = vec4(0.2,0.5,1.0,0.5);
	float noiseCutOff = 0.777;
	
   gl_FragColor = baseWaterColor + ((sampleNoise > noiseCutOff)?vec4(vec3(1.0),0.0):vec4(0.0));

    //  gl_FragColor = texture2D(u_PerlinNoiseTex,uvSurface);
}

#endif









