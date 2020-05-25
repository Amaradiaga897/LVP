import { Request, Response } from "express";
import { Admin, IAdmin } from "../models/admin.model"
import { MongooseDocument } from "mongoose"

class AdminHelpers {

    GetAdmin(id_admin: any): Promise<IAdmin> {
        return new Promise<IAdmin>((resolve) => {
            Admin.find(id_admin, (err: Error, admin: IAdmin) => {
                if (err) {
                    console.log(err.message);
                }
                resolve(admin);
            });
        });
    }
}

export class AdminService extends AdminHelpers {

    // Service no consumido en el programa. Solo para fines de development
    public getAll(req: Request, res: Response) {
        Admin.find({}, (err: Error, admin: MongooseDocument) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin)
        });
    }

    
    // Consumido en Página de perfil del admin
    public async getOne(req:Request, res:Response){
        const admin:any = await super.GetAdmin({_id:req.params.id_admin});
        res.status(200).json(admin[0]);
    }

    // Consumido en Pagina con lista de interventores del admin actual
    public async getOneWInter (req: Request, res: Response){
        const admin_id:any = await super.GetAdmin({_id:req.params.id_admin});
        Admin.aggregate([{"$match": {_id: admin_id[0]._id}},{
            "$lookup":{
                from: "interventors",
                localField:"_id",
                foreignField:"admin",
                as: "i"
            }    
        }],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    //Consumido en Admin Homepage muestra los proyectos del admin
    public async getOneWProjects (req: Request, res: Response){
        const admin_id:any = await super.GetAdmin({_id:req.params.id_admin});
        Admin.aggregate([{
            "$lookup":{
                from: "proyectos",
                localField:"_id",
                foreignField:"admin",
                as: "p"
            }    
        },{"$match": {_id: admin_id[0]._id}}],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    // Consumido en Página de perfil del admin (Actualizar)
    public Update(req: Request, res: Response) {
        Admin.findByIdAndUpdate(req.params.id_admin, req.body, (err: Error, admin: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin ? { "updated": true } : { "updated": false });
        });
    }

    // Service no consumido en el programa. Solo para fines de development
    public Delete(req: Request, res: Response) {
        Admin.findByIdAndDelete(req.params.id_admin, req.body, (err: Error, admin: any) => {
            if (err) {
                res.status(401).send(err);
            }
            res.status(200).json(admin ? { "deleted": true } : { "deleted": false });
        });
    }

    // Service no consumido en el programa.
    public async NewOne(req: Request, res: Response){
        const a = new Admin(req.body);
        const existing_admin: any = await super.GetAdmin({identidad:a.identidad})

        if (existing_admin.length === 0){
        await a.save((err: Error, admin: IAdmin)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(admin? {"succeeded": true, "admin": admin} : {"succeeded":false});
        });
        }else{
            res.status(200).json({"succeeded": false});
        }
    }   
}

