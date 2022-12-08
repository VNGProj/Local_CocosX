#ifdef USING_VERTEX
$input a_position
#endif

#ifdef USING_COLOR
$input a_color0
#endif

#ifdef USING_NORMAL
$input a_normal
#endif

#ifdef USING_TEXCOORD0
$input a_texcoord0
#endif

#ifdef USING_TEXCOORD1
$input a_texcoord1
#endif

#ifdef USING_NORMALMAP
$input a_tangent
$input a_bitangent
#endif

#ifdef USING_SKINNING
$input a_weight
$input a_indices
#endif


#ifdef USING_INSTANCING
$input i_data0
$input i_data1
$input i_data2
$input i_data3
$input i_data4
#endif
