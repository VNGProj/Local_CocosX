import argparse
import os
import sys

material_folder = 'Materials'
technique_folder = 'Techniques'
shader_folder = 'Shaders'

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--name', '-n', type=str, required=True, help='Material name')
    parser.add_argument('--diffuse', '-d', type=str, help='Diffuse texture')
    parser.add_argument('--is_lit', '-il', default=False)
    parser.add_argument('--is_received_shadow', '-irs', default=False)

    args = parser.parse_args()

    material_file = args.name + '.mat'
    technique_name = args.name + 'Tech'
    technique_file = technique_name + '.tnq'
    shader_file = 'vfs_' + args.name + '.sc'

    is_have_diffuse = args.diffuse != None
    if args.is_lit:
        shader_file_lit = 'vfs_' + args.name + 'Lit.sc'

    for f in os.listdir(material_folder):
        if os.path.isfile(f):
            if f == material_file:
                sys.exit("Material already exist")
    
    for f in os.listdir(technique_folder):
        if os.path.isfile(f):
            if f == technique_file:
                sys.exit("Technique already exist")

    for f in os.listdir(shader_folder):
        if os.path.isfile(f):
            if f == shader_file or f == shader_file_lit:
                sys.exit("Shader already exist")
    
    with open(os.path.join(shader_folder, shader_file), 'w') as f:
        f.write(
            "#ifdef VS\n" +
            "\n" +
            "/// input\n" +
            "#define USING_VERTEX\n" +
            "#define USING_NORMAL\n" +
            "#define USING_TEXCOORD0\n" +
            "#include \"Library/VertexInput.glsl\"\n" +
            "\n" +
            "/// output\n" +
            "#define USING_INOUT_NORMAL\n" +
            "#define USING_INOUT_TEXCOORD0\n" +
            "#define USING_INOUT_SHADOWCOORD\n" +
            "#define USING_INOUT_FRAGPOS\n" +
            "#include \"Library/Varying.glsl\"\n" +
            "\n" +
            "/// Common (uniforms , transforms ... )\n" +
            "#include \"Library/Common.glsl\"\n" +
            "\n" +
            "void main()\n" +
            "{\n" +
            "   #include \"Library/Macro/PositionFinal.glsl\"\n" +
            "   #include \"Library/Macro/NormalFinal.glsl\"\n" +
            "   #include \"Library/Macro/Texcoord0Final.glsl\"\n" +
            "   #include \"Library/Macro/ShadowCoordFinal.glsl\"\n" +
            "   #include \"Library/Macro/FragPosFinal.glsl\"\n" +
            "}\n" +
            "#endif\n" +
            "\n" +
            "#ifdef FS\n" +
            "\n" +
            "/// input\n" +
            "#define USING_INOUT_NORMAL\n" +
            "#define USING_INOUT_TEXCOORD0\n" +
            "#define USING_INOUT_SHADOWCOORD\n" +
            "#define USING_INOUT_FRAGPOS\n" +
            "#include \"Library/Varying.glsl\"\n" +
            "\n" +
            "/// Common (uniforms , transforms ... )\n" +
            "#define RECEIVED_SHADOW\n" +
            "#include \"Library/Common.glsl\"\n" +
            "#include \"Library/Lighting.glsl\"\n" + 
            "\n" +
            "void main()\n" +
            "{\n" +
            "   vec4 texColor = texture2D(u_diffuseTex,v_texcoord0.xy);\n" +
            "   vec3 environmentColor = GetEnvironmentColor(v_normal);\n" +
            "   vec3 lightColor = GetLightColor(v_normal);\n" +
            "\n" +
            "   gl_FragColor = vec4((lightColor + environmentColor) * texColor.rgb,1.0);\n" +
            "}\n" +
            "#endif\n"
        )
    
    with open(os.path.join(technique_folder, technique_file), 'w') as f:
        f.write(
            "technique {}\n".format(technique_name) +
            "{\n" +
            "   pass base\n" +
            "   {\n" +
            "       vertexShader = Shaders/{}\n".format(shader_file) +
            "       fragmentShader = Shaders/{}\n".format(shader_file) +
            "       parameters\n" +
            "       {\n" +
            "           renderState\n" +
            "           {\n" +
            "               cullFace = true\n" +
            "               cullFaceSide = BACK\n" +
            "               depthTest = true\n" +
            "               depthWrite = false\n" +
            "               blend = true\n" +
            "               blendSrc = SRC_ALPHA\n" +
            "               blendDst = ONE_MINUS_SRC_ALPHA\n" +
            "           }\n" +
            "       }\n" +
            "   }\n" +
            "}\n"
        )
    
    with open(os.path.join(material_folder, material_file), 'w') as f:
        f.write("material {} \n".format(args.name) +
            "{ \n"
            "   gpu_instancing = false \n" +
            "   render_order = 0 \n" +
            "\n" +
            "   technique {} \n".format(technique_name) +
            "   {\n" +
            "       lod_distance = 0\n" +
            "       quality = 2\n" +
            "       url = Techniques/{}\n".format(technique_file) +
            "   }\n"
            "   parameters\n" +
            "   {\n" +
            "{}".format(
            "       sampler u_diffuseTex\n" +
            "       {\n" +
            "           path = {}".format(args.diffuse) +
            "           mipmap = false\n" +
            "           wrapS = CLAMP\n" +
            "           wrapT = CLAMP\n" +
            "           minFilter = LINEAR\n" +
            "           magFilter = LINEAR\n" +
            "       }\n"
            if is_have_diffuse else "") +
            "   }\n" +
            "}"
        )
