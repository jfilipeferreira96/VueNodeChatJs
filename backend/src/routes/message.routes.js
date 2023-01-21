const express = require("express");

const router = express.Router();
const messageController = require("../controllers/message.controller");

// Rota responsável por adicionar uma mensagem (POST) localhost:5000/api/messages/addmsg
router.post("/addmsg", messageController.addMessage);

// Rota responsável por trazer todas as mensagens entre 2 clintes ([from, to]) (POST): localhost:5000/api/messages/getmsg
router.post("/getmsg", messageController.getMessages);

module.exports = router;
