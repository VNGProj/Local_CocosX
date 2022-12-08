typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{};

var FullLightingShadow = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("3.Lighting Shadow");


    },
    initScene: function () {
        this._super();
        // for ambient
        var zone = gfx.Zone.create();
        this.addComponent(zone);

        // light
        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(600,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(1.0);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-45,-45,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);

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


        // model

        // plane
        var planeMesh = gfx.Mesh.createRectangleWithSize(cc.size(500,500),cc.p(0.5,0.5),cc.p(2,2));
        var model = gfx.Model.create(planeMesh);
        model.setMaterial(gfx.Material.FromCache("res/Game/Materials/PlaneNoTex.mat"),0);
        var node = new cc.Node();
        node.addComponent(model);
        this.addChild(node);
        node.setRotation3D(cc.math.vec3(-90,0,0));

        var sprite = gfx.Sprite3D.create("res/Sprite3DTest/teapot.c3b");
        this.addChild(sprite);
        sprite.setRotation3D(cc.math.vec3(-90,0,0));
        sprite.setPosition3D(cc.math.vec3(0,15,0));
        sprite.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        sprite.setScale(9);

    }
})