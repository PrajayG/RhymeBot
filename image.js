var Jimp = require("jimp");
// TO DO
// Find a way to draw text
// Make a function that can be imported
// Use the file saving function to output the file
// Create a tweet 'module' to use in the main file to tweet
function createImage() {
var image = new Jimp(1000, 1000, function (err, image) {

    Jimp.loadFont(Jimp.FONT_SANS_8_BLACK).then(function (font) {
        image.print(font, 10, 10, "!");
   
    });
    writeImage(image)
    // saving the image, callback once image has been written
    
});

}

function writeImage(image) {
image.write(__dirname, function() {
    var file = "test." + image.getExtension();
    image.write(file)
    
}); 
}

createImage()