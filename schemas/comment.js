const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    profile_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    mbti: String,
    enneagram: String,
    zodiac: String,
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);