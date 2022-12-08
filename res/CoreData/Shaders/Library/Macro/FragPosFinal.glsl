#ifdef INSTANCING
v_FragPos = position.xyz;
#else
v_FragPos = mul(u_model[0],position).xyz;
#endif
