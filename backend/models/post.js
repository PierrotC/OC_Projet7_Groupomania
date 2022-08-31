const mongoose = require('mongoose');
const mongooseErrors = require('mongoose-errors');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: true, default: [] },
    createdAt: { type: String, required: true }
});

postSchema.plugin(mongooseErrors);

module.exports = mongoose.model('Post', postSchema);