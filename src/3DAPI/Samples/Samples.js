

require('src/3DAPI/Samples/HUD.js');
require('src/3DAPI/Samples/Basic/Hello3D.js');
require('src/3DAPI/Samples/Basic/BasicLighting.js');
require('src/3DAPI/Samples/Basic/FullLightingShadow.js');
require('src/3DAPI/Samples/Basic/SkinnedSprite3D.js');
require('src/3DAPI/Samples/Basic/AnimationBlending.js');
require('src/3DAPI/Samples/Basic/ScriptComponent.js');
require('src/3DAPI/Samples/Basic/Billboard.js');
require('src/3DAPI/Samples/Basic/Sprite3DTransparent.js');
require('src/3DAPI/Samples/Basic/BasicShaderMaterial.js');
require('src/3DAPI/Samples/Basic/Postprocessing.js');
require('src/3DAPI/Samples/Basic/EffectseerParticle.js');
require('src/3DAPI/Samples/Basic/SparkParticle.js');
require('src/3DAPI/Samples/Basic/Prefab.js');
require('src/3DAPI/Samples/Advance/GPUAnimation.js');
require('src/3DAPI/Samples/Advance/GPUInstancingAnimation.js');
require('src/3DAPI/Samples/Advance/GPUInstancing.js');
require('src/3DAPI/Samples/Advance/GPUInstancingExtraData.js');
require('src/3DAPI/Samples/Advance/GraphicSetting.js');
require('src/3DAPI/Samples/Advance/SpriteBatch.js');
require('src/3DAPI/Scenes/TimelineFX.js');
require('src/3DAPI/Scenes/ScreenTimelineFX.js');




var SampleList = [
    Hello3D,
    BasicLighting,
    FullLightingShadow,
    SkinnedSprite3D,
    AnimationBlending,
    Billboard,
    ScriptComponent,
    Prefab,
    BasicShaderMaterial,
    Sprite3DTransparent,
    Effectseer,
    SparkParticle,
    Postprocessing,
    GraphicSetting,
    GPUAnimationScene,
    GPUInstancingScene,
    GPUInstancingExtraScene,
    GPUInstancingAnimationScene,
    SpriteBatchScene,

];

var sampleCount = -1;

var Samples = cc.Scene.extend({
    ctor: function () {
        this._super();

        var hud = new HUD(this);
        this.addChild(hud,100);
        this.hud = hud;

    },
    onEnter: function () {
        this._super();
        this.nextSample();
    },
    startTest: function () {
        this.addChild(new SampleList[0],0,1);
    },
    nextSample: function () {
        var current = this.getChildByTag(1);
        if(current)
            current.removeFromParent(true);

        sampleCount++;
        if(sampleCount > SampleList.length - 1)
            sampleCount = 0;
        var sample = new SampleList[sampleCount];
        this.hud.setTitle(sample.getName());
        this.addChild(sample,0,1);
    },
    prevScene: function () {
        var current = this.getChildByTag(1);
        if(current)
            current.removeFromParent(true);

        sampleCount--;
        if(sampleCount < 0)
            sampleCount = SampleList.length - 1;

        var sample = new SampleList[sampleCount];
        this.hud.setTitle(sample.getName());
        this.addChild(sample,0,1);
    }

});
