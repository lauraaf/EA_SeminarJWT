"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationProfile = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserProfile_1 = require("./verifyUserProfile");
//import { usersofDB } from '../modelos/types_d_users';
const userServices = __importStar(require("../services/userServices"));
const TokenValidationProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Verifying token Profile');
    const idUserToCheck = req.params.id;
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token)
        return res.status(401).json('Access denied');
    try {
        // Obtenemos de nuevo las datos codificadas del token
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'tokentest');
        console.log(payload.isAdmin);
        // Si es admin, llamamos a next sin bloqueos
        if (payload.isAdmin === true) {
            console.log("Eres admin");
            return next();
        }
        const user = yield userServices.getEntries.findByUsername(payload.username);
        const idUser = user === null || user === void 0 ? void 0 : user.id;
        console.log(user);
        // Si no es admin, continuar al siguiente middleware
        console.log("No eres admin pero vamos a verificar si puedes realizar la acción");
        (0, verifyUserProfile_1.verifyUserOwnership)(idUserToCheck, idUser, res, next);
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
});
exports.TokenValidationProfile = TokenValidationProfile;
