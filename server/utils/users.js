[{
  id: 'lkj93jgjlkj',
  name: 'Alpha',
  room: 'The room'
}]

//addUser(id, name, room)
// removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    // var users = this.users.filter((user)=>user.id !== id);
    // console.log("users :",users);
    // this.users = users;
    // return users;

    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user)=> user.id !== id);
    }
    return user;
  }
  getUser(id){
    var idUser = this.users.filter((user)=>user.id === id)[0];
    return idUser;
  }
  getUserList(room){
    var users = this.users.filter((user)=>user.room === room);
    var namesArray = users.map((user)=>{
        return user.name
    })
    return namesArray;
  }
}

module.exports = {Users};








// class Person {
//   constructor(name, age) {
//     // this -> instance of class
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Alpha', 22);
// // console.log('this.name', me.name);
// var description = me.getUserDescription();
// console.log(description);






// var users = [];
//
// var addUser = (id, name, room) =>{
//   users.push({})
// }
//
// modules.exports = {addUsers}
