
vec3 normal;
#ifdef SKINNING
    normal = getSkinnedNormal(a_normal.xyz,a_weight,a_indices);
#else
    normal = a_normal;
#endif

#ifdef INSTANCING
    mat4 worldMatrix = getInstanceMatrix(i_data0,i_data1,i_data2,i_data3);
    normal = mul(worldMatrix , vec4(normal,0.0)).xyz;
#else

    #ifdef NORMAL_MATRIX
    mat3 inverseTransposeWorldMatrix = mat3(u_inverseTransposeWorldMatrix[0].xyz, u_inverseTransposeWorldMatrix[1].xyz, u_inverseTransposeWorldMatrix[2].xyz);
    normal = mul(inverseTransposeWorldMatrix , normal);
    #else
    normal = mul(u_model[0], vec4(normal,0.0)).xyz;
    #endif
#endif

    v_normal = normalize(normal.xyz);
