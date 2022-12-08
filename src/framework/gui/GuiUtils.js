/**
 * Created by KienVN on 11/16/2015.
 */


fr.scaleSpriteToFull = function(sprite, size)
{
    var contentSize = sprite.getContentSize();
    var scaleX = size.width/contentSize.width;
    var scaleY = size.height/contentSize.height;
    var scale = scaleX>scaleY?scaleX:scaleY;
    sprite.setScale(scale);
};
fr.createCommonButton = function(imgNormal, imgSelected, imgDisabled, texType) // path
{
    var btnKeep = new ccui.Button();
    btnKeep.setTouchEnabled(true);
    btnKeep.setPressedActionEnabled(true);
    btnKeep.loadTextures(imgNormal, imgSelected, imgDisabled,texType);
    return btnKeep;
};
fr.createSprite = function(name)
{
    //var array_name = path_name.split("/");
    //var name = array_name[array_name.length-1];
    if(cc.spriteFrameCache.getSpriteFrame(name))
    {
        //var s = jsb.fileUtils.getStringFromFile("cuongdn.txt")
        //jsb.fileUtils.writeStringToFile(s+"\nBitagi: "+ name,"cuongdn.txt")

        return new cc.Sprite("#" + name);
    }
    else{
        //var s = jsb.fileUtils.getStringFromFile("cuongdn.txt")
        //jsb.fileUtils.writeStringToFile(s+"\nCuongdn: "+ name,"cuongdn.txt")
        return new cc.Sprite(name);
    }
};


fr.changeSprite = function(sprite, name) {
    if (cc.spriteFrameCache.getSpriteFrame(name)) {
        sprite.setSpriteFrame(name);
    }
    else {
        sprite.setTexture(name);
    }
};
fr.createText = function(fontPath, size, color )
{
    var lbl = new ccui.Text("0" ,fontPath, size);
    lbl.setTextColor(color);
    return  lbl;
};

fr.pressBackGroundToHide = function(background)
{
    var self = this;
    background.addClickEventListener(function()
    {
        if(_.isFunction(self.hide))
        {
            self.hide();
        }else
        {
            self.setVisible(false);
        }
    });
};
