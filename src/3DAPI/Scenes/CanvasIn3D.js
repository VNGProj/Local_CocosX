typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}

// display canvas is main camera , not default
// using cc.Node istead gfx.CanvasNode

var CanvasScene3D = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(200,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(1.0);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        // this.addChild(nodeLight);


        var node = new cc.Node();
        this.addChild(node);

        var canvas = gfx.Canvas.create();
        node.addComponent(canvas);

        canvas.getStateBlock().setDepthTest(true);

        var sp = new cc.Sprite("res/Hello.png");
        sp.setPosition3D(cc.math.vec3(0,0,0))
        sp.setScale(0.25);
        node.addChild(sp);

        // var mat = gfx.Material.CreateNew("res/Game/Materials/Custom2DSprite.mat");
        // var glProgramState = cc.GLProgramState.createWithMaterial(mat);
        // sp.setGLProgramState(glProgramState);

    }
})
