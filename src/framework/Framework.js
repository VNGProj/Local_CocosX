/**
 * Created by KienVN on 5/22/2015.
 */
if(cc.sys.isNative) {
    fr.OutPacket.extend = cc.Class.extend;
    fr.InPacket.extend = cc.Class.extend;
}

fr.onStart = function()
{
    fr.platformWrapper.init();
    fr.Sound.onStart();
    fr.voiceMessage.init();
    gv.isEnableVoiceMessage = fr.voiceMessage.pluginVoiceMessage != null;

    var isIOS = cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD;
    if (isIOS){

        if(fr.platformWrapper.getVersionCode() >= 40) // vi user <40 crash do ko khai bao permission microphone
        {
            gv.isEnableVoiceMessage = true;
        }else
        {
            gv.isEnableVoiceMessage = false;
        }

    }
    gv.isAndroidEmulator = fr.platformWrapper.isAndroidEmulator();
    if(cc.sys.isNative) {
    cc.Device.setKeepScreenOn(true);
    }
};