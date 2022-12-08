// Uniform used in vs and fs shader

/// Vertex shader uniform

uniform mat4 u_worldMatrix;
uniform mat4 u_worldViewMatrix;
uniform mat4 u_worldViewProjectionMatrix;

uniform mat4 u_inverseTransposeWorldViewMatrix;
uniform mat4 u_inverseTransposeWorldMatrix;

uniform mat4 u_viewProjectionMatrix;
uniform mat4 u_projectionMatrix;

uniform vec4 u_time;
uniform vec4 u_cameraPosition;

// for hesmispheric & fog color
uniform vec4 u_ambientStartColor;
uniform vec4 u_ambientEndColor;

#ifndef MAX_SPLIT_COUNT
#define MAX_SPLIT_COUNT 3
#endif

// light position
uniform vec4 u_lightPosition;
// light direction
uniform vec4 u_lightDirection;
// light color
uniform vec4 u_lightColor;
// light info : type ,shadow split count
uniform vec4 u_lightInfo;
// light view projections
uniform mat4 u_lightSpaceMatries[MAX_SPLIT_COUNT];
// shadow viewports (for split in one texture)
uniform mat4 u_shadowViewports[MAX_SPLIT_COUNT];
// shadow splits
uniform vec4 u_shadowSplits;
// cascaded viewport for shadow pass write
uniform vec4 u_cascadedViewport;


#if defined(SKINNING)
uniform vec4 u_matrixPalette[180];
#if !defined(SKINNING_JOINT_COUNT)
#define SKINNING_JOINT_COUNT 60
#endif
#endif

#if defined GPU_SKINNING
uniform vec4 u_matrixPalette[2];
#endif


/// Fragment shader uniform

uniform vec4 u_sceneHemisphericColor[3];
uniform vec4 u_ambientColor;

uniform vec4 u_matDiffColor;
uniform vec4 u_matEmissiveColor;
uniform vec4 u_matEnvMapColor;
uniform vec4 u_matSpecColor;

#ifdef PBR
uniform vec4 cRoughness;
uniform vec4 cMetallic;
uniform vec4 cLightRad;
uniform vec4 cLightLength;
#endif


