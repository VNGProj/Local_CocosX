
vec2 texcoord0 = a_texcoord0;
#if BGFX_SHADER_LANGUAGE_GLSL
    //texcoord0.y = 1.0 - texcoord0.y;
#endif
v_texcoord0 = texcoord0.xy;
v_texcoord0.y = 1.0 - texcoord0.y;
