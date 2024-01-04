const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    title: {
        type: Array,
        unique: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema)