import {Request, Response} from "express";
import {Interventor, IInterventor} from "../models/interventor.model"
import {MongooseDocument} from "mongoose"

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

    // Consumido en Pagina con la lista de todos los interventores (parte del admin)
    public getAll( req: Request, res: Response){
        Interventor.find({},(err: Error, interventor: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(interventor)
        });
    }    

    // Consumido en Interventor Homepage y pagina de perfil del interventor
    public async getOne(req:Request, res:Response){
        const inter:any = await super.GetInterventor({_id:req.params.id_inter});
        res.status(200).json(inter[0]);
    }

    public async getOneWProjects (req: Request, res: Response){
        const inter_id:any = await super.GetInterventor({_id:req.params.id_inter});
        Interventor.aggregate([{
            "$lookup":{
                from: "proyectos",
                localField:"_id",
                foreignField:"interventor",
                as: "p"
            }    
        },{"$match": {_id: inter_id[0]._id}}],(err:Error,data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }

    //Consumido en Pagina de perfil del Interventor (Actualizar)
    public Update(req: Request, res: Response){
        Interventor.findByIdAndUpdate(req.params.id_inter, req.body, (err: Error, interventor: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(interventor? {"updated": true} : {"updated":false});
        });
    }

    // Service no consumido
    public Delete(req: Request, res: Response){
        Interventor.findByIdAndDelete(req.params.id_inter, req.body, (err: Error, interventor: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(interventor? {"deleted": true} : {"deleted":false});
        });
    }

    // Consumido en 
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