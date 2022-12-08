
TestComponent = cc.ComponentJS.extend({
    ctor: function () {
        this._super();
        //cc.log("ctor");
        this.time = 0;

    },
    onAdd: function () {
        cc.log("on Add");
    },
    onEnter: function () {
        cc.log("on Enter");
    },
    update: function (dt) {
        cc.log("update: " + dt);
        var node = this.getOwner();
        var pos = node.getPosition3D();
        pos.y += dt * 10;
        node.setPosition3D(pos);
    }
});