const mongoose = require("mongoose")

const bookSeatSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    event_name: { type: String, required: true },
    event_time: { type: String, required: true },
    event_address: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },

  


}, { timestamps: true })

module.exports = mongoose.model("seateBook", bookSeatSchema)