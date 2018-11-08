"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    setLike: function(date) {
        db.collection("tweets").update(
          { "created_at": date },
          { $inc: { likes: 1 } }
      );
    },
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray((err, tweets) =>{
          if (err) callback(err);
        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
}