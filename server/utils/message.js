const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    // createdAt: new Date().getTime()
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, lon) => {
  // console.log("generateLocationMessage",lat);
  return {
    from,
    url:`https://google.com/maps?=q${lat},${lon}`,
    // createdAt: new Date().getTime()
    createdAt: moment().valueOf()
  }
};

module.exports = {generateMessage, generateLocationMessage}
