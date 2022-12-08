

var BaseHUD = cc.Layer.extend({
    ctor: function (scene) {
        this._super();
        this.scene = scene;
    },
    initWithBinaryFile: function(json){

        this._layoutPath = json;
        var jsonLayout = ccs.load(json);

        this._actionList = jsonLayout.action;
        this._layout = jsonLayout.node;
        this._layout.setContentSize(cc.winSize);
        // this._layout.setAnchorPoint(cc.p(0.5,0.5));
        // this._layout.setPosition(DESIGN_RESOLUTION_WIDTH/2,DESIGN_RESOLUTION_HEIGHT/2);
        ccui.helper.doLayout(this._layout);
        this.addChild(this._layout);

        this.syncWidgets(this._layout);

        // this.initGUI();
    },
    syncWidgets: function (root)
    {
        var thiz = this;
        var childs = root.getChildren();
        childs.forEach(child=>{

            if(child instanceof ccui.Widget)
            {
                if(child.getName() !== "")
                    thiz[child.getName()] = child;
                if(typeof (child.callBackList) !== "undefined")
                {
                    child.callBackList.forEach(cb=>{
                        child[cb] = thiz[cb]?thiz[cb].bind(thiz):undefined;
                    })
                }

                thiz.syncWidgets(child);
            }
        });
    },


});

var HUD = BaseHUD.extend({
    ctor: function (scene) {
        this._super(scene);
        this.initWithBinaryFile("res/ui/HUD.json");
    },
    nextScene: function () {
        this.scene.nextSample();
    },
    prevScene: function () {
        this.scene.prevScene();
    },
    debug: function(){
        gfx.BGFXRenderer.getInstance().toggleDebug();
    },
    setTitle: function (title) {
        this["Text_1"].setString(title);
    }
})