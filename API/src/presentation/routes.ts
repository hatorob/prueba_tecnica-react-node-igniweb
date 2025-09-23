import { Router } from "express";
import { CoinsRoutes } from "./coins/routes";

export class AppRoutes {
    
    static get routes(): Router {

        const pathInicial = "/api";
        const router = Router();
        router.use(`${pathInicial}/coins`, CoinsRoutes.routes );
        return router;
    }
}