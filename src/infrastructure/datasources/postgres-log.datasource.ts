import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '../../generated/prisma/index';

const prismaClient = new PrismaClient();
prismaClient.logModel.delete

// SeverityLevel proviene de la migración de prisma
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
};

export class PostgresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
    };

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       const level  = severityEnum[severityLevel];
       const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
       });

       return dbLogs.map( LogEntity.fromObject );
    };

};