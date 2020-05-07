import { Application } from "express";
import { AdminService } from "../services/admin.service"

export class AdminController {
    private admin_service: AdminService;
    constructor(private app: Application) {
        this.admin_service = new AdminService();
        this.routes();
    }

    private routes() {
        this.app.route("/admin").get(this.admin_service.getAll);

        this.app.route("/admin").post(this.admin_service.NewOne);

        this.app.route("/beneficiario/:id_benef")
            .get(this.admin_service.GetById)
            .put(this.admin_service.Update)
            .delete(this.admin_service.Delete);
    }
}

