const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: "urlCode is required"
    },
    longUrl: {
        type: String,
        trim: true,
        required: "longUrl is required"
    },
    shortUrl: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: "shortUrl is required"
    }

}, { timestamps: true })

module.exports = mongoose.model('Url', urlSchema)
