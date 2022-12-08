/**
 * Created by GSN on 9/30/2015.
 */

TIME_GET_FB_USER_DELAY = 1000;
fr.facebook = {

    pluginUser: null,


    init: function () {

        //return false;
        if(!cc.sys.isNative) {
            return false;
        }

        if (plugin.PluginManager == null)
            return false;

        if (fr.facebook.pluginUser == null || fr.facebook.pluginShare == null) {
            var pluginManager = plugin.PluginManager.getInstance();
            fr.facebook.pluginUser = pluginManager.loadPlugin("UserFacebook");
            fr.facebook.agent = plugin.FacebookAgent.getInstance();
        }

        return true;
    },

    sharePhoto:function(img)
    {

        var info = {
            "dialog": "sharePhoto",
            "photo": img

        };

        plugin.FacebookAgent.getInstance().dialog(info, function(ret, msg){

            cc.log("msg = " + JSON.stringify(msg));
            if(ret == plugin.FacebookAgent.CODE_SUCCEED)
            {
                cc.log("share photo facebook success!");
                var listSelfieGift = gv.gameConfig.getGiftBonusConfig().selfile;
                var conditionGold = 20000;
                for(var i = 0; i < listSelfieGift.length; ++i)
                {
                    if(listSelfieGift[i].itemId == "GOLD")
                    {
                        conditionGold = listSelfieGift[i].num;
                    }
                }

                gv.gameClient.sendPlayerSelfie();
                if(gv.myInfo.getGold() >= conditionGold && gv.myInfo.numSelfie > 0)
                {
                    // show popup
                    gv.alert.showOK(ALERT_TYPE.SELFIE_SUCCESS_NOT_REV_GIFT);
                }
                else
                {
                    gv.alert.showOK(ALERT_TYPE.SELFIE_SUCCESS);
                    gv.gameClient.sendPlayerGetMail();
                }
            }else
            {
                gv.alert.showOK(ALERT_TYPE.SELFIE_FAILED);
            }
            gv.hideSelfile();
        })
    },

    shareBoxingDayGift:function(img)
    {
        var info = {
            "dialog": "sharePhoto",
            "photo": img

        };
        plugin.FacebookAgent.getInstance().dialog(info, function(ret, msg){
            cc.log("msg = " + JSON.stringify(msg));
            if(ret == plugin.FacebookAgent.CODE_SUCCEED)
            {
                cc.log("share boxing day gift facebook success!");
                gv.alert.showOK(ALERT_TYPE.SHARE_BOXING_DAY_GIFT_SUCCESS);
                gv.gameClient.sendPlayerGetMail();
            }
            else {
                gv.alert.showOK(ALERT_TYPE.SHARE_BOXING_DAY_GIFT_FAILED);
            }
            gv.hideLayerBoxingDayGift();
        })
    },

    shareTournamentPhoto: function ( img)
    {
        var info = {
            "dialog": "sharePhoto",
            "photo": img

        };

        plugin.FacebookAgent.getInstance().dialog(info, function(ret, msg){

            cc.log("msg = " + JSON.stringify(msg));
            if(ret == plugin.FacebookAgent.CODE_SUCCEED)
            {
                cc.log("share photo facebook success!");
                gv.alert.showOK(ALERT_TYPE.SHARE_TOURNAMENT_SUCCESS);
            }else
            {
                cc.log("share photo facebook failed! ");
                gv.alert.showOK(ALERT_TYPE.SHARE_TOUNAMENT_FAILED);
            }
            gv.guiMgr.viewScreenById(gv.SCREEN_ID.MAIN_LOBBY);
        })
    },

    login: function (callback) {

        cc.log("login fb 1");
        if (fr.facebook.agent == null) {
            //false
            callback(-1, "");
            return;
        }
        if (fr.facebook.agent.isLoggedIn())
        {
            fr.facebook.agent.logout(function () {
                fr.facebook.requestLogin(callback);
            });
        }
        else
        {
            fr.facebook.requestLogin(callback);
        }
    },

    requestLogin:function(callback)
    {
        cc.log('facebook requestLogin callback');
        var permissions = ["public_profile, email"];
        fr.facebook.agent.login(permissions, function (retCode, data) {
            //=2 la logout
            if (retCode != SOCIAL_ACTION.LOGOUT_SUCCEED) {
                if(data.accessToken) {
                    fr.UserData.setStringFromKey("FacebookAccessToken", data.accessToken);
                }

                setTimeout(function() {callback(retCode, data.accessToken);}, 500);

                var userId = fr.facebook.agent.getUserID();
                if(userId == null || userId == "") {
                    setTimeout(function(){
                        var userId = fr.facebook.agent.getUserID();
                        fr.UserData.setStringFromKey("FacebookUserId", userId);
                    }, TIME_GET_FB_USER_DELAY);
                }
                else{
                    fr.UserData.setStringFromKey("FacebookUserId", userId);
                }
            }
        });
    },
    getCurrentUsername: function () {
        return fr.UserData.getStringFromKey("FacebookUserId", "");
    },
    getFriendsPlayedGame:function(callbackFunc)
    {
        var accessToken =  fr.UserData.getStringFromKey("FacebookAccessToken", "");
        var url = "https://graph.facebook.com/v2.5/me/friends?fields=id,name,picture&limit=1000&access_token=" + accessToken;
        cc.log("getFriend played game ");
        fr.Network.requestJson(url, function(result, data) {
            cc.log("result played game = " + result);
            if(result) {
                callbackFunc(true, data.data);
            }
            else {
                callbackFunc(false)
            }
        });
    },
    getFriendsNotPlayGame:function(callbackFunc)
    {
        var accessToken =  fr.UserData.getStringFromKey("FacebookAccessToken", "");
        var url = "https://graph.facebook.com/v2.5/me/invitable_friends?fields=id,name,picture&limit=1000&access_token=" + accessToken;
        cc.log("getFriend not play game");
        fr.Network.requestJson(url, function(result, data)
            {
                cc.log("result not played game = " + result);
                if(result)
                {
                    callbackFunc(true, data.data);

                }else
                {
                    callbackFunc(false)
                }
            }
        );
    },
    inviteRequest: function (listFriend, message, callbackFunc, title) {
        if (listFriend.length == 0) {
            if (callbackFunc != undefined) {
                callbackFunc(SOCIAL_ACTION.FAILED, "List friend empty!")
            }
            return;
        }
        var toFriend = "";
        for (var i = 0; i < listFriend.length; i++) {
            var id = "'";
            id += listFriend[i];
            id += "'";

            if (i == listFriend.length - 1) {
                toFriend += id;
            }
            else {
                toFriend += id;
                toFriend += ",";
            }
        }
        if (title == undefined) {
            title = "Invite play game";
        }
        var map = {
            "message": message,
            "title": title,
            "to": toFriend
        };
        plugin.FacebookAgent.getInstance().appRequest(map, function (resultcode, msg) {
            cc.log("appRequest", resultcode, msg);
            if (resultcode == plugin.FacebookAgent.CODE_SUCCEED) {
                callbackFunc(SOCIAL_ACTION.SUCCEED, "Success!");
            }
            else {

                callbackFunc(SOCIAL_ACTION.FAILED, "Failed!");
            }
        });
    }
};
