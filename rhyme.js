var request = require('request')
var cheerio = require('cheerio')



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

// Finding two lines in the same song 
function parseLyrics(song) {
    var lines = song.split('\n')
    lines = lines.filter(function(n){ return n != undefined })
    var randomNo = Math.floor(Math.random()*(lines.length - 1))
    console.log(lines[randomNo])
    console.log(lines[randomNo + 1])
}
