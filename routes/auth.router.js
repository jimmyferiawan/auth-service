const authRouter = require("express").Router()
const {createUser, findOneUser, verifyToken, verifyUserOwn} = require('../controllers/auth.controller')

authRouter.post('/signup', createUser)
authRouter.post('/signin', findOneUser)
authRouter.get('/authorize', verifyToken)
authRouter.get('/authorizeOwn', verifyUserOwn)

module.exports=authRouter