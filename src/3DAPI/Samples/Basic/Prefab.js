var Prefab = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("8.Prefab");
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

        //create ball from prefab file
        var ball = gfx.PrefabIOManager.getInstance().createPrefabNode("res/Game/Prefab/Ball.prefab");
        ball.setPosition3D(cc.math.vec3(0,100,0));
        this.addChild(ball);

    },
});