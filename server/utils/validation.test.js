const expect = require('expect');
const {isRealString} = require('./validation');

//import isRealString


describe('is real string?',()=>{
  it('should reject non string values',()=>{
    var message = '';
    var result = isRealString(message);
    expect(result).toBe(false);
  })

  it('shoul reject string with only spaces', ()=>{
    var message='       ';
    var result = isRealString(message);
    expect(result).toBe(false);
  })

  it('should allow string with non-apce characters',()=>{
    var message = 'skdf weiwjf ls';
    var result = isRealString(message);
    expect(result).toBe(true);
  })
})
//isRealString
  //should reject non-string values
  // should reject string with only spaces
  // should allow string with non-space characters
