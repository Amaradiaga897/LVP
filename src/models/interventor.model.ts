import mongoose from "mongoose";

export interface IInterventor extends mongoose.Document{
    nombre: string;
    password: string;
    telefono: string;
    direccion: string;
    zona_intervencion: string;
}

const InterventorSchema = new mongoose.Schema({
    //_id: {type: String, required:true},
    nombre: {type: String, required:true},
    password: {type: String, required:true},
    telefono: {type: String, required:true},
    direccion: {type: String, required:true},
    zona_intervencion: {type: String, required:true}
});

export const Interventor = mongoose.model<IInterventor>("Interventor", InterventorSchema);