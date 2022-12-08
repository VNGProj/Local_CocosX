typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{};

var UIScene3D = BaseScen3D.extend({
    ctor: function () {
        this._super();
    },
    initScene: function () {
        this._super();
        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);



        var jsonLayout = ccs.load("res/UI/MainScene.json");
        this._layout = jsonLayout.node;
        this._layout.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this._layout);
        canvasNode.addChild(this._layout);
    }
});

