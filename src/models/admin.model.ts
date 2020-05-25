import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
    nombre: string;
    identidad: string;
    password: string;
    telefono: string;
    direccion: string;
}

const AdminSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    identidad: {type: String, required:true},
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
});

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
