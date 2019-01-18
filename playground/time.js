//Jan 1st 1970 00:00:00 am -> 0

const moment=require('moment')

// var date = moment();
// date.add(100,'years').subtract(9,'month');
// console.log(date.format('MMM Do, YYYY'));

// var date = moment();
//
// //3:12 pm
// console.log(date.format('LT'));
// console.log(date.format('h:mm a'))
// //6:01 am
// console.log(date.subtract(9,'hours').subtract(15,'minutes').format('LT'))


// new Date.getTime();

var someTimestamp = moment().valueOf()
console.log(someTimestamp);


var createdAt = 1234;
var date= moment(createdAt);
console.log(date.format('h:mm a'));
