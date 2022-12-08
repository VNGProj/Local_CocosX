/**
 * Created by KienVN on 5/28/2015.
 */

fr.toMoneyString = function(num)
{
    if(_.isString(num))
    {
        return num;
    }
    var isNegative = false;
    var formattedNumber = num;
    if(num < 0){
        isNegative = true;
    }
    num = Math.abs(num);
    var hau_to;
    if(num >= 1000000000){
        hau_to = 'B';
        formattedNumber = (num/1000000000).toFixed(3);
    } else if (num >= 1000000){
        hau_to = 'M';
        formattedNumber = (num/1000000).toFixed(3);
    } else if (num >= 1000){
        hau_to = 'K';
        formattedNumber = (num/1000).toFixed(3);
    }else
    {
        formattedNumber = num.toString();
        return formattedNumber;
    }
    if( formattedNumber.indexOf('.000') != -1 )
    {
        formattedNumber = formattedNumber.replace(".000", hau_to);
        return formattedNumber;
    }
    var indexOfDot = formattedNumber.indexOf('.');
    if(indexOfDot > 0)
    {
        var buff = formattedNumber.substring(indexOfDot + 1);
        if(buff[2] == '0')
        {
            buff = buff.substring(0,2);
            if(buff[1] == '0')
            {
                buff = buff.substring(0,1);
            }
            formattedNumber = formattedNumber.substring(0,indexOfDot+1) + buff + hau_to;
        }
        else{
            formattedNumber = formattedNumber.replace('.',hau_to);
        }
    }
    if(isNegative)
    {
        formattedNumber = '-' + formattedNumber;
    }
    return formattedNumber;
};

fr.standardizeNumber = function(num, delimiter) {
    if (delimiter == null) {
        delimiter = ".";
    }

    var tmp = num.toString();
    var retVal = "";
    var count = 0;
    for (var i = tmp.length - 1; i >= 0; i--) {
        retVal = tmp[i] + retVal;
        count++;
        if (count >= 3 && i != 0) {
            count = 0;
            retVal = delimiter + retVal;
        }
    }

    return retVal;
};
fr.standardNumberStringToNumber = function(numString) // format 50.000.000
{

    var val = numString.split(".");

    var newVal = "";
    for(var i = 0 ; i < val.length; ++i)
    {
        newVal = newVal + val[i];
    }

    var result = parseInt(newVal);

    return result;
},
fr.getFileNameByTime = function(ext)
{
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var minisecond =  now.getMilliseconds();

    if(month.toString().length == 1)
    {
        month = '0' + month;
    }
    if(day.toString().length == 1)
    {
        day = '0' + day;
    }
    if(hour.toString().length == 1)
    {
        hour = '0' + hour;
    }
    if(minute.toString().length == 1)
    {
        minute = '0' + minute;
    }
    if(second.toString().length == 1)
    {
        second = '0' + second;
    }

    var fileByTime = year + '_' + month + '_' + day + '__' + hour + '_' + minute + '_' + second + '_' + minisecond + '.' + ext;
    return fileByTime;
};
fr.checkHotHotText = function(text)
{

}
fr.capString = function(text, length)
{
    var result = text;
    if(text.length > length)
    {
        result = text.substr(0,length-3);
        result = result + "...";
    }
    return result;

}

fr.createRichText = function(text, size, defFont, defSize, defColor, defAlignHorizontal, defAlignVertical) {
    //("", cc.size(700, 30), res.FONT_GAME_BOLD_ITALIC, 18, null, RichTextAlignment.LEFT, RichTextAlignment.MIDDLE);
    // init
    var label = new CustomLabel(size);
    label.setDefaultFont(defFont?defFont:res.FONT_GAME_BOLD);
    label.setDefaultColor(defColor?defColor:cc.color.WHITE);
    label.setDefaultSize(defSize?defSize:20);
    label.setDefaultAlignHorizontal((defAlignHorizontal != undefined)?defAlignHorizontal:RichTextAlignment.CENTER);
    label.setDefaultAlignVertical(defAlignVertical?defAlignVertical:RichTextAlignment.MIDDLE);
    label.setString(text?text:"");
    return label;
}