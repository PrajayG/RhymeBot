var Jimp = require("jimp");
// TO DO
// Find a way to draw text
// Make a function that can be imported
// Use the file saving function to output the file
// Create a tweet 'module' to use in the main file to tweet
var Twitter = require("twitter")
var keys = require("./keys.js")

var exports = module.exports = {}



exports.createImage = function(text) {
    var image = new Jimp(350, 100, 0x000000FF, function (err, image) {
        // Loading the font 
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
            image.print(font, 50, 20, text, 300);
            image.write(__dirname, function() {
                var file = "test." + image.getExtension();
                image.write(file)
            }); 
        });
    });
}

sendTweet = function(x) {
    tweetImage(x)
}

var client = new Twitter({
    consumer_key: keys.CONSUMER_KEY,
    consumer_secret: keys.CONSUMER_SECRET,
    access_token_key: keys.ACCESS_TOKEN,
    access_token_secret: keys.ACCESS_TOKEN_SECRET
});

tweetImage = function(x) {
    var data = require('fs').readFileSync('test.png');

    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {media: data}, function(error, media, response) {
    
      if (!error) {
    
        // If successful, a media object will be returned.
        console.log(media);
    
        // Lets tweet it
        var status = {
          status: x,
          media_ids: media.media_id_string // Pass the media id string
        }
    
        client.post('statuses/update', status, function(error, tweet, response) {
          if (!error) {
            console.log(tweet);
          }
        });
    
      }
    });
}
