const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const statusErr = {code: 400, description: 'Bad Request'}
const {
    createComment, findCommentsByPost, deleteComment
} = require('./controllers/commentController')

router.post('/api/createComment',
    body('author', 'Author is not a numeric')
        .isNumeric(),
    body('text', 'Text field is null!')
        .notEmpty(),
    body('post', 'Post is not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createComment(req, res)
    })

router.post('/api/findComments',
    body('post', 'Post is not a numeric')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findCommentsByPost(req, res)
    })

router.post('/api/deleteComment',
    body('id', 'Id is not a numeric')
        .isNumeric(),
    body('author', 'Author is not a numeric')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return deleteComment(req, res)
    })

const {
    createPost, deletePost, findPost, findAuthorPosts
} =  require('./controllers/postController')

router.post('/api/deletePost',
    body('post', 'Post field not a numeric!')
        .isNumeric(),
    body('author', 'Author field not a numeric!')
        .isNumeric(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return deletePost(req, res)
    })

router.post('/api/createPost',
    body('title', 'Title field null!')
        .notEmpty(),
    body('author', 'Author field not a numeric!')
        .isNumeric(),
    body('text', 'Text field null!')
        .notEmpty(),

    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return createPost(req, res)
    })

router.post('/api/findPost',
    body('post', 'Post field not a numeric!')
        .isNumeric(),

    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findPost(req, res)
    })

router.post('/api/findAuthorPosts',
    body('author', 'Author field not a numeric!')
        .isNumeric(),

    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return findAuthorPosts(req, res)
    })

module.exports = router
