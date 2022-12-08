var ScriptComponent = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("6.Script Component");
    },
    initScene: function () {
        this._super();

        this.setupLight();


        var planeMesh = gfx.Mesh.createRectangleWithSize(cc.size(500,500),cc.p(0.5,0.5),cc.p(2,2));
        var model = gfx.Model.create(planeMesh);
        model.setMaterial(gfx.Material.FromCache("res/Game/Materials/PlaneNoTex.mat"),0);
        var node = new cc.Node();
        node.addComponent(model);
        this.addChild(node);
        node.setRotation3D(cc.math.vec3(-90,0,0));

        var material = gfx.Material.FromCache("res/Game/Materials/BallInstancingTest.mat");

        var sp = gfx.Sprite3D.create("res/Sprite3DTest/sphere.c3b");
        sp.getModels()[0].setMaterial(material,0);
        sp.getModels()[0].SetExtraData(cc.math.vec4(15,0,0,0));
        this.addChild(sp);
        sp.setScale(0.5);
        sp.setPosition3D(cc.math.vec3(0,100,0));

        sp.addComponent(cc.ComponentJS("res/Game/Scripts/BallScript.js"));
    },
});