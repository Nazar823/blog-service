const db = require('../connection')
const commentModel = db.comment
const postModel = db.post
const statusOK = {code: 200, description: 'OK'}
const statusErr = {code: 400, description: 'Bad Request'}

module.exports.createComment = async (req, res) => {
    try {
        const {author, post, text} = req.body
        // USING EXIST POST!!!!
        /*const findedPost = await postModel.findOne({
            attributes: ['id'],
            where: {
                id: post
            }
        })
        if (findedPost === null){
            return res.status(statusErr.code).json({message: 'This post not exist!'})
        }*/
        commentModel.create({
            author: author,
            post: post,
            text: text,
            date_time: Date.now()
        })
        return res.status(statusOK.code).json({message: 'Comment posted!'})
    } catch (e) {
        return res.status(statusErr.code).json({message: e.message})
    }
}

module.exports.findCommentsByPost = async (req, res) => {
    try {
        const {post} = req.body
        // USING EXIST POST!!!!
        /*const findedPost = await postModel.findOne({
            attributes: ['id'],
            where: {
                id: post
            }
        })
        if (findedPost === null){
            return res.status(statusErr.code).json({message: 'This post not exist!'})
        }*/
        const findedComments = await commentModel.findAll({
            attributes: ['id', 'author', 'text', 'date_time'],
            where: {
                post: post
            }
        })
        if (findedComments === null){
            return res.status(statusErr.code).json({message: 'This post haven\'t comments!'})
        }
        return res.status(statusOK.code).json(findedComments)
    } catch (e){
        console.log(e.message)
        return res.status(statusErr.code).json({message: e.message})
    }
}

module.exports.checkToken = async (req, res) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const token = req.headers.authorization
        const decodeId = jwt.verify(token, secretKey)
        const findedUser = await post.findOne({
            attributes: ['id'],
            where: {
                id: decodeId.id
            }
        })
        if (findedUser === null){
            return res.status(statusErr.code).json({message: 'Authorization failed', id: null})
        } else {
            return res.status(statusOK.code).json({message: 'Authorization successfully!', id: decodeId.id})
        }
    } catch (e){
        console.log(e.message)
        return res.json(e.message)
    }
}

function existPost(id) {
    const findedPost = postModel.findOne({
            attributes: ['id'],
            where: {
                id: id
            }
        })
        return findedPost === null
}