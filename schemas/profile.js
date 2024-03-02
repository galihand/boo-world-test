const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    image: { type: String, default: "https://soulverse.boo.world/images/1.png" },
}, { timestamps: true });

profileSchema.post('save', function (err, doc, next) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new Error('Name must be unique'));
    }
    next();
});

module.exports = mongoose.model('Profile', profileSchema);