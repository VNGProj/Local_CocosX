#ifndef LIGHT_TYPES
    #define DIRECTION_LIGHT 0
    #define SPOT_LIGHT 1
    #define POINT_LIGHT 2
    #define LIGHT_TYPES
#endif

#ifdef RECEIVED_SHADOW1
#include "Shadow.glsl"
#endif

vec3 lerp(vec3 a,vec3 b,float t)
{
    return b * t + (1.0-t) * a;
}
vec3 ComputeHemisphericLight(vec3 normalVector)
{
    vec3 groundColor = vec3(u_sceneHemisphericColor[0][0],u_sceneHemisphericColor[0][1],u_sceneHemisphericColor[0][2]);
    vec3 skyColor = vec3(u_sceneHemisphericColor[1][0],u_sceneHemisphericColor[1][1],u_sceneHemisphericColor[1][2]);
    vec3 equatorColor = vec3(u_sceneHemisphericColor[2][0],u_sceneHemisphericColor[2][1],u_sceneHemisphericColor[2][2]);

    vec3 worldUp = vec3(0.0,1.0,0.0);
    float skyGroundDotMul = 2.5;
    float minEquatorMix = 0.5;
    float equatorColorBlur = 0.33;

    float upDot = dot(normalVector, worldUp);

    float adjustedDot = upDot * skyGroundDotMul;
    vec3 skyGroundColor = lerp(groundColor, skyColor, saturate((adjustedDot + 1.0) * 0.5));

    //Work out equator lights brightness
    float equatorBright = saturate(dot(equatorColor, equatorColor));

    //Blur equator color with sky and ground colors based on how bright it is.
    vec3 equatorBlurredColor = lerp(equatorColor, saturate(equatorColor + groundColor + skyColor), equatorBright * equatorColorBlur);

    //Work out 3 way lerp inc equator light
    float smoothDot = pow(abs(upDot), 1.0);
    vec3 equatorColor2 = lerp(equatorBlurredColor, groundColor, smoothDot) * step(upDot, 0) + lerp(equatorBlurredColor, skyColor, smoothDot) * step(0, upDot);


    return lerp(skyGroundColor, equatorColor2, saturate(equatorBright + minEquatorMix)) * 0.75;

    //return groundColor * -normalVector.y + skyColor * normalVector.y + equatorColor * (1,0 - abs(normalVector.y));
}


float GetDiffuseDirectionLight(vec3 normal)
{
    vec3 dir = -u_lightDirection.xyz;
    return max(dot(normal,normalize(dir) ), 0.0);
}

float GetDiffuseLight(vec3 normal)
{
    vec3 dir = -u_lightDirection.xyz;
    return max(dot(normal,normalize(dir) ), 0.0);
}

vec3 GetEnvironmentColor(vec3 normal)
{
    float ambientStrenght = u_ambientColor.w;
    return ComputeHemisphericLight(normal);
}

float GetLightShadow()
{
    #ifdef RECEIVED_SHADOW1
        return GetShadow();
    #else
        return 1.0;
    #endif
}

vec3 GetLightColor(vec3 normal)
{
    int lightType = int(u_lightInfo.x);

    float diff = (lightType == DIRECTION_LIGHT)?GetDiffuseDirectionLight(normal):GetDiffuseLight(normal);
    float shadow = GetLightShadow();
    return diff * shadow * u_lightColor.rgb;
}


