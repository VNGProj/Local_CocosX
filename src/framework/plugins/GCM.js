/**
 * Created by KienVN on 2/29/2016.
 */
fr.gcm = {
    pluginUser:null,
    init:function()
    {
        if(!cc.sys.isNative) {
            return false;
        }
        if(plugin.PluginManager == null)
            return false;
        if(fr.gcm.pluginGCM == null) {
            var pluginManager = plugin.PluginManager.getInstance();
            fr.gcm.pluginGCM = pluginManager.loadPlugin("Gcm");
            var data = {
                bug:"bug"
            };
            if(fr.gcm.pluginGCM != null) {
                fr.gcm.pluginGCM.configDeveloperInfo(data);
            }
        }
        return true;
    },
    getToken:function()
    {
        if(this.pluginGCM != null)
        {
            return this.pluginGCM.callStringFuncWithParam("getToken");
        }
        return "";
    }

};