vec4 v_texcoord0        : TEXCOORD0 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_texcoord1        : TEXCOORD1 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_ScreenUV        : TEXCOORD2 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_vaPos        : TEXCOORD0 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_vaPosR        : TEXCOORD0 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_vaPosU        : TEXCOORD0 = vec4(0.0,0.0,0.0, 0.0);
vec4 v_color0        : COLOR0 = vec4(0.0, 0.0,0.0,1.0);
vec3 v_normal  : POSITION = vec3(0.0,0.0,0.0);
vec3 v_FragFog       : NORMAL = vec3(0.0,0.0,0.0);
vec4 v_shadowcoord       : COLOR1 = vec4(0.0, 0.0,0.0,1.0);
vec3 v_WorldP       : NORMAL = vec3(0.0, 0.0,0.0,1.0);
vec3 v_WorldN       : NORMAL = vec3(0.0, 0.0,0.0,1.0);
vec3 v_WorldT       : NORMAL = vec3(0.0, 0.0,0.0,1.0);
vec3 v_WorldB       : NORMAL = vec3(0.0, 0.0,0.0,1.0);


vec4 a_position        : POSITION;
vec2 a_texcoord0    : TEXCOORD0;
vec2 a_texcoord1    : TEXCOORD1;
vec4 a_color0         : COLOR0;
vec3 a_normal        : NORMAL;
vec3 a_tangent        : TANGENT;
vec3 a_bitangent    : BITANGENT;
vec4 a_weight        : WEIGHT;
vec4 a_indices        : INDICES;

vec4 i_data0        : DATA0;
vec4 i_data1        : DATA1;
vec4 i_data2        : DATA2;
vec4 i_data3        : DATA3;
vec4 i_data4        : DATA4;
