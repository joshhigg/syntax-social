const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer');

// api/users routes

// Create new user account
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/send-email', async (req, res) => {
    try {
        // Extract the email address from the request body
        const toEmail = req.body.email;

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'socialsyntax9@gmail.com',
                pass: 'nejp sodx gxah tumj',
            },
        });

        // Define email options
        const mailOptions = {
            from: 'socialsyntax9@gmail.com',
            to: toEmail,
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

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send a response indicating that the email was sent successfully
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' })
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to logout
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;