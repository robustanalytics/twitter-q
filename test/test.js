var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();

var TwitterQ = require('../lib/twitter-q');
var twq = new TwitterQ({
  consumer_key:			    'nQLmBshDfiOZ1UJu8LEC09uy2',
  consumer_secret:		  '2Q0sNEzhXSR7eTRDPQ5Q3ym38Oj89ZzQxH39dmHIRT51wfULOP',
  access_token:		      '389017354-kfQYYJojSN52rHyflKUWTgVME3V1H0xCVmnyCqHG',
  access_token_secret:  'yBY2a1ywbYpGmuZA1mvgbQQDSlfJsTNw0ckKaKN8mSwsg',
});

describe('#TwitterQ with user timeline retrieval', function() {
  it('respond with matching records', async function() {
    return twq.get_user_timeline('543000344').should.eventually.have.length.be.above(0);
  });
});
