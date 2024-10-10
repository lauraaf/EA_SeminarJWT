import { userofDB } from '../models/user'

export const getEntries = {

    // Obtener todos los usuarios
    getAll: async()=>{
    return await userofDB.find();
    },
    // Buscar usuario por ID
    findById: async(id:string)=>{
        return await userofDB.findById(id);
    },
    // Crear un nuevo usuario
    createUser: async(entry:object)=>{
        console.log(entry);
        return await userofDB.create(entry);
    },
    // Actualizar un usuario por ID
    updateUserById: async(id:string,body:object)=>{
        console.log(body);
        return await userofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un usuario por ID
    deleteUserById: async(id:string)=>{
        return await userofDB.findByIdAndDelete(id);
    },
    // Buscar usuari per username
    findByUsername: async(username:string) => {
        console.log(username);
        return await userofDB.findOne({username: username});
    }
}