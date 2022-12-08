/**
 *   Created by bachbv on 11/12/2021
 */

typeof (BaseScen3D)==="undefined" ? require('src/3DAPI/Base/BaseScen3D.js'):{};
require('src/framework/plugins/PlatformWrapper.js');
require('src/framework/plugins/Facebook.js');
require('src/framework/plugins/Google.js');

var FarmScene = BaseScen3D.extend({
    ctor: function (ctx) {
        this.ctx = ctx;
        this._super();
    },
    initScene: function () {
        this._super();

        this.initLight();
        this.init2D();

        // this.testEFK();
        this.testMap();
        this.testLoadAsync();
        this.testPlugin();
        this.testMusicSound();
        this.testSpine();
        this.testRemoveSelf();
    },

    initLight: function(){
        // only support directional light
        var light = gfx.Light.create();
        light.SetLightType(gfx.LightType.DIRECTIONAL);
        light.SetCastShadows(false);
        light.SetShadowCascadeMobile(200,0.8);
        light.SetColor(cc.color(200,200,200,255));
        light.SetBrightness(0.5);
        this.light = light;

        var nodeLight = new cc.Node();
        nodeLight.addComponent(light);
        nodeLight.setRotation3D(cc.math.vec3(-90,0,0));
        nodeLight.setPosition3D(cc.math.vec3(0,80,1));

        this.addChild(nodeLight);
    },

    init2D: function(){
        // let layer2D = new cc.Layer();
        // this.ctx.addChild(layer2D);
        // this.layer2D = layer2D;

        this.layer2D = gfx.CanvasNode.create();
        this.layer2D.addComponent(gfx.Canvas.create());
        this.addChild(this.layer2D);
    },

    testEFK: function(){
        let num = 10;
        for(var i = 0; i < num; i++)
        {
            var efk = gfx.Effekseer.create("res/farm_efk/sunshine.efk");
            var node = new cc.Node();
            node.addComponent(efk);
            this.addChild(node);
            node.setPosition3D(cc.math.vec3( -100 + Math.random() * 200,15,-100 + Math.random() * 200));
        }
    },

    testMap: function () {
        let ret = gfx.Sprite3D.create("res/Model/map/mapbase_v2/map_new_v8.c3t");
        this.addChild(ret);
        ret.setScale(0.01);
        ret.setPosition(cc.math.vec3(0, 0, 0));

        let models = ret.getModels();
        models.forEach((model) => {

            let meshCount = model.getMeshPartCount();
            for(let i = 0; i < meshCount; ++i){
                var mat = gfx.Material.CreateNew("res/Game/Materials/Farm.mat");
                let p = model.getMaterial(i).getParameter("u_diffuseTex").getSampler();
                p && mat.getParameter("u_diffuseTex").setSampler(p);
                model.setMaterial(mat, i);
                // cc.log(p ? 'getSampler ok' : 'getSampler null');
            }
        })

        // for(let i = 0; i < 10; ++i){
        //     let obj = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        //     this.addChild(obj);
        //     obj.setScale(0.05);
        //     obj.setPosition3D(cc.math.vec3(Math.random() * 10 - 100, 5, Math.random() * 10 + 100));
        // }
    },

    testRemoveSelf: function(){
        let sp = new cc.Sprite('res/Images/common/button/img_common_btn_2.png');
        this.layer2D.addChild(sp);
        sp.setPosition(300, 300);

        sp.runAction(cc.sequence(
            cc.rotateTo(3, 120),
            cc.removeSelf(true)
        ))
    },

    testSpine: function(){
        let numOfSpine = 1;
        let arrSpine = [
            'mob_01',
            'mob_02',
            'mob_03',
        ];
        let anim = [
            'attack',
            'idle',
            'dead'
        ];
        for(let i = 0; i < numOfSpine; ++i){
            let r = parseInt(Math.random() * arrSpine.length);

            let s = SpineFactory.create(arrSpine[r]);

            s.setPosition(Math.random() * cc.winSize.width, Math.random() * cc.winSize.height);
            cc.log('random: ' + r + ', pos = ' + JSON.stringify(s.getPosition()));
            let trackSp = s.setAnimation(0, "idle", true);

            s.setMix('idle', 'attack', 0.2);
            s.setMix('idle', 'dead', 0.2);
            s.setStartListener((trackIdx) => {
                cc.log('on start listener: ' + JSON.stringify(trackIdx));
            });

            s.setCompleteListener((trackIdx) => {
                cc.log('on complete listener: ' + JSON.stringify(trackIdx));
            });

            s.setEndListener((trackIdx) => {
                cc.log('on end listener: ' + JSON.stringify(trackIdx));
            });

            // s.setTrackStartListener((trackSp) => {
            //     cc.log('trackSp on start listener');
            // });
            //
            // s.setTrackEndListener(() => {
            //
            // });
            //
            // s.setTrackCompleteListener((trackSp) => {
            //     cc.log('trackSp on completed listener');
            // });

            setInterval(() => {
                cc.log('play attack anim');
                let idxAnim = parseInt(Math.random() * anim.length);
                s.setAnimation(0, anim[idxAnim], true);
            }, 2000);
            //
            // s.setTrackEventListener(() => {
            //
            // });
            // s.setScaleX(-1);
            // s.setScale(3);
            this.layer2D.addChild(s);
        }
    },
    
    testLoadAsync: function () {
        gfx.C3BLoader.getInstance().loadAsync("res/Sprite3DTest/fish1.c3b", (ret) => {
            cc.log('load async complete: ');
            this.addChild(ret);
            ret.setScale(0.05);
            ret.setPosition3D(cc.math.vec3(-100, 5, 100));
        });

        let obj = gfx.Sprite3D.create("res/Sprite3DTest/fish1.c3b");
        this.addChild(obj);
        obj.setScale(0.05);
        obj.setPosition3D(cc.math.vec3(-100, 5, 120));
    },
    
    testPlugin: function () {
        if(!cc.sys.isMobile) return;

        this.initPlugin();

        // test nofity--------------------------------------------------------------------------------
        // var someDay = new Date();
        // var curTime = someDay.getTime();
        // someDay.setTime(curTime + 5000); // show after 5s
        //
        // var notice = {
        //     contentTitle: 'notify title',
        //     contentText: 'content notify test',
        //     time: someDay.getTime(),
        //     imageURI: "",
        //     sound: "default"
        // };
        //
        // cc.log("addNotification: %s", JSON.stringify(arguments));
        // fr.platformWrapper.addNotify(notice);
        //
        // fr.platformWrapper.showNotify();
        //-------------------------------------------------------------------------------------------

        let res = 'res/Images/common/button/img_common_btn_2.png';
        let btnGG = new ccui.Button(res, res, res);
        btnGG.setPosition(100, 100);
        btnGG.addTouchEventListener(this.touchEvent, this);
        btnGG.setTitleText('Google');
        this.layer2D.addChild(btnGG);
        this.btnGG = btnGG;

        res = 'res/Images/common/button/img_common_btn_2.png';
        let btnFB = new ccui.Button(res, res, res);
        btnFB.setPosition(400, 100);
        btnFB.setTitleText('Facebook');
        btnFB.addTouchEventListener(this.touchEvent, this);
        this.layer2D.addChild(btnFB);
        this.btnFB = btnFB;
    },

    initPlugin: function(){
        cc.log('plugin platformWrapper');
        fr.platformWrapper.init();

        cc.log('plugin fb');
        fr.facebook.init();

        cc.log('plugin gg');
        fr.google.init();
    },
    
    testMusicSound: function () {
        cc.audioEngine.playMusic('res/audio/ingame.mp3', true);
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                if(sender === this.btnFB){
                    fr.facebook.login(() => {
                        cc.log('facebook login callback');
                    })
                }
                else if(sender === this.btnGG){
                    fr.google.login(() => {
                        cc.log('google login callback');
                    })
                }
                break;

            default:
                break;
        }
    },
});

var SpineFactory = {
    create: function(key, nameSkeleton){
        nameSkeleton = nameSkeleton === undefined? "skeleton": nameSkeleton;
        var path = 'res/spines/' + key;
        var spine = new sp.SkeletonAnimation(path + '/@name.json'.replace("@name", nameSkeleton), path + '/texture.atlas');
        spine.retain();
        return spine;
    },

    createByName: function (key, name) {
        var path = 'res/spines/' + key;
        var fullPathJson = (path + '/@name.json').replace("@name", name);
        var fullPathAtlas = (path + '/@name.atlas').replace("@name", name);
        return new sp.SkeletonAnimation(fullPathJson, fullPathAtlas);
    },

    poolingSpine: function (key, spine) {
        spine.removeFromParent(false);
        poolSpine[key] = spine;
    }
};

