"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    //Recollim token escrit al header
    const token = req.header('auth-token');
    //comprovem 
    if (!token)
        return res.status(401).json('Acces denied');
    //Obtenim de nou les dades codificades del token
    const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'tokentest');
    //recollir dades del payload per mostrar el usuari
    return res.json(payload);
    next();
};
exports.TokenValidation = TokenValidation;
