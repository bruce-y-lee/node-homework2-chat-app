var expect = require('expect');

var {generateMessage} = require('./message');

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
  })
})
