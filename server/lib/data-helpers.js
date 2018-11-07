"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      //simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray((err, tweets) =>{
          console.log(tweets)
          if (err) callback(err);
        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
}