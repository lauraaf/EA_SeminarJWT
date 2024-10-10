import express from 'express';
//import * as userServices from '../services/userServices'
import { getUsers, createUser, getUser, updateUser, deleteUser, login, profile } from '../controllers/userController';
import { TokenValidation } from '../middleware/verifyToken';


const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Ruta per crear usuari
router.post("/", createUser);

//Ruta per obtenir usuari per id
router.get("/:id", getUser);

//Ruta per actialitzar usuari per id
router.put("/:id", updateUser);

//Ruta per eliminar user per id
router.delete("/:id", deleteUser);

//Ruta per fer login
router.post("/login", login);

//Ruta per veure el perfil amb token
router.get("/profile", TokenValidation, profile);




export default router 

