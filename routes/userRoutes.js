const userController = require("../controllers/userController")
const isAuth = require("../middleware/authMiddleware")
const upload = require("../upload")

const Router = require("express").Router()
Router.get("/users",userController.getUsers)
Router.get("/user",userController.getUser)
Router.post('/register',userController.register)
Router.post('/login',userController.login)
Router.post('/updateUser',userController.updateUser)
Router.post('/deleteUser',isAuth,userController.deleteUser)



module.exports=Router