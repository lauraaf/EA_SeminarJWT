"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import * as userServices from '../services/userServices'
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
// Ruta para obtener todos los usuarios
router.get("/", userController_1.getUsers);
// Ruta per crear usuari
router.post("/", userController_1.createUser);
//Ruta per obtenir usuari per id
router.get("/:id", userController_1.getUser);
//Ruta per actialitzar usuari per id
router.put("/:id", userController_1.updateUser);
//Ruta per eliminar user per id
router.delete("/:id", userController_1.deleteUser);
//Ruta per fer login
router.post("/login", userController_1.login);
//Ruta per veure el perfil amb token
router.get("/:id/profile", verifyToken_1.TokenValidation, userController_1.profile);
exports.default = router;
