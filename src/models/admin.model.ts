import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
    nombre: string;
    contraseña: string;
    telefono: string;
    direccion: string;
}

const AdminSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    contraseña: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
});

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
