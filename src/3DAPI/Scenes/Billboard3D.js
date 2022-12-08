

typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var Billboard3D = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

        var node = new cc.Node();
        this.addChild(node);

        var sp = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        sp.getModels()[0].SetCastShadows(false);
        let scale = 0.5;
        sp.setScale(scale);

        let worldMatrix = sp.getNodeToWorldTransform3D();
        let billboardCenter = cc.math.vec3(worldMatrix[12], worldMatrix[13], worldMatrix[14]);
        let u_billboardCenter = cc.math.vec4(billboardCenter.x, billboardCenter.y, billboardCenter.z, 1.0);

        cc.log(JSON.stringify(u_billboardCenter));

        var mat = gfx.Material.FromCache("res/Game/Materials/Billboard.mat");
        sp.getModels()[0].setMaterial(mat, 0);
        mat.getParameter("u_billboardCenter").setVector4(u_billboardCenter);
        mat.getParameter("u_diffuseTex").setSampler("res/Hello.png", 0);

        node.addChild(sp);
        node.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
    },
})
