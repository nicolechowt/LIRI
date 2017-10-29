var myKeyModule = require("./key.js");
var fs = require('fs');
var client = myKeyModule.client;
var spotify = myKeyModule.spotify;
var request = myKeyModule.request;

var command = process.argv[2];
var params = { screen_name: 'nicodechow' };
var name= "";



if (process.argv.length===4){
	name = process.argv[3];
} else if (process.argv.length>4){
	for (var i=3;i<process.argv.length;i++){
		name = name + "+" + process.argv[i];	
	}
}
liri(command,name);

function liri(command,name){
	switch (command) {
	    case "my-tweets":	
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			    if (!error) {
			    	tweets.forEach(function(element,index){
			    		var mostRecentTweets = "Tweet # "  + parseInt(index+1) + " -" + JSON.stringify(element.text,null,2) +"\n"+"\n";
			    		console.log("*****************");
			    		console.log(mostRecentTweets);	    				
						fs.appendFileSync('log.txt', "\n" + mostRecentTweets, (err) => {
							if (err) throw err;
  							console.log('The "data to append" was appended to file!');
						})
					})

			    } else {
			    	console.log(error);
			    }
			});
			break;
		case "spotify-this-song":
			spotify.search({ type: 'track', query: name, limit: 5 }, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  } 

			console.log("///////");
			var artists = data.tracks.items[0].album.artists[0].name;
			var songName = data.tracks.items[0].name;
			var previewOfSong = data.tracks.items[0].preview_url;
			var songObj = {};

			songObj.artists=artists;
			songObj.songName=songName;
			songObj.previewOfSong=previewOfSong;

			console.log ("Artist(s) "+ artists); 
			console.log ("The song's name "+ songName); 
			console.log ("Preview Link of the Song " + previewOfSong);
			fs.appendFileSync('log.txt', "\n" + "The last song search result: " + "\n" + JSON.stringify(songObj,null,2), (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
			})			

			});
			break;
		case "movie-this":
			if(name.length===0) {
				name="Mr. Nobody";		
			 }
			  	request("https://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
					  console.log('Error:', error); // Print the error if one occurred
					  console.log('StatusCode:', response && response.statusCode); // Print the response status code if a response was received		
					  var responseBodyObj=JSON.parse(response.body);
					  console.log("Title of the movie: " + responseBodyObj.Title);
					  console.log("Year the movie came out: " + responseBodyObj.Released);
					  console.log("IMDB Rating: " + responseBodyObj.imdbRating);
					  console.log("Rotten Tomatoes Rating of the movie: " + responseBodyObj.Ratings[1].Value);
					  console.log("Country where the movie was produced: " + responseBodyObj.Country);
					  console.log("Language of the movie: " + responseBodyObj.Language);
					  console.log("Plot of the movie: " + responseBodyObj.Plot);
					  console.log("Actors of the movie: " + responseBodyObj.Actors);

					  var filteredMovieObj={};
					  filteredMovieObj.title=responseBodyObj.Title;
					  filteredMovieObj.year=responseBodyObj.Released;
					  filteredMovieObj.imdbRating=responseBodyObj.imdbRating;
					  filteredMovieObj.rottenTomatoes=responseBodyObj.Ratings[1].Value;
					  filteredMovieObj.country=responseBodyObj.Country;
					  filteredMovieObj.language=responseBodyObj.Language;
					  filteredMovieObj.plot=responseBodyObj.Plot;
					  filteredMovieObj.actors=responseBodyObj.Actors;


					  fs.appendFileSync('log.txt', "\n" + "The last movie search result: " + "\n" + JSON.stringify(filteredMovieObj,null,2), (err) => {
						if (err) throw err;
						console.log('The "data to append" was appended to file!');
					})	


				});

			break;
		case "do-what-it-says":
			fs.readFile("random.txt", "utf8", (err,data) => {
				var dataInArr = data.split(",");
				var newCommand = dataInArr[0];
				var newName = dataInArr[1];
				liri(newCommand,newName);
			});

			break;
		default:
			console.log("Please enter a valid command. Choose from one of the following - my-tweets, spotify-this-song, movie-this,do-what-it-says")	
	}
}

