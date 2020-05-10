import {Request, Response} from "express";
import {Interventor, IInterventor} from "../models/interventor.model"
import {BeneficiarioService} from "./beneficiario.service"
import {MongooseDocument} from "mongoose"
import {resolve} from "dns"

class InterventorHelpers{

    GetInterventor(id_inter:any):Promise<IInterventor>{
        return new Promise<IInterventor>((resolve)=>{
            Interventor.find(id_inter,(err:Error, interventor:IInterventor)=>{
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
        Interventor.find({},(err: Error, interventor: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(interventor)
        });
    }    

    public async getOne(req:Request, res:Response){
        const inter:any = await super.GetInterventor({_id:req.params.id_inter});
        res.status(200).json(inter[0]);
    }

    public getAllWBenef (req: Request, res: Response){
        Interventor.aggregate([{
            "$lookup":{
                from: "beneficiarios",
                localField:"_id",
                foreignField:"interventor",
                as: "b"
            }    
        }],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
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

    public async NewOne(req: Request, res: Response){
        const i = new Interventor(req.body);
        const existing_inter:any = await super.GetInterventor({identidad:i.identidad}); 
        
        if(existing_inter.length === 0){
            await i.save((err: Error, interventor: IInterventor)=>{
                if(err){
                    res.status(401).send(err);
                }
                    res.status(200).json(interventor? {"succeeded": true, "interventor": interventor} : {"succeeded":false});
            });
        }else{
            res.status(200).json({"succeeded":false});
        } 
    }      
}