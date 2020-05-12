import mongoose from "mongoose";

export interface IInterventor extends mongoose.Document{
    nombre: string;
    identidad: string;
    password: string;
    telefono: string;
    direccion: string;
    zona_intervencion: string;
}

const InterventorSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    identidad: {type: String, required:true},
    password: {type: String, required:true},
    telefono: {type: String, required:true},
    direccion: {type: String, required:true},
    zona_intervencion: {type: String, required:true}
});

export const Interventor = mongoose.model<IInterventor>("Interventor", InterventorSchema);




//probando nueva pc para hacer comando
