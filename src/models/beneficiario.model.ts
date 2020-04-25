import mongoose from "mongoose";

export interface IBeneficiario extends mongoose.Document{
    nombre: string;
    telefono: string;
    edad: number;
    direccion: string;
    ocupacion:string;
}

const BeneficiarioSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    nombre: {type: String, required:true},
    telefono: {type: String, required:true},
    edad: {type: Number, required:true},
    direccion: {type: String, required:true},
    ocupacion: {type: String, required:true}
});

export const Beneficiario = mongoose.model<IBeneficiario>("Beneficiario", BeneficiarioSchema);