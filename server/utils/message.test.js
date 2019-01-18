var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object', ()=>{
    //store res in variable
    var message = generateMessage('server','Hello');

    //asert from match
    expect(message.from).toBe('server');

    //assert text match
    expect(message.text).toBe('Hello');
    //assert createdAt is number
    expect(typeof message.createdAt).toBe('number');

    expect(message).toMatchObject({from:'server',text:'Hello'});
    // done();
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 12;
    var lon = 21;

    var message = generateLocationMessage(from, lat, lon);

    expect(message).toMatchObject({from:from, url:'https://google.com/maps?=q12,21'});
    expect(typeof message.createdAt).toBe('number');

  })
})
