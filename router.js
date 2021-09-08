const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const statusOK = {code: 200, description: 'OK'}
const statusErr = {code: 400, description: 'Bad Request'}
/*const {
    registration, login, checkToken
} =  require('./controllers/postController')

router.post('/api/login',
        body('email')
            .isEmail()
            .withMessage('Email not valid'),
        body('password', 'Password field null!')
            .notEmpty(),
    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return login(req, res)
    })

router.post('/api/registration',
    body('email', 'Email not valid')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 chars long'),
    body('name', 'Name field null!')
        .notEmpty(),

    function (req, res) {
        const e = validationResult(req)
        if (!e.isEmpty()){
            return res.status(statusErr.code).json({errors: e.array()})
        }
        return registration(req, res)
    })
router.post('/api/authorization', checkToken)*/

module.exports = router
