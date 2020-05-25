import mongoose from "mongoose";
import { IInterventor } from "./interventor.model";
import {IProyecto} from "../models/proyecto.model"

export interface IBeneficiario extends mongoose.Document{
    nombre: string;
    identidad: string;
    telefono: string;
    edad: number;
    direccion: string;
    ocupacion:string;
    interventor: IInterventor;
    proyecto: IProyecto;
}

const BeneficiarioSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    identidad: {type: String, required:true},
    telefono: {type: String, required:true},
    edad: {type: Number, required:true},
    direccion: {type: String, required:true},
    ocupacion: {type: String, required:true},
    interventor: {type: mongoose.Schema.Types.ObjectId, ref: "Interventor"},
    proyecto: {type: mongoose.Schema.Types.ObjectId, ref: "Proyecto"}
});

export const Beneficiario = mongoose.model<IBeneficiario>("Beneficiario", BeneficiarioSchema);