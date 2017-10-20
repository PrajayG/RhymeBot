var request = require('request')
var cheerio = require('cheerio')

var LyricUrls = []


function grabLyricUrls(x) {  
    request('https://www.genius.com', function(err, resp, html) {   
        console.log('starting scrape')
        if (!err){
        const $ = cheerio.load(html);
        $("a.chart_row").each(function (index){
            x.push(($(this).attr('href')))   
        })
        }
    });
}


var hello = grabLyricUrls(LyricUrls)