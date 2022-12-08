/**
 * Created by Cantaloupe on 6/15/2016.
 */

fr.Shaker = {
    setEnable:function(bVal, node, callback, thresholdCustom) {
        if ('accelerometer' in cc.sys.capabilities) {
            cc.inputManager.setAccelerometerEnabled(bVal);
            var THRESHOLD = 2.5;
            if (thresholdCustom) {
                THRESHOLD = thresholdCustom;
            }
            var _callBack = callback;
            var shakeOnce = false;
            if (bVal) {
                cc.inputManager.setAccelerometerInterval(1/20);
                cc.eventManager.addListener({
                    event: cc.EventListener.ACCELERATION,
                    callback: function(accelEvent, event) {
                        if (accelEvent.x > THRESHOLD || accelEvent.x < -THRESHOLD ||
                            accelEvent.y > THRESHOLD || accelEvent.y < -THRESHOLD ||
                            accelEvent.z > THRESHOLD || accelEvent.z < -THRESHOLD) {
                            if (_callBack && !shakeOnce) {
                                _callBack();
                                cc.log('Accel x: ' + accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp);
                                shakeOnce = true;
                            }
                        }
                        else {
                            shakeOnce = false;
                        }
                    }
                }, node);
            }
        }
        else {
            cc.log("ACCELEROMETER IS NOT SUPPORTED!");
        }
    }
}