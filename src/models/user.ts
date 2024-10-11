import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

export interface userInterface{
    username: string,
    name: string,
    email: string,
    password: string,
    isAdmin?: boolean,
    encryptPassword(password: string): Promise<string>
}

export type UsersInterfacePublicInfo = Pick<userInterface, 'username' | 'name' >
export type newUserInfo = Omit<userInterface,'id'>
export type logUser = Pick<userInterface, 'username' | 'password'>

export const userSchema = new Schema<userInterface>({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } 
    //experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias' }] // Vector de experiencias con referencia a su modelo
})

userSchema.methods.encryptPassword =  async (password:string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt)
};


export const userofDB = model<userInterface>('user',userSchema)