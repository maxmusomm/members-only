var express = require('express');
var router = express.Router();
const db = require('../db/query');
const bycrypt = require('bcryptjs');
const { checkNotAuthentication } = require('../config/passport-config');

/* GET users listing. */
router.get('/', checkNotAuthentication, function (req, res, next) {
    res.render('register');
    next();
});

router.post('/', async (req, res) => {
    try {
        const { name, password, password2 } = req.body;
    /** Password matching  */    if (password !== password2) return res.status(400).send('Passwords do not match');
        const hashedPassword = await bycrypt.hash(password, 10);
        await db.createUser(name, hashedPassword);
        // console.log(name, hashedPassword)
        return res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
        return res.redirect('/error.ejs');
    }
});


module.exports = router;
