require('res/scripts/camera/GestureRecognizer.js');
//vec3 = vec3 || cc.math.vec3;
CameraController = cc.ComponentJS.extend({
    ctor: function () {
        this._super();

    },
    onEnter: function () {
        this.cleanRegconizer();
        if(!cc.director.isInEditorMode())
        {
            this.pan_gesture = new Gesture.PanRegconizer(this);
            this.zoom_gesture = new Gesture.ZoomRegconizer(this);
        }

        this._3DCam = this.getOwner();

        this.velocity = cc.math.vec3(0,0,0);
        this.acceleration = cc.math.vec3(0,0,0);
        this.Fms = cc.math.vec3(0,0,0);
        this.oldLengthVel = 0;
    },
    onExit: function(){
        cc.log("on Exit CameraController");
        this.cleanRegconizer();
    },
    cleanRegconizer: function()
    {
        if(this.pan_gesture)
        {
            this.pan_gesture.dispose();
            this.pan_gesture = null;
        }
        if(this.zoom_gesture)
        {
            this.zoom_gesture.dispose();
            this.zoom_gesture = null;
        }
    },
    update: function (dt) {

        return;
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        this.velocity.z += this.acceleration.z * dt;

        if(cc.math.vec3Length(this.velocity) > 500)
        {
            this.velocity.x -= this.acceleration.x * dt;
            this.velocity.y -= this.acceleration.y * dt;
            this.velocity.z -= this.acceleration.z * dt;
        }

        this.velocity.x += this.Fms.x * dt;
        this.velocity.y += this.Fms.y * dt;
        this.velocity.z += this.Fms.z * dt;

        if(cc.math.vec3Length(this.acceleration) == 0 && this.oldLengthVel > 0 && cc.math.vec3Length(this.velocity) > this.oldLengthVel)
        {
            this.velocity = cc.math.vec3(0,0,0);
            this.Fms = cc.math.vec3(0,0,0);
        }

        this.oldLengthVel = cc.math.vec3Length(this.velocity);

        var pos = this.getOwner().getPosition3D();

        pos.x += this.velocity.x * dt;
        pos.y += this.velocity.y * dt;
        pos.z += this.velocity.z * dt;

        this.getOwner().setPosition3D(pos);

        //cc.log("update: " + dt);
        //     // var node = this.getOwner();
        //     // var pos = node.getPosition3D();
        //     // pos.y += 1;
        //     // node.setPosition3D(pos);
    },
    gestureRecognized: function (gestureData,regconizer) {
        switch (gestureData.type) {
            case Gesture.PAN:
            {
                if(gestureData.event == 0)
                {
                    this.lengthCheck = 0;
                    this.lastdirection = cc.p(0,0);
                    this.velocity = cc.math.vec3(0,0,0);
                    this.Fms = cc.math.vec3(0,0,0);
                }
                else if(gestureData.event == 1){
                    this.lengthCheck += cc.math.vec3Length(cc.math.vec3(gestureData.data.delta.x,gestureData.data.delta.y));
                }


                if(gestureData.event == 1)
                {
                    var matrix = this._3DCam.getWorldMatrix();
                    var currentPosition = this._3DCam.getPosition3D();

                    var leftVector = cc.math.vec3(-matrix[0],-matrix[1],-matrix[2]);
                    cc.math.vec3Normalize(leftVector);

                    currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(leftVector,gestureData.data.delta.x * 0.5));

                    var forwardVector = cc.math.vec3(-matrix[8],0,-matrix[10]);
                    cc.math.vec3Normalize(forwardVector);

                    currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(forwardVector,-gestureData.data.delta.y * 0.5));

                    var direction = cc.math.vec3Scalar(leftVector,gestureData.data.delta.x);
                    direction = cc.math.vec3Normalize(cc.math.vec3Add(direction,cc.math.vec3Scalar(forwardVector,-gestureData.data.delta.y)));

                    if(gestureData.data.delta.x != 0 || gestureData.data.delta.y != 0)
                    {
                        this.lastdirection = direction;
                        this.lastDelta = gestureData.data.deltaTime;
                        // this.acceleration = cc.math.vec3Add(this.acceleration,cc.math.vec3Scalar(direction,10000 * gestureData.data.deltaTime));
                        this.getOwner().setPosition3D(currentPosition);
                    }


                }


                if(gestureData.event == 2)
                {
                    // this.acceleration = this.lastdirection;
                    // cc.log(JSON.stringify(this.acceleration));
                    // cc.log(JSON.stringify(this.lastdirection))
                    // cc.log(this.lastDelta)
                    if(this.lastDelta > 0)
                    {
                        var mass = 1;
                        var vel = this.lengthCheck / (gestureData.timeEnd - gestureData.timeTouchBegan);

                        var length =

                            this.velocity = cc.math.vec3Scalar(this.lastdirection,Math.min(vel ,500));
                        this.Fms = cc.math.vec3Scalar(this.lastdirection,-1200);
                    }

                }


                //this._3DCam.setPosition3D(currentPosition);
                break;
            }
            case Gesture.ZOOM:
            {

                var zoom = gestureData.data;
                var matrix = this._3DCam.getWorldMatrix();
                var forward = cc.math.vec3(-matrix[8],-matrix[9],-matrix[10]);
                cc.math.vec3Normalize(forward);
                var currentPosition = this._3DCam.getPosition3D();

                currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(forward,-zoom * 3));
                if(currentPosition.y > 50 && currentPosition.y < 300)
                    this._3DCam.setPosition3D(currentPosition);
                break;
            }
        }
    }


})
