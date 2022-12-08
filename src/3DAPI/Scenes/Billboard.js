typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}


var Billboard = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();


        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(true);
        light.SetShadowCascadeMobile(200,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(0.5);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);

        this.drawableHasBillboard = [];
        this.listBillboard = [];

        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);


        for(var i=0;i<1;i++) {
            var sp = new cc.Sprite("res/Hello.png");
            sp.setScale(0.1);
            canvasNode.addChild(sp);
            this.listBillboard.push(sp);
        }

        for(var i=0;i<1;i++)
        {
            var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
            var animation = gfx.c3bLoader.loadAnimation(sp,"res/Sprite3DTest/fish1.c3b");
            animation.getClip().setRepeatCount(10000);
            animation.getClip().play();
            this.addChild(sp);
            sp.setScale(0.25);
            sp.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
            sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());

            this.drawableHasBillboard.push(sp.getModels()[0]);
            sp.getModels()[0].billboard = this.listBillboard[i];

        }

        this.scheduleUpdate();
    },
    update:function (dt) {
        for(var i=0;i<1;i++) {
            var visible = this.drawableHasBillboard[i].IsLastestVisible();
            cc.log(visible)
            var worldPos = this.drawableHasBillboard[i].getOwner().getWorldPosition();
            var screenPos = this.getActiveCamera().project(worldPos);
            // convert openGL -> screen
            screenPos.y = cc.winSize.height - screenPos.y;
            screenPos.y += 50;
            this.drawableHasBillboard[i].billboard.setPosition(screenPos.x,screenPos.y);
        }

    },

    testBooleanLogic: function () {
        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);

        // let s = new cc.Sprite('res/Images/poolball.png');
        let s = new ccui.ImageView('res/Images/poolball.png');
        let test1 = undefined;
        let test2 = [1];

        let b1 = !test1 && test2.length === 1;
        cc.log('b1 = ' + b1 + ', test1 = ' + test1 + ', test2 = ' + (test2.length === 1));
        s.setVisible(b1);

        s.setPosition(200, 200);
        canvasNode.addChild(s);
    }
})
