const Joi = require('joi');

const EMbti = [
    'INFP',
    'INFJ',
    'ENFP',
    'ENFJ',
    'INTJ',
    'INTP',
    'ENTP',
    'ENTJ',
    'ISFP',
    'ISFJ',
    'ESFP',
    'ESFJ',
    'ISTP',
    'ISTJ',
    'ESTP',
    'ESTJ'
]

const EEnneagram = [
    '1w2',
    '2w3',
    '3w2',
    '3w4',
    '4w3',
    '4w5',
    '5w4',
    '5w6',
    '6w5',
    '6w7',
    '7w6',
    '7w8',
    '8w7',
    '8w9',
    '9w8',
    '9w1'
]

const EZodiac = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces'
]

const JCreateCommentSchema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    profile_id: Joi.string().required(),
    author_id: Joi.string().required().not(Joi.ref('profile_id')),
    mbti: Joi.string().optional().valid(...EMbti),
    enneagram: Joi.string().optional().valid(...EEnneagram),
    zodiac: Joi.string().optional().valid(...EZodiac),
});

const JGetCommentSchema = Joi.object().keys({
    mbti: Joi.string().optional().valid(...EMbti),
    enneagram: Joi.string().optional().valid(...EEnneagram),
    zodiac: Joi.string().optional().valid(...EZodiac),
    profile_id: Joi.string().required(),
});

const JLikeCommentSchema = Joi.object().keys({
    user_id: Joi.string().required(),
});

module.exports = {
    JCreateCommentSchema,
    JGetCommentSchema,
    JLikeCommentSchema
}