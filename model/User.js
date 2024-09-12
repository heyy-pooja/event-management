const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, },
    subject: { type: String, },
    message: { type: String, },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
})
module.exports = mongoose.model("user", userSchema)
