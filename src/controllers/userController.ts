import { Request, Response } from "express";
import { userInterface } from "../models/user";
import * as userServices from "../services/userServices";


//Importem el middleware 
//import {TokenValidation} from '../middleware/verifyToken'

import jwt from 'jsonwebtoken'


export async function getUsers(_req: Request, res: Response): Promise<Response> {
   try {
    console.log("Get users");
    const users = await userServices.getEntries.getAll();
    return res.json(users);
   } catch (error) {
    return res.status(500).json({ error:'Failes to get users'});
   }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username, name, email, password, isAdmin } = req.body as userInterface;
        console.log('creating user');
        const newUser: Partial<userInterface> = { username, name, email, password, isAdmin };
        console.log(newUser);
        const user = await userServices.getEntries.createUser(newUser);
        user.password = await user.encryptPassword(user.password);
        console.log(user);
        //Retornem token al crear un usuari
        const token: string = jwt.sign({username: user.username}, process.env.SECRET || 'tokentest')
        return res.header('auth-token', token).json(user); 
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function login(req:Request, res: Response): Promise<Response> {
    const {username, password} =  req.body;
    const login =  { username, password };
    console.log(login);
    const loggedUser = await userServices.getEntries.findByUsername(login.username);
    console.log(loggedUser);
    if(!loggedUser){
        return res.status(404).json({ error: 'User not found'})
    } 
    if(login.password == loggedUser.password){
        //Token
        const token: string = jwt.sign({ username: username, isAdmin : loggedUser.isAdmin }, process.env.SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        })
        
        return res.json({
            message: "User logged in",
            token
        });
    }
    return res.status(400).json({ error: 'Incorrect password'})
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user');
        const id = req.params.id;
        const user = await userServices.getEntries.findById(id);

        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try{
        console.log('Get user');
        const id = req.params.id;
        const { username, name, email, password } = req.body as userInterface;
        const updatedUser: Partial<userInterface> = { username, name, email, password };
        const user = await userServices.getEntries.updateUserById(id, updatedUser);

        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        return res.json({
            message: "User updated",
            user
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try{
        console.log('Delete user');
        const id = req.params.ideliminado;
        console.log(id);
        const user = await userServices.getEntries.deleteUserById(id);

        if (!user){
            return res.status(404).json({ error: `User with id ${id} not found` });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}
export async function profile(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user profile');
        const id = req.params.id; // Obtén el ID del usuario de los parámetros

        // Llama al servicio para encontrar al usuario por su ID
        const user = await userServices.getEntries.findById(id);

        // Verifica si el usuario existe
        if (!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }

        // Devuelve los datos del usuario
        return res.json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error); // Manejo de errores
        return res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
}


