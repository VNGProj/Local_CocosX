typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var GPUAnimationScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("GPU Animation")
    },
    initScene: function () {
        this._super();

        this.setupLight();

        var material = gfx.Material.FromCache("res/Game/Materials/TestGPUAnim.mat");
        for(var i=0;i<1;i++)
        {
            this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
                var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
                var animation = gfx.c3bLoader.loadGPUAnimation(sp,"res/Game/gpu_anim/ahii.xml")[0];
                animation.getClip().setRepeatCount(10000);
                animation.getClip().play();
                sp.getModels()[0].setMaterial(material,0);
                this.addChild(sp);
                sp.setScale(1.0);
                sp.setPosition3D(cc.math.vec3(0,15,0));
                sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
            }.bind(this))))

        }


    }
})
