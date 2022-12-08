typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}




var EffekseerScene = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();
        // custom render pipeline
        this.setRenderPipeline("res/Game/RenderPipelines/Forward_Alpha.xml");

        this.addComponent(gfx.DebugRenderer.create());

        this.initPlane();

        this.initEfk();
    },

    initPlane: function(){
        return;
        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.setTexture('res/Model/map/mapbase_v2/forest_d.png');
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(10);
        plane.setScaleX(10);
    },
    
    initEfk: function () {
        let arr = [
            'res/farm_efk/sunshine.efk',
        ];

        for(var i=0;i<100;i++)
        {
            var efk = gfx.Effekseer.create(arr[0]);
            var emiter = efk.getEffectEmiter();

            emiter.setIsLooping(true);
            emiter.setRemoveOnStop(true);

            efk.SetCastShadows(false);
            efk.SetLightMask(0);
            var LARGE = {"min":cc.math.vec3(-100,-100,-100),"max":cc.math.vec3(100,100,100)};
            efk.setBoundingBox(LARGE);
            var node = new cc.Node();
            node.addComponent(efk);
            this.addChild(node);
            node.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,20,-100 + Math.random() * 200));
        }
    }
});
