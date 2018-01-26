const Tesseract = require('tesseract.js')

module.exports.parse = function (imageLike) {
    return new Promise (resolve => {
        Tesseract.recognize(imageLike, {
            lang: 'rus'
        })
            .then(result => resolve(result.text))
            .catch(console.log)
    })
}