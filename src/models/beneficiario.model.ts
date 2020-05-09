import mongoose from "mongoose";
import { IInterventor } from "./interventor.model";

export interface IBeneficiario extends mongoose.Document{
    nombre: string;
    telefono: string;
    edad: number;
    direccion: string;
    ocupacion:string;
    interventor: IInterventor;
}

const BeneficiarioSchema = new mongoose.Schema({
    //_id: {type: String, required:true},
    nombre: {type: String, required:true},
    telefono: {type: String, required:true},
    edad: {type: Number, required:true},
    direccion: {type: String, required:true},
    ocupacion: {type: String, required:true},
    interventor: {type: mongoose.Schema.Types.ObjectId, ref: "Interventor"}
});

export const Beneficiario = mongoose.model<IBeneficiario>("Beneficiario", BeneficiarioSchema);