
#ifdef VS
SAMPLER2D(s_gpuAnimation,0);
#endif

#ifdef FS
SAMPLER2D(u_diffuseTex,0);

#define SHADOW_PACKED_DEPTH 1

#if SHADOW_PACKED_DEPTH
SAMPLER2D(s_shadowMap, 1);
#	define Sampler sampler2D
#else
SAMPLER2DSHADOW(s_shadowMap, 1);
#	define Sampler sampler2DShadow
#endif // SHADOW_PACKED_DEPTH

#endif
