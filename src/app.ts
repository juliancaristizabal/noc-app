
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';


(async () => {
    await main();
})();



function main() {
    // Server.start();
    console.log(envs.PROD);
};