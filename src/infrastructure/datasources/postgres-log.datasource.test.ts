
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient } from "../../generated/prisma";
import { PostgresLogDataSource } from "./postgres-log.datasource";
import { SeverityLevel } from '../../generated/prisma/index';


describe('postgres-log.datasource', () => {
    
    const prismaClient = new PrismaClient();
    const logDataSource = new PostgresLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'postgres-log.datasource.test.ts'
    });

    afterAll(async ()=>{
        await prismaClient.logModel.deleteMany();
    });


    test('should save a log', async () => {

        const spySaveLog = jest.spyOn(logDataSource, 'saveLog');
        
        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);
        
        const check = await prismaClient.logModel.findMany({
            where: {
                level: SeverityLevel.MEDIUM
            }
        }); 

        expect(spySaveLog).toHaveBeenCalled();
        expect(check.length > 1).toBe(true);
        expect(check[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            origin: expect.stringContaining(log.origin)
        }));
        expect(check[0].createdAt).toBeInstanceOf(Date);
        

    });




    test('shoult get logs', async () => {

        const spyGetLogs = jest.spyOn(logDataSource, 'getLogs');

        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        
        expect(spyGetLogs).toHaveBeenCalled();
        expect(logs[0]).toEqual(expect.objectContaining({
            message: expect.any(String),
            origin: expect.stringContaining(log.origin)
        }));
        expect(logs[0].createdAt).toBeInstanceOf(Date);


    });


});