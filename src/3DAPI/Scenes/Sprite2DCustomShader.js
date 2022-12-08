var Sprite2DCustomShader = cc.Scene.extend({
    ctor: function () {
        this._super();


        var sp2d = new cc.Sprite("res/Hello.png");
        sp2d.setPosition(300,300);
        this.addChild(sp2d);

        var mat = gfx.Material.CreateNew("res/Game/Materials/Custom2DSprite.mat");
        var glProgramState = cc.GLProgramState.createWithMaterial(mat);
        sp2d.setGLProgramState(glProgramState);
    }
})
