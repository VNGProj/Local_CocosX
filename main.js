/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // (Deprecated) In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

require('src/3DAPI/Samples/Samples.js');

cc.game.onStart = function () {


    cc.game.startGame();

    var searchPaths = jsb.fileUtils.getSearchPaths();
    var ratio = cc.winSize.width / cc.winSize.height;

    cc.view.setDesignResolutionSize(1280, 720 , cc.ResolutionPolicy.FIXED_WIDTH);

    let scene = new Samples();

    // let layerCity = new LightingScene(scene);

    // layerCity.setupScene(scene);
    // scene.addChild(layerCity);

    // scene.addChild(new EffekseerScene());


    // var sp = new cc.Sprite("res/Hello.png");
    // scene.addChild(sp);
    // var sp = new cc.Node();
    // sp.setRotationSkewX(0);
    // sp.x = 200;
    // sp.y = 200;
    //
    // sp.runAction(cc.rotateTo(10,10,36));

    cc.game.addGameListener(cc.game.onResume, cc.game.onPause);

    cc.director.runScene(scene);
}

cc.game.startGame = function() {
    fr.onStart();
    fr.useAtlasForCCS = false;

    fr.gcm.init();

    gv.guiMgr = new GuiMgr();
    // gv.guiMgr.setScreenFactory(new GuiFactory());
    // gv.poolObjects = new PoolObject();
    // gv.guiMgr.viewScreenById(gv.SCREEN_ID.LOADING);
    cc.log("LoaderScene.onStart");

    // setInterval(function(){
    //     var contents = cc.director.getProfiler().GetPrintData();
    //     //var lines = contents.split('\n');
    //     cc.log(contents);
    // },1000);
}
cc.game.addGameListener = function (showCallback, hideCallback) {
    this.showGameListener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "game_on_show",
        callback: function (event) {
            showCallback(event);
        }.bind(showCallback)
    });
    cc.eventManager.addListener(this.showGameListener, 1);

    this.hideGameListener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "game_on_hide",
        callback: function (event) {
            hideCallback(event);
        }.bind(hideCallback)
    });
    cc.eventManager.addListener(this.hideGameListener, 1);
};

cc.game.onPause = function (event) {
    cc.log("JSB_ON_PAUSE");
    // fr.event.dispatchCustomEvent('jsb_on_pause');

    // TODO pause music
    cc.audioEngine.pauseMusic();
};

cc.game.onResume = function (event) {
    cc.log("JSB_ON_RESUME");
    // fr.event.dispatchCustomEvent('jsb_on_resume');

    // TODO resume music
    cc.audioEngine.resumeMusic();
};

cc.game.run();
