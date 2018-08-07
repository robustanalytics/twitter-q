var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();

var TwitterQ = require('../lib/twitter-q');
var twq = new TwitterQ({
  consumer_key:			    '***REMOVED***',
  consumer_secret:		  '***REMOVED***',
  access_token:		      '***REMOVED***',
  access_token_secret:  '***REMOVED***',
});

describe('#TwitterQ with user timeline retrieval', function() {
  it('respond with matching records', async function() {
    return twq.get_user_timeline('543000344').should.eventually.have.length.be.above(0);
  });
});
