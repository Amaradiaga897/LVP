import {Application} from "express";
import {SeguimientoService} from "../services/seguimiento.service"

export class SeguimientoController{
    private seguimiento_service: SeguimientoService;
    constructor(private app: Application){
        this.seguimiento_service = new SeguimientoService();
        this.routes();
    }

    private routes(){
        this.app.route("/seguimientos").get(this.seguimiento_service.getAll);
        this.app.route("/seguimiento").post(this.seguimiento_service.NewOne);
    }
}