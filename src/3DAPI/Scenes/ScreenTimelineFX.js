
var ScreenTimelineFX = cc.LayerColor.extend({
    ctor:function() {
        this._super(cc.color('#1b2129'));


    },
    onEnter:function(){
        this._super();

        //load effects
        this.preloadEffects();
        this.initControls();
        //play effects

        this.lbFXName = new ccui.Text("0");
        this.lbFXName.setScale(2.5);
        this.addChild(this.lbFXName);
        this.lbFXName.setPosition(100, cc.winSize.height - 20);
        this.initPoolFX();
        this.playFXInPool();

        this.running_ = true;
    },
    onEnterTransitionDidFinish:function()
    {
        this._super();
        // this.playAndAutoRemoved();
    },
    onExit:function()
    {
        this.running_ = false;

        this._super();
        tlfx.CCEffectsLibrary.getInstance().ClearAll();
    },

    preloadEffects:function(){
        tlfx.CCEffectsLibrary.getInstance().Load("res/tlfx/demo");
    },

    playAndAutoRemoved:function(){
        var effect = tlfx.EffectRenderer.createWithName("Flash Burst 1");
        if (effect) {
            effect.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
            effect.setAutoRemoveOnFinish(false);
            this.addChild(effect, 0);
        }else{
            cc.error("Effect not found!");
        }
    },
    playAndQueued:function(){
        if(!this._effPool){
            this._effPool = [];
        }

        for( var i = 0; i < 10; i++){
            var effect = this.getEffectFromQueue();
            // var delta = (cc.random0To1() - 0.5)* 200;
            effect.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
            this.addChild(effect, 0);
            effect.start();
            var self = this;
            effect.setCompleteListener(function (eff) {
                cc.log("Complete", self._effPool.length);
                self.putEffectFromQueue(eff);
                eff.removeFromParent();
                cc.log("Complete2", self._effPool.length);

            });
            effect.release();
        }
    },

    playFXInPool: function(){
        let effect = this.getEffectFromQueue();
        if(effect == null) return;

        let cb = (eff, id) => {
            if(!this.running_)
                return;
            clearInterval(id);
            eff.removeFromParent();

            // play next fx
            if(this._effPool.length > 0){
                this.playFXInPool();
            }
        };

        this.lbFXName.setString(effect.fxName);
        effect.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        this.addChild(effect, 0);
        effect.start();
        effect.release();
        let forceId = setTimeout(() => {
            cb(effect, 0)
        }, 5000);

        effect.setCompleteListener((eff) => {
            cc.log('setCompleteListener ...');
            cb(eff, forceId);
        });
    },

    initPoolFX: function(){
        tlfx.CCEffectsLibrary.getInstance().Load("res/tlfx/demo");
        let arrName = [
            'Light Sweep',
            'Flash In',
            'Tunnel Lights',
            'Light Flare',
            'Flash Burst 1',
            'Flash Burst 2',
            'Basic Busrt 3', // bug
            'Test effect',
            'New effect', // bug
            'Explosion',
            'Cloud Explosion 1',// bug
            'Star Burst5', // bug
            'Smokey Explosion',
            'Flicker Flare',
            'Smokey Flicker Inwards 2',
            'Muzzle Flash',
            'Machine Gun',
            'SingleShot4', // bug
            'SingleShot5', // bug
            'Halo 1', // bug
            'Halo 2',
            'Electric Area',
            'Bar Readout',
            'Bars1', // bug
            'Bars2', // bug
            'Monitor Readout',
            'AnalogueWithNumbers 3', // bug
            'Hundredths1', // bug
            'RandomNumbers1', // bug
            'NumberRow1', // bug
            'Shaft of light',
            'Shaft of light 111', // bug
            'Shaft of light 12', // bug
            'Splash',
            'Water Fall',
        ];
        this._effPool = [];
        for(let i = 0; i < arrName.length; ++i){
            efk = tlfx.EffectRenderer.createWithName(arrName[i]);
            efk.fxName = arrName[i];
            efk.retain();

            this.putEffectFromQueue(efk);
        }
    },

    getEffectFromQueue:function(){
        var efk;
        if(this._effPool.length > 0)
        {
            return this._effPool.shift();
        }else{
            let arrName = [
                'Light Sweep',
                'Flash In',
                'Tunnel Lights',
                'Light Flare',
                'Flash Burst 1',
                'Flash Burst 2',
                'Basic Busrt 3',
                'Test effect',
                'New effect',
                'Explosion',
                'Cloud Explosion 1',
                'Star Burst5',
                'Smokey Explosion',
                'Flicker Flare',
                'Smokey Flicker Inwards 2',
                'Muzzle Flash',
                'Machine Gun',
                'SingleShot4',
                'SingleShot5',
                'Halo 1',
                'Halo 2',
                'Electric Area',
                'Bar Readout',
                'Bars1',
                'Bars2',
                'Monitor Readout',
                'AnalogueWithNumbers 3',
                'Hundredths1',
                'RandomNumbers1',
                'NumberRow1',
                'Shaft of light',
                'Shaft of light 111',
                'Shaft of light 12',
                'Splash',
                'Water Fall',
            ];
            for(let i = 0; i < arrName.length; ++i){
                efk = tlfx.EffectRenderer.createWithName(arrName[i]);
                efk.retain();

                this.putEffectFromQueue(efk);
            }
        }
        return efk;
    },
    putEffectFromQueue:function(efk){
        efk.retain();
        this._effPool.push(efk);
    },

    initControls:function(){
        // this.playAndQueued();
        // var size = cc.director.getVisibleSize();
        //
        // var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        // this.addChild(btnBack);
        // btnBack.addClickEventListener(this.onSelectBack.bind(this));
        //
        // var self = this;
        // var btnPlayQueue = gv.commonButton(100, 64, size.width/2 -240, 52,"Play queue");
        //
        // this.addChild(btnPlayQueue);
        // btnPlayQueue.addClickEventListener(function () {
        //
        // });
    },
    onSelectBack:function(sender)
    {
        //fr.view(ScreenAnimationMenu);
    },
});