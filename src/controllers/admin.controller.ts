import { Application } from "express";
import { AdminService } from "../services/admin.service"

export class AdminController {
    private admin_service: AdminService;
    constructor(private app: Application) {
        this.admin_service = new AdminService();
        this.routes();
    }

    private routes() {
        this.app.route("/admins").get(this.admin_service.getAll);
        this.app.route("/admin").post(this.admin_service.NewOne);
        this.app.route("/admin/:id_admin/interventores").get(this.admin_service.getOneWInter);
        this.app.route("/admin/:id_admin/proyectos").get(this.admin_service.getOneWProjects);

        this.app.route("/admin/:id_admin")
            .get(this.admin_service.getOne)
            .put(this.admin_service.Update)
            //.delete(this.admin_service.Delete);
    }
}

