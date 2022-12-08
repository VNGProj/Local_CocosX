
#ifndef Sampler
#define Sampler sampler2DShadow
#endif

float hardShadow(sampler2D _sampler, vec4 _shadowCoord, float _bias)
{
	vec3 texCoord = _shadowCoord.xyz/_shadowCoord.w;
	//#if SHADOW_PACKED_DEPTH
	return step(texCoord.z-_bias, unpackRgbaToFloat(texture2D(_sampler, texCoord.xy) ) );
	//#else
	//return shadow2D(_sampler, vec3(texCoord.xy, texCoord.z-_bias) );
	//#endif // SHADOW_PACKED_DEPTH
}

float PCF(sampler2D _sampler, vec4 _shadowCoord, float _bias, vec2 _texelSize)
{
	vec2 texCoord = _shadowCoord.xy/_shadowCoord.w;

	//	bool outside = any(greaterThan(texCoord, vec2_splat(1.0)))
	//				|| any(lessThan   (texCoord, vec2_splat(0.0)))
	//				 ;
	//
	//	if (outside)
	//	{
	//		return 1.0;
	//	}

	float result = 0.0;
	vec2 offset = _texelSize * _shadowCoord.w;

	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-1.5, -1.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-1.5, -0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-1.5,  0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-1.5,  1.5) * offset, 0.0, 0.0), _bias);

	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-0.5, -1.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-0.5, -0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-0.5,  0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(-0.5,  1.5) * offset, 0.0, 0.0), _bias);

	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(0.5, -1.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(0.5, -0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(0.5,  0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(0.5,  1.5) * offset, 0.0, 0.0), _bias);

	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(1.5, -1.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(1.5, -0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(1.5,  0.5) * offset, 0.0, 0.0), _bias);
	result += hardShadow(_sampler, _shadowCoord + vec4(vec2(1.5,  1.5) * offset, 0.0, 0.0), _bias);

	return result / 16.0;
}

float softShadow(sampler2D s_shadowMap, vec4 _shadowCoord)
{
	vec3 tex_coords = _shadowCoord.xyz / _shadowCoord.w;
	tex_coords = tex_coords * 0.5 + 0.5;
	float currentDepth = tex_coords.z;
	float bias = 0.005;
	float shadow = 0.0;
	vec2 texelSize = 1.0 / vec2(2048, 2048);
	float soft_f = 3.0;
	for (float x = -soft_f; x <= soft_f; x += 1.0) {
		for (float y = -soft_f; y <= soft_f; y += 1.0) {
			if (x + y == 0.0) continue;
			if (x - y == 0.0) continue;
			float pcfDepth = texture2D(s_shadowMap, tex_coords.xy + vec2(x, y) * texelSize).r;
			shadow += when_gt(currentDepth - bias, pcfDepth);
		}
	}
	float numOfSamples = (2.0 * soft_f + 1.0) * (2.0 * soft_f + 1.0);
	float inShadow = when_gt(shadow / numOfSamples, 1.0 / numOfSamples);

	return inShadow;
}


float ShadowCalculation(sampler2D s_shadowMap, vec4 _shadowCoord)
{
	vec3 tex_coords = _shadowCoord.xyz / _shadowCoord.w;
	tex_coords = tex_coords * 0.5 + 0.5;
	float depth = texture2D(s_shadowMap, tex_coords.xy).r;
	float currentDepth = tex_coords.z;
	float bias = 0.005;
	float inShadow = 0.0;

	#ifdef SOFT_SHADOW
		inShadow = softShadow(s_shadowMap, _shadowCoord);
		inShadow = 0.0;
	#else
		inShadow = when_gt(currentDepth - bias, depth);
	#endif

	float shadowItensity = 1.0 - inShadow;
	return shadowItensity;
}

vec2 lit(vec3 _ld, vec3 _n, vec3 _vd, float _exp)
{
	//diff
	float ndotl = dot(_n, _ld);

	//spec
	vec3 r = 2.0*ndotl*_n - _ld; //reflect(_ld, _n);
	float rdotv = dot(r, _vd);
	float spec = step(0.0, ndotl) * pow(max(0.0, rdotv), _exp) * (2.0 + _exp)/8.0;

	return max(vec2(ndotl, spec), 0.0);
}

float GetFadeShadow(vec2 texCoord,float shadow)
{
	float lightShadowFade = u_lightInfo.w;
	float ret = 0.0;
	ret += shadow * when_le(texCoord.y,lightShadowFade);
	ret += min(shadow + (texCoord.y - lightShadowFade) / (1.0 - lightShadowFade) ,1.0) * when_gt(texCoord.y,lightShadowFade);
	return ret;

	//	if(texCoord.y <= lightShadowFade)
	//		return shadow;
	//	else
	//	{
	//		return min(shadow + (texCoord.y - lightShadowFade) / (1.0 - lightShadowFade) ,1.0);
	//	}
}

float GetShadow()
{
	vec2 texCoord = v_shadowcoord.xy/v_shadowcoord.w;
	texCoord = texCoord * 0.5 + 0.5;
	bool outside = any(greaterThan(texCoord, vec2_splat(1.0)))
	|| any(lessThan   (texCoord, vec2_splat(0.0)));

	if (outside)
	{
		return 1.0;
	}


		#ifdef DESKTOP
		#else
	float shadow = ShadowCalculation(s_shadowMap,v_shadowcoord);
	float lightShadowItensity = u_lightInfo.z;
	shadow =  clamp(shadow,lightShadowItensity,1.0);
	return GetFadeShadow(texCoord,shadow);
	#endif
}

