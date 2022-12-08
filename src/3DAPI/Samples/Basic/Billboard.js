typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{};

var Billboard = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("7. Billboard")
    },
    initScene: function () {
        this._super();

        this.setupLight();



        var planeMesh = gfx.Mesh.createRectangleWithSize(cc.size(500,500),cc.p(0.5,0.5),cc.p(2,2));
        var model = gfx.Model.create(planeMesh);
        model.setMaterial(gfx.Material.FromCache("res/Game/Materials/PlaneNoTex.mat"),0);
        var node = new cc.Node();
        node.addComponent(model);
        this.addChild(node);
        node.setRotation3D(cc.math.vec3(-90,0,0));

        // billboard setup

        this.drawableHasBillboard = [];
        this.listBillboard = [];

        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);

        for(var i=0;i<1;i++) {
            var sp = new BaseHUD();
            sp.initWithBinaryFile("res/ui/NodeBillboard.json")
            sp.setScale(1.0);
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
            sp.setScale(0.75);
            sp.setPosition3D(cc.math.vec3( 0,25,0));
            // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());

            this.drawableHasBillboard.push(sp.getModels()[0]);
            sp.getModels()[0].billboard = this.listBillboard[i];
        }

        this.scheduleUpdate();
    },
    update:function (dt) {
        for(var i=0;i<1;i++) {
            var visible = this.drawableHasBillboard[i].IsLastestVisible();
            // cc.log(visible)
            var worldPos = this.drawableHasBillboard[i].getOwner().getWorldPosition();
            var screenPos = this.getActiveCamera().project(worldPos);
            // convert openGL -> screen
            screenPos.y = cc.winSize.height - screenPos.y;
            screenPos.y += 100;
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