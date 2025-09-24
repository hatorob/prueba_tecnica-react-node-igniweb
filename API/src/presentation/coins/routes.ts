import { Router } from "express";
import { CoinsController } from "./controller";

export class CoinsRoutes {
    
    static get routes(): Router {
        const router = Router();
        const coinsController = new CoinsController();
        /* all tasks */
        router.get("/", coinsController.getCoins );
        router.get("/details/:id", coinsController.getCoinsDetailById );
        return router;
    }
}