import mongoose from "mongoose";

export interface IInterventor extends mongoose.Document{
    nombre: string;
    telefono: string;
    contraseña: string;
    direccion: string;
}

const InterventorSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    nombre: {type: String, required:true},
    telefono: {type: String, required:true},
    contraseña: {type: String, required:true},
    direccion: {type: String, required:true}
    
});

export const Interventor = mongoose.model<IInterventor>("Interventor", InterventorSchema);