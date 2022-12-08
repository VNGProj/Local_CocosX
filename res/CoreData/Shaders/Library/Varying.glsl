#ifdef USING_INOUT_NORMAL
    #ifdef VS
    $output v_normal
    #endif
    #ifdef FS
    $input v_normal
    #endif
#endif

#ifdef USING_INOUT_COLOR0
    #ifdef VS
    $output v_normal
    #endif
    #ifdef FS
    $input v_normal
    #endif
#endif

#ifdef USING_INOUT_TEXCOORD0
    #ifdef VS
    $output v_texcoord0
    #endif
    #ifdef FS
    $input v_texcoord0
    #endif
#endif

#ifdef USING_INOUT_FRAGPOS
    #ifdef VS
    $output v_FragPos
    #endif
    #ifdef FS
    $input v_FragPos
    #endif
#endif

#ifdef USING_INOUT_SHADOWCOORD
    #ifdef VS
    $output v_shadowcoord
    #endif
    #ifdef FS
    $input v_shadowcoord
    #endif
#endif

#ifdef USING_INOUT_POSITION
#ifdef VS
$output v_position
#endif
#ifdef FS
$input v_position
#endif
#endif
