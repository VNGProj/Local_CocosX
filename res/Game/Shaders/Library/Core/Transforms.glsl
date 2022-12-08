
#ifdef GPU_SKINNING
vec4 getGPUSkinnedPositionFromTexWithTime(sampler2D u_TexAnim, float vertex_ID,float time)
{
    float width =  u_matrixPalette[1].x;
    int height = int (u_matrixPalette[1].y);
    float maxMagtunide = u_matrixPalette[1].z;

    float v1 = time;
    float v2 = time + 1.0;
    float u = vertex_ID / width;

    vec4 data1 = texture2DLod(u_TexAnim,vec2(u,v1),0);
    //vec4 data2 = texture2DLod(u_TexAnim,vec2(u,v2),0);

    data1.x = ((data1.x * 2.0) - 1.0) * maxMagtunide;
    data1.y = ((data1.y * 2.0) - 1.0) * maxMagtunide;
    data1.z = ((data1.z * 2.0) - 1.0) * maxMagtunide;
    data1.w = 1.0;

    //    data2.x = ((data2.x * 2.0) - 1.0) * maxMagtunide;
    //    data2.y = ((data2.y * 2.0) - 1.0) * maxMagtunide;
    //    data2.z = ((data2.z * 2.0) - 1.0) * maxMagtunide;
    //    data2.w = 1.0;
    return data1;
}

vec4 getGPUSkinnedPosition(sampler2D u_TexAnim, float index)
{
    return getGPUSkinnedPositionFromTexWithTime(u_TexAnim,index,u_matrixPalette[0].x);
}

#endif

#ifdef INSTANCING

mat4 getInstanceMatrix(vec4 i_data0,vec4 i_data1,vec4 i_data2,vec4 i_data3)
{
    mat4 model;
    model[0] = i_data0;
    model[1] = i_data1;
    model[2] = i_data2;
    model[3] = i_data3;

    model[3].w = 1.0;

    return model;
}

#endif


