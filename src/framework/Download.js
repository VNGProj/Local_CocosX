/**
 * Created by Cantaloupe on 8/30/2017.
 * A lone wolf died alone
 * But a whole pack will survive
 */

DOWNLOAD_ERROR = {
    SUCCESS:100,
    FINISH_ONE_FILE:1,
    FAILED:-1
}

fr.download = {
    ERR_SUCCESS:-1,
    downloadFile:function(url, desUrl, md5, callback) {
        fr.NativeService.downloadFile(url, desUrl, md5, callback);
    },
    deleteFile:function(path) {
        jsb.fileUtils.removeFile(path);
    }
}

fr.downloadMgr = {
    DOWNLOAD_URL_PREFIX:"localhost/high/",
    DES_PREFIX:"",
    ASSET_PREFIX: "",
    init:function() {
        if (cc.sys.platform != cc.sys.WIN32) {
            this.ASSET_PREFIX = fr.NativeService.getFolderUpdateAssets() + "/";
        }
        this.localFileDownload = {};
        this.getLocalDownloadManifest();

        this.remoteFileDownload = {};
        this.retryRemoteManifestLeft = 1;
        this.listFileNeedDownLoad = [];
        this.getRemoteDownloadManifest();
    },

    initPrefixUrl:function() {
        if (cc.sys.platform == cc.sys.WIN32) {
            this.DES_PREFIX = "dwnld/";
        }
        else {
            this.DES_PREFIX = fr.NativeService.getFolderUpdateAssets() + "/dwnld/";
            if (this.remoteFileDownload.remoteDownloadPrefix) {
                this.DOWNLOAD_URL_PREFIX = this.remoteFileDownload.remoteDownloadPrefix;
            }
        }
        cc.log("this.DES_PREFIX = " + this.DES_PREFIX);
    },

    checkAllFilesValid:function() {
        var flagSave = false;
        for (var path in this.localFileDownload) {
            if (this.remoteFileDownload['assets'][path] == null ||
                this.remoteFileDownload['assets'][path]['md5'] != this.localFileDownload[path]) {
                fr.download.deleteFile(this.DES_PREFIX + path);
                delete this.localFileDownload[path];
                flagSave = true;
            }
        }
        if (flagSave)
            jsb.fileUtils.writeStringToFile(JSON.stringify(this.localFileDownload), (this.ASSET_PREFIX + "lcldwnld.manifest"));
        //cc.log(JSON.stringify(this.localFileDownload));
    },

    checkFilesValid:function(list) {
        var flagSave = false;
        for (var i = 0; i < list.length; ++i) {
            var path = list[i];
            cc.log("check file valid: " + path);
            var localMd5 = this.localFileDownload[path];
            if (localMd5 == null) { // neu md5 cua file resource ko co trong local download manifest >> ko lam gi ca
                cc.log("md5 cua file resource ko co trong local download manifest >> ko lam gi ca");
                continue;
            }
            // neu da co trong local down load >> check xem file nay co out date ko
            if (this.remoteFileDownload['assets'][path] == null || // neu tren remote ko co file resource trong list
                this.remoteFileDownload['assets'][path]['md5'] != localMd5) // hoac file resource tren live khac voi duoi local
            {

                cc.log("check md5 = " + list[i] + "\n" + this.remoteFileDownload['assets'][path]['md5'] + "\n" + this.localFileDownload[path]);
                fr.download.deleteFile(this.DES_PREFIX + list[i]); // xoa file resource trong high
                delete this.localFileDownload[path]; // xoa file path trong local download manifest
                flagSave = true;
            }
        }
        if (flagSave)
            cc.log("flagSave = true, rewrite lcldwnld.manifest ");
        jsb.fileUtils.writeStringToFile(JSON.stringify(this.localFileDownload), (this.ASSET_PREFIX + "lcldwnld.manifest"));
    },

    addFileInfoToLocal:function(path, md5) {
        this.localFileDownload[path] = md5;
        jsb.fileUtils.writeStringToFile(JSON.stringify(this.localFileDownload), (this.ASSET_PREFIX + "lcldwnld.manifest"));
    },

    getLocalDownloadManifest:function() {
        if (!jsb.fileUtils.isFileExist("lcldwnld.manifest")) {
            cc.log("lcldwnld.manifest doesn't exist");
            return;
        }
        var data = jsb.fileUtils.getStringFromFile("lcldwnld.manifest");
        this.localFileDownload = JSON.parse(data);
        cc.log(JSON.stringify("this.localFileDownload:" + this.localFileDownload));
    },
    downloadOnBackground:function()
    {
        this.downloadListFiles(this.listFileNeedDownLoad, function(){});
    },
    getRemoteDownloadManifest:function() {
        var data = jsb.fileUtils.getStringFromFile("project.manifest");
        var dataJs = JSON.parse(data);

        var url = dataJs.remoteDownloadUrl;
        var xhr = cc.loader.getXMLHttpRequest();

        var _this = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;
                cc.log(response);
                if (cc.sys.platform == cc.sys.WIN32) {
                    jsb.fileUtils.writeStringToFile(response, ("download.manifest"));
                }else
                {
                    jsb.fileUtils.writeStringToFile(response, (this.ASSET_PREFIX +  "download.manifest"));
                }

                var data = JSON.parse(response);
                if(data != null) {
                    jsb.fileUtils.writeStringToFile(response, (this.ASSET_PREFIX +  "download.manifest"));
                    _this.remoteFileDownload = JSON.parse(response);

                    cc.log("file download ");
                    var listLocal = {};
                    for(var fileData in _this.remoteFileDownload['assets'])
                    {
                        listLocal[fileData] = _this.remoteFileDownload['assets'][fileData].md5;
                        _this.listFileNeedDownLoad.push(fileData);
                        cc.log(fileData + "\n");
                    }
                    //_this.downloadOnBackground();
                    _this.initPrefixUrl();
                    // write file local download manifest
                    if(!jsb.fileUtils.isFileExist("lcldwnld.manifest"))
                    {
                        cc.log("write file local download, fix bug dont download resources");
                        jsb.fileUtils.writeStringToFile(JSON.stringify(listLocal), (this.ASSET_PREFIX + "lcldwnld.manifest"));
                    }
                    _this.downloadListFiles(_this.listFileNeedDownLoad, function(){});
                } else {
                    // failed to load
                    _this.retryGetRemoteDownloadManifest();
                }
            }
            else{
                // failed
                _this.retryGetRemoteDownloadManifest();
            }
        };
        xhr.onerror = function(){
            cc.log("onerror");
            _this.retryGetRemoteDownloadManifest();
        };
        xhr.ontimeout = function(){
            cc.log("ontimeout");
            _this.retryGetRemoteDownloadManifest();
        }
        xhr.onabort = function () {
            cc.log("onabort");
            _this.retryGetRemoteDownloadManifest();
        };
        xhr.timeout = 5000;
        xhr.open("GET",url, true);
        xhr.send();
    },

    retryGetRemoteDownloadManifest:function() {
        this.retryRemoteManifestLeft--;
        if (this.retryRemoteManifestLeft < 0) {
            // cannot download remote manifest
            return;
        }
        this.getRemoteDownloadManifest();
    },

    downloadGroup:function(groupName, callback) {
        cc.log("version code " + fr.platformWrapper.getVersionCode());
        if (
            (cc.sys.platform != cc.sys.WIN32 && fr.platformWrapper.getVersionCode() < 53)    // ban cu ko download dc thi cho xai flow cu
            ||(cc.sys.platform == cc.sys.WP8 || cc.sys.platform == cc.sys.WINRT || gv.isOnPortal)
        ) {

            callback(DOWNLOAD_ERROR.SUCCESS);
            return;
        }
        if (this.remoteFileDownload['remoteDownloadPrefix'] == null) {
            // cannot download
            callback(DOWNLOAD_ERROR.FAILED);
            return;
        }

        var cfg = this.remoteFileDownload['group'][groupName];
        if (cfg == null) {
            callback(DOWNLOAD_ERROR.FAILED);
            return;
        }

        var listDl = []; // list path file
        for (var i = 0; i < cfg.length; ++i) {
            listDl.push(cfg[i]);
        }
        this.downloadListFiles(listDl, callback);
    },

    downloadListFiles:function(list, callback, isRecursiveCall, isRetry) {
        if (!isRecursiveCall) {
            if (
                (cc.sys.platform != cc.sys.WIN32 && fr.platformWrapper.getVersionCode() < 53)    // ban cu ko download dc thi cho xai flow cu
                ||(cc.sys.platform == cc.sys.WP8 || cc.sys.platform == cc.sys.WINRT || gv.isOnPortal)
            ) {
                callback(DOWNLOAD_ERROR.SUCCESS);
                return;
            }
            if (this.remoteFileDownload['remoteDownloadPrefix'] == null) {
                // cannot download
                callback(DOWNLOAD_ERROR.FAILED);
                return;
            }

            this.checkFilesValid(list);
            list = this.addPrefixPath(list);

        }

        var onFileDownloadFinish = function() {

            fr.downloadMgr.downloadListFiles(list, callback, true);
        };

        var onFileDownloadError = function() {
            if (isRetry) {
                callback(DOWNLOAD_ERROR.FAILED);
                return;
            }
            fr.downloadMgr.downloadListFiles(list, callback, true, true);
        };

        for (var i = list.length - 1; i >= 0; --i){
            var curDownloadPath = list[i];
            if (curDownloadPath == "" || jsb.fileUtils.isFileExist(this.DES_PREFIX + curDownloadPath)) {
                list.splice(list.length - 1, 1);
                if (list.length == 0) {
                    cc.log("file already exist ");
                    callback(DOWNLOAD_ERROR.SUCCESS);
                }
                else {
                    callback(DOWNLOAD_ERROR.FINISH_ONE_FILE);
                }
                if (curDownloadPath != "") {
                    cc.log("file  " + this.DES_PREFIX + curDownloadPath +"\n");
                    this.addFileInfoToLocal(curDownloadPath, this.remoteFileDownload['assets'][curDownloadPath].md5);
                }
                continue;
            }
            cc.log("download file = " + curDownloadPath + "\n");
            fr.download.downloadFile(
                this.DOWNLOAD_URL_PREFIX + curDownloadPath,
                this.DES_PREFIX + curDownloadPath,
                this.remoteFileDownload['assets'][curDownloadPath].md5,
                function(result) {
                    if (result == -1) {
                        onFileDownloadFinish();
                    }
                    else if (result == -2) {
                        onFileDownloadError();
                    }
                }
            );
            break;
        }
    },

    addPrefixPath:function(list) {
        for (var i = 0; i < list.length; ++i) {
            list[i] = this.addPrefixOnePath(list[i]);
        }
        return list;
    },

    addPrefixOnePath:function(path) {
        for (var fPath in this.remoteFileDownload['assets']) {
            if (fPath.indexOf(path) != -1) {
                return fPath;
            }
        }
        cc.log("Cannot resolve path to download: " + path);
        return "";
    }
}
