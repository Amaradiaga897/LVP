import mongoose from "mongoose";

export interface IInterventor extends mongoose.Document{
    id: string;
    nombre: string;
    telefono: string;
    contraseña: string;
    direccion: string;
    Zona_intervecion:string;
}

const InterventorSchema = new mongoose.Schema({
    id: {type: String, required:true},
    nombre: {type: String, required:true},
    telefono: {type: String, required:true},
    contraseña: {type: String, required:true},
    direccion: {type: String, required:true},
    Zona_intervecion:{type: String, required:true}
    
});

export const Interventor = mongoose.model<IInterventor>("Interventor", InterventorSchema);




//probando nueva pc para hacer comando
