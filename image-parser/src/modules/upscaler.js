const sharp = require('sharp')

module.exports.upscale = function (buffer, factor) {
    const image = sharp(buffer)
    
    return new Promise((resolve, reject) => {
        image
            .metadata()
            .then(metadata => image
                .resize(metadata.width * factor)
                .grayscale()
                .png()
                .toBuffer())
            .then(resolve)
    })
}