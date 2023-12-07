// Import Express and Nodemailer
const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up routes for rendering login and signup pages
router.get('/', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'socialsyntax9@gmail.com',
        pass: 'nejp sodx gxah tumj', // Replace with a secure app password or actual email password
    },
});

// Set up a route for sending a test email
router.get('/send-email', (req, res) => {
    const mailOptions = {
        from: 'socialsyntax9@gmail.com',
        to: 'jr.jimmer201@gmail.com',
        subject: 'Testing this email',
        html: `
            <h1>Welcome</h1> 
            <p>Happy to have you</p>
        `,
    };

    // Send the email and handle the response
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Export the router for use in the main application
module.exports = router;
