#ifdef VS
$input a_position, a_texcoord0, a_color0
$output v_fragmentColor, v_texCoord

uniform mat4 CC_PMatrix;
uniform mat4 CC_MultiViewPMatrix[4];
uniform mat4 CC_MVMatrix;
uniform mat4 CC_MVPMatrix;
uniform mat4 CC_MultiViewMVPMatrix[4];
uniform mat3 CC_NormalMatrix;
uniform vec4 CC_Time;
uniform vec4 CC_SinTime;
uniform vec4 CC_CosTime;
uniform vec4 CC_Random01;

#include "../Library/Base/common.sh"

uniform mat4 u_viewProjMatrix;

void main()
{
    gl_Position = mul(mul(u_viewProjMatrix,CC_MVMatrix) , vec4(a_position.xyz, 1.0));
    v_fragmentColor = a_color0;
    v_texCoord = a_texcoord0;
}



#endif

#ifdef FS
$input v_fragmentColor, v_texCoord

#include "../Library/Base/common.sh"

uniform mat4 CC_PMatrix;
uniform mat4 CC_MultiViewPMatrix[4];
uniform mat4 CC_MVMatrix;
uniform mat4 CC_MVPMatrix;
uniform mat4 CC_MultiViewMVPMatrix[4];
uniform mat3 CC_NormalMatrix;
uniform vec4 CC_Time;
uniform vec4 CC_SinTime;
uniform vec4 CC_CosTime;
uniform vec4 CC_Random01;

SAMPLER2D (CC_Texture0,0);

uniform vec4 u_textColor;


void main()
{
    // gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);

    vec4 color = texture2D(CC_Texture0, v_texCoord);
    //the texture use dual channel 16-bit output for distance_map
    //float dist = color.b+color.g/256.0;
    // the texture use single channel 8-bit output for distance_map
    float dist = color.a;
    //TODO: Implementation 'fwidth' for glsl 1.0
    //float width = fwidth(dist);
    //assign width for constant will lead to a little bit fuzzy,it's temporary measure.
    float width = 0.04;
    float alpha = smoothstep(0.5-width, 0.5+width, dist) * u_textColor.a;
    gl_FragColor = v_fragmentColor * vec4(u_textColor.rgb,alpha);
}


#endif
