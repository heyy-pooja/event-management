const asyncHandler = require("express-async-handler")
const User = require("../model/User")
const sendEmail = require("../utils/email")
const { checkEmpty } = require("../utils/checkEmpty")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



// userMail
exports.userfirstName = asyncHandler(async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            phone,
            subject,
            message,
        } = req.body

        const result = await User.create(req.body)
        await sendEmail({
            to: req.body.email,
            subject: "hellooo",
            message: `${req.body.firstname},welcome to sparks events`
        })
        res.json(result)

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error.message })
    }
})

exports.registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    const { error, isError } = checkEmpty({ firstname, lastname, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required" })
    }
    await User.create(req.body)
    res.json({ message: "User Register Success" })
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // const { name, email, password, otp } = req.body

    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(401).json({ message: "All Feild Require", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const result = await User.findOne({ email })
    if (!result) {
        console.log(req.body);
        console.log(result);
        return res.status(401).json({
            message: process.env.NODE_ENV === "devolopment" ?
                "Email Not Found" : "Invalid Credientials"
        })
    }

    res.json({
        message: "Register User Success ", result: {
            _id: result._id,
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email
        }
    })

})

// exports.loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body
//     // const { name, email, password, otp } = req.body

//     const { isError, error } = checkEmpty({ email, password })
//     if (isError) {
//         return res.status(401).json({ message: "All Feild Require", error })
//     }
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: "Invalid Email" })
//     }
//     const result = await User.findOne({ email })
//     if (!result) {
//         console.log(req.body);
//         console.log(result);
//         return res.status(401).json({
//             message: process.env.NODE_ENV === "devolopment" ?
//                 "Invalid Email" : "Invalid Credientials"
//         })
//     }
//     // const isVerify = await bcrypt.compare(password, result.password)
//     // if (!isVerify) {
//     //     return res.status(401).json({
//     //         message: process.env.NODE_ENV === "devolopment" ?
//     //             "Invalid Password" : "Invalid Credientials"
//     //     })
//     // }
//     const token = jwt.sign({ uerId: result._id }, process.env.JWT_KEY, { expiresIn: "24h" })
//     // send cookie
//     res.cookie("admin", token, { maxAge: 1000 * 60 * 60 * 24 })

//     res.json({ message: "Login User Success" })

// })

exports.logOutUser = asyncHandler(async (req, res) => {
    const { user } = req.body
    res.clearCookie("user")
    res.json({ message: "User LogOut Success", result: user })
})











