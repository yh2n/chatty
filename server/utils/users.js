// Store users

[{

}]

//POST user
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
       let user = { id, name, room };
       this.users.push(user);
       return user
    }
}

//DELETE user

//GET user

//GET user list


module.exports = { Users }