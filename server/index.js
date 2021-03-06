"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = 'mongodb://buck:buck123@ds155213.mlab.com:55213/tweetlhl';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, client) => {
  if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
  } 
  let db = client.db('tweetlhl');

// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);
// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});
