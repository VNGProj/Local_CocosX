typeof (BaseScen3D)==="undefined"?require('src/3DAPI/Base/BaseScen3D.js'):{}
var SceneTest01 = BaseScen3D.extend({
    ctor: function (){
        this._super();
    },
    initScene: function (){
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

        // var sp = gfx.Sprite3D.create("res/Sprite3DTest/boss.c3b");
        // this.addChild(sp);
        // sp.setScale(7);
        // sp.setPosition3D(cc.math.vec3(0,15,0));
        // sp.runAction(cc.rotateBy(10,cc.math.vec3(0,360,0)).repeatForever());

        var plane = gfx.Sprite3D.create("res/Sprite3DTest/plane.c3t");
        plane.getModels()[0].SetCastShadows(false);
        this.addChild(plane);
        plane.setRotation3D(cc.math.vec3(-90,0,0));

        plane.setScaleY(4);
        plane.setScaleX(4);

        var canvasNode = gfx.CanvasNode.create();
        canvasNode.addComponent(gfx.Canvas.create());
        this.addChild(canvasNode);

        // this.sp = new cc.Sprite("res/Texture/Burst01.png");
        // canvasNode.addChild(this.sp);
        // this.sp.setPosition(128,128);


        let layer = new cc.Layer();
        canvasNode.addChild(layer);

        //test issue: http://10.11.91.7:3000/SuperFarm/CocosX/issues/37
        /// FIXED
        if(false){
            let btn = new ccui.Button("res/Hello.png");
            layer.addChild(btn);
            btn.setPosition(300,300);
            btn.setVisible(false);
            setTimeout(()=>{
                cc.log("Set it true");
                cc.log(btn)
                btn.setVisible(true); // expected: button will appear after 2 seconds
            }, 2000);
        }
        //test end here --------------------------------------------------------------------------


        //test issue: http://10.11.91.7:3000/SuperFarm/CocosX/issues/42
        if(false){
            let ui = new ccui.TextBMFont("12344", "res/fonts2/bmfont_03.fnt");
            layer.addChild(ui);
            ui.setPosition(500, 500);
        }
        // end test here


        // test issue: http://10.11.91.7:3000/SuperFarm/CocosX/issues/40
        if(false){
            let sp = new cc.Sprite("res/Hello.png");
            layer.addChild(sp);
            sp.setPosition(500, 500);
            sp.setScaleY(-1); //comment this line to show sprite
        }
        // end test here ---------------------------

        // test issue: http://10.11.91.7:3000/SuperFarm/CocosX/issues/41
        ///  FIXED
        if(false){
            let sp = new cc.Sprite("res/Hello.png");
            layer.addChild(sp);
            sp.setPosition(500, 500);
            sp.runAction(cc.sequence(
                cc.spawn(
                    cc.fadeOut(0.5),
                    cc.moveBy(0.5, cc.p(0, -50)),
                    cc.scaleTo(0.5, 0.5, 0.5)
                ),
                cc.removeSelf()
            ))
        }
        // end test here ---------------------------

        // test issue: http://10.11.91.7:3000/SuperFarm/CocosX/issues/44
        if(true){
            let fog = new cc.LayerColor(cc.color('#17101f'), 1000, 1000);
            fog.setOpacity(200);
            fog.retain();

            let ui = ccs.load("res/ui/sample_01.json", "res/").node;
            layer.addChild(ui);
            setTimeout(() =>{
                let parent = ui.getParent();
                parent.addChild(fog);
                fog.setLocalZOrder(ui.getLocalZOrder() - 1); // expectation: fog sẽ nằm dưới ui hiển thị
            }, 2000)
        }
         // end test here ---------------------------


        this.scheduleUpdate();
    },
    update: function (dt) {
        // var tex = this.light.GetShadowMap();
        // if(tex)
        //     this.sp.setTexture(tex);
    }
})
