"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser_1 = require("./verifyUser");
const TokenValidation = (req, res, next) => {
    console.log('Verifying token');
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token)
        return res.status(401).json('Access denied');
    try {
        // Obtenemos de nuevo las datos codificadas del token
        console.log('hola');
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'tokentest');
        console.log(payload.isAdmin);
        // Si es admin, llamamos a next sin bloqueos
        if (payload.isAdmin === true) {
            console.log("Eres admin");
            return next();
        }
        // Si no es admin, continuar al siguiente middleware
        console.log("No eres admin pero vamos a verificar si puedes realizar la acción");
        (0, verifyUser_1.verifyUserOwnership)(req, res, next);
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
exports.TokenValidation = TokenValidation;
