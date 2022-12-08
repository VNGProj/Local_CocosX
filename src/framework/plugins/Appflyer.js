/**
 * Created by KienVN on 4/28/2016.
 */
fr.appflyer = {
    init: function () {
        if(!cc.sys.isNative) {
            return false;
        }
        if (plugin.PluginManager != undefined) {
            var pluginManager = plugin.PluginManager.getInstance();
            if (pluginManager != null) {
                this.pluginAppflyer = pluginManager.loadPlugin("AnalyticsAppflyer");
            }
        }
        //test
        //this.logPurchase(10000,"","","VND");
    },
    logPurchase:function(revenue, contentId, contentType, currency)
    {
        if(this.pluginAppflyer != null)
        {
            var data = {
                revenue: revenue,
                contentId: contentId,
                contentType: contentType,
                currency: currency
            };
            this.pluginAppflyer.callFuncWithParam("logPurchase",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    }
};