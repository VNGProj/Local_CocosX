/**
 * Created by GSN on 8/20/2015.
 */


fr.Sound = {};
fr.Sound.isFirstRun = false;
fr.Sound.extSoundFile = "";
//fr.Sound.defaultButtonSound = resSound.button_click;
fr.Sound.effectOn = false;
fr.Sound.musicOn = false;
fr.Sound.onStart = function()
{
    fr.Sound.loadSetting();
    // cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function()
    // {
    //     cc.audioEngine.pauseMusic();
    // });
    // cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function()
    // {
    //     if(fr.Sound.musicOn) {
    //         cc.audioEngine.resumeMusic();
    //     }
    // });
};

fr.Sound.playSoundEffect = function(soundPath, isLoop){

    if (fr.Sound.effectOn == false || !soundPath) {
        return;
    }
    cc.audioEngine.playEffect(soundPath + this.extSoundFile, isLoop);
};

fr.Sound.stopSound = function()
{
    cc.audioEngine.stopAllEffects();
};


fr.Sound.playMusic = function(musicPath, isLoop){
    if(!fr.Sound.musicOn)
        return;
    cc.audioEngine.playMusic(musicPath, isLoop);
};
fr.Sound.stopMusic = function()
{
    cc.audioEngine.stopMusic();
};
fr.Sound.loadSetting = function()
{
    cc.audioEngine.setEffectsVolume(1);
    cc.audioEngine.setMusicVolume(0.5);
    fr.Sound.effectOn = fr.UserData.getBoolFromKey("sound_effect",true);
    fr.Sound.musicOn= fr.UserData.getBoolFromKey("sound_music",true);
};
fr.Sound.turnOn = function(isOn)
{

    var oldMusicOn = fr.Sound.musicOn;
    fr.Sound.effectOn = isOn;
    fr.Sound.musicOn = isOn;
    fr.Sound.saveSetting();
    if (!isOn) {
        fr.Sound.stopMusic();
    }
    else {
        if (gv.guiMgr.isScreen(gv.SCREEN_ID.MAIN_BOARD)) {
            if(!oldMusicOn)
                fr.Sound.playMusic(resMusic.ingame,true);
        }
        else {
            if(!oldMusicOn)
                fr.Sound.playMusic(resMusic.lobby,true);
        }
    }

};
fr.Sound.saveSetting = function()
{
    fr.UserData.setBoolFromKey("sound_effect", fr.Sound.effectOn);
    fr.UserData.setBoolFromKey("sound_music", fr.Sound.musicOn);
};
fr.Sound.preloadAll = function()
{
    for( var effectKey in resSound)
    {
        fr.Sound.preloadEffect(resSound[effectKey]);
    }
};
fr.Sound.preloadEffect = function (soundPath)
{
    cc.audioEngine.preloadEffect(soundPath + this.extSoundFile);
};
fr.Sound.playEffectClickButton = function()
{
    fr.Sound.playSoundEffect(fr.Sound.defaultButtonSound);
};