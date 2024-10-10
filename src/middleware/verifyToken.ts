import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

interface IPayload{
    username: string;
    iat: number;
    exp: number;
}


export const TokenValidation = (req: Request, res:Response, next:NextFunction) => {
    //Recollim token escrit al header
   const token = req.header('auth-token');
   //comprovem 
   if(!token) return res.status(401).json('Acces denied')
   
    //Obtenim de nou les dades codificades del token
    const payload = jwt.verify(token, process.env.SECRET || 'tokentest') as IPayload;
    //recollir dades del payload per mostrar el usuari
    return res.json(payload);

    next();
}