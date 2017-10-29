var Twitter = require('twitter');

var client = new Twitter ({
  consumer_key: "kEEuMjPZ96AUvqPKuAkXiKbgh",
  consumer_secret: "e97PSctXtJRVYcIV4D1rZRRk8tUSCvtckfN58yubtKcqEzR1GP",
  access_token_key: "922645209464188928-VNxoXFpSqxuaukh1nUz1bLBDqhMgFaI",
  access_token_secret: "OmGXmSg3yQLqMrf8ExAEZUe8n7a6U68P2nWaAy396pJ2K"
});


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "0d809a45a87942b89b1e1eac24f40fbf",
  secret: "a210c1e354fe4a078353519845f13e82"
});
 

var request = require('request');



exports.client = client;
exports.spotify = spotify;
exports.request= request;
