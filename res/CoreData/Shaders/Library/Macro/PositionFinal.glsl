
vec4 position = vec4(a_position.xyz,1.0);

#ifdef SKINNING
    position = getSkinnedPosition(position.xyz,a_weight,a_indices);
#endif


#ifdef INSTANCING
    mat4 instancedMatrix = getInstanceMatrix(i_data0,i_data1,i_data2,i_data3);
    #ifdef GPU_SKINNING
        position = getGPUSkinnedPositionFromTexWithTime(s_gpuAnimation,a_texcoord1.x,i_data4.x);
    #endif
    position = instMul(instancedMatrix,position);

#else
    #ifdef GPU_SKINNING
        position = getGPUSkinnedPosition(s_gpuAnimation,a_texcoord1.x);
    #endif
#endif


#ifdef INSTANCING
gl_Position = mul(u_viewProj, position);
#else
gl_Position = mul(u_modelViewProj , position);
#endif
