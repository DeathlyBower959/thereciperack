import mongoose from 'mongoose'

const urlSchema = mongoose.Schema({
    urlCode: String,
    longUrl: String,
    date: { type: String, default: Date.now }
})

const Url = mongoose.model('Urls', urlSchema)

export default Url