import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";






export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly LogDatasource: LogDatasource,
    ){};


    async saveLog(log: LogEntity): Promise<void> {
        await this.LogDatasource.saveLog(log);
    };

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return await this.LogDatasource.getLogs(severityLevel);
    };



}