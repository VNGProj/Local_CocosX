cc.ComponentJS.extend({
    ctor: function () {
        this._super();

    },
    onAdd: function () {
        this.ball = this.getOwner();
    },
    onEnter: function(){
        this.position = this.ball.getPosition3D();
        this.velocity = cc.math.vec3(0,0,0);
    },
    update: function (dt) {
        this.velocity = cc.math.vec3Add(this.velocity, cc.math.vec3Scalar(cc.math.vec3(0,-20.81,0),dt));
        this.position = cc.math.vec3Add(this.position, cc.math.vec3Scalar(this.velocity,dt));

        if(this.velocity.y < 0 && this.position.y < 2)
        {
            this.velocity.y = -this.velocity.y;
        }

        this.ball.setPosition3D(this.position);

    }
})