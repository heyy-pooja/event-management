const nodemailer = require("nodemailer")

const sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const transpoart = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    transpoart.sendMail({ to, subject, text: message, html: message },
        err => {
            if (err) {
                console.log(err)
                reject(false)

            } else {
                resolve(true)
            }
        }
    )
})

module.exports = sendEmail