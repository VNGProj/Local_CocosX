fr.Avatar = cc.Node.extend({
    ctor: function (url) {
        this._super();
        this.setCascadeOpacityEnabled(true);

        this.defaultAvatar = new cc.Sprite('avatar.jpg');
        this.defaultAvatar.setCascadeOpacityEnabled(true);
        this.addChild(this.defaultAvatar);

        this.avatar = fr.AsyncSprite.create(this.defaultAvatar.getContentSize(), this.onFinishLoad.bind(this));
        this.addChild(this.avatar);

        this.updateAvatar(url);

        return true;
    },
    updateAvatar:function(url)
    {
        if(_.isEmpty(url))
        {
            this.onFinishLoad(false);
            return;
        }
        this.defaultAvatar.setVisible(true);
        this.avatar.setVisible(false);
        cc.log("avatar url: " + url);
        //this.avatar.updatePath(url.replace("https:", "http:"),this.getStorePath(url));
        this.avatar.updatePath(url,this.getStorePath(url));


    },
    onFinishLoad:function(result)
    {
        if(result)
        {
            this.defaultAvatar.setVisible(false);
            this.avatar.setVisible(true);
        }
        else
        {
            this.defaultAvatar.setVisible(true);
            this.avatar.setVisible(false);
        }
    },
    getStorePath:function(url)
    {
        if(cc.sys.isNative) {
            return jsb.fileUtils.getWritablePath() + "/" + md5(url);
        }else
        {
            return "";
        }
    },
    refreshAvatar: function() {
        this.defaultAvatar.setVisible(true);
    }

});
