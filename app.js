"use strict";
const nodemailer = require("nodemailer");

const html = `
<h1>Welcome</h1> 
<p>Happy to have you</p>
`

async function main() {
 
const transporter = nodemailer.createTransport({
host: 'mail.openjavascript.info',
port: 465,
secure: true,
auth: {
    user:'test@openjavascript.info',
    pass: 'NodeMailer123!'
}

});

const info = await transporter .sendMail({

        from: 'OpenJavaScript < <test@openjavascript.info>',
        to: 'test2@openjavascript.info',
        subject: 'Testing, testing, 123'
        ,html, html, 
})

console.log("Message sent: " + info.message.Id);

}


main();{ 
trycatch (e => console.loge)};