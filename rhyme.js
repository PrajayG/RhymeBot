var request = require('request')
var cheerio = require('cheerio')

var images = require("./image.js");

// Initial Request to Genius for newest songs
request({ 
    url: "https://www.genius.com",}, function(error, response, body) {
        cheerioParser(body)
    });

// Parsing Genius HTML for newest song lyric URLs
function cheerioParser(x) { 
    const $ = cheerio.load(x)
    var LyricUrls = []
    $("a.chart_row").each(function (index){
        LyricUrls.push(($(this).attr('href')))   
    })
    var LyricPage = LyricUrls[Math.floor(Math.random()*LyricUrls.length)];
    scrapeLyrics(LyricPage)
}

// Grabbing the lyrics from the randomly selected page
function scrapeLyrics(page) {
        console.log(page)
        request({
            url: page}, function(error, response, body) {
                const $ = cheerio.load(body)
                    var songLyrics = ($(".lyrics p").text())
                    parseLyrics(songLyrics)
            }
        )
}

// Finding two lines in the same song and removing spaces
function parseLyrics(song) {
    lines = song.split("\n");
    // long way of remove all verse, chorus elements
    lines.forEach(function(element) {
        if (element.startsWith('[')) {
            var index = lines.indexOf(element)
            if (index > -1) {
                lines.splice(index, 1);
            }
        }
    })
    // removing blank spaces
    lines = lines.filter(function(n){ return n != '' }); 


    // replacing brackets for adlibs
    for (i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace("(","")
        lines[i] = lines[i].replace(")","")
    }


    var randomNo = Math.floor(Math.random()*(lines.length - 1))
    var bars = [lines[randomNo], lines[randomNo + 1]]
    console.log(bars)
    constructRhyme(bars)
}

// To do 
function constructRhyme(bars) {
    console.log(bars)
    var bar = bars[Math.floor(Math.random()*bars.length)];
    var rhymingWord = ((bar.split(" ").splice(-1)))
    console.log(rhymingWord)
    request({ 
        url: "https://api.datamuse.com/words?rel_rhy=" + rhymingWord}, function(error, response, body) {
            try {
                images.createImage(bars.toString().replace(rhymingWord, parsedObject[0].word))
                console.log(bars.toString().replace(rhymingWord, parsedObject[0].word))
            } catch (error) {
                images.createImage(bar)
                console.log('Something went wrong ' + error)
            }

    });
}






