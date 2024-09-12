const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Admin = require("../model/Admin")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/email")
const Events = require("../model/Events")
const upload = require("../utils/upload")

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // const { name, email, password, otp } = req.body

    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(401).json({ message: "All Feild Require", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const result = await Admin.findOne({ email })
    if (!result) {
        console.log(req.body);
        console.log(result);
        return res.status(401).json({
            message: process.env.NODE_ENV === "devolopment" ?
                "Invalid Email" : "Invalid Credientials"
        })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({
            message: process.env.NODE_ENV === "devolopment" ?
                "Invalid Password" : "Invalid Credientials"
        })
    }
    const token = jwt.sign({ uerId: result._id }, process.env.JWT_KEY, { expiresIn: "24h" })
    // send cookie
    res.cookie("admin", token, { maxAge: 1000 * 60 * 60 * 24 })

    res.json({ message: "Creditials Verify Success.OTP Send to Your Register email " })

})

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = await req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ messsage: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {

        return res.status(400).json({ messsage: "Invalid Imail", error })
    }
    // if (!validator.isStrongPassword(password)) {

    //     return res.status(400).json({ messsage: "Create Strong Password" })
    // }
    const isFound = await Admin.findOne({ email })
    if (isFound) {
        return res.status(404).json({ message: "email already registered with us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })
    res.json({ message: "Register Success" })
})
exports.logOutAdmin = asyncHandler(async (req, res) => {
    const { admin } = req.body
    res.clearCookie("admin")
    res.json({ message: "Admin LogOut Success", result: admin })
})
exports.event_add = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const {
                event_name,
                event_address,
                event_time,
                event_seats,
                event_desc,
                event_date,
                images

            } = req.body
            if (err) {
                return res.status(400).json({ messsage: "All Feilds Required", error: err })
            }
            console.log(req.file);

            await Events.create({
                event_name,
                event_address,
                event_time,
                event_seats,
                event_desc,
                event_date,
                images: req.file.filename

            })
            return res.json({ message: "event create sucess" })
            // if (req.file) {
            //     console.log("inside")
            //     const result = await Events.create({ ...req.body, images: req.file.filename })
            //     res.json({ message: "eeven add success", result })

            // } else {
            //     return res.json({ message: "images is require" })
            // }

            // console.log(req.file);

            // const result = Events.create()
            // res.json({ message: "Event Add Success", result })
        })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
})



exports.getAllEvents = asyncHandler(async (req, res) => {
    try {
        const result = await Events.find()
        res.json({ message: "All Events Fetch Success", result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
exports.update_Admin_Events = asyncHandler(async (req, res) => {
    try {
        await Events.findByIdAndUpdate(req.body, req.params.id)
        res.json({ message: "Event Update Success" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
exports.delete_Events = asyncHandler(async (req, res) => {
    try {
        await Events.findByIdAndDelete(req.params.id)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})