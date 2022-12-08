
#ifdef DESKTOP

#else

#ifdef INSTANCING
    vec3 x_normal = v_normal.xyz * 2.0 - 1.0;
    const float shadowMapOffset = 0.001;
    vec3 posOffset = position.xyz + x_normal.xyz * shadowMapOffset;
    //v_shadowcoord = mul(mul(u_lightSpaceMatries[0], u_model[0]) , vec4(posOffset.xyz,1.0) );
    v_shadowcoord = mul(u_lightSpaceMatries[0] , position );
#else
    vec3 x_normal = v_normal.xyz * 2.0 - 1.0;
    const float shadowMapOffset = 0.001;
    vec3 posOffset = position.xyz + x_normal.xyz * shadowMapOffset;
    //v_shadowcoord = mul(mul(u_lightSpaceMatries[0], u_model[0]) , vec4(posOffset.xyz,1.0) );
    v_shadowcoord = mul(mul(u_lightSpaceMatries[0], u_model[0]) , position );
#endif


#endif
