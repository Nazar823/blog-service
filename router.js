const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const statusErr = {code: 400, description: 'Bad Request'}
const {
    createComment
} = require('./controllers/commentController')
const {
    createPost
} =  require('./controllers/postController')

router.post('/api/createComment',
    body('author', 'Author is null')
        .notEmpty(),
    body('text', 'Text field is null!')
        .notEmpty(),
    body('post', 'Post is null!')
        .notEmpty(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createComment(req, res)
    })

router.post('/api/createPost',/*
    body('email', 'Email not valid')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 chars long'),
    body('name', 'Name field null!')
        .notEmpty(),*/

    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createPost(req, res)
    })
// router.post('/api/authorization', checkToken)

module.exports = router
