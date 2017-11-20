var Jimp = require("jimp");
// TO DO
// Find a way to draw text
// Make a function that can be imported
// Use the file saving function to output the file
// Create a tweet 'module' to use in the main file to tweet

var exports = module.exports = {}

exports.createImage = function(text) {
    var image = new Jimp(600, 400, 0x000000FF, function (err, image) {
        // Loading the font 
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
            image.print(font, 50, 50, text);
            image.write(__dirname, function() {
                var file = "test." + image.getExtension();
                image.write(file)
            }); 
        });
    });
}
