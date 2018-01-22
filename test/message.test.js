const chai = require('chai');
const expect = chai.expect;

let { generateMessage, generateLocationMessage } = require('../server/utils/message');

describe('generateMessage', () => {
    it('should create correct message object', () => {
        let from = 'Kate';
        let text = 'blablabla';
        let message = generateMessage(from, text);
        console.log(message);
        expect(message).to.be.an('object');
        expect(message).to.include({from, text});
    })
})


describe("generateLocationMessage", () => {
    it("should output correct location object", () => {
        let from = "Don";
        let latitude = 12;
        let longitude = 17;
        let url = "https://google.com/maps?q=12, 17";
        let message = generateLocationMessage(from,latitude,longitude);
        console.log(message);
        expect(message).to.include({from, url});
    });
});