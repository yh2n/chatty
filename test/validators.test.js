const chai = require('chai');
const expect = chai.expect;

const validators = require('../server/utils/validators');

describe('validEntry', () => {
    it('should return true if the input is valid', () => {
        let input = "Paul"; 
        expect(validators.validEntry(input)).to.be.true;
    })
    it('should return false if the input is empty', () => {
        let input = ""; 
        expect(validators.validEntry(input)).to.be.false;
    })
})

