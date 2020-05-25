import {Request, Response} from "express";
import {Proyecto, IProyecto} from "../models/proyecto.model"
import {MongooseDocument} from "mongoose"
import {resolve} from "dns"
class ProyectoHelpers{

    GetProyecto(id_proyec:any):Promise<IProyecto>{
        return new Promise<IProyecto>((resolve)=>{
            Proyecto.find(id_proyec,(err:Error, proyecto:IProyecto)=>{
                if(err){
                    console.log(err.message);
                }
                resolve(proyecto);
            });
        }); 
    }
}
export class ProyectoService extends ProyectoHelpers{

    // Service no consumido
    public getAll( req: Request, res: Response){
        Proyecto.find({},(err: Error, proyectos: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proyectos)
        });
    }    

    // Consumido en Pagina del listado de beneficiarios en el proyecto
    public async getOneWBenef (req: Request, res: Response){
        const proyec_id:any = await super.GetProyecto({_id:req.params.id_proyec});
        Proyecto.aggregate([{
            "$lookup":{
                from: "beneficiarios",
                localField:"_id",
                foreignField:"proyecto",
                as: "b"
            }    
        },{"$match": {_id: proyec_id[0]._id}}],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    // Consumido en Pagina de actualizaciones del proyecto (Admin e Interventor)
    public async getOneWUpdates (req: Request, res: Response){
        const proyec_id:any = await super.GetProyecto({_id:req.params.id_proyec});
        Proyecto.aggregate([{
            "$lookup":{
                from: "seguimientos",
                localField:"_id",
                foreignField:"proyecto",
                as: "s"
            }    
        },{"$match": {_id: proyec_id[0]._id}}],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    // Consumido cuando se selecciona el proyecto y se accede a sus detalles
     public async getOne(req:Request, res:Response){
        const inter:any = await super.GetProyecto({_id:req.params.id_proyec});
        res.status(200).json(inter[0]);
    }

    // Consumido en Página de Detalles del proyecto
    public Delete(req: Request, res: Response){
        Proyecto.findByIdAndDelete(req.params.id_proyec, req.body, (err: Error, proyecto: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(proyecto? {"deleted": true} : {"deleted":false});
        });
    }

    // Consumido en Página de creación de proyecto 
    public async NewOne(req: Request, res: Response){
        const p = new Proyecto(req.body);
        const existing_proy: any = await super.GetProyecto({id:p.id})
        if (existing_proy.length === 0){
        await p.save((err: Error, proyecto: IProyecto)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(proyecto? {"succeeded": true, "proyecto": proyecto} : {"succeeded":false});
        });
        }else{
            res.status(200).json({"succeeded": false});
        }
    }   
}