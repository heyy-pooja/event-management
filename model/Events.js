

const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

    event_name: { type: String },
    event_address: { type: String },
    event_time: { type: String },
    event_seats: { type: Number, },
    images: { type: [String] },
    event_desc: { type: String },
    event_date: { type: Date },

    // for limitade seats code
    name: { type: String },
    totalSeats: { type: Number },
    bookedSeats: { type: Number, default: 0 },
    date: { type: Date },

}, { timestamps: true })

module.exports = mongoose.model("event", eventSchema)