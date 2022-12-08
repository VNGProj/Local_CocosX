/**
 * Created by CPU02450_LOCAL on 5/16/2017.
 */
fr.voiceMessage = {
    //callback when play voice completely.
    cbStopPlayVoice:null,
    //callback when time record exceed limit.
    cbRecorderTimeout:null,
    //callback when voice upload done.
    cbUploadDone:null,
    cbDownloadDone:null,
    init:function()
    {
        if(plugin.PluginManager != undefined) {
            var pluginManager = plugin.PluginManager.getInstance();
            if (pluginManager != null) {
                this.pluginVoiceMessage = pluginManager.loadPlugin("VoiceWrapper");
                if(this.pluginVoiceMessage == null){
                    cc.log("plugin voice message failed");
                    return;
                }
                cc.log("plugin voice message done");
            }
            if(this.pluginVoiceMessage != null) {
                this.pluginVoiceMessage.configDeveloperInfo({test:"test"});
            }

            var numDelete = this.deleteVoiceFileBefore(Date.now()/1000);
            cc.log("plugin voice message called delete file before: " + numDelete + "  file deleted");
        }
    },

    getStorageLocation:function(){
        if(this.pluginVoiceMessage != null)
        {
            return this.pluginVoiceMessage.callStringFuncWithParam("jsCallGetStorageLocation");
        }

        return "";
    },

    // call before using voice message, after cocos call sound setting
    // optional
    prepareAudioSetting:function(){
        if(this.pluginVoiceMessage != null){
            this.pluginVoiceMessage.callFuncWithParam("jsCallPrepareAudioSetting");
        }
    },

    /** startAudioRecording
     * @param duration: max time user can record (in ms)
     * @return:
     *      RECORD_ERROR_SUCCESS = 0;
     *      RECORD_ERROR_INITIAL_FAILURE = 1;
     *      RECORD_ERROR_IN_UPLOADING = 2;
     *      RECORD_ERROR_EXCEPTION = 3;
     *      RECORD_ERROR_PERMISSION = 4;
     *      RECORD_ERROR_PARAMETER = 5;
     *      RECORD_ERROR_SETTING = 6
     */
    startAudioRecording:function(duration){
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                duration: duration
            };
            return this.pluginVoiceMessage.callIntFuncWithParam("callStartRecording",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }

        return 0;
    },

    stopAudioRecording:function(isSend, info){
        if(typeof info == 'undefined'){
            if (gv.myInfo.getUId() != undefined){
                info = gv.myInfo.getUId();
            }
            else{
                info = "empty";
            }
        }
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                isSend: isSend,
                addInfo: info
            };
            this.pluginVoiceMessage.callFuncWithParam("jsCallStopAudioRecording",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },

    playLastStoredVoice:function(){
        if(this.pluginVoiceMessage != null)
        {
            return this.pluginVoiceMessage.callIntFuncWithParam("jsCallPlayLastStoredVoice");
        }

        return -1;
    },

    // return voice length in milliseconds if play success
    // return -1 if play fail
    playVoiceByName:function(name){
        var voiceNameNoExt = this.getFileNameNoExt(name);
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                fileName: voiceNameNoExt
            };
            return this.pluginVoiceMessage.callIntFuncWithParam("jsCallPlayVoiceByName",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }

        return -1;
    },

    stopAudioPlay:function(){
        if(this.pluginVoiceMessage != null)
        {
            this.pluginVoiceMessage.callFuncWithParam("jsCallStopAudioPlay");
        }
    },

    initParamHttpConnect:function(keyHash1, keyHash2, upTimeout, downTimeout, upUrl, downUrl, gameId){
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                key1: keyHash1,
                key2: keyHash2,
                upTime: upTimeout,
                downTime: downTimeout,
                uploadUrl: upUrl,
                downloadUrl: downUrl,
                gameId: gameId
            };
            this.pluginVoiceMessage.callFuncWithParam("initParamHttpConnect",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)) );
        }
    },

    uploadVoiceMessage:function(info){
        if(typeof info == 'undefined'){
            info = "info";
        }
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                userid: info
            };
            this.pluginVoiceMessage.callFuncWithParam("jsCallUploadPhp",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },

    getVoiceFromServer:function(fileName, playNow){
        if(this.pluginVoiceMessage != null)
        {
            var data = {
                fileName: fileName,
                playNow:playNow
            };
            this.pluginVoiceMessage.callFuncWithParam("jsCallDownloadFromPhpServer",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },

    //get volume while recording, value from 0 - 32765
    getVoiceAmplitude:function(){
        if(this.pluginVoiceMessage != null)
        {
            return this.pluginVoiceMessage.callIntFuncWithParam("jsCallGetAmplitude");
        }
        return -1;
    },

    deleteVoiceFileBefore: function(time){
        if ( this.pluginVoiceMessage != null )
        {
            var data = {
                dateDelete: time
            };
            return this.pluginVoiceMessage.callIntFuncWithParam("jsCallDeleteFileBefore",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, JSON.stringify(data)));
        }
    },

    setCallbackPlayCompletion:function(caller, func){
        var args = Array.slice(arguments, 2, arguments.length);
        this.cbStopPlayVoice = func.bind.apply(func, [caller].concat(args));
    },

    setCallbackRecorderTimeout:function(caller, func){
        var args = Array.slice(arguments, 2, arguments.length);
        this.cbRecorderTimeout = func.bind.apply(func, [caller].concat(args));
    },

    setCallbackUploadCompletion:function(caller, func){
        var args = Array.slice(arguments, 2, arguments.length);
        this.cbUploadDone = func.bind.apply(func, [caller].concat(args));
    },

    setCallbackDownloadCompletion:function(caller, func){
        var args = Array.slice(arguments, 2, arguments.length);
        this.cbDownloadDone = func.bind.apply(func, [caller].concat(args));
    },

    /**
     * Override this function when playing audio is completed
     */
    onAudioPlayCompletion:function(fullName){
        cc.log("onAudioPlayCompletion call here");
        if(this.cbStopPlayVoice != null){
            this.cbStopPlayVoice(fullName);
        }
    },

    onRecorderTimeout:function(){
        cc.log("onRecorderTimeout call here");
        if(this.cbRecorderTimeout != null){
            this.cbRecorderTimeout();
        }
    },

    onUploadFileCompletion:function(fileName, isSuccess){
        cc.log("onUploadFileCompletion: ", fileName);
        if(this.cbUploadDone != null){
            this.cbUploadDone(fileName, isSuccess);
        }
    },

    onDownloadFileCompletion:function(fullName, isSuccess){
        cc.log("onDownloadFileCompletion: ");
        if(this.cbDownloadDone != null){
            this.cbDownloadDone(fullName, isSuccess);
        }
    },

    getFileNameNoExt: function (name) {
        var separateList = name.split('.');
        if ( separateList.length != 2 ){
            cc.log(" fr.voiceMessage.getFileNameNoExt: can't find file name and ext. Full file name: " + name);
            return name;
        }else{
            return separateList[0];
        }
    },
};