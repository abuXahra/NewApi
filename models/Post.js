const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    desc: {
        type: String,
        require: true,
        unique: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
    },
    comment: {
        type: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema)