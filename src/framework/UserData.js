/**
 * Created by KienVN on 10/19/2015.
 */
var KEY_ENCRYPT = "monstone_gsn";
fr.UserData = {
    setObjectFromKey:function(key, object)
    {
        cc.sys.localStorage.setItem(key, JSON.stringify(object));
        cc.log("save object " + JSON.stringify(object) );

    },
    getObjectFromKey:function(key)
    {
        var val = cc.sys.localStorage.getItem(key);
        cc.log("object = " + JSON.parse(val));

    },
    getStringFromKey: function (key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)|| _.isNaN(val))
            return defaultValue;
        else
            return val;
    },
    setStringFromKey:function(key, value)
    {
        cc.log("setStringFromKey: ", key, value);
        cc.sys.localStorage.setItem(key, value);
    },
    getNumberFromKey:function(key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)|| _.isNaN(val))
            return defaultValue;
        else
            return Number(val);
    },
    setNumberFromKey:function(key, value)
    {
        cc.log("setNumberFromKey " + key + " " + value);
        cc.sys.localStorage.setItem(key, value);
    },
    getBoolFromKey:function(key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        cc.log("getBool: " + val);
        if(_.isNull(val)||
            _.isNaN(val) ||
            _.isEmpty(val))
            return defaultValue;
        else
        {
            var valBool = val == 1 ? true : false;
            return valBool;
        }

    },
    setBoolFromKey:function(key, value)
    {
        var numVal = value ? 1 : 0
        cc.sys.localStorage.setItem(key, numVal);
    },
    setStringWithCrypt:function(key, value)
    {
        var val = CryptoJS.AES.encrypt(value, KEY_ENCRYPT);
        cc.sys.localStorage.setItem(key, val.toString());
    },
    getStringWithCrypt:function(key, defaultValue){
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)|| _.isNaN(val))
            return defaultValue;
        else
            return CryptoJS.AES.decrypt(val,KEY_ENCRYPT).toString(CryptoJS.enc.Utf8);
    }
};