var request = require('supertest');
var server= require('../server');
describe('Cards for Humanity Authentication-Raphael Wanjiku', function () 
{
  //test login
  it('Login Route(/api/auth/login)', function loginTest(done) {
  request(server)
    .get('/api/auth/login')
    .redirects(1)
    done();
  });
  //test signup
  it('SignUp Route(/api/auth/signup)', function signupTest(done) {
  request(server)
    .get('/api/auth/signup')
    .redirects(1)
    done();
  });

});