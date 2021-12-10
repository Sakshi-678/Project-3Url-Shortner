const express = require('express')
const router = express.Router()
const urlController = require('../Controllers/urlController')


router.post('/url/shorten', urlController.urlShortener)

module.exports = router;