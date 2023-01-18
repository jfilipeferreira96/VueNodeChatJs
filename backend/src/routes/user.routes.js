const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

// Rota responsável por Criar um novo 'User': (POST): localhost:5000/api/auth/register
router.post("/register", userController.register);

// Rota responsável por realizar um novo login 'User': (POST): localhost:5000/api/auth/login
router.post("/login", userController.login);

// Rota responsável por retornar todos os users: (GET): localhost:5000/api/auth/allusers
router.get("/allusers/:id", userController.getAllUsers);

// Rota responsável por colocar imagem no perfil: (POST): localhost:5000/api/auth/setavatar/:id
router.post("/setavatar/:id", userController.setAvatar);

// Rota responsável por retornar fazer logout 'User': (GET): localhost:5000/api/auth/logout/:id
router.get("/logout/:id", userController.logOut);

module.exports = router;
