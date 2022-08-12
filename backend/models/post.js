const mongoose = require('mongoose');
const mongooseErrors = require('mongoose-errors');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, required: true },
    usersLiked: { type: [String], required: true }
});

postSchema.plugin(mongooseErrors);

module.exports = mongoose.model('Post', postSchema);