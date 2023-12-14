// Import path for working with directories
const path = require('path');
// Import and use Express.js for use with Node JS
const express = require('express');
// Import session to store client data as a cookie
const session = require('express-session');
// Import handlebars.js for dynamically creating HTML based on live data in database
const exphbs = require('express-handlebars');
// Import and use modular routers
const routes = require('./controllers');
// Import helper functions
const helpers = require('./utils/helpers');
// Import database connection
const sequelize = require('./config/connection');
// Import connect-session-sequelize for storing sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// Create port
const PORT = process.env.PORT || 5001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Allows for 15 minute session before requiring another log in
    maxAge: 900000,
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

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
