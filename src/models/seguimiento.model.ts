import mongoose from "mongoose";
import { IInterventor } from "./interventor.model";
import {IProyecto} from "../models/proyecto.model"

export interface ISeguimiento extends mongoose.Document {
    fecha: string;
    etapa: string;
    asistencia: number;
    puntaje: number;
    proyecto: IProyecto;
    interventor:IInterventor;
}

const SeguimientoSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    etapa: {type: String, required: true},
    asistencia: { type: Number, required: true},
    puntaje: { type: Number, required: true},
    proyecto: {type: mongoose.Schema.Types.ObjectId, ref: "Proyecto"},
    interventor: {type: mongoose.Schema.Types.ObjectId, ref: "Interventor"}
});



export const Seguimiento = mongoose.model<ISeguimiento>("Seguimiento", SeguimientoSchema);