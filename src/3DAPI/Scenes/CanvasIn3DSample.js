typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}

// display canvas is main camera , not default
// using cc.Node istead gfx.CanvasNode

var CanvasScene3DSample = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();

        var sp = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        this.addChild(sp);
        sp.runAction(cc.rotateBy(50, 1000));

        var node = new cc.Node();
        sp.addChild(node);

        var canvas = gfx.Canvas.create();
        node.addComponent(canvas);
        this.node = node;
        canvas.getStateBlock().setDepthTest(true);

        var sp = new cc.Sprite("res/Hello.png");
        sp.setScale(0.15);
        node.addChild(sp);

        this.scheduleUpdate();

    },

    update: function(dt){
        // this.node.setRotation3D(cc.math.vec3Sub(
        //     this.camera.getRotation3D(),
        //     this.node.getParent().getRotation3D()
        // ));
    }
})
