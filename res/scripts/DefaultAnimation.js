DefaultAnimator = cc.ComponentJS.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        var sprite3D = this.getOwner();
        var url = sprite3D.getUrl();
        var animation = gfx.c3bLoader.loadAnimation(sprite3D,url);
        animation.getClip().setRepeatCount(1000000);
        animation.getClip().play();
    }
})
