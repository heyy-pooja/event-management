const router = require("express").Router()
const seatBookController = require("../controller/seatBook.controller")

router
    .post("/seat-book", seatBookController.bookSeatUser)

module.exports = router

