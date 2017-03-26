

var osmosis = require('osmosis')
var request = require('request')
var rhymingWord = 'Percocets'





function printError(error) {
	console.error(error.message)	}

// "http://rhymebrain.com/talk?function=getRhymes&word=h" 
function findRhyme(y) {
request('http://rhymebrain.com/talk?function=getRhymes&word=' + y, function (error, response, body) {
  var results = JSON.parse(body);
  // console.log(results[0].word + ' THE RHYMED WORD');
  console.log(String(results[0].word))
  return (8 * 8);
  

});
}

function square(x) {
   return x * x;
}

console.log(square(3))

console.log(findRhyme('hello'))


// http://rhymebrain.com/talk?function=getRhymes&word=hello Use this JSON api to get
// the actual rhymes. Much more accurate than rhyme dictionary. 


osmosis
.get('https://genius.com/')
.find('.home_charts_row:last')
.follow('@href')
.find('.lyrics p')
.set('results')
.data(function(song){
	parseLyrics(song.results);
})

function parseLyrics(x) {
	var newText = x.split('\n') // split into line
	console.log(newText[1] + ' ' + newText[2]) // takes 2nd and 3rd lines
	var firstLine = newText[1];
	var splitted = newText[1].split(/\s+/) // first line into words 
	splitted = splitted[splitted.length-1] // last word of line
	console.log(splitted + ' LAST WORD OF THE LINE') 
	var rhymedWord = findRhyme(splitted)
	console.log(rhymedWord + ' THIS IS THE RHYMED WORD')
	var swappedLine = firstLine.replace('beat', rhymedWord)
	console.log(swappedLine + ' SWAPPED LINE ')
	// returns undefined console.log(rhyme(splitted))
}




// home_charts_row home_charts_row--big home_charts_row--big_border

// home_charts_row home_charts_row--big

// home_charts_row
// Intro]\nTold her how it is\nHendrix\nI promise, I swear, I swear\nYou heard, spit it, yo\n\n[Chorus]\nPercocets, molly, Percocets\nPercocets, molly, Percocets\nRep the set, gotta rep the set\nChase a check, never chase a bitch\nMask on, fuck it, mask off\nMask on, fuck it, mask off\nPercocets, molly, Percocets\nChase a check, never chase a bitch\nDon\'t chase no bitches\n\n[Verse 1]\nTwo cups, toast up with the gang\nFrom food stamps to a whole \'nother domain\nOut the bottom, I’m the livin\' proof (Super)\nAin\'t compromising, half a million on the Coupe\nDrug houses, lookin\' like Peru\nGraduated, I was overdue\nPink molly, I can bare
