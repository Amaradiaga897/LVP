import {Application} from "express";
import {MainService} from "../services/main.service";

export class MainController{ //aqui se va a manipular app de app.ts

    private mainservices: MainService;
    constructor(private app: Application){
        this.mainservices = new MainService();
        this.routes();
    }

    public routes(){
        this.app.get("/", this.mainservices.welcome)
    }
}