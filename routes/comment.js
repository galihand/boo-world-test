const express = require('express');
const Comment = require('../schemas/comment');
const { JCreateCommentSchema, JGetCommentSchema, JLikeCommentSchema } = require('../validations/comment');
const router = express.Router();


module.exports = function () {
    router.get('/:profile_id', async function (req, res, next) {
        try {
            const orderType = req.query.orderType === 'likes' ? { likeslength: -1 } : { createdAt: -1 };
            const { mbti, enneagram, zodiac } = req.query;

            const { value, error } = JGetCommentSchema.validate({
                profile_id: req.params.profile_id,
                ...(mbti ? { mbti: mbti } : {}),
                ...(enneagram ? { enneagram: enneagram } : {}),
                ...(zodiac ? { zodiac: zodiac } : {})
            });

            if (error) {
                throw new Error(error);
            }

            const comments = await Comment.find(value).sort(orderType).populate('author_id', 'name').exec();

            res.status(200).json(comments);
        } catch (error) {
            res.status(400).json({
                error_code: 'GET_COMMENT_FAILED',
                message: error.message
            });
        }
    })



    router.post('/:profile_id', async function (req, res, next) {
        try {
            const { value, error } = JCreateCommentSchema.validate({
                ...req.body,
                profile_id: req.params.profile_id
            });

            if (error) {
                throw new Error(error);
            }

            const newComment = new Comment(value);
            await newComment.save();

            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({
                error_code: 'CREATE_COMMENT_FAILED',
                message: error.message
            });
        }
    })

    router.patch('/:comment_id/like', async function (req, res, next) {
        try {
            const { value, error } = JLikeCommentSchema.validate(req.body);

            if (error) {
                throw new Error(error);
            }
            const comment = await Comment.findOne({ _id: req.params.comment_id });
            if (comment) {
                if (comment.likes.indexOf(value.user_id) !== -1) {
                    comment.likes = comment.likes.filter((id) => id.toString() !== value.user_id);
                } else {
                    comment.likes.push(value.user_id);
                }
                await comment.save();

                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(400).json({
                error_code: 'LIKE_COMMENT_FAILED',
                message: error.message
            });
        }
    })

    return router;
}