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
  
router.get('/send-email', async (req, res) => {
    // const userData = await User.findOne({ where: { email: req.body.email } });
    const mailOptions = {
        from: 'socialsyntax9@gmail.com',
        to: 'jr.jimmer201@gmail.com',
        subject: 'Welcome to Social Syntax!',
        html: `
        <h1>Welcome to Social Syntax, the ultimate social media platform tailored for software engineers like you!</h1> 
        <p>We're thrilled to have you join our community of like-minded individuals who share a passion for coding, innovation, and all things tech.</p>
        <h2>At Social Syntax, you can:</h2>
        <ol>
            <li>Connect with Peers: Build meaningful connections with fellow software engineers from around the globe. Share your experiences, insights, and learn from others in the field.</li>
            <li>Stay Informed: Stay up-to-date with the latest trends, technologies, and industry news. Our platform is designed to keep you informed about what's happening in the dynamic world of software engineering.</li>
            <li>Participate in Discussions: Engage in discussions on various tech topics, seek advice, and contribute to conversations that matter. Your unique perspective is valuable to our community.</li>
        </ol>
        <p>Feel free to reach out if you have any questions or need assistance navigating the platform. We're here to support you in making the most of your Social Syntax experience.</p>
        <p>Happy coding!</p>
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