/**
 * Created by KienVN on 11/10/2015.
 */

fr.Random =  cc.Class.extend({
    ctor:function(seed, countOfRandom)
    {
        this.m = new MersenneTwister(seed);
        this.countOfRandom = 0;
        if(countOfRandom)
        {
            for(var i = 0; i < countOfRandom; i++)
            {
                this.random();
            }
        }
    },
    /*
        return a random number between (0 inclusive) and 1 (exclusive)
     */
    random:function()
    {
        this.countOfRandom++;
        return this.m.random();
    },
    randomBool:function()
    {
        return this.random() > 0.5;
    },
    /*
        return a random integer between min (included) and max (excluded)
     */
    randomInt:function(min, max)
    {
        if(max != undefined) {
            return Math.floor(this.random() * (max - min)) + min;
        }
        else{
            return Math.floor(this.random() * (min));
        }
    },
    /*
        return a random integer between min(included) and max(included)
     */
    randomIntInclusive:function(min, max)
    {
        if(max != undefined) {
            return Math.floor(this.random() * (max - min + 1)) + min;
        }
        else{
            return Math.floor(this.random() * (min + 1));
        }
    },
    checkSuccess100:function(p) {

        if ( p < 0 ) {
            p = 0;
        }
        var x = this.randomInt(100);
        if ( x < p ) {
            return true;
        }
        return false;
    }
});

/*
    return a random integer between min(included) and max(included)
 */
fr.generateRandomInt = function (min, max) {
    if ( max == undefined && min == undefined){
        return null;
    }
    else if( typeof max != "undefined") {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    else{
        return Math.floor(Math.random() * (min));
    }
};

/**
 *
 * @param min: min of random (include)
 * @param max: max of random (exclude)
 * @param intDiff: random must be different with this param
 * @returns {int} rand: a random number.
 */

fr.generateRandomIntWithDiff = function (min, max, intDiff ) {
    var rand = fr.generateRandomInt(min, max);
    while ( rand == intDiff  ){
        rand = fr.generateRandomInt(min, max);
    }
    return rand;
};