import { Request, Response } from "express";
import { pool } from "../../config/databases";


export class CoinsController {

    constructor(
        // DI
    ){}

    public getCoins = async(req: Request, res: Response) => {

        try {
            const [rows] = await pool.query("SELECT * FROM crypto_coins;");
        } catch (error) {
            
        }
        res.status(200).json("mensaje enviado correctamente");
    }

}