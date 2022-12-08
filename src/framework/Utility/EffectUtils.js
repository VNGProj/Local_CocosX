/**
 * Created by Cantaloupe from Singapore on 7/28/2015.
 * Singapore dep nhat la ve dem, dac biet la Gaylang dung khong anh Kien? :))
 */

var g_guiEffect = null;
fr.GuiEffect = cc.Class.extend({
    ctor:function() {

    },

    showGUI:function(sender, node) {
        if(node)
            node.setVisible(true);
    },

    hideGUI:function(sender, node) {
        node.setVisible(false);
    },

    doFadeIn:function(node, callBack, target, delay) {
        node.setOpacity(1);
        node.stopAllActions();
        var fade = cc.fadeIn(3);
        if (typeof callBack == 'undefined') {
            node.runAction(cc.sequence(cc.callFunc(this.showGUI, target, node), fade));
        }
        else {
            node.runAction(cc.sequence(cc.callFunc(this.showGUI, target, node), fade, cc.callFunc(callBack, node)));
        }
    },

    doFadeOut:function(node, callBack, target, delay) {
        node.setOpacity(255);
        node.stopAllActions();
        var fade = cc.fadeOut(3);
        if (typeof callBack == 'undefined') {
            node.runAction(cc.sequence(fade, cc.callFunc(this.hideGUI, this, node)));
        }
        else {
            node.runAction(cc.sequence(fade, cc.callFunc(callBack, target)));
        }
    },

    doBubbleIn:function(node, callBack, target, delay) {
        //var time = 0.5;
        //if (delay != null) {
        //    time = delay;
        //}
        //node.setScale(0.1);
        //node.stopAllActions();
        //var scale = cc.scaleTo(0.3, 1, 1);
        //scale.easing(cc.easeBackOut());
        //if (typeof callBack == 'undefined') {
        //    node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.showGUI, target, node), scale));
        //}
        //else {
        //    node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.showGUI, target, node), scale, cc.callFunc(callBack, node)));
        //}
        node.setOpacity(0);
            node.setScaleX(1.4);
            node.setScaleY(1.4);
        var fadeIn = cc.fadeIn(0.1);

        var scaleIn = cc.scaleTo(0.12, 0.95, 0.95);
        var scaleOut = cc.scaleTo(0.11, 1.05, 1.05);

        var scaleIn1 = cc.scaleTo(0.11, 0.98, 0.98);
        var scaleIn2 = cc.scaleTo(0.11, 1.01, 1.01);

        var scaleNormal = cc.scaleTo(0.1, 1, 1);
        node.runAction(cc.sequence(cc.callFunc(this.showGUI, target, node), cc.callFunc(callBack, node)));
        node.runAction(fadeIn);
        node.runAction(cc.sequence(scaleIn,scaleOut, scaleIn1,scaleIn2, scaleNormal));
    },

    doBubbleOut:function(node, callBack, target) {
        //node.setScale(1);
        //node.stopAllActions();
        //var scale = cc.scaleTo(0.3, 0.1, 0.1);
        //scale.easing(cc.easeBackIn(3.0));
        //if (typeof callBack == 'undefined') {
        //    node.runAction(cc.sequence(scale, cc.callFunc(this.hideGUI, this, node)));
        //}
        //else {
        //    node.runAction(cc.sequence(scale, cc.callFunc(callBack, target)));
        //}
        var fadeOut = cc.fadeOut(0.15);
        var scaleIn = cc.scaleTo(0.2, 0.8,0.8);
        node.runAction(fadeOut);

        if (typeof callBack == 'undefined') {
            node.runAction(cc.sequence(scaleIn, cc.callFunc(this.hideGUI, this, node)));
        }
        else {
            node.runAction(cc.sequence(scaleIn, cc.callFunc(callBack, target)));
            //node.runAction(scaleIn);
            //node.runAction(cc.callFunc(callBack, target));
        }
    },

    doPaperIn:function(node, posIn, callBack, target) {

        var timeAction = 0.2;

        node.setScale(0.1);
        node.setPosition(posIn);
        node.setRotation(0);
        var rot = cc.rotateBy(timeAction, 360, 360);
        node.runAction(cc.sequence(cc.delayTime(0.6), cc.scaleTo(timeAction / 2, 1, 1)));
        node.runAction(cc.sequence(cc.delayTime(0.5), cc.moveTo(timeAction, cc.p(0, 0))));

        node.isPapering = true;

        if (typeof callBack == 'undefined') {
            node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.showGUI, this, node), rot, cc.callFunc(this.endPaperIn, this)));
        }
        else {
            node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.showGUI, this, node), rot, cc.callFunc(callBack, target), cc.callFunc(this.endPaperIn, this)));
        }
    },

    endPaperIn:function(sender) {
        sender.isPapering = undefined;
    }

    /*doPaperOut:function(node, callBack) {

    }*/
})

