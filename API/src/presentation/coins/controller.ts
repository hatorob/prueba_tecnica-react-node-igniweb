import { Request, Response } from "express";
import { pool } from "../../config/databases";


export class CoinsController {

    constructor(
        // DI
    ){}

    public getCoins = async(req: Request, res: Response) => {
        try {
            const [coins] = await pool.query("SELECT id as value,name as label FROM crypto_coins ORDER BY name ASC;");
            res.status(200).json(coins);
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    public getCoinsDetailById = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if(!id) throw new Error("id is required");
            const [coins_details] = await pool.query(`
                SELECT crypto_id, price, percentage_change, volume, last_update  
                FROM crypto_details WHERE crypto_id=?;
            `,[id]);
            res.status(200).json(coins_details);
        } catch (error) {
            
        }
    }

}