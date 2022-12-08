/**
 *   Created by bachbv on 11/9/2021
 */

require('scripts/camera/GestureRecognizer.js');
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
    },
    onExit: function(){
        cc.log("on Exit");
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
        //cc.log("update: " + dt);
        //     // var node = this.getOwner();
        //     // var pos = node.getPosition3D();
        //     // pos.y += 1;
        //     // node.setPosition3D(pos);
    },
    gestureRecognized: function (gestureData) {
        switch (gestureData.type) {
            case Gesture.PAN:
            {
                var matrix = this._3DCam.getWorldMatrix();
                var currentPosition = this._3DCam.getPosition3D();

                var leftVector = cc.math.vec3(-matrix[0],-matrix[1],-matrix[2]);
                cc.math.vec3Normalize(leftVector);



                currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(leftVector,gestureData.data.delta.x * 15));

                var forwardVector = cc.math.vec3(-matrix[8],0,-matrix[10]);
                cc.math.vec3Normalize(forwardVector);

                currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(forwardVector,-gestureData.data.delta.y * 15));

                this._3DCam.setPosition3D(currentPosition);
                break;
            }
            case Gesture.ZOOM:
            {
                var zoom = gestureData.data.getScrollY();
                var matrix = this._3DCam.getWorldMatrix();
                var forward = cc.math.vec3(-matrix[8],-matrix[9],-matrix[10]);
                cc.math.vec3Normalize(forward);
                var currentPosition = this._3DCam.getPosition3D();

                currentPosition = cc.math.vec3Add(currentPosition,cc.math.vec3Scalar(forward,-zoom * 100));
                this._3DCam.setPosition3D(currentPosition);
                break;
            }
        }
    }


})
