import {Request, Response} from "express";
import {Proyecto, IProyecto} from "../models/proyecto.model"
import {MongooseDocument} from "mongoose"
import {resolve} from "dns"
class ProyectoHelpers{
    GetProyecto(id_proyec:string):Promise<IProyecto>{
        return new Promise<IProyecto>((resolve)=>{
            Proyecto.findById(id_proyec,(err:Error, proyecto:IProyecto)=>{
                if(err){
                    console.log(err.message);
                }
                resolve(proyecto);
            });
        }); 
    }
}
export class ProyectoService extends ProyectoHelpers{
    public getAll( req: Request, res: Response){
        Proyecto.find({},(err: Error, proyectos: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proyectos)
        });
    }    
    public async GetById(req: Request, res: Response){
        const my_proyec = await super.GetProyecto(req.params.id_proyec);
        res.status(200).send(my_proyec);
    }
    //Payload
    public Update(req: Request, res: Response){
        //console.log("entro"); esta es una practica util para debuggear el codigo y asi ver hasta que linea se ejecuta nuestro codigo
        Proyecto.findByIdAndUpdate(req.params.id_proyec, req.body, (err: Error, proyecto: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(proyecto? {"updated": true} : {"updated":false});
        });
    }
    public Delete(req: Request, res: Response){
        Proyecto.findByIdAndDelete(req.params.id_proyec, req.body, (err: Error, proyecto: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(proyecto? {"deleted": true} : {"deleted":false});
        });
    }
    public NewOne(req: Request, res: Response){
        const p = new Proyecto(req.body);
        p.save((err: Error, proyecto: IProyecto)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(proyecto? {"succeeded": true, "proyecto": proyecto} : {"succeeded":false});
        });
    }   
}