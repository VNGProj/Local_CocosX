
typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var GraphicSetting = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("Graphics Setting")
    },
    onEnter: function()
    {
        this._super();
        var ui = new GraphicsUI();
        ui.delegate = this;
        this.getParent().addChild(ui,10,11);
        this.ui = ui;
    },
    onExit: function()
    {
        this.ui.removeFromParent(true);
        this._super();
        // this.getParent().removeChildByTag(11);
    },
    initScene: function () {
        this._super();

        //custom graphicsetting
        var graphics = this.getGraphics();
        graphics.SetGraphicQuality(gfx.GraphicQuality.QUALITY_MEDIUM);


        this.setupLight();


        for(var i=0;i<100;i++)
        {
            this.runAction(cc.sequence(cc.delayTime(i * 0.1),cc.callFunc(function () {
                var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
                var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
                animation.getClip().setRepeatCount(10000);
                animation.getClip().play();
                this.addChild(sp);
                sp.setScale(0.25);
                sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
                sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
            }.bind(this))))

        }

        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(4);
        plane.setScaleX(4);
    },
    quality: function (customData) {
        cc.log(parseInt(customData));
        var graphics = this.getGraphics();
        graphics.SetGraphicQuality(parseInt(customData));
    }
});

var GraphicsUI = BaseHUD.extend({
    ctor: function () {
        this._super();
        this.initWithBinaryFile("res/ui/QualityUI.json");
        this.delegate = null;
    },
    quality: function (event) {
        this.delegate.quality(event.getComponent("ComExtensionData").getCustomProperty());
    }

});
