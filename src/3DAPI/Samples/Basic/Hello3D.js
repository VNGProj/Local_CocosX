
var Hello3D = gfx.Scene3D.extend({
    ctor: function () {
        this._super();

        this.initScene();
        this.setName("1.Hello3D");
    },
    initScene: function ()
    {
        // octree component for get drawable by frustum culling
        var octree = gfx.Octree.create();
        octree.SetSize({min:cc.math.vec3(-1000,-1000,-1000),max:cc.math.vec3(1000,1000,1000)},8);
        this.addComponent(octree);


        // create perspective camera
        var ratio = cc.winSize.width / cc.winSize.height;
        var camera = cc.Camera.createPerspective(60,ratio,0.1,500);
        camera.setPosition3D(cc.math.vec3(0,150,150));
        camera.lookAt(cc.math.vec3(0,0,0));
        this.camera = camera;
        this.addChild(camera);

        // active cam for this scene
        this.setActiveCamera(camera);


        // add object for scene
        var sprite = gfx.Sprite3D.create("res/Sprite3DTest/boss.c3b");
        this.addChild(sprite);
        sprite.setRotation3D(cc.math.vec3(-90,0,0));
        sprite.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        sprite.setScale(9);
    }
})