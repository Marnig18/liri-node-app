
//packages and file requests
var keys = require("./keys.js")
var request = require("request");


/// Variables
var name;
var action = process.argv[2]; 
var queryUrl = ""
var song;


/// switch cases to toggle between commands
switch(action){
	case "movie-this":
		movie();
		break;

	case "my-tweets":
		tweets();
		break;

	case "spotify-this-song":
		spotify();
		break;

	case "do-what-it-says":
		random();
		break;
}
 /*   function for my-tweets   */

function tweets(){

	var Twitter = require('twitter');
	var client = new Twitter ({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});


	var params = {srceen_name: "stuffmydogthink"};
	client.get("statuses/user_timeline", params, function(err, tweets, response){
				if (!err){
				// console.log(JSON.stringify(tweets, null, 2));
				for (i = 0; i < tweets.length; i++){
				console.log(tweets[i].text + " " +  tweets[i].created_at);
			}
		}
	});
}
	
	



/* function for spotify  */


function spotify(song){
	var Spotify = require('node-spotify-api');
		var spotify = new Spotify({
		id: "86010b0126bf4144871a7df357c0541d",
		secret: "c7f99eb8f0de4d498ecd7534fc5a71cf"
	});

	if (action === "spotify-this-song" &&!process.argv[3]){
	
		spotify.search({type: 'track', query: "The Sign", limit: 12}, function(err, data){	
				if(err){
				return console.log(err);
			}
			console.log(JSON.stringify(data, null, 2));
			console.log("The song is " + data.tracks.items[11].name);
			console.log("The artist is: " + data.tracks.items[11].artists[0].name);
			console.log("The Album is: " + data.tracks.items[11].album.name);
			console.log(data.tracks.items[11].preview_url);

		});
	}
	else if(action === "spotify-this-song") {

		var song = "";

			for(i = 3 ; i < process.argv.length; i++){
			 song += "+" + process.argv[i];
		}

		

		spotify.search({type: 'track', query: song, limit: 1}, function(err, data){	
				if(err){
				return console.log(err);
			}
			console.log(JSON.stringify(data, null, 2));
			console.log("The song is " + data.tracks.items[0].name)
			console.log("The artist is: " + data.tracks.items[0].artists[0].name)
			console.log("The Album is: " + data.tracks.items[0].album.name)
			console.log(data.tracks.items[0].preview_url)

		});

	}
	else{
		spotify.search({type: 'track', query: song, limit: 1}, function(err, data){	
				if(err){
				return console.log(err);
			}
			console.log(JSON.stringify(data, null, 2));
			console.log("The song is " + data.tracks.items[0].name)
			console.log("The artist is: " + data.tracks.items[0].artists[0].name)
			console.log("The Album is: " + data.tracks.items[0].album.name)
			console.log(data.tracks.items[0].preview_url)

		});
	}
}



	 

/* function for movies */


 function movie(){

 	if(action === "movie-this" && !process.argv[3]){
		// name = "Mr.+Nobody"
		// console.log("The movie is: " + name);
		queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";


		 request(queryUrl, function(error, response, body){

		 	if(!error && response.statusCode === 200){
		 		var movie = JSON.parse(body);
		 		// 
		 		
		 		console.log("The movie is " + movie.Title);
		 		console.log("The movie came out in " + movie.Year);
		 		console.log("The movie is rated " + movie.imdbRating + " on IMDB.");
		 		console.log("The movie was produced in " + movie.Country);
		 		console.log("The movie is in " + movie.Language);
		 		console.log(movie.Plot);
		 		console.log("The actors in the movie are " + movie.Actors);
		 		
		 		var rottenName = "Mr_Nobody"
			 	
		 		console.log("http://www.rottentomatoes.com/m/" + rottenName);
		 	};
	 	});
	}

	else if(action === "movie-this"){
		var newName = process.argv[3]
		
		for(i = 4; i<process.argv.length; i++){
			newName += "+" + process.argv[i];
		}

		// console.log("The movie is: " + newName);

		queryUrl = "http://www.omdbapi.com/?t=" + newName + "&y=&plot=short&apikey=40e9cece";
		

		 request(queryUrl,function(error, response, body){

		 	if(!error && response.statusCode === 200){
		 		var movie = JSON.parse(body);
		 		// console.log(movie);

		 		console.log("The movie is " + movie.Title);
		 		console.log("The movie came out in " + movie.Year);
		 		console.log("The movie is rated " + movie.imdbRating + " on IMDB.");
		 		console.log("The movie was produced in " + movie.Country);
		 		console.log("The movie is in " + movie.Language);
		 		console.log(movie.Plot);
		 		console.log("The actors in the movie are " + movie.Actors)
		 		// console.log(movie.Ratings[1].source);

		 		var rottenName = process.argv[3];
			 		for (i = 4; i<process.argv.length; i++){
						rottenName += "_" + process.argv[i];
						}

						console.log(rottenName)
		 		console.log("http://www.rottentomatoes.com/m/" + rottenName);
		 	}
	 	});

	 }

	 else{
	 	request(queryUrl,function(error, response, body){

		 	if(!error && response.statusCode === 200){
		 		var movie = JSON.parse(body);
		 		// console.log(movie);

		 		console.log("The movie is " + movie.Title);
		 		console.log("The movie came out in " + movie.Year);
		 		console.log("The movie is rated " + movie.imdbRating + " on IMDB.");
		 		console.log("The movie was produced in " + movie.Country);
		 		console.log("The movie is in " + movie.Language);
		 		console.log(movie.Plot);
		 		console.log("The actors in the movie are " + movie.Actors)
		 		// console.log(movie.Ratings[1].source);

		 		var rottenName = process.argv[3];
			 		for (i = 4; i<process.argv.length; i++){
						rottenName += "_" + process.argv[i];
						}

						// console.log(rottenName)
		 		console.log("http://www.rottentomatoes.com/m/" + rottenName);
		 	}
	 	});

	 }
}

/* function for do what it says */

function random(){
	var fs = require("fs");
	var dataArr = []

	fs.readFile("random.txt", "utf8", function(err, data){
		 if (err) {
    		return console.log(error);
  		};
  		// console.log(data);
  		var split = data.split(",");
  		// console.log(split)
  		


  		if(split[0] === "spotify-this-song"){
  			song = split[1]
  			// console.log(song)
  			spotify(song);
  		} 

	})	
}














