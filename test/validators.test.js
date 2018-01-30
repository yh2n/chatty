const chai = require('chai');
const expect = chai.expect;

const validators = require('../server/utils/validators');

describe('validator', () => {
    it('should return true if the input is valid', () => {
        let input = "Paul"; 
        expect(validators.isString(input)).to.be.true;
    })
})

