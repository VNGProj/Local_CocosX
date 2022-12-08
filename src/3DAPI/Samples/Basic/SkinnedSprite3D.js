typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{};

var SkinnedSprite3D = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("4.Skinned Sprite3D");

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
        var animation = gfx.c3bLoader.loadAnimation(model,"res/Sprite3DTest/mixamo/Hip Hop Dancing.fbx");
        var defaultClip = animation.getClip();
        defaultClip.setRepeatCount(100000);
        defaultClip.play();
        model.setScale(0.5);
        this.addChild(model);
    }
});