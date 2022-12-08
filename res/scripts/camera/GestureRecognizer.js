


var Gesture = Gesture || {}

Gesture.PAN = 0;
Gesture.PINCH = 1;
Gesture.ZOOM = 2;

Gesture.Regcognizer = cc.Class.extend({
    ctor: function (target) {
        this.target = target;
        this.isRecognizing = false;
        this.piority = 0;
        this.swalow = false;
    },
    lengthBetwwenPoints: function (p1, p2) {
        var q = cc.p(p1.x - p2.x,p1.y - p2.y);
        return Math.sqrt(q.x * q.x + q.y * q.y);
    },
    gestureRecognized: function (gestureData) {
        if(this.target.gestureRecognized)
        {
            this.target.gestureRecognized(gestureData);
        }
    },
    dispose: function () {

    }
})

Gesture.Pan = function(){
    this.point = cc.p(0,0);
    this.delta = cc.p(0,0);
}

Gesture.Touch = function(){
    this.id = 0;
    this.active = false;
    this.location = cc.p(0,0);

    this.startLocation = cc.p(0,0);
}

Gesture.ZoomRegconizer =  Gesture.Regcognizer.extend({
    ctor: function (target) {
        this._super(target);

        this.piority = 1;
        this.swalow = true;

        var mouseListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseScroll: this.onMouseScroll.bind(this)
        });
        this.listener = cc.eventManager.addListener(mouseListener,1);

        var touchAll = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBegan.bind(this),
            onTouchesMoved: this.onTouchesMoved.bind(this),
            onTouchesEnded: this.onTouchesEnded.bind(this)
        });
        this.touchalllistener = cc.eventManager.addListener(touchAll,1);

        this.zooming = false;
        this.touches = [];

    },
    onMouseScroll: function (event,data) {
        this.gestureRecognized({
            type: Gesture.ZOOM,
            data : event.getScrollY()
        });
    },
    dispose: function () {
        cc.eventManager.removeListener(this.listener);
        cc.eventManager.removeListener(this.touchalllistener);
    },

    onTouchesBegan: function (touches, event) {

        touches.forEach(touch=>{
            var touchID = touch.getID();
            var touchObj = new Gesture.Touch();
            touchObj.id = touchID;
            touchObj.location = touch.getLocation();
            touchObj.startLocation = touch.getLocation();
            touchObj.active = true;
            this.touches[touchID] = touchObj;
        });

    },
    onTouchesMoved: function (touches, event) {

        touches.forEach(touch=>{
            var touchID = touch.getID();
            this.touches[touchID].location = touch.getLocation();
        });

        if(this.isZooming())
        {
            var lengthStart = cc.pLength(cc.pSub(this.touches[0].startLocation,this.touches[1].startLocation));
            var length = cc.pLength(cc.pSub(this.touches[0].location,this.touches[1].location));
            this.gestureRecognized({
                type: Gesture.ZOOM,
                data : -(length - lengthStart) / 50
            },this);
        }

    },
    onTouchesEnded: function (touches, event) {
        touches.forEach(touch=>{
            var touchID = touch.getID();
            this.touches[touchID].active = false;
        });
    },

    isZooming: function()
    {
        var length = 0;
        for(var i=0;i< this.touches.length;i++)
        {
            var id = this.touches[i].id;
            if((id === 0 || id === 1) && this.touches[i].active)
            {
                length++;
            }
        }
        if(length == 2)
        {
            return true;
        }
        return false;
    }

})

Gesture.PanRegconizer = Gesture.Regcognizer.extend({
    ctor: function (target) {
        this._super(target);

        var touchOneByOne = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        })
        this.listener = cc.eventManager.addListener(touchOneByOne,1);
    },

    onTouchBegan: function (touch,event) {
        // cc.log("hhuu")
        if (this.isRecognizing) {
            this.isRecognizing = false;
            return false;
        }

        this.isRecognizing = true;
        this.time = cc.director.getGameTime();
        this.timeTouchBegan = this.time;
        var timeBegen = this.timeTouchBegan;

        this.gestureRecognized({
            type: Gesture.PAN,
            timeTouchBegan: timeBegen,
            data : null,
            event: 0,
        },this);

        return true;
    },
    onTouchMoved: function (touch,event) {
        var pan = new Gesture.Pan();
        pan.point = touch.getLocation();
        pan.delta = touch.getDelta();
        pan.deltaTime = cc.director.getGameTime() - this.time;
        this.time = cc.director.getGameTime();
        var timeBegen = this.timeTouchBegan;
        var time = this.time;

        this.gestureRecognized({
            type: Gesture.PAN,
            timeTouchBegan: timeBegen,
            time: time,
            data : pan,
            event: 1
        },this);

    },
    onTouchEnded: function (touch,event) {
        this.isRecognizing = false;
        this.time = cc.director.getGameTime();

        var pan = new Gesture.Pan();
        pan.point = touch.getLocation();
        pan.delta = touch.getDelta();

        // cc.log(JSON.stringify(pan))

        var timeBegen = this.timeTouchBegan;
        var timeEnd = this.time;

        this.gestureRecognized({
            type: Gesture.PAN,
            timeTouchBegan: timeBegen,
            timeEnd: timeEnd,
            data : pan,
            event: 2
        },this);
    },

    dispose: function () {
        cc.eventManager.removeListener(this.listener);
    }

})
