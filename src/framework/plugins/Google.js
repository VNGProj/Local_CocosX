/**
 * Created by GSN on 9/30/2015.
 */

fr.google = {
    pluginUser:null,
    init:function(googleClientID)
    {

        if(!cc.sys.isNative) {
            return false;
        }


        if(plugin.PluginManager == null)
            return false;
        if(fr.google.pluginUser == null) {
            if(cc.sys.isNative) {
                var pluginManager = plugin.PluginManager.getInstance();
                fr.google.pluginUser = pluginManager.loadPlugin("UserGoogle");
            }else
            {
                fr.google.pluginUser = plugin.GoogleAgent.getInstance();
            }
            var data = {
                googleClientID:googleClientID
            };
            if(fr.google.pluginUser != null) {
                fr.google.pluginUser.configDeveloperInfo(data);
            }
        }
        return true;
    },
    login:function(callback)
    {
        if(this.pluginUser == null)
        {
            //false
            callback(-1,"");
            return;
        }

        fr.google.pluginUser.login(function (type, msg) {
            cc.log("finish login google: retCode = " + type + ", msg: " + JSON.stringify(msg));

            if(type != SOCIAL_ACTION.LOGOUT_SUCCEED) {
                fr.google.userId = fr.google.pluginUser.callStringFuncWithParam("getUserID");
                fr.UserData.setStringFromKey("GoogleUserId",fr.google.userId);

                cc.log('google user id: ' + fr.google.userId);
                setTimeout(function() {callback(type, msg);}, 500);
                fr.google.pluginUser.logout();
            }
        });
    },
    getCurrentUsername:function()
    {
        return fr.UserData.getStringFromKey("GoogleUserId","");
    }
};