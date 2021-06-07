require ("dotenv").config()
const nodemailer = require("nodemailer");
const csv = require("csv-parser");
const fs = require('fs');

async function getDataAndSendEmails() {
    fs.createReadStream('./data/data.csv')
    .pipe(csv())
    .on('data', row => {
        if (row.email && row.university && row.startup && row.email.includes('@')) {
            console.log(row)
            sendEmail(row)
        } else {
            console.log("ERROR FOR: ", row)
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed')
    })
}

async function sendEmail(row) {

    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        service: 'gmail',
        // port: 465,
        secure: true,
        pool: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: {
            name: 'Hult Prize',
            address: 'ikdembenmbarek@gmail.com',
        },
        to: row.email,
        cc: ['nabilah.tarin@hultprize.org'],
        // cc: ['ikdem.benmbarek@aiesec.net'],
        subject: `Showcase the Impact coming straight out of your ${row.university}`,
        attachments: [
            {
                filename:"Press Release Accelerator 2021.pdf",
                path: "data/Press-Release-Accelerator-2021.pdf"
            }
        ],
        text: `Dear ${row.university} Communications Department,

It is my utmost privilege to write to you today as a fellow partner in impact. As you are well aware, or if not allow me to congratulate you on having your students be a part of the Hult Prize Class of 2021 - leading a generation to change the world. My name is Ikdem Ben Mbarek, Junior Public Relations Associate, currently working on shining a light for ${row.startup}, with ${row.participants} representing your university. ${row.startup} has now entered our world-class rated Global Accelerator Program which includes over 2 months of intensive and skill strengthening activities, workshops and milestones programs.
        
With that in mind, please find attached our official Press Release which we would be delighted to have you share with your university communications contact, as well as your community. And be as proud as us in ${row.startup}!
Happy to answer any and all questions you might have. 
Hope to hear from you soon, 
        
Best,
`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err ? `${err}: Error occured` : 'Email Sent Successfuly')
        if (data) console.log('Email Sent')
    })

}

getDataAndSendEmails();