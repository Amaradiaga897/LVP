import {Request, Response} from "express";
import {Seguimiento, ISeguimiento} from "../models/seguimiento.model";
import {MongooseDocument} from "mongoose";

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

    // Service no consumido
    public getAll( req: Request, res: Response){
        Seguimiento.find({},(err: Error, seguimiento: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(seguimiento)
        });
    }       

    // Consumido en Pagina de actualizacion de proyecto (Interventor)
    public NewOne(req: Request, res: Response){
        const s = new Seguimiento(req.body);
        s.save((err: Error, seguimiento: ISeguimiento)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(seguimiento? {"succeeded": true, "seguimiento": seguimiento} : {"succeeded":false});
        });
    }   
}