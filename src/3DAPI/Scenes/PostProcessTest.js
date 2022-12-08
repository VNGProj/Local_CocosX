
typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var Postprocessing = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

        // custom render pipeline
        this.setRenderPipeline("res/Game/RenderPipelines/Forward_Blur.xml");

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(100,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(0.5);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);

        for(var i=0;i<100;i++)
        {
            this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
                var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
                var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
                animation.getClip().setRepeatCount(10000);
                animation.getClip().play();
                this.addChild(sp);
                sp.setScale(0.25);
                sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
                sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
            }.bind(this))))

        }

        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(4);
        plane.setScaleX(4);
    }
})
