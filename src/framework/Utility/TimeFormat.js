/**
 * Created by zoro on 5/9/2018.
 */
fr.toTimeFormat = function(minisecond, isWithDay) // return day:hours:minute:second
{
    var oneDay = 24*60*60*1000;
    var oneHours = 60*60*1000;
    var oneMinute = 60*1000;

    if(!_.isUndefined(isWithDay))
    {
        var obj = {};


        obj.hours = Math.floor((minisecond )/(oneHours));
        if(obj.hours < 10) obj.hours = "0" + obj.hours;

        obj.minute = Math.floor((minisecond - obj.hours*oneHours)/oneMinute);
        if(obj.minute < 10) obj.minute = "0" + obj.minute;

        obj.second = Math.floor((minisecond - obj.hours*oneHours - obj.minute*oneMinute)/1000);
        if(obj.second < 10) obj.second = "0" + obj.second;

        var timeString =  obj.hours + ":" + obj.minute + ":" + obj.second;

        return timeString;
    }
    if(minisecond <= 0)
    {
        return "00:00:00";
    }


    var obj = {};
    obj.day = Math.floor(minisecond/oneDay);
    if(obj.day < 10) obj.day = "0" + obj.day;

    obj.hours = Math.floor((minisecond - obj.day*oneDay)/(oneHours));
    if(obj.hours < 10) obj.hours = "0" + obj.hours;

    obj.minute = Math.floor((minisecond - obj.day*oneDay - obj.hours*oneHours)/oneMinute);
    if(obj.minute < 10) obj.minute = "0" + obj.minute;

    obj.second = Math.floor((minisecond - obj.day*oneDay - obj.hours*oneHours - obj.minute*oneMinute)/1000);
    if(obj.second < 10) obj.second = "0" + obj.second;

    var timeString = obj.day + " " + fr.Localization.text("day") +" " + obj.hours + ":" + obj.minute + ":" + obj.second;
    if(obj.day == 0)
    {
        timeString =  obj.hours + ":" + obj.minute + ":" + obj.second;
    }
    return timeString;
}
fr.toTimeInThePast = function(minisecond) // return day:hours:minute:second
{
    if(minisecond <= 0)
    {
        return "00:00:00";
    }
    var oneDay = 24*60*60*1000;
    var oneHours = 60*60*1000;
    var oneMinute = 60*1000;

    var obj = {};
    obj.day = Math.floor(minisecond/oneDay);
    obj.hours = Math.floor((minisecond - obj.day*oneDay)/(oneHours));
    obj.minute = Math.floor((minisecond - obj.day*oneDay - obj.hours*oneHours)/oneMinute);
    obj.second = Math.floor((minisecond - obj.day*oneDay - obj.hours*oneHours - obj.minute*oneMinute)/1000);

    if(obj.day > 0){
        return fr.Localization.text("time_chat_day").replace("@value@", obj.day);

    }else if(obj.hours > 0)
    {
       return fr.Localization.text("time_chat_hours").replace("@value@", obj.hours);

    }
    else if(obj.minute > 0)
    {
        return fr.Localization.text("time_chat_minute").replace("@value@", obj.minute);

    }
    else if(obj.second > 0)
    {
       return fr.Localization.text("time_chat_second").replace("@value@", obj.second);

    }
    else
    {
        return fr.Localization.text("time_chat_current");
    }


}

fr.toStandardTime = function(minisecond) // return day\month
{
    var timeObj = new Date(minisecond);
    var result = timeObj.getDate() + "/" + (timeObj.getMonth()+1);// + "/" + timeObj.getYear();\
    var timezoneOffset = timeObj.getTimezoneOffset();
    return result;
}

fr.toStandardTimeWithYear = function(minisecond)
{
    var timeObj = new Date(minisecond);
    var result = timeObj.getDate() + "/" + (timeObj.getMonth()+1) + "/" + timeObj.getFullYear();

    if(timeObj.getDate() < 10)
    {
        result = "0"+ timeObj.getDate() + "/";
    }else
    {
        result = timeObj.getDate() + "/";
    }
    if(timeObj.getMonth() + 1 < 10)
    {
        result = result + "0" + (timeObj.getMonth() + 1);
    }else
    {
        result = result + (timeObj.getMonth() + 1 );
    }
    result = result + "/" + timeObj.getFullYear();
    return result;
}

// pastTime, curTime: in milliseconds
fr.isNewDay = function(pastTime, curTime)
{
    var timeObjPast = new Date(pastTime);
    var timeObjCur = new Date(curTime);
    //cc.log("last time: " + timeObjPast.toDateString() + "\n curTime: " + timeObjCur.toDateString());
    if(timeObjCur.getYear() - timeObjPast.getYear() >= 1
        ||timeObjCur.getMonth() - timeObjPast.getMonth() >= 1
        || timeObjCur.getDate() - timeObjPast.getDate() >= 1
    )
    {
        return true;
    }
    return false;
};

