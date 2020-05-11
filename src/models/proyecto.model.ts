import mongoose from "mongoose";

export interface IProyecto extends mongoose.Document{
    id_proyecto:string;
    nombre_proyecto: string;
    fecha: string;
    sede: string;
    etapa: string;
    zona_intervencion: string;
    num_asistencia: number;
    //Interventor:string;
}

const ProyectoSchema = new mongoose.Schema({
    //_id: {type: String, required:true},
    id_proyecto: {type: String, required: true},
    nombre_proyecto: {type: String, required:true},
    fecha: {type: String, required:true},
    sede: {type: String, required:true},
    etapa: {type: String, required:true},
    zona_intervencion: {type: String, required:true},
    num_asistencia: {type: Number, required:true}
});

export const Proyecto = mongoose.model<IProyecto>("Proyecto", ProyectoSchema);