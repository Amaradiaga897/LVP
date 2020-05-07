import { Request, Response } from "express";
import { Admin, IAdmin } from "../models/admin.model"
import { MongooseDocument } from "mongoose"
import { resolve } from "dns"

class AdminHelpers {

    GetAdmin(id_admin: string): Promise<IAdmin> {
        return new Promise<IAdmin>((resolve) => {
            Admin.findById(id_admin, (err: Error, admin: IAdmin) => {
                if (err) {
                    console.log(err.message);
                }
                resolve(admin);
            });
        });
    }
}

export class AdminService extends AdminHelpers {
    public getAll(req: Request, res: Response) {
        Admin.find({}, (err: Error, admin: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin)
        });
    }

    public async GetById(req: Request, res: Response) {
        const my_admin = await super.GetAdmin(req.params.id_admin);
        res.status(200).send(my_admin);
    }

    //Payload
    public Update(req: Request, res: Response) {
        //console.log("entro"); esta es una practica util para debuggear el codigo y asi ver hasta que linea se ejecuta nuestro codigo
        Admin.findByIdAndUpdate(req.params.id_admin, req.body, (err: Error, admin: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin ? { "updated": true } : { "updated": false });
        });
    }

    public Delete(req: Request, res: Response) {
        Admin.findByIdAndDelete(req.params.id_admin, req.body, (err: Error, admin: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin ? { "deleted": true } : { "deleted": false });
        });
    }

    public NewOne(req: Request, res: Response) {
        const p = new Admin(req.body);
        p.save((err: Error, admin: IAdmin) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin ? { "succeeded": true, "admin": admin } : { "succeeded": false });
        });
    }
}

