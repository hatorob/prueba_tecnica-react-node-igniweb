import { Request, Response } from "express";
import { pool } from "../../config/databases";


export class CoinsController {

    constructor(
        // DI
    ){}

    public getCoins = async(req: Request, res: Response) => {
        res.status(200).json("mensaje enviado correctamente");
    }

}