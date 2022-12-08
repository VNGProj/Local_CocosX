$input v_FragPos

#include "../../../../CoreData/Shaders/Library/Base/common.sh"

uniform vec4 u_sceneHemisphericColor[3];
uniform vec4 topColor;
uniform vec4 bottomColor;
uniform vec4 offset;
uniform vec4 exponent;
void main()
{

    vec3 groundColor = vec3(u_sceneHemisphericColor[0][0],u_sceneHemisphericColor[0][1],u_sceneHemisphericColor[0][2]);
    vec3 skyColor = vec3(u_sceneHemisphericColor[1][0],u_sceneHemisphericColor[1][1],u_sceneHemisphericColor[1][2]);
    vec3 equatorColor = vec3(u_sceneHemisphericColor[2][0],u_sceneHemisphericColor[2][1],u_sceneHemisphericColor[2][2]);

    float h = normalize( v_FragPos.xyz + offset.xyz).y;
    gl_FragColor = vec4( mix( groundColor.xyz, mix(equatorColor.xyz,skyColor.xyz,0.2), max( pow( max( h , 0.05), exponent.x), 0.1 ) ), 1.0 );
}






