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

  this.config = Object.assign({
    'ctype'   : 'file',
    'cparams' : './cache/',
  }, config);

  this.twitobj = new Twit({
    'consumer_key'  : config.consumer_key,
    'consumer_secret'  : config.consumer_secret,
    'access_token'  : config.access_token,
    'access_token_secret'  : config.access_token_secret,
    'timeout_ms'    : 60*1000,  // optional HTTP request timeout to apply to all requests.
    'strictSSL'     : true,     // optional - requires SSL certificates to be valid.
  });
}

/**
<<<<<<< HEAD
 * Retrieve all followers of a user
 */
TwitterQ.prototype.get_user_followers = async function (user_id) {
  if (typeof this.req_followers === 'undefined') {
    this.req_followers = new CTRequest({
      'handler' : this.twitobj.get.bind(this.twitobj, 'followers/ids'),
      'scope'   : 'twitter user followers',
      'ctype'   : this.config.ctype,
      'cparams' : this.config.cparams,
      'ttype'   : 'RateLimiter',
      'tparams' : [1, 60000],
    });
  }

  var q = { 'user_id' : user_id, 'stringify_ids': true };
  var results = [];
  var next_cursor = user_id;
  while ((typeof this.req_followers !== 'undefined') && (next_cursor !== "0")) {
    if (next_cursor !== user_id) q.cursor = next_cursor;
    await this.req_followers.issue([q], true);
    var raw = this.req_followers.cache([q]);
    next_cursor = raw.data.next_cursor_str;
    results = results.concat(raw.data.ids);
  }
  return results;
}

/**
 * Retrieve all friends of a user
 */
TwitterQ.prototype.get_user_friends = async function (user_id) {
  if (typeof this.req_friends === 'undefined') {
    this.req_friends = new CTRequest({
      'handler' : this.twitobj.get.bind(this.twitobj, 'friends/ids'),
      'scope'   : 'twitter user friends',
      'ctype'   : this.config.ctype,
      'cparams' : this.config.cparams,
      'ttype'   : 'RateLimiter',
      'tparams' : [1, 60000],
    });
  }

  var q = { 'user_id' : user_id, 'stringify_ids': true };
  var results = [];
  var next_cursor = user_id;
  while ((typeof this.req_friends !== 'undefined') && (next_cursor !== "0")) {
    if (next_cursor !== user_id) q.cursor = next_cursor;
    await this.req_friends.issue([q], true);
    var raw = this.req_friends.cache([q]);
    next_cursor = raw.data.next_cursor_str;
    results = results.concat(raw.data.ids);
  }
  return results;
}

/**
=======
>>>>>>> 0c2e4e1659b616508472ea03c87ee9edb82ca01d
 * Retrieve all (up to 3,200) tweets on a user's timeline
 */
TwitterQ.prototype.get_user_timeline = async function (user_id) {
  if (typeof this.req_timeline === 'undefined') {
    this.req_timeline = new CTRequest({
      'handler' : this.twitobj.get.bind(this.twitobj, 'statuses/user_timeline'),
      'scope'   : 'twitter user timeline',
      'ctype'   : this.config.ctype,
      'cparams' : this.config.cparams,
      'ttype'   : 'RateLimiter',
      'tparams' : [1, 1000],
    });
  }

  var countdown = 3200, results = [];
  var q = { 'user_id' : user_id, 'count': 200 };
  while (countdown > 0) {
    await this.req_timeline.issue([q], true);
    var raw = this.req_timeline.cache([q]);
    //no new element is fetched when raw.data contains fewer than 2 tweets
    if (raw.data.length < 2) {
      countdown = 0;
    } else {
      results = results.concat(raw.data);
      countdown = countdown - raw.data.length;
      q.max_id = raw.data[raw.data.length-1].id;
    }
  }
  return results;
}

// export
module.exports = TwitterQ;
