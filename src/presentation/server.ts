// import { CheckService } from "../domain/use-cases/checks/check-service";
// import { CronService } from "./cron/cron-service";

import { SendEmailsLogs } from "../domain/use-cases/logs/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

// Este punto es importante porque acá es donde se hacen
// los cambios de repositorios.

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();

//

export class Server {

    public static start() {
        console.log('The server is running...');


// 
    // new SendEmailsLogs(
    //     emailService,
    //     fileSystemRepository
    // ).execute(
    //     ['juliancaristizabal@gmail.com'],
    // )





// 
        // Enviar email
        // const emailService = new EmailService(
        //     fileSystemRepository,
        // );

        // emailService.sendEmailsWithFileSystemLogs(
        //     ['juliancaristizabal@gmail.com']
        // );





// 
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         // const url = 'http://localhost:3000';
        //         new CheckService(
        //             fileSystemRepository,
        //             () => console.log(`server: ${url} - success connection.`),
        //             (error) => console.log(error),
        //         ).execute(url);
        //         // new CheckService().execute('https://google.com');
        //     }
        // );
    };
};

