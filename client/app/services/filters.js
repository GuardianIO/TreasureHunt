angular.module('treasureHunt.filters', [])
.filter('toFtMiles', [function(){
  var opts = ['1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];
  return function(input /* in meters */){
    if(typeof input === typeof 'string'){
      return input;
    }else if(typeof input === typeof 0 && input === input){
      input = input * 3.28084; // convert meters to feet
      if(input < 660){
        return Math.round(input / 10) * 10 + ' ft';
      }else if(input < 5280){
        return opts[Math.round(input / 660) - 1] + ' of a mile';
      }
      return Math.round((input/5280)* 10)/10  + ' mi';
    }else if(input !== input){ // test for NaN
      return '';
    }
    return '';
  }
}]);