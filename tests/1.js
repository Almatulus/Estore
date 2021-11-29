const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe("Make shure that status 200", function(){
    it("should return 200", (done) => {
        chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(res).to.have.status(123);
          done(); 
        })
    })
})
