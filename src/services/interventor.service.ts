import {Request, Response} from "express";
import {Interventor, IInterventor} from "../models/interventor.model"
import {MongooseDocument} from "mongoose"
import {resolve} from "dns"

class InterventorHelpers{

    GetInterventor(id_inter:string):Promise<IInterventor>{
        return new Promise<IInterventor>((resolve)=>{
            Interventor.findById(id_inter,(err:Error, interventor:IInterventor)=>{
                if(err){
                    console.log(err.message);
                }
                resolve(interventor);
            });
        }); 
    }
}

export class InterventorService extends InterventorHelpers{
    public getAll( req: Request, res: Response){
        Interventor.find({},(err: Error, interventores: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(interventores)
        });
    }    

    public async GetById(req: Request, res: Response){
        const my_inter = await super.GetInterventor(req.params.id_inter);
        res.status(200).send(my_inter);
    }

    //Payload
    public Update(req: Request, res: Response){
        //console.log("entro"); esta es una practica util para debuggear el codigo y asi ver hasta que linea se ejecuta nuestro codigo
        Interventor.findByIdAndUpdate(req.params.id_inter, req.body, (err: Error, interventor: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(interventor? {"updated": true} : {"updated":false});
        });
    }

    public Delete(req: Request, res: Response){
        Interventor.findByIdAndDelete(req.params.id_inter, req.body, (err: Error, interventor: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(interventor? {"deleted": true} : {"deleted":false});
        });
    }

    public NewOne(req: Request, res: Response){
        const p = new Interventor(req.body);
        p.save((err: Error, interventor: IInterventor)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(interventor? {"succeeded": true, "interventor": interventor} : {"succeeded":false});
        });
    }   
}