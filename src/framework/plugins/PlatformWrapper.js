/**
 * Created by KienVN on 10/23/2015.
 */

fr.platformWrapper = {
    init:function()
    {
        if(plugin.PluginManager != undefined) {
            var pluginManager = plugin.PluginManager.getInstance();
            if (pluginManager != null) {
                /*if  (cc.sys.platform == cc.sys.WINRT || cc.sys.platform == cc.sys.WP8) {
                    this.pluginPlatform = pluginManager.loadPlugin("PlatformRT");
                }
                else {
                */
                    this.pluginPlatform = pluginManager.loadPlugin("PlatformWrapper");
                    if(this.pluginPlatform == null)
                    {
                        this.pluginPlatform = pluginManager.loadPlugin("Platform");
                    }
                //}
            }
            if(this.pluginPlatform != null) {
                if  (cc.sys.platform == cc.sys.WINRT || cc.sys.platform == cc.sys.WP8) {

                }
                else {
                    this.pluginPlatform.configDeveloperInfo({test:"test"});
                }
            }
        }
        if(!cc.sys.isNative)
        {
            try{
                cc.log('gsntracker init');
                gsntracker.init("cotyphu","1.4");
                //gsntracker.setTestSDK(false);
            }catch(e) {

            }
        }


        //this.test();
    },
    test:function()
    {
        cc.log("test: ", this.getPhoneNumber(),
            this.getMailAccount(),
            this.getDeviceModel(),
            this.getAvailableRAM(),
            this.getVersionCode(),
            this.getOSVersion(),
            this.getConnectionStatus(),
            this.getExternalDataPath()

        );
    },
    getPacketName:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getPackageName");
        }
    },
    getPhoneNumber:function()
    {
        if(this.pluginPlatform != null)
        {
           return this.pluginPlatform.callStringFuncWithParam("getPhoneNumber");
        }

        return "";
    },
    getMailAccount:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getMailAccount");
        }
        return ""
    },
    getDeviceModel:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getDeviceModel");
        }
        return "";
    },
    getAvailableRAM:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callIntFuncWithParam("getAvailableRAM");
        }
        return -1;
    },
    getVersionCode:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callIntFuncWithParam("getVersionCode");
        }
        return 1;
    },
    getOSVersion:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getOSVersion");
        }
        if(!cc.sys.isNative)
        {
            return cc.sys.browserVersion;
        }
        return "";

    },
    //connection type 0: ko co mang, 1: 3g, 2: wifi
    getConnectionStatus:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callIntFuncWithParam("getConnectionStatus");
        }
        return -1;
    },
    getConnectionStatusName:function()
    {
        var connectionType =  this.getConnectionStatus();
        switch (connectionType)
        {
            case 0:
                return "unknown";
            case 1:
                return "3g";
            case 2:
                return "wifi";
        }
        return "";
    },
    getOsName:function()
    {
        if(!cc.sys.isNative)
        {
            return 'Web';
        }
        if (cc.sys.platform == cc.sys.WIN32)
        {
            return "Win32"
        }
        if (cc.sys.platform == cc.sys.ANDROID)
        {
            return "Android"
        }
        if (cc.sys.platform == cc.sys.IPAD || cc.sys.platform == cc.sys.IPHONE)
        {
            return "IOS"
        }
        if (cc.sys.platform == cc.sys.WP8)
        {
            return "WindowPhone8"
        }
        if  (cc.sys.platform == cc.sys.WINRT)
        {
            return "WinRT"
        }
        return "";
    },
    getClientVersion:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getAppVersion");
        }
        return "1.0";
    },
    getDownloadSource:function()
    {
        if(this.pluginPlatform != null)
        {
            //return this.pluginPlatform.callStringFuncWithParam("getDownloadSource");
        }
        return "google";
    },
    getThirdPartySource:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getThirdPartySource");
        }
        return "";
    },
    getExternalDataPath:function()
    {
        if(!cc.sys.isNative) {
            return "";
        }
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callStringFuncWithParam("getExternalDataPath");
        }
        return jsb.fileUtils.getWritablePath();
    },
    addNotify:function(notify)
    {
        if(this.pluginPlatform != null)
        {
            this.pluginPlatform.callFuncWithParam("addNotify",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(notify)));
        }
    },
    showNotify:function()
    {
        if(this.pluginPlatform != null)
        {
            this.pluginPlatform.callFuncWithParam("showNotify",null);
        }
    },
    cancelAllNotification:function()
    {
        if(this.pluginPlatform != null)
        {
             this.pluginPlatform.callFuncWithParam("cancelAllNotification",null);
        }
    },
    getStoreType:function()
    {
        if(this.pluginPlatform != null)
        {
            return this.pluginPlatform.callIntFuncWithParam("getStoreType");
        }
        return 1;
    },
    getDeviceID:function()
    {
        var deviceId = "";
        if(this.pluginPlatform != null)
        {
            deviceId  = this.pluginPlatform.callStringFuncWithParam("getDeviceID");

        }
        if(deviceId == "")
        {
            deviceId = fr.UserData.getStringFromKey("deviceID", "");
            if(deviceId == "")
            {
                deviceId = this.genDeviceID();
            }
        }
        return deviceId;
    },
    genDeviceID:function()
    {
        var curTimeSv = Date.now() +  Math.floor( Math.random()*1000000 + 1);
        fr.UserData.setStringFromKey("deviceID", curTimeSv);
        return curTimeSv;
    },
    //accountType: google , zingme , facebook , zalo
    //openAccount: socialID, voi zingme la username
    trackLoginGSN:function(_accountId, _accountType, _openAccount, _zingName)
    {
        if(this.pluginPlatform != null)
        {

            var data = {
                accountId:_accountId,
                accountType:_accountType,
                openAccount:_openAccount,
                zingName:_zingName
            };
            this.pluginPlatform.callFuncWithParam("trackLoginGSN",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }



        if(!cc.sys.isNative)
        {
            try{
                gsntracker.login(_accountId, _accountType, _openAccount, _zingName);
            }catch(e) {}

            if(_.isUndefined(this.gsnTrackerLogAlive))
            {
                cc.director._calculateFrameRate = true;

                this.gsnTrackerLogAlive = setInterval(function(){
                    try{
                        gsntracker.alive(cc.director._frameRate, _zingName);

                    }catch(e) {}

                },2 * 60 * 1000);
            }
        }
    },
    logFabric:function(data)
    {
        if(this.pluginPlatform != null)
        {
            this.pluginPlatform.callFuncWithParam("logFabric",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, data));
        }
    },
    openCSApplication:function(userId, content)
    {
        if(!cc.sys.isNative)
        {
            cc.sys.openURL('http://hotro.zing.vn/gui-yeu-cau-trong-game.html?param=VXNlcj0mUHJvZHVjdGlkPTQ0NCZDb250ZW50PSZTb3VyY2U9d2Vic2l0ZSZTaWc9MzNlYzI3OTI5Zjk0ZTRlOTJmNjZkNjBiMmQ3NzMzZDI%3D');
            return;
        }
        if(this.pluginPlatform != null)
        {
            var data = {
                accountId:userId,
                content:content
            };
            this.pluginPlatform.callFuncWithParam("openCSApplication",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
    //zalo uri = "com.zing.zalo";
    isInstalledApp:function(uri)
    {
        if(this.pluginPlatform != null)
        {
            this.pluginPlatform.callBoolFuncWithParam("isInstalledApp",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, uri));
        }
        return false;
    },
    logAppFlyerPurchase:function(revenue, contentId, contentType, currency)
    {
        if(this.pluginPlatform != null)
        {
            var data = {
                revenue: revenue,
                contentId: contentId,
                contentType: contentType,
                currency: currency
            };
            this.pluginPlatform.callFuncWithParam("logAppFlyerPurchase",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
    typeOfAppLaunched:function()
    {
        if(this.pluginPlatform != null)
        {
            try {
                return this.pluginPlatform.callIntFuncWithParam("typeOfAppLaunched");
            }catch(e)
            {
                return 0;
            }
        }
        return 0;
    },
    getCarrierName:function()
    {
        if(this.pluginPlatform != null)
        {
            try {
                return this.pluginPlatform.callStringFuncWithParam("getCarrierName");
            }catch(e)
            {
                return null;
            }
        }
        return null;
    },
    sendSMS:function(content, serviceNumber)
    {
        if(this.pluginPlatform != null)
        {
            var data = {
                message:content,
                recipent:serviceNumber
            };
            this.pluginPlatform.callFuncWithParam("sendMessage",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },
    isAndroidEmulator: function()
    {
        var isEmulator = false;
        if (cc.sys.platform == cc.sys.ANDROID){
            if(this.pluginPlatform != null)
            {
                try{
                    isEmulator = this.pluginPlatform.callBoolFuncWithParam("isEmulator");
                    if ( typeof isEmulator == "boolean"){
                        return isEmulator;
                    }
                }
                catch(e){
                    cc.log(" PlatformWrapper call isEmulator fail!");
                }
            }
        }
        return false;
    },
    sendEmail:function(stringData)
    {
        if(this.pluginPlatform != null)
        {
            this.pluginPlatform.callFuncWithParam("sendEmail",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, stringData));
        }
    }

}

;