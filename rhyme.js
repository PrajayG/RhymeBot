var request = require('request')
var cheerio = require('cheerio')

var LyricUrls = []


    request({
        url: "https://www.genius.com",
    }, function(error, response, body) {
            cheerioParser(body)
    });

    function cheerioParser(x) {
        const $ = cheerio.load(x)
        $("a.chart_row").each(function (index){
            var LyricUrls = []
            LyricUrls.push(($(this).attr('href'))) 
            readout(LyricUrls)  
        })
    }

    function readout(x) {
        console.log(x)
    }
console.log(LyricUrls)
