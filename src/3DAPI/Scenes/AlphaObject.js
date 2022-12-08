
typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var AlphaObjectScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

        //custom graphicsetting

        // custom render pipeline
        // this.setRenderPipeline("res/Game/RenderPipelines/Forward_Alpha.xml");

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(false);
        light.SetShadowCascadeMobile(100,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(0.5);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);



        for(var i=0;i<1;i++)
        {
            // this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
            //             //
            //             // }.bind(this))))

            // var mat = gfx.Material.CreateNew("res/Game/Materials/PlaneAlpha.mat");

            var sp = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
            this.addChild(sp);
            // sp.getModels()[0].setMaterial(mat,0);
            // sp.setRotation3D(cc.math.vec3(-90,0,0));

            // sp.setScale(0.25);
            // sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,Math.random() *15,-100 + Math.random() * 200));
        }

        // var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        // plane.getModels()[0].SetCastShadows(false);
        // this.addChild(plane);
        // plane.setRotation3D(cc.math.vec3(-90,0,0));
        //
        // plane.setScaleY(4);
        // plane.setScaleX(4);

        // var mat = gfx.Material.FromCache("res/Game/Materials/PlaneAlpha.mat");
        // plane.getModels()[0].setMaterial(mat,0);

        // var canvasNode = gfx.CanvasNode.create();
        // canvasNode.addComponent(gfx.Canvas.create());
        // this.addChild(canvasNode);

        // var sp = new cc.Sprite("res/Hello.png");
        // sp.setPosition3D(cc.math.vec3(100,100,0))
        // sp.setScale(0.25);
        // canvasNode.addChild(sp);

    },
    update: function (dt) {
        cc.log(dt);
    }
})
