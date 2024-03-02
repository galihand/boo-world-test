const Joi = require('joi');

const JCreateProfileSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    mbti: Joi.string().optional(),
    enneagram: Joi.string().optional(),
    variant: Joi.string().optional(),
    tritype: Joi.number().optional(),
    socionics: Joi.string().optional(),
    sloan: Joi.string().optional(),
    psyche: Joi.string().optional(),
    image: Joi.string().optional(),
});

module.exports = JCreateProfileSchema;