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

uniform vec4 u_effectColor;
uniform vec4 u_textColor;

uniform vec4 u_effectType;


void main()
{
   vec4 sample = texture2D(CC_Texture0, v_texCoord);
    // fontAlpha == 1 means the area of solid text (without edge)
    // fontAlpha == 0 means the area outside text, including outline area
    // fontAlpha == (0, 1) means the edge of text
    float fontAlpha = sample.g;

    // outlineAlpha == 1 means the area of 'solid text' and 'solid outline'
    // outlineAlpha == 0 means the transparent area outside text and outline
    // outlineAlpha == (0, 1) means the edge of outline
    float outlineAlpha = sample.r;

    if (u_effectType.x == 0.0) // draw text
    {
        gl_FragColor = mul(v_fragmentColor , vec4(u_textColor.rgb,  u_textColor.a * fontAlpha));
    }
    else if (u_effectType.x == 1.0) // draw outline
    {
        // multipy (1.0 - fontAlpha) to make the inner edge of outline smoother and make the text itself transparent.
        gl_FragColor = mul(v_fragmentColor , vec4(u_effectColor.rgb, u_effectColor.a * outlineAlpha * (1.0 - fontAlpha)));
        //gl_FragColor = mul(v_fragmentColor , vec4(u_textColor.rgb, u_textColor.a * fontAlpha));
        //gl_FragColor = vec4(1.0,0.0,0.0,0.0);
    }
    else // draw shadow
    {
        gl_FragColor = v_fragmentColor * vec4(u_effectColor.rgb, u_effectColor.a * outlineAlpha);
    }
}


#endif
