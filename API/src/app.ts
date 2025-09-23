import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";



( async() => {
    await main();
})();

async function main() {
    const server = new AppServer({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    server.start();
}