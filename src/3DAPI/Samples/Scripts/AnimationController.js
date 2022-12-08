
var ModelState = {};
ModelState.IDLE = 0;
ModelState.WALK = 1;
ModelState.RUNNING = 2;
ModelState.JUMP = 3;
ModelState.DANCE = 4;
ModelState.DIE =5;
var BLEND_TIME = 0.5;

cc.ComponentJS.extend({
    ctor: function () {
        this._super();
        this.clips = [];
        this._state = ModelState.IDLE;
        this._runningClip = null;
    },
    onAdd: function()
    {
        if(this.clips.length === 0)
        {
            var INFINITY_LOOP = 0;
            var mutant = this.getOwner();
            if(!mutant.getAnimation("idle"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Breathing Idle.fbx");animationIdle.setName("idle");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(INFINITY_LOOP);
                this.clips.push(clip);
                // idleClip.play();
            }
            if(!mutant.getAnimation("walk"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Walking.fbx");animationIdle.setName("walk");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(INFINITY_LOOP);
                this.clips.push(clip);

                // idleClip.play();
            }
            if(!mutant.getAnimation("run"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Run.fbx");animationIdle.setName("run");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(INFINITY_LOOP);
                this.clips.push(clip);

                // clip.play();
            }
            if(!mutant.getAnimation("jump"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Jumping.fbx");animationIdle.setName("jump");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(INFINITY_LOOP);
                this.clips.push(clip);

                // clip.play();
            }
            if(!mutant.getAnimation("attack"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Swiping.fbx");animationIdle.setName("dance");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(INFINITY_LOOP);
                this.clips.push(clip);

                // clip.play();
            }
            if(!mutant.getAnimation("die"))
            {
                var animationIdle = gfx.c3bLoader.loadAnimation(mutant,"res/Sprite3DTest/mixamo/Mutant Dying.fbx");animationIdle.setName("die");
                var clip = animationIdle.getClip();
                clip.setRepeatCount(1);
                //make mutant alway in die state when anim finish
                clip.setActiveWhenFinished(true);
                this.clips.push(clip);

                // clip.play();
            }
        }
    },
    onEnter: function(){
          this._runningClip = this.clips[0];
          this._runningClip.play();
          this._state = ModelState.IDLE;
    },
    changeState: function (newState) {
        if (newState == this._state || !this._runningClip) {
            cc.log("model has ready this state!");
            return;
        }
        if (this._runningClip) {
            this._state = newState;
            this._runningClip.crossFade(this.clips[this._state], BLEND_TIME);
            this._runningClip = this.clips[this._state];
        }
    },
    update: function (dt) {
        // cc.log(dt);
    },
    idle: function () {
        this.changeState(ModelState.IDLE);
    },
    walk: function () {
        this.changeState(ModelState.WALK);
    },
    run: function () {
        this.changeState(ModelState.RUNNING);
    },
    jump: function () {
        this.changeState(ModelState.JUMP);
    },
    dance: function () {
        this.changeState(ModelState.DANCE);
    },
    die: function () {
        this.changeState(ModelState.DIE);
    }
});