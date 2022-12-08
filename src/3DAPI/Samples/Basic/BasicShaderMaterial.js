var BasicShaderMaterial = BaseScen3D.extend({
    ctor: function () {
        this._super();
        this.setName("10.Custom Material");
    },
    initScene: function () {
        this._super();

        // basic light

        // ambient
        // zone for ambient
        this.setupLight();


        // add object for scene
        var sprite = gfx.Sprite3D.create("res/Sprite3DTest/teapot.c3b");
        this.addChild(sprite);
        sprite.setRotation3D(cc.math.vec3(-90,0,0));
        sprite.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        sprite.setScale(9);

        var material = gfx.Material.FromCache("res/water/water.mat");
        var models = sprite.getModels();
        models.forEach(drawable=>{
            var meshpart_count = drawable.getMeshPartCount();
            for(var i=0;i<meshpart_count;i++)
            {
                drawable.setMaterial(material,i);
            }
        });
    }
});