fr.isNewMonth = function(pastTime, curTime)
{
    var timeObjPast = new Date(pastTime);
    var timeObjCur = new Date(curTime);
    return (timeObjCur.getYear() - timeObjPast.getYear() >= 1       // next year
            || timeObjCur.getMonth() - timeObjPast.getMonth() >= 1  // next month
    );
};

fr.getRemainDayThisMonth = function(curTime)
{
    var timeObjCur = new Date(curTime);
    var curDate = timeObjCur.getDate();
    var curMonth = timeObjCur.getMonth();
    var curYear = timeObjCur.getYear();
    var listMonth30days = [3,5,8,10];
    var listMonth31days = [0,2,4,6,7,9,11];
    if ( listMonth30days.indexOf(curMonth) > -1 ){
        return 30 - curDate;
    }
    else if ( listMonth31days.indexOf(curMonth) > -1){
        return 31 - curDate;
    }
    else{
        if ( fr.isLeapYear(curYear)){
            return 29 - curDate;
        }
        else{
            return 28 - curDate;
        }
    }
};

// tinh nam nhuan
fr.isLeapYear = function (year) {
    return (( year % 400 == 0 || year % 100 != 0 ) && ( year % 4 == 0 ));
};

// get first time of this day in seconds.
//
fr.getFirstTimeThisDayInSecond = function () {
    var timeObjCur = new Date(gv.myInfo.getCurTimeServer());
    timeObjCur.setHours(0);
    timeObjCur.setMinutes(0);
    timeObjCur.setSeconds(0);
    return timeObjCur.getTime()/1000;
};

/**
 * change num seconds to minute string: eg timeInSeconds = 80, separator = ':' -> return "01:20"
 * @param timeInSeconds: num seconds
 * @param separator: separator between second and minute
 * @returns {string} minute string
 */
fr.secondToMinuteString = function(timeInSeconds, separator) {
    if ( timeInSeconds < 0 ){
        return "00:00";
    }
    if ( typeof separator == "undefined"){
        separator = ":"
    }
    var minute = Math.floor(timeInSeconds/60);
    var second = Math.floor(timeInSeconds - minute*60);
    var result = fr.checkAddPrefixZero(minute) + separator + fr.checkAddPrefixZero(second);
    return result.toString();
};

fr.checkAddPrefixZero = function (number) {
    if ( parseInt(number) < 10 ){
        return "0" + number;
    }
    else{
        return number;
    }
};

// get time count down to next day in string  hh:mm:ss
fr.getTimeCountDownToNextDay = function () {
    var timeObjCur = new Date(gv.myInfo.getCurTimeServer());
    timeObjCur.setHours(0);
    timeObjCur.setMinutes(0);
    timeObjCur.setSeconds(0);
    var oneDayInMillis = 24*60*60*1000;
    var nextDayInMillis = timeObjCur.getTime() + oneDayInMillis;
    return fr.toTimeFormat(nextDayInMillis - gv.myInfo.getCurTimeServer());
};

fr.getTimeToNextDayInMillis = function () {
    var timeObjCur = new Date(gv.myInfo.getCurTimeServer());
    timeObjCur.setHours(0);
    timeObjCur.setMinutes(0);
    timeObjCur.setSeconds(0);
    var oneDayInMillis = 24*60*60*1000;
    var nextDayInMillis = timeObjCur.getTime() + oneDayInMillis;
    return nextDayInMillis - gv.myInfo.getCurTimeServer();
};

fr.calculateTimeRemain = function(time,isZeroPrefix)
{
    var oneDay = 24*60*60*1000;
    var oneHours = 60*60*1000;
    var oneMinute = 60*1000;

    var obj = {};
    obj.day = Math.floor(time/oneDay);
    if(obj.day < 10&&isZeroPrefix) obj.day = "0" + obj.day;
    obj.hours = Math.floor((time - obj.day*oneDay)/(oneHours));
    if(obj.hours < 10&&isZeroPrefix) obj.hours = "0" + obj.hours;
    obj.minute = Math.floor((time - obj.day*oneDay - obj.hours*oneHours)/oneMinute);
    if(obj.minute < 10&&isZeroPrefix) obj.minute = "0" + obj.minute;
    obj.second = Math.floor((time - obj.day*oneDay - obj.hours*oneHours - obj.minute*oneMinute)/1000);
    if(obj.second < 10&&isZeroPrefix) obj.second = "0" + obj.second;

    return obj;
};