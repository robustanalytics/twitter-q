var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();

var TwitterQ = require('../lib/twitter-q');
var twq = new TwitterQ({
  consumer_key:			    process.env.TWITTER_API_KEY,
  consumer_secret:		  process.env.TWITTER_API_SECRET,
  access_token:		      process.env.TWITTER_API_TOKEN,
  access_token_secret:	process.env.TWITTER_API_TOKEN_SECRET,
});

describe('#TwitterQ with user timeline retrieval', function() {
  it('respond with matching records', (done) => {
    twq.get_user_timeline('2485791210')
      .then(results => {
<<<<<<< HEAD
        // console.log(results[0]);
        results.should.have.length.be.above(0);
        done();
      })
      .catch(done);
    // return twq.get_user_timeline('2733452459').should.eventually.have.length.be.above(0);
  });
});

describe('#TwitterQ with user followers retrieval', function() {
  it('respond with matching records', (done) => {
    twq.get_user_followers('2485791210')
      .then(results => {
        // console.log(results);
        results.should.have.length.be.above(0);
        done();
      })
      .catch(done);
    // return twq.get_user_timeline('2733452459').should.eventually.have.length.be.above(0);
  });
});

describe('#TwitterQ with user friends retrieval', function() {
  it('respond with matching records', (done) => {
    twq.get_user_friends('2485791210')
      .then(results => {
        // console.log(results);
=======
        console.log(results[0]);
>>>>>>> 0c2e4e1659b616508472ea03c87ee9edb82ca01d
        results.should.have.length.be.above(0);
        done();
      })
      .catch(done);
    // return twq.get_user_timeline('2733452459').should.eventually.have.length.be.above(0);
  });
});
