import express, {Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MainController } from "./controllers/main.controller";

class App{
    public app: Application; //Aplication es una interfaz
    public mainController: MainController;
    constructor(){
        this.app = express(); //con esto se crea e inicializa la parte de la app
        this.setConfig();
        this.mainController = new MainController (this.app);
    }
    
    private setConfig(){ //aqui se hacen las manipulaciones de nuestra app
        this.app.use(bodyParser.json({limit: "50mb"})); 
        this.app.use(bodyParser.urlencoded({limit:"50mb", extended:true})); //si trabajas con formularios, el extended se utiliza para poder trabajar con www-form-urlencoded
        this.app.use(cors());
    }
}

export default new App().app;