fr.GuiEffect.getInstance = function(){
    if(g_guiEffect == null)
    {
        g_guiEffect = new fr.GuiEffect();
    }
    return g_guiEffect;
}

fr.GuiEffect.fadeIn = function(node, callBack, target, delay) {
    fr.GuiEffect.getInstance().doFadeIn(node, callBack, target, delay);
}

fr.GuiEffect.fadeOut = function(node, callBack, target, delay) {
    fr.GuiEffect.getInstance().doFadeOut(node, callBack, target, delay);
}

fr.GuiEffect.bubbleIn = function(node, callBack, target, delay) {
    fr.GuiEffect.getInstance().doBubbleIn(node, callBack, target, delay);
}

fr.GuiEffect.bubbleOut = function(node, callBack, target, delay) {
    fr.GuiEffect.getInstance().doBubbleOut(node, callBack, target, delay);
}

fr.GuiEffect.paperIn = function(node, startPos, callBack, target) {
    if (node.isPapering != undefined) {
        return;
    }
    fr.GuiEffect.getInstance().doPaperIn(node, startPos, callBack, target);
}

/*fr.GuiEffect.paperOut = function(node, callBack) {
    fr.GuiEffect.getInstance().doPaperOut(node, callBack);
}*/

fr.EffectUtils = {};
fr.EffectUtils.setAnimationColor = function(animation, colorId) {
    animation.setBaseColor(COLOR_TRANSFORM[colorId][0], COLOR_TRANSFORM[colorId][1], COLOR_TRANSFORM[colorId][2]);
}

fr.EffectText = {};
fr.EffectText.useItem = function(val, type, pos, parent) {
    var json = ccs.load(res.ZCSD_EFFECT_TEXT_USE_ITEM, res.ZCSD_ROOT);
    this._rootNode = json.node;
    this._rootNode.setContentSize(cc.winSize);
    ccui.helper.doLayout(this._rootNode);
    if (parent != undefined) {
        parent.addChild(this._rootNode);
    }
    else {
        gv.guiMgr.getCurrentScreen().addChild(this._rootNode);
    }
    if (pos) {
        this._rootNode.setPosition(pos);
    }
    else {
        this._rootNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }

    this._rootNode.getChildByName("lbl").setString(fr.toMoneyString(val));
    var commonGift = this._rootNode.getChildByName("img");
    NodeCommonItem.apply(commonGift);
    commonGift.getChildByName("bg").setVisible(false);
    commonGift.getChildByName("lbl").setVisible(false);
    var tmpObj = {"itemId":type, "num": val};
    commonGift.refresh(tmpObj);

    this.forceDestroy = function() {
        this._rootNode.removeFromParent();
    }

    this._rootNode.setScale(0.2);

    this._rootNode.runAction(
        cc.sequence(
            cc.scaleTo(0.2, 1, 1),
            cc.moveBy(0.5, 0, 30),
            cc.fadeOut(0.2),
            cc.callFunc(this.forceDestroy, this)
        )
    )
}