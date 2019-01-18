var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, lat, lon) => {
  console.log("generateLocationMessage",lat);
  return {
    from,
    url:`https://google.com/maps?=q${lat},${lon}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage, generateLocationMessage}