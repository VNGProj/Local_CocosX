
#ifdef VS
SAMPLER2D(s_gpuAnimation,0);
#endif

#ifdef FS
SAMPLER2D(u_diffuseTex,0);
SAMPLER2D(s_shadowMap,1);
#endif
