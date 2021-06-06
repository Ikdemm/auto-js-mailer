require ("dotenv").config()
const nodemailer = require("nodemailer");

async function sendEmails() {

    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        service: 'gmail',
        // port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: 'ikdembenmbarek@gmail.com',
        to: 'gmistah0@gmail.com',
        subject: 'Test',
        text: 'Test'
    }

    transporter.sendMail(mailOptions, (err, data) => {
        console.log(err ? 'Error occured' : 'Email Sent Successfuly')
    })

}

sendEmails();