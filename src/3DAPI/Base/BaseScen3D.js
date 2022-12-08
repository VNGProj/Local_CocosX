
var BaseScen3D = gfx.Scene3D.extend({
    ctor: function (){
        this._super();

        var graphics = this.getGraphics();
        if(cc.sys.isMobile)
            graphics.SetGraphicQuality(gfx.GraphicQuality.QUALITY_MEDIUM);
        else
            graphics.SetGraphicQuality(gfx.GraphicQuality.QUALITY_NATIVE);


        this.initScene();
    },
    initScene: function ()
    {
        var octree = gfx.Octree.create();
        octree.SetSize({min:cc.math.vec3(-1000,-1000,-1000),max:cc.math.vec3(1000,1000,1000)},8);
        this.addComponent(octree);


        var ratio = cc.winSize.width / cc.winSize.height;
        var camera = cc.Camera.createPerspective(60,ratio,0.1,500);
        camera.setPosition3D(cc.math.vec3(0,150,150));
        camera.lookAt(cc.math.vec3(0,0,0));
        this.camera = camera;

        camera.addComponent(cc.ComponentJS("res/scripts/camera/CameraController.js"));

        this.addChild(camera);

        this.setActiveCamera(camera);
    },
    setupLight: function () {
        var zone = gfx.Zone.create();
        zone.setHemisphericColor(cc.color(100,100,100,255),cc.color(150,150,150,255),cc.color(0,0,0,255));
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

        //for test
        graphics.SetShadowQuality(gfx.ShadowQuality.QUALITY_VSM);
        graphics.SetShadowMapSize(2048);
    },
    initPlane: function(){
        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        // plane.setTexture('res/Hello.png');
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(10);
        plane.setScaleX(10);
    },
});
