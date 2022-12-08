vec2 v_texcoord0        : TEXCOORD0 = vec2(0.0, 0.0);
vec2 v_texcoord        : TEXCOORD0 = vec2(0.0, 0.0);
vec2 v_texCoord        : TEXCOORD0 = vec2(0.0, 0.0);
vec4 v_color0            : COLOR0 = vec4(0.0, 0.0,0.0,1.0);
vec4 v_color            : COLOR0 = vec4(0.0, 0.0,0.0,1.0);
vec3 v_normal           : NORMAL = vec3(0.0,0.0,0.0);
vec3 v_FragPos          : NORMAL = vec3(0.0,0.0,0.0);
vec4 v_shadowcoord       : TEXCOORD1 = vec4(0.0, 0.0,0.0,1.0);
vec4 v_light	        : COLOR0 = vec4(1.0,0.0,0.0,1.0);
vec4 v_dark	            : COLOR1 = vec4(1.0,0.0,0.0,1.0);
vec4 v_fragmentColor	: COLOR0 = vec4(1.0,0.0,0.0,1.0);
vec4 v_lightColor       : COLOR2 = vec4(0.0,0.0,0.0,0.0);


vec4 a_position        : POSITION;
vec2 a_texcoord0    : TEXCOORD0;
vec2 a_texcoord1    : TEXCOORD1;
vec4 a_color0         : COLOR0;
vec4 a_color1			: COLOR1;
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
vec4 i_data5        : DATA5;
