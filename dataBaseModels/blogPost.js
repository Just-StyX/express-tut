const mongoose = require('mongoose');

const Schema = mongoose.Schema

const blogPostSchema = Schema({
    title: { type: String, required: true },
    subTitle: String,
    body: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String
})

module.exports = mongoose.model('BlogPost', blogPostSchema)