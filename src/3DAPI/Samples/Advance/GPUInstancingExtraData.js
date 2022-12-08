
typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var GPUInstancingExtraScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("Instancing Object With Extra Data.")

    },
    initScene: function () {
        this._super();

        this.setupLight();

        // custom graphics setting

        this.initPlane();

        for(var i=0;i<600;i++)
        {
            this.addBall(i % 16, 15);
        }

        // for(var i=0;i<300;i++)
        // {
        //     this.addBall(i % 16, 25);
        // }

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

    addBall: function (id, y) {
        var material = gfx.Material.FromCache("res/Game/Materials/BallInstancingTest.mat");
        var sp = gfx.Sprite3D.create("res/Sprite3DTest/sphere.c3b");
        // sp.setCastShadow(true);
        sp.getModels()[0].setMaterial(material,0);
        sp.getModels()[0].SetExtraData(cc.math.vec4(id,0,0,0));
        this.addChild(sp);
        sp.setScale(0.5);
        sp.setPosition3D(cc.math.vec3( -200 + Math.random() * 400,50 *  Math.random() + 50,-200 + Math.random() * 400));
        // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        sp.addComponent(cc.ComponentJS("res/Game/Scripts/BallScript.js"));

    }
})
