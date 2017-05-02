var osmosis = require('osmosis')
var request = require('request')
var answer = ''
// function printError(error) {
// 	console.error(error.message)	}

function findRhyme(y) {

	var url = 'http://rhymebrain.com/talk?function=getRhymes&word=' + y;
	request(url, function (error,response, body) {
	  var results = JSON.parse(body);
	  console.log(results[0].word + ' THE RHYMED WORD');
	  answer = String(results[0].word)	  

	 })
	return answer
	}




// console.log(findRhyme('hello'))


// This is where the program starts. 
osmosis
.get('https://genius.com/')
// only grabbing the most popular song on the list. Find a way to scrape all. 
.find('.home_charts_row:first')
.follow('@href')
.find('.song_body-lyrics  p')
.set('results')
.log(console.log) // INCREDIBLY USEFUL, PLEASE USE MORE WHEN DEBUGGING. 
.data(function(song){
	parser(song.results);
})

// function parseLyrics(x) {
// 	var newText = x.split('\n') // split into line
// 	console.log(newText[1] + ' ' + newText[2]) 		// takes 2nd and 3rd lines
// 	var firstLine = newText[1];
// 	var splitted = newText[1].split(/\s+/) // first line into words 
// 	splitted = splitted[splitted.length-1] // last word of line
// 	console.log(splitted + ' LAST WORD OF THE LINE') 
// 	var rhymedWord = findRhyme(splitted)
// 	console.log(rhymedWord + ' THIS IS THE RHYMED WORD')
// 	var swappedLine = firstLine.replace('beat', rhymedWord)
// 	console.log(swappedLine + ' SWAPPED LINE ')
// 	// returns undefined console.log(rhyme(splitted))
// }


function parser(z) {
	var newText = z.split('\n') // split into line
	console.log(typeof newText)
	var firstLine = newText[1];
	var splitted = newText[1].split(/\s+/) // first line into words 
	splitted = splitted[splitted.length-1] // last word of line
	console.log(splitted)
	console.log(findRhyme(splitted))
	// var url = 'http://rhymebrain.com/talk?function=getRhymes&word=' + splitted
	// request(url, function (error,response, body) {
	//   var results = JSON.parse(body);
	//   console.log(results[0].word + ' THE RHYMED WORD');
	//   var answer = String(results[0].word)
	//   changed = newText[1].replace(splitted, answer)
	//   console.log(changed)

	// });


}

// The issue with the findRhyme function return undefined is 
// that it is wrapped in another function and cannot pass the 


