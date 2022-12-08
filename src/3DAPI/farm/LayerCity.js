/**
 *   Created by bachbv on 11/9/2021
 */

require('src/3DAPI/farm/Layer2D.js');
require('src/3DAPI/farm/Layer3D.js');

let LayerCity = cc.Layer.extend({
    ctor: function() {
        this._super();
    },

    setupScene: function(scene){
        // force to scene 3d
        let layer3d = new Layer3D();
        this.addChild(layer3d);

        let ratio = cc.winSize.width / cc.winSize.height;
        let camera = cc.Camera.createPerspective(30,ratio,100,20000);
        camera.setPosition3D(cc.math.vec3(7000,4500,7000));
        camera.lookAt(cc.math.vec3(0,0,0));
        layer3d.addChild(camera);
        layer3d.setActiveCamera(camera);
        this._3DCam = camera;
        camera.addComponent(cc.ComponentJS("src/3DAPI/farm/FarmCameraController.js"));

        let zone = gfx.Zone.create();
        zone.setHemisphericColor(hex2Color("#757aff"), hex2Color("#757aff"), hex2Color("#757aff"));
        layer3d.addComponent(zone);

        // only support directional light
        let light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(20000, 0.8);
        light.SetColor(cc.color(100,100,100,255));
        light.SetBrightness(1.0);
        this.light = light;

        let nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-45,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,5000,1));
        layer3d.addChild(nodeLight);

        // container for 3d obj
        this.node3D = layer3d;

        // container for 2d obj
        this._layer2D = new Layer2D();
        this.addChild(this._layer2D);

        this.test3D();
        this.test2D();
    },

    getLayer3D: function(){
        return this.node3D;
    },

    getLayer2D: function(){
        return this._layer2D;
    },

    test2D: function(){
        let s = new cc.Sprite("res/Images/common/achievement.png");
        s.setPosition(300, 300);
        this.getLayer2D().addChild(s);
    },
    
    test3D: function () {
        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        this.getLayer3D().addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));
        plane.setScaleY(100);
        plane.setScaleX(100);

        for(var i=0;i<100;i++){
            this.runAction(
                cc.sequence(
                    cc.delayTime(i * 0.1),
                    cc.callFunc(function () {

                    }.bind(this))
                )
            )
        }

        this.addSprite(cc.math.vec3(-100,15,0));
        this.addSprite(cc.math.vec3(100,15,0));
    },

    addSprite: function (position) {
        var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
        animation.getClip().setRepeatCount(10000);
        animation.getClip().play();
        this.getLayer3D().addChild(sp);
        sp.y = 100;
        sp.setScale(10);
        sp.setPosition3D(position);
        // sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
        // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
    }
});

let hex2Color = function(hex){
    hex = hex.replace(/^#?/, "0x");
    var c = parseInt(hex);
    var r = c >> 16;
    var g = (c >> 8) % 256;
    var b = c % 256;
    return cc.color(r, g, b, 1.0);
};
