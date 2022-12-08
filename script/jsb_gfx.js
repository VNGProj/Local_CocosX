/*
 * Copyright (c) 2015-2017 Chukong Technologies Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var gfx = gfx || {};

gfx.c3bLoader = gfx.C3BLoader.getInstance();

gfx.ClearFlags = {
    NONE : 0x0000,
    COLOR: 0x0001,
    DEPTH  : 0x0002,
    STENCIL : 0x0004,
    PALLETTE : 0x8000,
    COLOR_DEPTH : 0x0001 | 0x0002,
    COLOR_STENCIL : 0x0001 | 0x0004,
    DEPTH_STENCIL : 0x0002 | 0x0004,
    COLOR_DEPTH_STENCIL : 0x0001 |0x0002 | 0x0004
};

gfx.SortingMode = {
    DEFAULT : 0,            //!< Default sort order.
    SEQUENTIAL : 1,         //!< Sort in the same order in which submit calls were called.
    DEPTH_ASCENDING : 2,    //!< Sort draw call depth in ascending order.
    DEPTH_DESCENDING : 3,   //!
};

gfx.InstanceDataFormat = {
    MAT4 : 0,
    MAT4_VEC4 : 1,
    MAT4_VEC4_VEC4 : 2
};

gfx.UniformType = {
    SAMPLER : 0,
    VECTOR4: 1,
    MATRIX3: 2,
    MATRIX4 : 3
};

gfx.TextureFormat = {
    D16 : 21,
    D24 : 22,
    BRGA8888 : 1,
    RGBA8888 : 2,
    RGB888 : 3,
    RGB565 : 4
};

gfx.TextureType = {
    TEXTURE_2D : 0,
    TEXTURE_CUBE: 1,
    TEXTURE_RT: 2,
    TEXTURE_RT_WRITE_ONLY: 3,
};

gfx.TextureFilter = {
    NEAREST : 0,
    LINEAR : 1,
    NEAREST_MIPMAP_NEAREST : 2,
    LINEAR_MIPMAP_NEAREST : 3,
    NEAREST_MIPMAP_LINEAR : 4,
    LINEAR_MIPMAP_LINEAR : 5
};

gfx.TextureWrapMode = {
    REPEAT: 0,
    CLAMP : 1,
    MIRROR : 2,
    BORDER: 3
};

/// graphics

gfx.GraphicQuality = {
    QUALITY_LOW : 0,
    QUALITY_MEDIUM : 1,
    QUALITY_HIGH : 2,
    QUALITY_NATIVE : 3,
    QUALITY_CUSTOM : 4,
}

gfx.ShadowQuality = {
    QUALITY_SIMPLE_16BIT : 0,
    QUALITY_SIMPLE_24BIT : 1,
    QUALITY_PCF_16BIT: 2,
    QUALITY_PCF_24BIT : 3,
    QUALITY_VSM : 4,
    QUALITY_BLUR_VSM: 5
}

/////////   Mesh & Meshbatch
gfx.Usage = {
    POSITION : 1,
    NORMAL : 2,
    COLOR : 3,
    TANGENT : 4,
    BINORMAL : 5,
    BLENDWEIGHTS : 6,
    BLENDINDICES : 7,
    TEXCOORD0 : 8,
    TEXCOORD1 : 9,
    TEXCOORD2 : 10,
    TEXCOORD3 : 11,
    TEXCOORD4 : 12,
    TEXCOORD5 : 13,
    TEXCOORD6 : 14,
    TEXCOORD7 : 15
};

gfx.AttribType = {
    UINT8 : 0,
    INT16: 1,
    FLOAT: 2
};

gfx.IndexFormat = {
    INDEX8 : 0x1401,
    INDEX16 : 0x1403,
    INDEX32 : 0x1405
};

gfx.PrimitiveType = {
    TRIANGLES : 0x0004,
    TRIANGLE_STRIP : 0x0005,
    LINES : 0x0001,
    LINE_STRIP : 0x0003,
    POINTS : 0x0000,
    PrimitiveTypeUnknow : 0x0009
};

// render state ---- begin
gfx.RenderState = gfx.RenderState || {};

gfx.StateBlock = cc.StateBlock;
cc.StateBlock = null;
gfx.Animation = cc.Animation3D;
cc.Animation3D = null;

gfx.RenderState.Blend = {
    BLEND_ZERO : 0,
    BLEND_ONE: 1,
    BLEND_SRC_COLOR: 2,
    BLEND_ONE_MINUS_SRC_COLOR: 3,
    BLEND_DST_COLOR: 4,
    BLEND_ONE_MINUS_DST_COLOR: 5,
    BLEND_SRC_ALPHA: 6,
    BLEND_ONE_MINUS_SRC_ALPHA: 7,
    BLEND_DST_ALPHA: 8,
    BLEND_ONE_MINUS_DST_ALPHA: 9,
    BLEND_CONSTANT_ALPHA: 10,
    BLEND_ONE_MINUS_CONSTANT_ALPHA: 11,
    BLEND_SRC_ALPHA_SATURATE: 12,
};

gfx.RenderState.DepthFunction = {
    DEPTH_NEVER: 0,
    DEPTH_LESS: 1,
    DEPTH_EQUAL: 2,
    DEPTH_LEQUAL: 3,
    DEPTH_GREATER: 4,
    DEPTH_NOTEQUAL: 5,
    DEPTH_GEQUAL: 6,
    DEPTH_ALWAYS: 7,
};

gfx.RenderState.CullFaceSide = {
    CULL_FACE_SIDE_BACK : 0,
    CULL_FACE_SIDE_FRONT : 1,
    CULL_FACE_SIDE_FRONT_AND_BACK : 2
};

gfx.RenderState.FrontFace = {
    FRONT_FACE_CW : 0,
    FRONT_FACE_CCW : 1
};

gfx.RenderState.StencilFunction =
{
    STENCIL_NEVER : 0,
    STENCIL_ALWAYS : 1,
    STENCIL_LESS : 2,
    STENCIL_LEQUAL : 3,
    STENCIL_EQUAL : 4,
    STENCIL_GREATER : 5,
    STENCIL_GEQUAL : 6,
    STENCIL_NOTEQUAL : 7,
};

gfx.RenderState.StencilOperation =
{
    STENCIL_OP_KEEP: 0,
    STENCIL_OP_ZERO: 1,
    STENCIL_OP_REPLACE: 2,
    STENCIL_OP_INCR: 3,
    STENCIL_OP_DECR: 4,
    STENCIL_OP_INVERT: 5,
    STENCIL_OP_INCR_WRAP: 6,
    STENCIL_OP_DECR_WRAP: 7
};

gfx.LightType = {
    DIRECTIONAL : 0,
    SPOT: 1,
    POINT: 2
}


// render state ---- end -----------

/////
gfx.BGFX_SAMPLER_COMPARE_LESS           =  0x00010000; //!< Compare when sampling depth texture: less.
gfx.BGFX_SAMPLER_COMPARE_LEQUAL         =  0x00020000; //!< Compare when sampling depth texture: less or equal.
gfx.BGFX_SAMPLER_COMPARE_EQUAL          =  0x00030000; //!< Compare when sampling depth texture: equal.
gfx.BGFX_SAMPLER_COMPARE_GEQUAL         =  0x00040000; //!< Compare when sampling depth texture: greater or equal.
gfx.BGFX_SAMPLER_COMPARE_GREATER        =  0x00050000; //!< Compare when sampling depth texture: greater.
gfx.BGFX_SAMPLER_COMPARE_NOTEQUAL       =  0x00060000; //!< Compare when sampling depth texture: not equal.
gfx.BGFX_SAMPLER_COMPARE_NEVER          =  0x00070000; //!< Compare when sampling depth texture: never.
gfx.BGFX_SAMPLER_COMPARE_ALWAYS         =  0x00080000; //!< Compare when sampling depth texture: always.
gfx.BGFX_SAMPLER_COMPARE_SHIFT          = 16;


gfx.BGFX_SAMPLER_U_MIRROR               = 0x00000001; //!< Wrap U mode: Mirror
gfx.BGFX_SAMPLER_U_CLAMP                = 0x00000002; //!< Wrap U mode: Clamp
gfx.BGFX_SAMPLER_U_BORDER               = 0x00000003; //!< Wrap U mode: Border
gfx.BGFX_SAMPLER_U_SHIFT                = 0;

gfx.BGFX_SAMPLER_U_MASK                 = 0x00000003;

gfx.BGFX_SAMPLER_V_MIRROR               = 0x00000004; //!< Wrap V mode: Mirror
gfx.BGFX_SAMPLER_V_CLAMP                = 0x00000008; //!< Wrap V mode: Clamp
gfx.BGFX_SAMPLER_V_BORDER               = 0x0000000c; //!< Wrap V mode: Border
gfx.BGFX_SAMPLER_V_SHIFT                = 2;

gfx.BGFX_SAMPLER_V_MASK                 = 0x0000000c;

gfx.BGFX_SAMPLER_W_MIRROR               = 0x00000010; //!< Wrap W mode: Mirror
gfx.BGFX_SAMPLER_W_CLAMP                = 0x00000020; //!< Wrap W mode: Clamp
gfx.BGFX_SAMPLER_W_BORDER               = 0x00000030; //!< Wrap W mode: Border
gfx.BGFX_SAMPLER_W_SHIFT                = 4;

gfx.BGFX_SAMPLER_W_MASK                 = 0x00000030;

gfx.BGFX_SAMPLER_MIN_POINT              = 0x00000040; //!< Min sampling mode: Point
gfx.BGFX_SAMPLER_MIN_ANISOTROPIC        = 0x00000080; //!< Min sampling mode: Anisotropic
gfx.BGFX_SAMPLER_MIN_SHIFT              = 6;

gfx.BGFX_SAMPLER_MIN_MASK               = 0x000000c0;

gfx.BGFX_SAMPLER_MAG_POINT              = 0x00000100; //!< Mag sampling mode: Point
gfx.BGFX_SAMPLER_MAG_ANISOTROPIC        = 0x00000200; //!< Mag sampling mode: Anisotropic
gfx.BGFX_SAMPLER_MAG_SHIFT              = 8;

gfx.BGFX_SAMPLER_MAG_MASK               = 0x00000300;

gfx.BGFX_SAMPLER_MIP_POINT              = 0x00000400; //!< Mip sampling mode: Point
gfx.BGFX_SAMPLER_MIP_SHIFT              = 10;

gfx.BGFX_SAMPLER_MIP_MASK               = 0x00000400;



_p = gfx.Sprite3DInstancedNode.prototype;
_p._ctor = function(needInstanceColor, maxCapacity) {
    if(maxCapacity !== undefined)
    {
        this.init(needInstanceColor, maxCapacity);
    }
    else
    {
        if(needInstanceColor !== undefined)
            this.init(needInstanceColor);
        else
            this.init();
    }
};

gfx.Effekseer.create = function(url){
    var ret = new gfx.Effekseer();
    if(ret.Load(url))
        return ret;
    return null;
}


// gfx 3D
gfx.Scene3D.extend = cc.Class.extend;
gfx.Scene3D.prototype._ctor = dummyCtor;
