import mongoose from "mongoose";

export interface ISeguimiento extends mongoose.Document {
    fecha: string;
    etapa: string;
    asistencia: number;
    puntaje: number;
}

const SeguimientoSchema = new mongoose.Schema({
    //_id: {type:String, required:true},
    fecha: { type: String, required: true },
    etapa: {type: String, required: true},
    asistencia: { type: Number, required: true},
    puntaje: { type: Number, required: true}
});



export const Seguimiento = mongoose.model<ISeguimiento>("Seguimiento", SeguimientoSchema);

//probando