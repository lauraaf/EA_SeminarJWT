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
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.profile = profile;
const userServices = __importStar(require("../services/userServices"));
//Importem el middleware 
//import {TokenValidation} from '../middleware/verifyToken'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get users");
            const users = yield userServices.getEntries.getAll();
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failes to get users' });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, name, email, password, isAdmin } = req.body;
            console.log('creating user');
            const newUser = { username, name, email, password, isAdmin };
            console.log(newUser);
            const user = yield userServices.getEntries.createUser(newUser);
            user.password = yield user.encryptPassword(user.password);
            console.log(user);
            //Retornem token al crear un usuari
            const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.SECRET || 'tokentest');
            return res.header('auth-token', token).json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const login = { username, password };
        console.log(login);
        const loggedUser = yield userServices.getEntries.findByUsername(login.username);
        console.log(loggedUser);
        if (!loggedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (login.password == loggedUser.password) {
            //Token
            const token = jsonwebtoken_1.default.sign({ username: username, isAdmin: loggedUser.isAdmin }, process.env.SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            loggedUser.password = yield loggedUser.encryptPassword(loggedUser.password);
            return res.json({
                message: "User logged in",
                token
            });
        }
        return res.status(400).json({ error: 'Incorrect password' });
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user');
            const id = req.params.id;
            const user = yield userServices.getEntries.findById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            user.password = yield user.encryptPassword(user.password);
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user');
            const id = req.params.id;
            const { username, name, email, password } = req.body;
            const updatedUser = { username, name, email, password };
            const user = yield userServices.getEntries.updateUserById(id, updatedUser);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            user.password = yield user.encryptPassword(user.password);
            return res.json({
                message: "User updated",
                user
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete user');
            const id = req.params.ideliminado;
            console.log(id);
            const user = yield userServices.getEntries.deleteUserById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            user.password = yield user.encryptPassword(user.password);
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user profile');
            const id = req.params.id; // Obtén el ID del usuario de los parámetros
            // Llama al servicio para encontrar al usuario por su ID
            const user = yield userServices.getEntries.findById(id);
            // Verifica si el usuario existe
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            user.password = yield user.encryptPassword(user.password);
            // Devuelve los datos del usuario
            return res.json(user);
        }
        catch (error) {
            console.error('Error retrieving user profile:', error); // Manejo de errores
            return res.status(500).json({ error: 'Failed to retrieve user profile' });
        }
    });
}
