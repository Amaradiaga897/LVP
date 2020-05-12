import {Application} from "express";
import {ProyectoService} from "../services/proyecto.service"

export class ProyectoController{
    private proyec_service: ProyectoService;
    constructor(private app: Application){
        this.proyec_service = new ProyectoService();
        this.routes();
    }

    private routes(){
        this.app.route("/proyectos").get(this.proyec_service.getAll);

        this.app.route("/proyecto").post(this.proyec_service.NewOne);
       
        this.app.route("/proyecto/:id_proyec")
        .get(this.proyec_service.GetById)
        .put(this.proyec_service.Update)
        .delete(this.proyec_service.Delete);
    }
}