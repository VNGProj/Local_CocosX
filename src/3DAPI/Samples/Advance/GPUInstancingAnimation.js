typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var  GPUInstancingAnimationScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("GPU Animation Instancing");
    },
    initScene: function () {
        this._super();

        this.setupLight();

        var writeablePath = jsb.fileUtils.getWritablePath();
        var pathGPU = writeablePath + "/testGPUAnim.xml";
        cc.log('save file: ' + pathGPU);

        if(!jsb.fileUtils.isFileExist(pathGPU))
        {
            var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
            var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
            var ret = gfx.AnimationUtils.SaveAnimation(pathGPU,[animation.getClip()],sp,30);
        }

        // var material = gfx.Material.FromCache("res/Game/Materials/TestGPUInstancing.mat");
        // for(var i=0;i<100;i++)
        // {
        //     this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
        //         var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        //         var animation = gfx.c3bLoader.loadGPUAnimation(sp,pathGPU);
        //         animation.getClip().setRepeatCount(10000);
        //         animation.getClip().play();
        //         sp.getModels()[0].setMaterial(material,0);
        //         this.addChild(sp);
        //         sp.setScale(0.25);
        //         sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
        //         sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        //     }.bind(this))))
        //
        // }

        var writeablePath = jsb.fileUtils.getWritablePath();
        var fac1AnimCache = writeablePath + "/fac_1.xml";
        cc.log('save file: ' + fac1AnimCache);

        if(!jsb.fileUtils.isFileExist(fac1AnimCache))
        {
            let createAnimSTime = now();
            var sp = gfx.Sprite3D.create("res/Game/model/fac_1/rig.c3b");
            var animation1 = gfx.c3bLoader.loadAnimation(sp,"res/Game/model/fac_1/producing.c3b");
            // var animation2 = gfx.c3bLoader.loadAnimation(sp,"res/Game/model/fac_1/idle.c3b");
            // var animation3 = gfx.c3bLoader.loadAnimation(sp,"res/Game/model/fac_1/intro.c3b");
            var ret = gfx.AnimationUtils.SaveAnimation(fac1AnimCache,[animation1.getClip()],sp,30);

            cc.log('create anim Time: ' + (now() - createAnimSTime) / 1000); // ~0.125
        }

        let startTime = now();
        var material = gfx.Material.FromCache("res/Game/model/fac_1/fac_1.mat");
        for(var i=0;i<500;i++)
        {
            // this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
                var sp = gfx.Sprite3D.create("res/Game/model/fac_1/rig.c3b");
                var animation = gfx.c3bLoader.loadGPUAnimation(sp, fac1AnimCache)[0];
                animation.getClip().setRepeatCount(10000);
                animation.getClip().play();
                sp.getModels()[0].setMaterial(material,0);
                this.addChild(sp);
                sp.setScale(0.05);
                sp.setPosition3D(cc.math.vec3( -500 + Math.random() * 1000,15,-500 + Math.random() * 1000));
                //sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
            // }.bind(this))))

        }

        cc.log('Time: ' + (now() - startTime) / 1000); // ~ 1.0s
    }
})

let now = () => {
    return new Date().getTime();
};
