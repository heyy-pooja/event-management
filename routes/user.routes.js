const router = require("express").Router()
const userController = require("../controller/user.controller")

router
    .post("/user-mail", userController.userfirstName)
    .post("/user-register", userController.registerUser)
    .post("/user-login", userController.loginUser)
    .post("/user-logout", userController.logOutUser)


module.exports = router

