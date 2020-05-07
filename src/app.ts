import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MainController } from "./controllers/main.controller";
import { AdminController } from "./controllers/admin.controller";
import mongoose from "mongoose";// Con esto se hace la configuracion para conectarnos a la base de datos


import { config } from "dotenv"; //Cada linea de este archivo las va a tratar y manipular como si fuesen variables
import { resolve } from "path"; // Resuelve para que un archivo pueda ser escuchado desde otro archivo y poder acceder a el
import { AdminService } from "./services/admin.service";
config({ path: resolve(__dirname, ".env") }); //Con esto resolvemos nuestro archivo .env para que pueda ser escuchado desde cualquier lado de mi directorio

class App {
    public app: Application; //Aplication es una interfaz
    public mainController: MainController;
    public adminController: AdminController;
    constructor() {
        this.app = express(); //con esto se crea e inicializa la parte de la app
        this.setConfig();
        this.setMongoDBConfig();
        this.mainController = new MainController(this.app);
        this.adminController = new AdminController(this.app);
    }

    private setConfig() { //aqui se hacen las manipulaciones de nuestra app
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); //si trabajas con formularios, el extended se utiliza para poder trabajar con www-form-urlencoded
        this.app.use(cors());
    }

    private setMongoDBConfig() {
        mongoose.Promise = global.Promise; //A nivel global, mientras no se cumpla todo lo que esta abajo, no vamos a continuar con las siguientes lineas (propio de MongoDB)

        mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Conexion exitosa");
            }
        });
    }
}

export default new App().app;


