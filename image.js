var Jimp = require("jimp");

var image = new Jimp(256, 256, function (err, image) {

    image.background(0x1d1d1d)
    


    // saving the image, callback once image has been written
    image.write(__dirname, function() {
        var file = "tester." + image.getExtension();
        image.write(file)
    });    
});