const express = require('express');
const router = express.Router();
const db = require('../db/query');
const { checkAuthentication } = require('../config/passport-config');


router.get('/', checkAuthentication, async (req, res) => {
    const messages = await db.getAllMessages();
    const messagesWithUser = await Promise.all(messages.map(async (msg) => {
        const user = await db.getUserById(msg.user_id); //req.user.name

        return {
            ...msg,
            username: user.name
        }
    }))


    return res.render('messages', { messagesTitle: "Messages", messages: messagesWithUser || [] });
});

router.post('/', checkAuthentication, async (req, res) => {
    const { title, content } = req.body;
    const userid = await db.getUserByName(req.user.name);
    await db.createMessage(title, content, userid.id);
    return res.redirect('/messages');
})


module.exports = router