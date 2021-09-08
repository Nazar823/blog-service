const db = require('../connection')
const commentModel = db.comment
const postModel = db.post
const statusOK = {code: 200, description: 'OK'}
const statusErr = {code: 400, description: 'Bad Request'}

module.exports.createComment = async (req, res) => {
    try {
        const {author, post, text} = req.body
        const findedPost = await postModel.findOne({
            attributes: ['id', 'text'],
            where: {
                id: post
            }
        })
        // console.log(findedPost)
        if (findedPost === null){
            return res.status(statusErr.code).json({message: 'This post not exist!'})
        }
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

module.exports.createPost = async (req, res) => {
    try {
        const {email, password} = req.body
        const findedUser = await post.findOne({
            attributes: ['id', 'password'],
            where: {
                email: email
            }
        })
        if (findedUser === null){
            return res.status(statusErr.code).json({message: 'User not found!'})
        }
        const validPass = bcrypt.compareSync(password, findedUser.password)
        if (!validPass){
            return res.status(statusErr.code).json({message: 'Wrong password!'})
        }
        return res.status(statusOK.code).json({token: getToken(findedUser.id)})
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

function getToken(id) {
    return jwt.sign({id},
        process.env.SECRET_KEY,
        {expiresIn: '96h'})
}