const asyncHandler = require("express-async-handler")
const Events = require("../model/Events")

exports.getAllPublicEvent = asyncHandler(async (req, res) => {
    const result = await Events.find()
    res.json({ message: "Public All Events Fetch Success", result })

})

exports.getAllPublicEventDetails = asyncHandler(async (req, res) => {
    const result = await Events.findById(req.params.id)
    res.json({ message: "Public GetEventsDetails Sucess", result })

})

exports.getAllEvents = asyncHandler(async (req, res) => {
    const result = Events.findById(req.params.id)
    res.json({ message: "fetch all events are sucess" })
})
