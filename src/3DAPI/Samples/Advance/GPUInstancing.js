
typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var GPUInstancingScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("Instancing Object (1 drawcall for all)")
    },
    initScene: function () {
        this._super();

        this.setupLight();
        this.initPlane();

        var material = gfx.Material.FromCache("res/Game/Materials/BossInstancingTest.mat");
        for(var i=0;i<250;i++)
        {
            var sp = gfx.Sprite3D.create("res/Sprite3DTest/boss.c3b");
            sp.getModels()[0].setMaterial(material,0);
            this.addChild(sp);
            sp.setScale(2);
            sp.setRotation3D(cc.math.vec3(-90,0,0))
            sp.setPosition3D(cc.math.vec3( -250 + Math.random() * 500,15,-250 + Math.random() * 500));
            sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        }

    }
})
