import {Request, Response} from "express";
import {Beneficiario, IBeneficiario} from "../models/beneficiario.model"
import {InterventorService} from "../services/interventor.service"
import {MongooseDocument} from "mongoose"

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

    //este service es solo para fines de development 
    public getAll( req: Request, res: Response){
        Beneficiario.find({},(err: Error, beneficiario: MongooseDocument) =>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(beneficiario)
        });
    }   

    //este service es solo para fines de development     
    public async getOne(req:Request, res:Response){
        const inter:any = await super.GetBeneficiario({_id:req.params.id_benef});
        res.status(200).json(inter[0]);
    }

    // Consumido en Pagina del listado de beneficiarios en el proyecto (Borrar beneficiario)
    public Delete(req: Request, res: Response){    
        Beneficiario.findByIdAndDelete(req.params.id_benef, req.body, (err: Error, beneficiario: any)=>{
            if(err){
                res.status(401).send(err);
            }
                res.status(200).json(beneficiario? {"deleted": true} : {"deleted":false});
        });
    }

    // Consumido en Validar matricula (función interventor)
    public async  Validar (req: Request, res: Response){
        const validate: any = await super.GetBeneficiario({_id:req.params.id_benef})       
        if( parseInt(validate[0].edad) >= 20){
            console.log(validate[0].edad);
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

    // Consumido en Agregar nuevo beneficiario (Interventor)
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