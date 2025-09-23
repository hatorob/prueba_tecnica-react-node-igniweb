import { pool } from "../config/databases";
import { envs } from "../config/envs";

export const getCoinsApi = async() => {
    try {
        const url = `${envs.URL_API_EXT}/v1/cryptocurrency/listings/latest`;
        //const url = `${envs.URL_API_EXT_DEV}/v1/cryptocurrency/listings/latest`;
        const response = await fetch(
          url,
          {
            method: "GET",
            headers: {
              "X-CMC_PRO_API_KEY": envs.API_KEY as string,
              Accept: "application/json",
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Error en CoinMarketCap: ${response.status}`);
        }
    
        const { data } = await response.json();
        if(data.length > 0) {
            for(const el of data) {
                const { name, symbol, quote } = el;
                const { price, percent_change_24h: percentage_change, market_cap: volume, last_updated } = quote.USD;
                console.log(price, percentage_change, volume, last_updated);
                const [coins] = await pool.query(`
                    INSERT INTO crypto_coins (name, symbol)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE
                      name = VALUES(name),
                      symbol = VALUES(symbol)
                `,[name, symbol]);

                const insertId = (coins as any).insertId;             
                const [coins_details] = await pool.query(`
                    INSERT INTO crypto_details (crypto_id, price, percentage_change, volume, last_update)
                    VALUES (?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.000Z'))
                `,[insertId,price, percentage_change, volume, last_updated]);
            };
        }

    } catch(error: any) {
        console.log(error);
    }
}