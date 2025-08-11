import { CronJob } from "cron";

// Patron adaptador (nivel sencillo)

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {

        const job = new CronJob(cronTime, onTick);

        job.start();

        return job;
    };


};