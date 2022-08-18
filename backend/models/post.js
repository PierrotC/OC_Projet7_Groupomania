const mongoose = require('mongoose');
const mongooseErrors = require('mongoose-errors');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true, default: [] }
});

postSchema.plugin(mongooseErrors);

module.exports = mongoose.model('Post', postSchema);