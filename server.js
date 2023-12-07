const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of Handlebars engine with helpers
const hbs = exphbs.create({ helpers });

// Configure session
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 3000000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Use session middleware
app.use(session(sess));

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming forms
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use defined routes
app.use(routes);

// Sync with the database and start listening on the specified port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
