typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var LoadAsyncScene = BaseScen3D.extend({
    ctor: function (){
        this._super();
    },
    initScene: function (){
        this._super();

        // this.addComponent(gfx.DebugRenderer.create());

        this.drawer = gfx.PrimitiveDrawable.create();
        var node = new cc.Node();
        node.addComponent(this.drawer);
        this.addChild(node);

        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(200,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(1.0);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);

        var thiz = this;

        gfx.c3bLoader.loadAsync("res/Sprite3DTest/boss.c3b",function (sprite3D) {
            thiz.addChild(sprite3D);
            sprite3D.setScale(3.7);
            sprite3D.setPosition3D(cc.math.vec3(0,15,0));
            sprite3D.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        },false);


        gfx.Sprite3D.createAsync("res/Sprite3DTest/boss.c3b",function (sprite3D) {
            thiz.addChild(sprite3D);
            sprite3D.setScale(3.7);
            sprite3D.setPosition3D(cc.math.vec3(15,15,15));
            sprite3D.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        })

        // var sp = gfx.Sprite3D.create("res/Sprite3DTest/boss.c3b");
        //  this.addChild(sp);
        // sp.setScale(7);
        // sp.setPosition3D(cc.math.vec3(0,15,0));
        // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());

        // var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        // plane.getModels()[0].SetCastShadows(false);
        // this.addChild(plane);
        // plane.setRotation3D(cc.math.vec3(-90,0,0));
        //
        // plane.setScaleY(10);
        // plane.setScaleX(10);
        var planeMesh = gfx.Mesh.createRectangleWithSize(cc.size(5000,5000),cc.p(0.5,0.5),cc.p(2,2));
        var model = gfx.Model.create(planeMesh);
        model.SetCastShadows(false);
        model.setMaterial(gfx.Material.FromCache("res/Game/Materials/PlaneNoTex.mat"),0);
        var node = new cc.Node();
        node.addComponent(model);
        this.addChild(node);
        node.setRotation3D(cc.math.vec3(-90,0,0));


        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);


        // this.sp = new cc.Sprite("res/Texture/Burst01.png");
        // canvasNode.addChild(this.sp);
        // this.sp.setPosition(128,128)

        this.scheduleUpdate();
    },
    update: function (dt) {
        // var tex = this.light.GetShadowMap();
        // if(tex)
        //     this.sp.setTexture(tex);

    }
})
