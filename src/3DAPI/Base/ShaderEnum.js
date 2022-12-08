/**
 *   Created by bachbv on 11/11/2021
 */

let ShaderEnum = {
    // sampler
    s_gpuAnimation:                     's_gpuAnimation',
    u_diffuseTex:                       'u_diffuseTex',
    s_shadowMap:                        's_shadowMap',

    // uniform matrix
    u_worldMatrix:                      'u_worldMatrix',
    u_worldViewMatrix:                  'u_worldViewMatrix',
    u_worldViewProjectionMatrix:        'u_worldViewProjectionMatrix',
    u_inverseTransposeWorldViewMatrix:  'u_inverseTransposeWorldViewMatrix',
    u_inverseTransposeWorldMatrix:      'u_inverseTransposeWorldMatrix',
    u_viewProjectionMatrix:             'u_viewProjectionMatrix',
    u_projectionMatrix:                 'u_projectionMatrix',

    u_time:                             'u_time',

    // anim, light, cam, shadow
    u_cameraPosition:                   'u_cameraPosition',
    u_ambientStartColor:                'u_ambientStartColor',
    u_ambientEndColor:                  'u_ambientEndColor',
    u_lightPosition:                    'u_lightPosition',
    u_lightDirection:                   'u_lightDirection',
    u_lightColor:                       'u_lightColor',
    u_lightInfo:                        'u_lightInfo',
    u_lightSpaceMatries:                'u_lightSpaceMatries',
    u_shadowViewports:                  'u_shadowViewports',
    u_shadowSplits:                     'u_shadowSplits',
    u_cascadedViewport:                 'u_cascadedViewport',
    u_matrixPalette:                    'u_matrixPalette',
    u_sceneHemisphericColor:            'u_sceneHemisphericColor',
    u_ambientColor:                     'u_ambientColor',
    u_matDiffColor:                     'u_matDiffColor',
    u_matEmissiveColor:                 'u_matEmissiveColor',
    u_matEnvMapColor:                   'u_matEnvMapColor',
    u_matSpecColor:                     'u_matSpecColor',

    // pbr
    cRoughness:                         'cRoughness',
    cMetallic:                          'cMetallic',
    cLightRad:                          'cLightRad',
    cLightLength:                       'cLightLength',
};