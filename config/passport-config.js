const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db/query');

const initialize = (passport) => {

    const authenticatUser = async (name, password, done) => {
        const user = await db.getUserByName(name);
        if (user == null) {
            return done(null, false, { message: "No user by that name here" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" })
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',

    }, authenticatUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        const user = await db.getUserById(id);
        done(null, user);
    });
};

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const checkNotAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/messages');
    }
    next();
}

module.exports = { initialize, checkAuthentication, checkNotAuthentication };
