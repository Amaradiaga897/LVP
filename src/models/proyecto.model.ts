import mongoose from "mongoose";
import {IInterventor} from "../models/interventor.model";
import {IAdmin} from "../models/admin.model";


export interface IProyecto extends mongoose.Document{
    nombre: string;
    id: string;
    departamento: string;
    zona_intervencion: string;
    sede: string;
    interventor:IInterventor;
    admin: IAdmin;
}

const ProyectoSchema = new mongoose.Schema({
    nombre: {type: String, required:true},
    id: {type: String, required:true},
    departamento: {type: String, required:true},
    zona_intervencion: {type: String, required:true},
    sede: {type: String, required:true},
    interventor: {type: mongoose.Schema.Types.ObjectId, ref: "Interventor"},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "Admin"}
});

export const Proyecto = mongoose.model<IProyecto>("Proyecto", ProyectoSchema);