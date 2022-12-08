
/**
 * Created by zoro on 6/13/2017.
 */

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var UUID = (
    function() {
        var self = {};
        var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
        self.generate = function() {
            var d0 = Math.random()*0xffffffff|0;
            var d1 = Math.random()*0xffffffff|0;
            var d2 = Math.random()*0xffffffff|0;
            var d3 = Math.random()*0xffffffff|0;
            return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
                lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
                lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
                lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        }
        return self;
    })();

idfa = 'AEBE52E7-03EE-455A-B3C4-E57283966239';
idfv = 'AEBE52E7-03EE-455A-B3C4-E57283966239';
state_config = {

    client_ts_offset: 0,
    session_id: null,
    enabled: true,
    event_queue: []
}


platform ='ios';
os_version  ='ios 8.2';
sdk_version = 'rest api v2';
device = 'iPhone6.1';
manufacturer = 'apple';

build_version = 'alpha 0.0.1';
engine_version = 'unity 5.1.0';

init_payload = {
    platform: platform,
    os_version: os_version,
    sdk_version: sdk_version
};
default_annotations = {
    v: 2,                                 //(required: Yes)
    user_id: idfa,                            //required: Yes)
    ios_idfa: idfa,                           // (required: No - required on iOS)
    // google_aid                              // (required: No - required on Android)
    client_ts: 0,                     //# (required: Yes)
    sdk_version: sdk_version,                 //# (required: Yes)
    os_version: os_version,                   //# (required: Yes)
    manufacturer: manufacturer,                  //  # (required: Yes)
    device: 'unknown',                      //# (required: Yes - if not possible set "unknown")
    platform: platform,                     //  # (required: Yes)
    session_id: state_config['session_id'],   //# (required: Yes)
    session_num: 1                          // # (required: Yes)
}
game_key = "f97e2e7e1b1aebc20324e654b0fa5ff2";
secret_key = "ea8548787e4da6f3867aaba66b6d3dff024b78e8";

fr.gameAnalystic = {

    init:function()
    {
        this.url_events ='http://api.gameanalytics.com/v2/' + game_key + '/events';
        this.url_init = 'http://api.gameanalytics.com/v2/' + game_key + '/init';
        this.defaultInfo = {};

        this.defaultInfo.v = 2;
        //this.defaultInfo.user_id = idfa;
        this.defaultInfo.client_ts = 0;
        this.defaultInfo.sdk_version = sdk_version;
        this.defaultInfo.os_version = os_version;
        this.defaultInfo.manufacturer = manufacturer;
        this.defaultInfo.device = fr.platformWrapper.getDeviceModel();
        this.defaultInfo.platform = platform;
        this.defaultInfo.session_id = UUID.generate();
        this.defaultInfo.session_num = 1;

        this.analyticsInit();
    },

    updateClientTsOffset:function(svGATime)
    {
        //var clientTime = Math.floor(gv.myInfo.getCurTimeServer()/1000);
        //var offset = clientTime - svGATime;
        //cc.log("client Time = " + clientTime + "GA time = " + svGATime + "time offset = " + offset);
        //if(offset < 10) state_config.client_ts_offset = 0;
        //else
        //{
        //    state_config.client_ts_offset = offset;
        //}
    },

    summitDesignEvents:function(event_id)
    {

        var utcTime = Math.floor(Date.now()/1000);
        this.defaultInfo.client_ts = utcTime - state_config.client_ts_offset;

        cc.log("client timestamp = " + this.defaultInfo.client_ts);
        var uid = fr.platformWrapper.getDeviceID();
        if(_.isEmpty(uid)) {
            if (gv.myInfo) {
                uid = gv.myInfo.getUId().toString();
            }
        }
        uid = "00000000000000000000000000000000" + uid.replace(/_/g,"").replace(/-/g,"");
        uid = uid.slice(-32);
        var userUUID =  uid.substr(0,8) + "-" + uid.substr(8,4) + "-" + uid.substr(12,4) + "-" + uid.substr(16,4) + "-" + uid.substr(20,12) ;
        this.defaultInfo.user_id = userUUID;

        var data = JSON.parse(JSON.stringify(this.defaultInfo));

        data.event_id = event_id;
        data.category = 'design';
        data.value = 1;

        var hmac = this.hmac_hash_with_secret(JSON.stringify([data]), secret_key);
        cc.log("data = " + JSON.stringify([data]));

        var request = new XMLHttpRequest();
        request.open("POST", this.url_events, true);
        request.setRequestHeader('Authorization', hmac);
        request.setRequestHeader('Content-Type', 'application/json');
        var self = this;
        request.onreadystatechange = function() {//Call a function when the state changes.
            cc.log("error code " + request.status);
            if(request.readyState == 4 && request.status == 200) {
                cc.log("text response "+ (request.responseText));
            }
        }
        request.send(JSON.stringify([data]));
    },
    annotateEventWithDefaultValues:function()
    {
        var client_ts = Date.now();
        if(gv.myInfo) {
            client_ts = gv.myInfo.getCurTimeServer() - this.timeOffset;
        }
        this.defaultInfo.client_ts = client_ts;

        var data = JSON.parse(JSON.stringify(this.defaultInfo));
        return data;
    },

    analyticsInit:function()
    {
        var hmac = this.hmac_hash_with_secret(JSON.stringify(init_payload), secret_key);

        var request = new XMLHttpRequest();
        request.open("POST", this.url_init, true);
        request.setRequestHeader('Authorization', hmac);
        request.setRequestHeader('Content-Type', 'application/json');
        var self = this;
        if (cc.sys.platform == cc.sys.WIN32)
        {
            return;
        }
        request.onreadystatechange = function() {//Call a function when the state changes.
            if(request.readyState == 4 && request.status == 200) {
                cc.log("text response "+ (request.responseText));
                self.updateClientTsOffset(JSON.parse(request.responseText).server_ts);
            }
        }
        request.send(JSON.stringify(init_payload));
    },
    hmac_hash_with_secret:function(message, secret)
    {
        cc.log(JSON.stringify(message));
        var hash = CryptoJS.HmacSHA256(message, secret);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        cc.log(hashInBase64);
        return hashInBase64;
    }
};