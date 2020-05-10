import {Request, Response} from "express";
import {Seguimiento, ISeguimiento} from "../models/seguimiento.model";
import {MongooseDocument} from "mongoose";
import {resolve} from "dns";

class SeguimientoHelpers{

    GetSeguimiento(id_proyecto:string):Promise<ISeguimiento>{
        return new Promise<ISeguimiento>((resolve)=>{
            Seguimiento.findById(id_proyecto,(err:Error, seguimiento:ISeguimiento)=>{
                if(err){
                    console.log(err.message);
                }
                resolve(seguimiento);
            });
        }); 
    }
}

export class SeguimientoService extends SeguimientoHelpers{
    public getAll( req: Request, res: Response){
        Seguimiento.find({},(err: Error, seguimiento: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(seguimiento)
        });
    }    

    public async GetById(req: Request, res: Response){
        const my_proyecto = await super.GetSeguimiento(req.params.id_proyecto);
        res.status(200).send(my_proyecto);
    }

    //Payload
    public Update(req: Request, res: Response){
        //console.log("entro"); esta es una practica util para debuggear el codigo y asi ver hasta que linea se ejecuta nuestro codigo
        Seguimiento.findByIdAndUpdate(req.params.id_proyecto, req.body, (err: Error, seguimiento: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(seguimiento? {"updated": true} : {"updated":false});
        });
    }

    

    public NewOne(req: Request, res: Response){
        const p = new Seguimiento(req.body);
        p.save((err: Error, seguimiento: ISeguimiento)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(seguimiento? {"succeeded": true, "seguimiento": seguimiento} : {"succeeded":false});
        });
    }   
}