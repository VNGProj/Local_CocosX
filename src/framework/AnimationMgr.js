/**
 * Created by GSN on 6/10/2015.
 */
var gv = gv || {};
gv.createSpineAnimation = function(path){
    var jsonFile = path + ".json";
     var alas = path + ".atlas";
    cc.log("json file " + jsonFile + "atlas file "+ alas);
    return new sp.SkeletonAnimation(jsonFile, alas);
}
gv.createAnimationById = function(key, object) {
    return gv.createAnimation(resAni[key],key, object);
}
gv.createAnimationAsyncById = function(key, object) {
    return gv.createAnimationAsync(resAni[key],key,key, object);
}
gv.createAnimation = function(folderPath, key, object)
{
    if(typeof folderPath == 'undefined')
    {
        cc.log(folderPath);
    }

    gv.loadAnimationData(folderPath, key, object);
    return db.DBCCFactory.getInstance().buildArmatureNode(key);
};
gv.createAnimationAsync = function(folderPath, armatureName, name, object)
{
    if(folderPath == undefined)
    {
        cc.log("createAnimationAsync",folderPath,name );
    }
    if (object != undefined && object != null) {
        if (typeof (object.listAnimationLoaded) == 'undefined') {
            object.listAnimationLoaded = {};
        }
        object.listAnimationLoaded[name] = name;
    }
    return db.DBCCHelper.getInstance().buildAsyncArmatureNode(folderPath + "/skeleton.xml",
        folderPath + "/texture.plist",armatureName, name == undefined?armatureName:name);
};
gv.loadAnimationData = function(folderPath, key, object)
{
    cc.log(folderPath + " key " + key + " object" + object );
    if(object != undefined && object != null)
    {
        if(object.listAnimationLoaded == undefined)
        {
            object.listAnimationLoaded = {};
        }
        if(key in object.listAnimationLoaded)
            return;
        object.listAnimationLoaded[key] = key;
    }
    db.DBCCFactory.getInstance().loadTextureAtlas(folderPath + "/texture.plist", key);
    db.DBCCFactory.getInstance().loadDragonBonesData(folderPath + "/skeleton.xml", key);

};
gv.unloadAllAnimationData = function(object)
{
    if(object.listAnimationLoaded == undefined)
    {
        return;
    }

    for(var keyStored in object.listAnimationLoaded)
    {
        db.DBCCFactory.getInstance().removeTextureAtlas(keyStored,false);
    }
    object.listAnimationLoaded = {};
};
gv.preloadAllAnimation = function(object)
{
    for(var key in ani)
    {
        gv.loadAnimationData(ani[key], key, object);
    }
}