# twitter-q
This is a NodeJs package for handling Twitter API requests with the following support:
- throttle the frequency of requests to comply with free-usage limit imposed by Twitter,
- automate page turns to retrieve complete records, e.g., downloading all (up to 3,200) tweets on a user's timeline, downloading all followers and friends of a user, handling bulk profile downloads for any number of users (instead of 200 as limited by users/lookup), auto page turning for search results, etc.,
- cache the results returned by Twitter APIs, using the caching mechanism specified by the user

The initial version of this package has the following limitations:
- It supports the following Twitter API calls only:
  - statuses/user_timeline
  - followers/ids
  - friends/ids
  - users/lookup
  - Full archive search in Premium search API (tweets/search/fullarchive/), either paid or sandboxed
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

twq.get_user_timeline('123456789')        //get the timeline of user with id '123456789' (auto pagedown), returns a promise
  .then(results => {                      //results is an array of (up to 3,200, as the maximum limit allowed by Twitter API even with page downs) tweets, each an object in Twitter API format
    ...
  })
  .catch(err => {
    ...
  });

twq.get_user_followers('123456789')       //get the followers of user with id '123456789' (auto pagedown), returns a promise
  .then(results => {                      //results is an array of ids, each a string
    ...
  })
  .catch(err => {
    ...
  });

twq.get_user_friends('123456789')         //get the friends of user with id '123456789' (auto pagedown), returns a promise
  .then(results => {                      //results is an array of ids, each a string
    ...
  })
  .catch(err => {
    ...
  });

twq.get_users_profiles(['123', '456'])    //get the profiles of all users in the array (the function will automatically partition the array into chunks of 200 users to conform with the Twitter API limit), returns a promise
  .then(results => {                      //results is an array of user objects, each containing keys such as id_str, screen_name, location, etc.
    ...
  })
  .catch(err => {
    ...
  });

twq.search_fullarchive('dev', 'query')    //use the full archive search of Twitter Premium API (either sandbox or paid) to search for 'query', under development environment 'dev', returns a promise
  .then(results => {                      //results is an array of tweets, each an object in Twitter API format.
    ...
  })
  .catch(err => {
    ...
  });  
```
