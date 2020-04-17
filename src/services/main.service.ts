import {Request, Response} from "express";

export class MainService{
    public welcome(req: Request, res:Response){
        return res.send("Hola a todos"); // mensaje para mostrar que estamos dentro de nuestra API
    }   
}