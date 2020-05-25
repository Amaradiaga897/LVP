import {Application} from "express";
import {BeneficiarioService} from "../services/beneficiario.service"

export class BeneficiarioController{
    private benef_service: BeneficiarioService;
    constructor(private app: Application){
        this.benef_service = new BeneficiarioService();
        this.routes();
    }

    private routes(){
        this.app.route("/beneficiarios").get(this.benef_service.getAll);
        this.app.route("/beneficiario").post(this.benef_service.NewOne);
        this.app.route("/beneficiario/:id_benef/validar").delete(this.benef_service.Validar);
       
        this.app.route("/beneficiario/:id_benef")
        .get(this.benef_service.getOne)
        .delete(this.benef_service.Delete);
    }
}