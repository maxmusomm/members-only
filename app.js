const express = require('express');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
// const db = require('./db/query');
const passport_config = require('./config/passport-config');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override')
const dotenv = require('dotenv');
const pool = require('./db/pool');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const messagesRouter = require('./routes/messages');

const app = express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    store: new pgSession({ pool }), // Store sessions in PostgreSQL
    secret: process.env.SESSION_SECRET, // Fix typo from SESSION_SECRECT
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

passport_config.initialize(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/messages', messagesRouter);
app.delete('/messages/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
    });
})


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
