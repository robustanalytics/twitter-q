/**
 * package for easy query of Twitter data
 */
var Twit = require('twit');
var CTRequest = require('@robustanalytics/cached-throttled-req');

/**
 * CTRequest initializor: checking and recording required parameters
 */
var TwitterQ = function (config) {
  if (!(this instanceof TwitterQ)) {
    return new TwitterQ(config);
  }

  this._config(config);
}

/**
 * Check the required params are present in `config`, and record `config`
 */
TwitterQ.prototype._config = function (config) {
 // check required parameters, making sure none is empty
  if (typeof config.consumer_key === 'undefined'
  || typeof config.consumer_secret === 'undefined'
  || typeof config.access_token === 'undefined'
  || typeof config.access_token_secret === 'undefined') {
   throw new TypeError('missing one of the required params: consumer_key, consumer_secret, access_token, access_token_secret.');
  }

  this.config = config;
  this.twitobj = new Twit({...config, ...{
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  }});
}

/**
 * Retrieve all (up to 3,200) tweets on a user's timeline
 */
TwitterQ.prototype.get_user_timeline = async function (user_id) {
  if (typeof this.req_timeline === 'undefined') {
    this.req_timeline = new CTRequest({
      'handler' : this.twitobj.get.bind(this.twitobj, 'statuses/user_timeline'),
      'scope'   : 'twitter user timeline',
      'ctype'   : 'file',
      'cparams' : './cache/',
      'ttype'   : 'RateLimiter',
      'tparams' : [1, 1000],
    });
  }

  var countdown = 3200, results = [];
  var q = { 'user_id' : user_id, 'count': 200 };
  while (countdown > 0) {
    await this.req_timeline.issue([q], true);
    var raw = this.req_timeline.cache([q]);
    if (raw.data.length === 0) {
      countdown = 0;
    } else {
      results = results.concat(raw.data);
      countdown = countdown - raw.data.length;
      q.max_id = Math.min.apply(null, raw.data.map(cv => cv.id)) - 1;
    }
  }
  return results;
}

// export
module.exports = TwitterQ;
