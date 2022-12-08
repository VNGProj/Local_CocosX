typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{};

var BasicLighting = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("2.Basic Lighting");
    },
    initScene: function () {
        this._super();

        // basic light

        // ambient
        // zone for ambient
        var zone = gfx.Zone.create();
        zone.setHemisphericColor(cc.color(100,100,100,255),cc.color(150,150,150,255),cc.color(0,0,0,255));
        this.addComponent(zone);

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(false);
        light.SetColor(cc.WHITE);
        light.SetBrightness(1.0);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);


        // add object for scene
        var sprite = gfx.Sprite3D.create("res/Sprite3DTest/teapot.c3b");
        this.addChild(sprite);
        sprite.setRotation3D(cc.math.vec3(-90,0,0));
        sprite.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        sprite.setScale(9);
    }
});