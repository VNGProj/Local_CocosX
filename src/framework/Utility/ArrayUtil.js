/**
 * Created by TienNT on 12/24/2017.
 */

fr.ArrayUtil_RemoveDuplicate = function (arr) {
    var unique_arr = [];
    for( var i = 0; i < arr.length; i++ ){
        if ( unique_arr.indexOf(arr[i]) == -1 ){
            unique_arr.push(arr[i]);
        }
    }
    return unique_arr;
};