import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";
import { getCoinsApi } from "./utils/getCoinsApi";



( async() => {
    await main();
})();

async function main() {
    const server = new AppServer({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    server.start();
    /* setInterval(async () => {
      try {
        await getCoinsApi();
      } catch (err) {
        console.error("❌ Error en actualización:", err);
      }
    }, 5 * 60 * 1000); */
}