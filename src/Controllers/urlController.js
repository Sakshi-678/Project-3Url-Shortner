const urlModel = require('../models/urlModel')
const shortUniqueId = require('short-unique-id')
const isUrlValid = require('url-validation')

const isValid = function (value, type) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == 'string' && value.trim().length == 0) return false
    return true
}
const isValidReqBody = function (value) {
    return Object.keys(value).length > 0
}

const urlShortener = async function (req, res) {
    const requestBody = req.body

    //validation starts
    if (!isValidReqBody(requestBody)) {
        res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide url details' })
        return
    }
    const { longUrl } = requestBody  // destructuring

    if (!isValid(longUrl)) {
        res.status(400).send({ status: false, message: "longUrl is required" })
        return
    }
    if (!isUrlValid(longUrl.trim())) {
        res.status(400).send({ status: false, message: "longUrl is not valid, Please provide valid url" })
        return
    }
    // validation Ends

    const isShortUrlAlreadyAvailable = await urlModel.findOne({ longUrl })

    if (isShortUrlAlreadyAvailable) {
        const { longUrl, shortUrl, urlCode } = isShortUrlAlreadyAvailable
        const urlDetails = { longUrl, shortUrl, urlCode }
        return res.status(200).send({ satus: true, data: urlDetails })
    }

    const uid = new shortUniqueId({ length: 5 });
    uid.setDictionary('alpha_lower');
    const urlCode = uid();
    const shortUrl = "http://localhost:3000/" + urlCode
    const urlDetails = { longUrl, shortUrl, urlCode }
    const newUrl = await urlModel.create(urlDetails)
    const resUrl = { longUrl: newUrl.longUrl, shortUrl, urlCode }


    return res.status(200).send({ satus: true, data: resUrl })

}


module.exports = { urlShortener }