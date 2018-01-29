const chai = require('chai');
const expect = chai.expect;

const { Users } = require('../server/utils/users');

describe('Users', () => {
    it('should add new user to database', () => {
        let users = new Users();
        let user = {
            id: "1234",
            name: "Kate",
            room: "Art forum"
        }
        let result = users.addUser(user.id, user.name, user.room);
        expect(users.users).to.deep.equal([user]);
    })
})