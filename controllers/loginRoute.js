const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'socialsyntax9@gmail.com',
        pass: 'nejp sodx gxah tumj',
    //   email password: Nodemailer123
    },
});
  
router.get('/send-email', (req, res) => {
    const mailOptions = {
        from: 'socialsyntax9@gmail.com',
        to: 'jr.jimmer201@gmail.com',
        subject: 'testing this email',
        html: `
        <h1>Welcome</h1> 
        <p>Happy to have you</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending email');
        } else {
            console.log('email sent' + info.response);
            res.send('email sent successfully')
        }
    })
});

module.exports = router;