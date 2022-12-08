/**
 *   Created by bachbv on 11/9/2021
 */

var Layer3D = gfx.Scene3D.extend({
    ctor: function (){
        this._super();
        this.initScene();
    },
    initScene: function ()
    {
        // init octree
        let octree = gfx.Octree.create();
        octree.SetSize({min:cc.math.vec3(-5000,-5000,-5000),max:cc.math.vec3(5000,5000,5000)},8);
        this.addComponent(octree);

        // init canvas node 2d in 3d
        let canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);
        this.canvasNode = canvasNode;
    },

    getCanvasNode: function(){
        return this.canvasNode;
    },

    getCamera: function(){
        return this.camera;
    },
});