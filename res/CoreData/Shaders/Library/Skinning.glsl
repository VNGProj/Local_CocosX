
vec4 skinPosition(float blendWeight, int matrixIndex,vec3 a_position)
{
    vec4 tmp = vec4(1.0);
    tmp.x = dot(vec4(a_position.xyz,1.0), u_matrixPalette[matrixIndex * 3]);
    tmp.y = dot(vec4(a_position.xyz,1.0), u_matrixPalette[matrixIndex * 3 + 1]);
    tmp.z = dot(vec4(a_position.xyz,1.0), u_matrixPalette[matrixIndex * 3 + 2]);
    tmp.w = 1.0;
    return  tmp * blendWeight;
}

vec4 getSkinnedPosition(vec3 a_position,vec4 a_weight,vec4 a_indices)
{
    vec4 _skinnedPosition = vec4(0.0);
    float blendWeight = a_weight.x;
    int matrixIndex = int (a_indices.x);
    _skinnedPosition += skinPosition(blendWeight, matrixIndex,a_position);
    blendWeight = a_weight.y;
    matrixIndex = int(a_indices.y);
    _skinnedPosition += skinPosition(blendWeight, matrixIndex,a_position);
//    blendWeight = a_weight.z;
//    matrixIndex = int(a_indices.z);
//    _skinnedPosition += skinPosition(blendWeight, matrixIndex,a_position);
//    blendWeight = a_weight.w;
//    matrixIndex = int(a_indices.w);
//    _skinnedPosition += skinPosition(blendWeight, matrixIndex,a_position);
    return _skinnedPosition;
}

vec3 skinTangentSpaceVector(vec3 norm, float blendWeight, int matrixIndex)
{
    vec3 tmp = vec3(1.0);
    tmp.x = dot(norm, u_matrixPalette[matrixIndex].xyz);
    tmp.y = dot(norm, u_matrixPalette[matrixIndex + 1].xyz);
    tmp.z = dot(norm, u_matrixPalette[matrixIndex + 2].xyz);
    return tmp * blendWeight;
}

vec3 getTangentSpaceVector(vec3 norm,vec4 a_weight,vec4 a_indices)
{
    vec3 _skinnedNormal = vec3(0.0);
    // Transform normal to view space using matrix palette with four matrices used to transform a vertex.
    float blendWeight = a_weight.x;
    int matrixIndex = int (a_indices.x) * 3;
    _skinnedNormal += skinTangentSpaceVector(norm, blendWeight, matrixIndex);
    blendWeight = a_weight.y;
    matrixIndex = int(a_indices.y) * 3;
    _skinnedNormal += skinTangentSpaceVector(norm, blendWeight, matrixIndex);
//    blendWeight = a_weight.z;
//    matrixIndex = int(a_indices.z) * 3;
//    _skinnedNormal += skinTangentSpaceVector(norm, blendWeight, matrixIndex);
//    blendWeight = a_weight.w;
//    matrixIndex = int(a_indices.w) * 3;
//    _skinnedNormal += skinTangentSpaceVector(norm, blendWeight, matrixIndex);
    return _skinnedNormal;
}

vec3 getSkinnedNormal(vec3 a_normal,vec4 a_weight,vec4 a_indices)
{
    return getTangentSpaceVector(a_normal,a_weight,a_indices);
}

#if defined(BUMPED)

vec3 getTangent()
{
    return getTangentSpaceVector(a_tangent);
}

vec3 getBinormal()
{
    return getTangentSpaceVector(a_bitangent);
}
#endif

