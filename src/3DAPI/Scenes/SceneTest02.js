typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}

var SceneTest02 = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

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


        this.setupOtherScene();

        this.otherScene.retain();
        this.scheduleUpdate();


        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);


        this.sp = new cc.Sprite("res/Texture/Burst01.png");
        canvasNode.addChild(this.sp);
        this.sp.setPosition(128,128)


        var sp3D = gfx.Sprite3D.create("res/Sprite3DTest/teapot.c3b");
        sp3D.setScale(6);
        sp3D.setTexture(this.otherScene.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture());
        this.addChild(sp3D);
        sp3D.runAction(cc.rotateBy(20,cc.math.vec3(0,360,0)).repeatForever());
    },
    onEnter: function(){
        this._super();
        this.otherScene.onEnter();
    },
    onExit: function(){
        this.otherScene.onExit();
        this._super();
    },
    cleanup: function(){
        this._super();
        this.otherScene.release();
    },
    update: function(dt){
        this.otherScene.Render(this.otherScene.getActiveCamera());
        var tex = this.otherScene.getActiveCamera().getFrameBufferObject().getRenderTarget(0).getTexture();
        this.sp.setTexture(tex);
    },
    setupOtherScene: function () {

        /// setup other scene
        var otherScene = gfx.Scene3D.create();

        var octree = gfx.Octree.create();
        octree.SetSize({min:cc.math.vec3(-1000,-1000,-1000),max:cc.math.vec3(1000,1000,1000)},8);
        otherScene.addComponent(octree);

        // zone for ambient
        var zone = gfx.Zone.create();
        zone.setHemisphericColor(cc.color(128,128,128,255),cc.color(128,128,128,255),cc.color(128,128,128,255));
        otherScene.addComponent(zone);

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(100,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(0.5);
        otherScene.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        otherScene.addChild(nodeLight);

        //  BUG FROM HERE
        let root = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        otherScene.addChild(root);
        root.setVisible(true);
        setTimeout(()=>{root.setVisible(false)}, 2000); // not visible, then visible, child is visible too!
        // for(var i=0;i<5;i++)
        // {
        //     this.runAction(cc.sequence(cc.delayTime(i * 2),cc.callFunc(function () {
        //         var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        //         var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
        //         animation.getClip().setRepeatCount(10000);
        //         animation.getClip().play();
        //         root.addChild(sp);
        //         sp.setScale(0.25);
        //         sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
        //         sp.setVisible(false);  // -------> BUG HERE, it should not visible
        //     }.bind(otherScene))))
        // }

        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        otherScene.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(4);
        plane.setScaleX(4);

        var ratio = cc.winSize.width / cc.winSize.height;
        var camera = cc.Camera.createPerspective(60,ratio,0.1,500);
        camera.setPosition3D(cc.math.vec3(0,75,75));
        camera.lookAt(cc.math.vec3(0,0,0));

        // Co the setup view va framebuffer cho camera neu can` (neu ko co trong luc render se auto create dua tren graphics setting)
        // Tuc la doan nay co the bo qua.
        {
            var view = gfx.View.create(cc.rect(0,0,128,128),gfx.ClearFlags.COLOR_DEPTH_STENCIL);
            camera.setView(view);

            var texColor = cc.Texture2D.makeEmpty(gfx.TextureFormat.RGBA8888,128,128,false,gfx.TextureType.TEXTURE_RT);
            var texDepth = cc.Texture2D.makeEmpty(gfx.TextureFormat.D16,128,128,false,gfx.TextureType.TEXTURE_RT,gfx.BGFX_SAMPLER_COMPARE_LEQUAL);
            var fbo = gfx.FrameBuffer.create("fboOther",[texColor,texDepth]);

            camera.setFrameBufferObject(fbo);
        }

        //camera.addComponent(cc.ComponentJS("res/scripts/camera/CameraController.js"));

        otherScene.setActiveCamera(camera);

        this.otherScene = otherScene;
    }
})
