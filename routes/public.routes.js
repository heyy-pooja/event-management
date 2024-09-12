const router = require("express").Router()
const publicController = require("../controller/public.controller")

router
    .get("/getAllEvents", publicController.getAllPublicEvent)
    .get("/getAll-Events-Detail/:id", publicController.getAllPublicEventDetails)
// getallEvents
// getventDetails get+id
// bookEvent post

module.exports = router

