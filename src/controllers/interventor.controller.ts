import {Application} from "express";
import {InterventorService} from "../services/interventor.service"

export class InterventorController{
    private inter_service: InterventorService;
    constructor(private app: Application){
        this.inter_service = new InterventorService();
        this.routes();
    }

    private routes(){
        this.app.route("/interventores").get(this.inter_service.getAll);
        this.app.route("/interventor").post(this.inter_service.NewOne);
        this.app.route("/interventor/:id_inter/proyectos").get(this.inter_service.getOneWProjects);
       
        this.app.route("/interventor/:id_inter")
        .get(this.inter_service.getOne)
        .put(this.inter_service.Update)
        //.delete(this.inter_service.Delete);
    }
}