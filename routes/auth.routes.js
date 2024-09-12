const router = require("express").Router()
const authController = require("../controller/auth.controller")

router
    .post("/login-admin", authController.loginAdmin)
    .post("/register-admin", authController.registerAdmin)
    .post("/logout-admin", authController.logOutAdmin)
    .post("/event-add-admin", authController.event_add)
    .get("/event-get-admin", authController.getAllEvents)
    .put("/event-update-admin/:id", authController.update_Admin_Events)
    .delete("/event-delete/:id", authController.delete_Events)


module.exports = router

