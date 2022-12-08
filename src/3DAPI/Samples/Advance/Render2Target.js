typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}

var setupFBOCam = (cam) => {
    var view = gfx.View.create(cc.rect(0,0,1024,1024),gfx.ClearFlags.COLOR_DEPTH_STENCIL);
    cam.setView(view);

    var texColor = cc.Texture2D.makeEmpty(gfx.TextureFormat.RGBA8888,1024,1024,false,gfx.TextureType.TEXTURE_RT);
    var texDepth = cc.Texture2D.makeEmpty(gfx.TextureFormat.D16,1024,1024,false,gfx.TextureType.TEXTURE_RT,gfx.BGFX_SAMPLER_COMPARE_LEQUAL);
    var fbo = gfx.FrameBuffer.create("fboOther",[texColor,texDepth]);
    cam.setFrameBufferObject(fbo);
};

var Render2Scene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.setName("Render to Target");
        this.initScene();

        this.scheduleUpdate();
    },

    update: function(dt){
        this.view2.update(dt);
    },

    initScene: function(){
        this.initLayer2D();

        this.initView1();
        this.initView2();

        this.view1.model.setTexture(
            this.view2.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture());
    },

    initView1: function () {
        this.view1 = new View1(this);
    },

    initView2: function () {
        this.view2 = new View2(this, this.spView2);
    },

    initLayer2D: function () {
        this.layer2D = gfx.CanvasNode.create();
        this.layer2D.addComponent(gfx.Canvas.create());
        this.addChild(this.layer2D);

        this.spView2 = new cc.Sprite("res/Texture/Burst01.png");
        this.layer2D.addChild(this.spView2, 2);
        this.spView2.setFlippedY(true);
        this.spView2.setPosition(128,128);

        // init sprite cached view1
        this.spCacheView1 = new cc.Sprite("res/Texture/Burst01.png");
        this.spCacheView1.setContentSize(cc.size(1024, 1024)) // force set content size = fbo content size
        this.spCacheView1.retain();
        this.spCacheView1.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.spCacheView1.setVisible(false);
        cc.log('cc.winSize = ' + JSON.stringify(cc.winSize));
        this.spCacheView1.setScaleX(cc.winSize.width / 1024);
        this.spCacheView1.setScaleY(cc.winSize.height / 1024);
        // this.spCacheView1.setScale(3);
        this.spCacheView1.setFlippedY(true);
        this.layer2D.addChild(this.spCacheView1, 1);
    },

    onEnter: function () {
        this._super();

        this.view2.onEnter();
    },

    onExit: function () {
        this._super();

        this.view2.onExit();
    }
});

var View1 = BaseScen3D.extend({
    ctor: function (scene) {
        this.ctx = scene;
        this._super();
    },
    initScene: function () {
        this._super();

        setupFBOCam(this.getActiveCamera());
        this.resumeScene();

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(false);
        light.SetShadowCascadeMobile(200,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(1.0);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));
        this.addChild(nodeLight);

        // init model
        var sp3D = gfx.Sprite3D.create("res/Sprite3DTest/teapot.c3b");
        sp3D.setScale(6);
        // sp3D.setTexture(this.otherScene.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture());
        sp3D.setTexture("res/Texture/Burst01.png");
        this.addChild(sp3D);
        // sp3D.runAction(cc.rotateBy(20,cc.math.vec3(0,360,0)).repeatForever());
        this.model = sp3D;
    },

    testRemoveScene: function(){
        cc.log('pause main scene');

        this.retain();
        this.removeFromParent(false);
        this.setVisibleScene1Cache(true);
        setTimeout(() => {
            this.resumeScene();
        }, 5000)
    },

    resumeScene: function(){
        cc.log('resume main scene');

        this.ctx.addChild(this);
        this.setVisibleScene1Cache(false);
        setTimeout(() => {
            this.testRemoveScene();
        }, 5000)
    },

    setVisibleScene1Cache: function (b) {
        if(this.ctx.spCacheView1){
            this.ctx.spCacheView1.setVisible(b);

            if(b){
                this.ctx.spCacheView1.setTexture(
                    this.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture());

                cc.log('this.ctx.spCacheView1: ' + JSON.stringify(this.ctx.spCacheView1.getContentSize()));
            }
        }
    }
});

var View2 = BaseScen3D.extend({

    ctor: function (ctx, output) {
        this.ctx = ctx;
        this.output = output;
        this._super();
    },

    initScene: function () {
        this._super();

        //  init model
        let root = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        this.addChild(root);

        for (var i = 0; i < 5; i++) {
            this.runAction(cc.sequence(cc.delayTime(i * 0.1), cc.callFunc(function () {
                var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
                var animation = gfx.c3bLoader.loadAnimation(sp, "res/Sprite3DTest/fish1.c3b");
                animation.getClip().setRepeatCount(10000);
                animation.getClip().play();
                root.addChild(sp);
                sp.setScale(0.25);
                sp.setPosition3D(cc.math.vec3(-100 + Math.random() * 200, 15, -100 + Math.random() * 200));
                // sp.setVisible(false);  // -------> BUG HERE
            }.bind(this))))

        }

        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90, 0, 0));

        plane.setScaleY(4);
        plane.setScaleX(4);

        setupFBOCam(this.getActiveCamera());

        this.retain();

        // setInterval(() => {
        //     this.update();
        // }, 40);
    },

    update: function () {
        // cc.log('scene 2 update');
        this.Render(this.getActiveCamera());
        var tex = this.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture();
        this.output.setTexture(tex);
    }
});
