const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../server/server');


const should = chai.should();

chai.use(chaiHttp);

describe('homepage', () => {
    it("should render html and return 200 status code", () => {
        return chai.request(app)
            .get('/')
            .then((res) => {
                res.should.have.status(200);
                res.should.be.html;
            })
    }) 
})