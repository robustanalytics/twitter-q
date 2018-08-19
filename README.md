# twitter-q
This is a NodeJs package for handling Twitter API requests with the following support:
- throttle the frequency of requests to comply with free-usage limit imposed by Twitter,
- automate page turns to retrieve complete records, e.g., all (up to 3,200) tweets on a user's timeline, all followers and friends of a user, etc.,
- cache the results returned by Twitter APIs, using the caching mechanism specified by the user

The initial version of this package has the following limitations:
- It supports the following Twitter API calls only:
  - statuses/user_timeline
  - followers/ids
  - friends/ids
  - users/lookup
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

twq.get_user_timeline('123456789')        //get the timeline of user with id '123456789', returns a promise
  .then(results => {                      //results is an array of (up to 3,200) tweets, each an object in Twitter API format
    ...
  })
  .catch(err => {
    ...
  });

twq.get_user_followers('123456789')       //get the followers of user with id '123456789', returns a promise
  .then(results => {                      //results is an array of ids, each a string
    ...
  })
  .catch(err => {
    ...
  });

twq.get_user_friends('123456789')         //get the friends of user with id '123456789', returns a promise
  .then(results => {                      //results is an array of ids, each a string
    ...
  })
  .catch(err => {
    ...
  });

twq.get_users_profiles(['123', '456'])    //get the profiles of all users in the array, returns a promise
  .then(results => {                      //results is an array of user objects, each containing keys such as id_str, screen_name, location, etc.
    ...
  })
  .catch(err => {
    ...
  });
```
