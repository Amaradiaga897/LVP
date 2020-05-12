import {Request, Response} from "express";
import {Beneficiario, IBeneficiario} from "../models/beneficiario.model"
import {InterventorService} from "../services/interventor.service"
import {MongooseDocument} from "mongoose"
import {resolve} from "dns"

class BeneficiarioHelpers{

    GetBeneficiario(id_benef:any):Promise<IBeneficiario>{
        return new Promise<IBeneficiario>((resolve)=>{
            Beneficiario.find(id_benef,(err:Error, beneficiario:IBeneficiario)=>{
                if(err){
                    console.log(err.message);
                }
                resolve(beneficiario);
            });
        }); 
    }
}

export class BeneficiarioService extends BeneficiarioHelpers{
    
 /*   public getAll( req: Request, res: Response){
        Beneficiario.find({},(err: Error, beneficiarios: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(beneficiarios)
        });
    }    
*/

    public getAll(req:Request, res: Response){
        Beneficiario.aggregate([
            {
                "$lookup":{
                    from: "interventors",
                    localField: "interventor",
                    foreignField: "_id",
                    as: "interventor"
                }
            }
        ],(err:Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            } 
          })
    }

    public async getOne(req:Request, res:Response){
        const inter:any = await super.GetBeneficiario({_id:req.params.id_benef});
        console.log(super.GetBeneficiario({_id:req.params.id_benef}));
        res.status(200).json(inter[0]);
    }

    //Payload
   /* public Update(req: Request, res: Response){
        //console.log("entro"); esta es una practica util para debuggear el codigo y asi ver hasta que linea se ejecuta nuestro codigo
        Beneficiario.findByIdAndUpdate(req.params.id_benef, req.body, (err: Error, beneficiario: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(beneficiario? {"updated": true} : {"updated":false});
        });
    }
*/
 /*   public Delete(req: Request, res: Response){
        
        Beneficiario.findByIdAndDelete(req.params.id_benef, req.body, (err: Error, beneficiario: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(beneficiario? {"deleted": true} : {"deleted":false});
        });
    }
*/
    public async  Validar (req: Request, res: Response){
        const validate: any = await super.GetBeneficiario({edad:req.body.edad})       
        if( validate <= 15){
            console.log(req.body.id_benef);
            Beneficiario.findByIdAndDelete(req.params.id_benef, req.body, (err: Error, beneficiario: any)=>{
                if(err){
                    res.status(401).send(err);
                }
                    res.status(200).json(beneficiario? {"deleted": true} : {"deleted":false});
            });
        }else{
            res.status(200).json({"succeeded": false});
        }
    }

    public async NewOne(req: Request, res: Response){
        const b = new Beneficiario(req.body);
        const existing_benef: any = await super.GetBeneficiario({identidad:b.identidad})

        if (existing_benef.length === 0){
        await b.save((err: Error, beneficiario: IBeneficiario)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(beneficiario? {"succeeded": true, "beneficiario": beneficiario} : {"succeeded":false});
        });
        }else{
            res.status(200).json({"succeeded": false});
        }
    }   
}