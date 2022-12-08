var AnimationBlending = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("5.Animation Blending");
    },
    onEnter: function()
    {
        this._super();
        var ui = new BlendingUI();
        ui.delegate = this.uiDelegate;
        this.getParent().addChild(ui,10,11);
        this.ui = ui;
    },
    onExit: function()
    {
        this.ui.removeFromParent(true);
        this._super();
        // this.getParent().removeChildByTag(11);
    },
    initScene: function () {
        this._super();

        this.setupLight();

        // custom graphics setting
        var graphics = this.getGraphics();
        if(cc.sys.isMobile)
        {
            graphics.SetShadowQuality(gfx.ShadowQuality.QUALITY_SIMPLE_16BIT);
            graphics.SetShadowMapSize(1024);
        }
        else
        {
            graphics.SetShadowQuality(gfx.ShadowQuality.QUALITY_VSM);
            graphics.SetShadowMapSize(2048);
        }

        // plane
        var planeMesh = gfx.Mesh.createRectangleWithSize(cc.size(1000,1000),cc.p(0.5,0.5),cc.p(2,2));
        var model = gfx.Model.create(planeMesh);
        model.setMaterial(gfx.Material.FromCache("res/Game/Materials/PlaneNoTex.mat"),0);
        var node = new cc.Node();
        node.addComponent(model);
        this.addChild(node);
        node.setRotation3D(cc.math.vec3(-90,0,0));


        var model = gfx.Sprite3D.create("res/Sprite3DTest/mixamo/mutant.fbx");
        model.setScale(0.5);
        this.addChild(model);

        var script = cc.ComponentJS("src/3DAPI/Samples/Scripts/AnimationController.js");
        model.addComponent(script);
        this.uiDelegate = script.getScriptObject();

    }
});

var BlendingUI = BaseHUD.extend({
    ctor: function () {
        this._super();
        this.initWithBinaryFile("res/ui/AnimationBlendingUI.json");
        this.delegate = null;
    },
    idle: function () {
        this.delegate.idle();
    },
    walk: function () {
        this.delegate.walk();

    },
    run: function () {
        this.delegate.run();

    },
    jump: function () {
        this.delegate.jump();

    },
    dance: function () {
        this.delegate.dance();

    },
    die: function () {
        this.delegate.die();

    }
});
