import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

// Este punto es importante porque acá es donde se hacen
// los cambios de repositorios.

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

//

export class Server {
    public static start() {
        console.log('The server is running...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://google.com';
                // const url = 'http://localhost:3000';


                new CheckService(
                    fileSystemRepository,
                    () => console.log(`server: ${url} - success connection.`),
                    (error) => console.log(error),
                ).execute(url);

                // new CheckService().execute('https://google.com');
            }
        );
    };
};

