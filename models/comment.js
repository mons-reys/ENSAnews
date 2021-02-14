const mongoose = require('mongoose');

const Schema = mongoose.Schema;

commentSchema = new Schema({
    blogId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        required: true
    }
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
