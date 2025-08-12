
import { logModel } from "./data/mongo";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo/init";
import { Server } from "./presentation/server";


(async () => {
    await main();
})();



async function main() {


    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    // Crear un colección = tables, documento = registro

    // const newLog = await logModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // });
    // await newLog.save();
    // console.log(newLog);


    // Buscar elemento en la BD

    // const logs = await logModel.find();
    // console.log(logs[0].message);
    
    

    Server.start();
};