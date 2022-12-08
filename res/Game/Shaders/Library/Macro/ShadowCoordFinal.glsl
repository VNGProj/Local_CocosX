
#ifdef DESKTOP
#else
v_shadowcoord = mul(mul(u_lightSpaceMatries[0], u_model[0]) , vec4(position.xyz,1.0) );
#endif
