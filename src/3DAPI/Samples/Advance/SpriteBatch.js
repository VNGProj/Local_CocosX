typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var SpriteBatchScene = BaseScen3D.extend({
    ctor: function (){
        this._super();
        this.setName("SpriteBatch")
    },
    initScene: function (){
        this._super();

        this.setRenderPipeline("res/Game/RenderPipelines/Forward_Alpha.xml");

        this.setupLight();


        this.camera.setPosition3D(cc.math.vec3(0,15,15));
        this.camera.lookAt(cc.math.vec3(15,0,15));

        // var sp = gfx.Sprite3D.create("res/Sprite3DTest/boss.c3b");
        // this.addChild(sp);
        // sp.setScale(1);
        // sp.setPosition3D(cc.math.vec3(2,0,2));
        // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());
        //
        // var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        // plane.getModels()[0].SetCastShadows(false);
        // this.addChild(plane);
        // plane.setRotation3D(cc.math.vec3(-90,0,0));
        // plane.setPosition3D(cc.math.vec3(0, -20, 0));


        /// 1 > SpriteBatch with normal sprite
        {
            // spritebatch wwith init capacity (sprite count)
            var spBatch = gfx.SpriteBatch.create(100);
            var mat = gfx.Material.FromCache("res/Game/Materials/SpriteBatchTest.mat");
            spBatch.setMaterial(mat);
            var node = new cc.Node();
            node.addComponent(spBatch);
            this.addChild(node);

            var sp22 = null;
            // add content for spritebatch
            for(let i = 0; i < 100; ++i){
                var sp1 = new cc.Sprite("res/Texture/Yakiniku.png");

                sp1.setScale(0.025);
                sp1.setRotation3D(cc.math.vec3(270,0,0));
                sp1.setPosition3D(cc.math.vec3(-50 + Math.random() * 100,-20,-50 + Math.random() * 100));
                spBatch.addSprite(sp1);
                sp22 = sp1;
                sp22.runAction(cc.rotateBy(20,cc.math.vec3(0,360,0)).repeatForever());
            }

        }

        /// 2 > SpriteBatch with sprite from spriteframe (plist)
        if(false){

            cc.spriteFrameCache.addSpriteFrames("res/Images/ui.plist");

            // spritebatch wwith init capacity (sprite count)
            var spBatch = gfx.SpriteBatch.create(100);
            var mat = gfx.Material.FromCache("res/Game/Materials/SpriteBatchTest2.mat");
            spBatch.setMaterial(mat);
            var node = new cc.Node();
            node.addComponent(spBatch);
            this.addChild(node);

            // add content for spritebatch
            {
                var sp1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button_actived.png"));
                sp1.setScale(0.5);
                sp1.setPosition3D(cc.math.vec3(0,10,0));
                sp1.setRotation3D(cc.math.vec3(-90,0,0));
                // spBatch.addSprite(sp1);
            }

            {
                var sp1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("coin.png"));
                sp1.setScale(0.5);
                sp1.setPosition3D(cc.math.vec3(20,10.1,0));
                sp1.setRotation3D(cc.math.vec3(-90,0,0));
                // spBatch.addSprite(sp1);
            }

            {
                var sp1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("crystal.png"));
                sp1.setScale(0.5);
                sp1.setPosition3D(cc.math.vec3(-20,10.1,0));
                sp1.setRotation3D(cc.math.vec3(-90,0,0));
                // spBatch.addSprite(sp1);
            }

        }


    },
    update: function (dt) {

    }
})
