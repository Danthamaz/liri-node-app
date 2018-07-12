require("dotenv").config();
const fs = require('fs');
const keys = require("./keys.js");
const request = require("request");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
  client.get("statuses/user_timeline.json", { count: 20 }, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      return console.log("Twitter error occurred: " + error);
    }
    console.log(
      "Here are your most recent tweets: \n----------------------------------"
    );
    let tweetNumber = 1;
    tweets.forEach(element => {
      console.log("Tweet #" + tweetNumber + ": " + '"' + element.text + '"');
      console.log("   Posted at: " + element.created_at);
      tweetNumber++;
    });
  });
}

if (process.argv[2] === "spotify-this-song") {
  let songName = process.argv[3];
  spotify.search({ type: "track", query: songName, limt: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Spotify error occurred: " + err);
    }
    console.log(
      "Here is info for the track '" +
        songName +
        "':\n-------------------------------------------------"
    );
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Play track at: " + data.tracks.items[0].external_urls.spotify);
  });
}

if (process.argv[2] === "movie-this") {
  let tempName = process.argv[3];
  if (tempName === undefined) {
    tempName = "Mr. Nobody";
  }
  let movieName = tempName.split(" ").join("+");
  request(
    "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy",
    function(error, response, body) {
      if (error) {
        return console.log("OMDb received an error: " + error);
      }
      let res = JSON.parse(body);
      console.log(
        res.Title + " information: \n----------------------------------"
      );
      console.log("Released in year: " + res.Year);
      console.log("IMDB Rating: " + res.imdbRating);
      console.log("Rotten Tomatoes Rating: " + res.Ratings[1].Value);
      console.log("Produced in: " + res.Country);
      console.log("Language: " + res.Language);
      console.log("Plot: " + res.Plot);
      console.log("Actors: " + res.Actors);
    }
  );
}
if (process.argv[2] === "do-what-it-says") {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        var firstWord = data.replace(/ .*/,'');
        console.log(firstWord);

        // Make previous if statements into functions to be called easier
        // split name by ""
      });
}

