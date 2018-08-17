# twitter-q
This is a nodeJs package for handling Twitter API requests with the following support:
- throttle the frequency of requests to comply with free-usage limit imposed by Twitter,
- automate page turns to retrieve complete records, e.g., all (up to 3,200) tweets on a user's timeline
- cache the results returned by Twitter APIs, using the caching mechanism specified by the user
The initial version of this package has the following limitations:
- It supports the following Twitter API calls only: statuses/user_timeline.
- It only supports storing cache as local files
We expect to add support for other Twitter API calls and caching mechanisms (e.g., redis, memcached) in the future.

# Usage:
```js
var twq = new TwitterQ({
  consumer_key:         '****',           //required: credential for Twitter APIs
  consumer_secret:      '****',           //required: credential for Twitter APIs
  access_token:         '****',           //required: credential for Twitter APIs
  access_token_secret:  '****',           //required: credential for Twitter APIs
  ctype:                'file',           //optional: defaults to 'file'
  cparams:              './cache/',       //optional: defaults to './cache/' for 'file'
});

twq.get_user_timeline('2485791210')       //get the timeline of user with id '2485791210', returns a promise
  .then(results => {                      //results is an array of (up to 3,200) tweets, each an object in Twitter API format
    ...
  })
  .catch(err => {
    ...
  });
```
