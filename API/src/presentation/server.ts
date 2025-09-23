import express, { Router } from "express";
import cors from "cors";
type Options = {
    port: number;
    routes: Router;
}

export class AppServer {
    
    private app =  express();
    private readonly port: number;
    private readonly routes: Router;

    constructor({
        port,
        routes 
    }:Options) {
        this.port = port;
        this.routes = routes;
    }

    async start() {
        const options = {
            //origin: "http://127.0.0.1:5173",
            origin: "*",
            methods: ["POST","GET","PUT","DELETE"],
            credentials: true
        }
        /*HT: middlewares */
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( cors(options) );

        this.app.use( this.routes );
        
        this.app.listen(this.port, () => console.log(`server run in port ${this.port}`))
    }
}