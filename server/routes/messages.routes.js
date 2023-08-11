const express = require('express');
const router = express.Router();

const {getAllMessages,createMessage} = require('../controllers/messages')


router.get('/messages/:senderId/:receiverId', getAllMessages);
router.post('/messages', createMessage);

module.exports = router