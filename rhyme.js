var request = require("request");
var cheerio = require("cheerio");

var images = require("./image.js");
var artistTitle = ''

var Twitter = require("twitter")
var keys = require("./keys.js")
var Jimp = require("jimp")


request({
        url: "https://www.genius.com"
    },
    function (error, response, body) {
        cheerioParser(body);
    }
);

// Parsing Genius HTML for newest song lyric URLs
function cheerioParser(x) {
    const $ = cheerio.load(x);
    var LyricUrls = [];
    $("a.chart_row").each(function (index) {
        LyricUrls.push($(this).attr("href"));
    });
    var LyricPage = LyricUrls[Math.floor(Math.random() * LyricUrls.length)];
    scrapeLyrics(LyricPage);
}

// Grabbing the lyrics from the randomly selected page
function scrapeLyrics(page) {
    console.log(page);
    request({
            url: page
        },
        function (error, response, body) {
            const $ = cheerio.load(body);
            var songLyrics = $(".lyrics p").text();
            var title = $(".header_with_cover_art-primary_info-title").text()
            var artist = $(".header_with_cover_art-primary_info-primary_artist").text()
            artistTitle = artist + ' - ' + title;
            parseLyrics(songLyrics);
        }
    );
}

// Finding two lines in the same song and removing spaces
function parseLyrics(song) {
    lines = song.split("\n");
    // long way of remove all verse, chorus elements
    lines.forEach(function (element) {
        if (element.startsWith("[")) {
            var index = lines.indexOf(element);
            if (index > -1) {
                lines.splice(index, 1);
            }
        }
    });
    // removing blank spaces
    lines = lines.filter(function (n) {
        return n != "";
    });

    // replacing brackets for adlibs
    for (i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace("(", "");
        lines[i] = lines[i].replace(")", "");
    }

    var randomNo = Math.floor(Math.random() * (lines.length - 1));
    var bars = [lines[randomNo], lines[randomNo + 1]];
    console.log(bars);
    constructRhyme(bars);
}


function constructRhyme(bars) {
    console.log(bars);
    var bar = bars[Math.floor(Math.random() * bars.length)];

    var rhymingWord = bar.split(" ").splice(-1);
    console.log(rhymingWord);
    request({
            url: "https://api.datamuse.com/words?rel_rhy=" + rhymingWord
        },
        function (error, response, body) {
            try {
                var parsedObject = JSON.parse(body);
                for (var i = 1; i <= 30; i++) {
                    if (parsedObject[i].numSyllables > 1) {
                        createImage(
                            bars.join(', ').replace(rhymingWord, parsedObject[0].word)
                        );
                        console.log(artistTitle)
                        break
                    } else {
                        console.log('Number of syllables too low')
                    }
                }
                console.log(bars.join(', ').replace(rhymingWord, parsedObject[0].word));
                console.log(rhymingWord)
            } catch (error) {
                console.log("Couldn't find a rhyming word to match" + error);
            }
        })


}

function createImage(text) {
    console.log('Attempting to create image..')
    var image = new Jimp(350, 100, 0x000000FF, function (err, image) {
        // Loading the font 
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
            image.print(font, 50, 20, text, 300);
            console.log('image made')
            var file = "test." + image.getExtension();
            image.write(file, tweetImage)
            console.log('Image write successful')
        });
    })
}


var client = new Twitter({
    consumer_key: keys.CONSUMER_KEY,
    consumer_secret: keys.CONSUMER_SECRET,
    access_token_key: keys.ACCESS_TOKEN,
    access_token_secret: keys.ACCESS_TOKEN_SECRET
});

tweetImage = function () {
    var data = require('fs').readFileSync('test.png');

    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {
        media: data
    }, function (error, media, response) {

        if (!error) {

            // If successful, a media object will be returned.
            console.log('Inital request made');

            // Lets tweet it
            var status = {
                status: artistTitle,
                media_ids: media.media_id_string // Pass the media id string
            }

            client.post('statuses/update', status, function (error, tweet, response) {
                if (!error) {
                    console.log('Tweet posted');
                }
            });

        }
    });
}