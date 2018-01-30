const chai = require('chai');
const expect = chai.expect;

const { Users } = require('../server/utils/users');

describe('Users', () => {
var users;

beforeEach(() => {
    //seed data for tests
    users = new Users();
    users.users = [
        {
            id: 123,
            name: "Ron",
            room: "A",
        },
        {
            id: 234,
            name: "Karl",
            room: "B",
        },
        {
            id: 345,
            name: "Ava",
            room: "A"
        }
    ];
})
    it('should add new user to database', () => {
        let users = new Users();
        let user = {
            id: 1234,
            name: "Kate",
            room: "Art forum"
        }
        let result = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    });
    it('should return names for room A', () => {
        let userList = users.getUserList("A");
        console.log(userList);

        expect(userList).to.be.an('array');
        expect(userList).to.deep.equal(["Ron", "Ava"]);
    });
    it('should find a user when given a valid id', () => {
        let id = 123;
        let user = users.getUser(id);

        expect(user.id).to.deep.equal(id);
    });
    it('should NOT find a user when given invalid id', () => {
        let id = 777;
        let user = users.getUser(id);

        expect(user).to.not.exist;
    });
    it('should remove user form database when given valid id', () => {
        let id = 234;
        let user = users.removeUser(id);

        expect(user.id).to.deep.equal(id);
        expect(users.users.length).to.deep.equal(2);
    });
    it('should NOT remove user form database when given invalid id', () => {
        let id = 888;
        let user = users.removeUser(id);

        expect(user).to.not.exist;
        expect(users.users.length).to.deep.equal(3);
    })
})