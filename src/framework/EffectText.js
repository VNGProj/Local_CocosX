/**
 * Created by KienVN on 4/15/2015.
 */
/**
 * Created by KienVN on 4/10/2015.
 */


var EffectText = cc.Node.extend(
    {
        ctor: function () {
            this._super();

            var json = ccs.load(res.ZCSD_NOTI, res.ZCSD_ROOT);
            this._rootNode = json.node;
            this._rootNode.setContentSize(cc.winSize);
            ccui.helper.doLayout(this._rootNode);

            this.addChild(this._rootNode);

            this.bg = this._rootNode.getChildByName("notiBackground_1");
            this.lblText_0 = this._rootNode.getChildByName("turn_0");

            return true;
        },
        start:function(text1, scale, color)
        {
            if(scale != undefined)
            {
                this.setScale(scale);
            }
            if(color != undefined)
            {

                this.lblText_0.setTextColor(color);
            }
            this.lblText_0.setString(text1);
            this.lblText_0.setVisible(true);
            this.bg.setVisible(true);
            this._rootNode.stopAllActions();

            this._rootNode.setOpacity(0);
            this._rootNode.setScale(0.5);
            var fade = cc.sequence(
                cc.fadeIn(0.3),
                cc.delayTime(1.5),
                cc.fadeOut(0.3),
                cc.callFunc(this.hide, this)
            );
            var scale = cc.sequence(cc.scaleTo(0.1,1.4),
                cc.scaleTo(0.1, 1.0)
            );
            var move = cc.sequence(cc.moveBy(2, cc.p(0, 20)));
            this._rootNode.runAction(fade);
            this._rootNode.runAction(scale);
            this._rootNode.runAction(move);
        },
        onEnter:function()
        {
            this._super();
        },
        onExit:function() {
            this._super();

            gv.noti = null;
        },

        hide:function() {
            this.setVisible(false);
            this.removeFromParent();
            gv.noti = null;
        },

    }
);
EffectText.hide = function() {
    if (gv.noti == null) {
        return;
    }
    gv.noti.hide();
};
EffectText.show = function(parent,text1,pos, scale, textColor){

    if(gv.noti == null)
    {
        gv.noti = new EffectText();
        gv.guiMgr.getCurrentScreen().addChild(gv.noti);
    }

    if(pos == undefined)
    {
        pos = cc.p(cc.winSize.width/2, cc.winSize.height/2);

    }
    gv.noti.start(text1, scale , textColor);
    gv.noti.setPosition(pos);


}
