var request = require('request')
var cheerio = require('cheerio')

console.log('Helllo')


function grabPage() {
    
    request('https://www.genius.com', function(err, resp, html) {

        console.log('starting scrape')
        if (!err){
        const $ = cheerio.load(html);
        var links = $('a.class_row', this).attr('ng-href');
        console.log(links)
        }
    });
}

grabPage()