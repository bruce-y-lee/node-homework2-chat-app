const expect = require('expect');
const {Users} = require('./users');


describe('Users',()=>{

  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'11',
      name:'Mike',
      room:'Node'
    },{
      id:'22',
      name:'Jen',
      room:'React'
    },{
      id:'33',
      name:'Julie',
      room:'Node'
    }];
  });

  it('should add new usre', ()=>{
    var users =new Users();
    var user = {
      id:'321',
      name:'Alpha',
      room:'the room'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(resUser).toEqual(user);
  })

  it('should remove a user', ()=>{
    var userId = '11';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
    // users.removeUser(userId);
    //
    // expect(users.users).toEqual([{id:'22',
    // name:'Jen',
    // room:'React'},{id:'33',
    // name:'Julie',
    // room:'Node'}])
  })

  it('should not remove user', ()=>{
    var userId = 'gg';
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
    // var userId = 'gg';
    // users.removeUser(userId);
    // expect(users.users).toEqual([{
    //   id:'11',
    //   name:'Mike',
    //   room:'Node'
    // },{
    //   id:'22',
    //   name:'Jen',
    //   room:'React'
    // },{
    //   id:'33',
    //   name:'Julie',
    //   room:'Node'
    // }]);
  })

  it('should find user', ()=>{
    var userId = '22';
    var user = users.getUser(userId);
    expect(user).toEqual({id:'22',
    name:'Jen',
    room:'React'});
  })

  it('should not find user', ()=>{
    var userId = 'gg';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  })

  it('should return names for node course',()=>{
    var userList = users.getUserList('Node');

    expect(userList).toEqual(['Mike','Julie']);
  })

  it('should return names for node course',()=>{
    var userList = users.getUserList('React');

    expect(userList).toEqual(['Jen']);
  })
})
