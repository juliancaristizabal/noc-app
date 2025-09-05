import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { logModel } from "../../data/mongo";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoDataBase } from '../../data/mongo';

describe('mongo-log.datasource', () => {

    
    afterAll(async () => {
        await logModel.deleteMany();
        await mongoose.connection.close();
    });
    
    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    test('should create a log', async () => {

        const logDataSource = new MongoLogDataSource();
        const logSpy = jest.spyOn(console, 'log');

        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test-message',
            origin: 'mongo-log.datasource.test.ts'
        });

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String));

    });


    test('should get logs', async () => {

        const logDatasource = new MongoLogDataSource();

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);


        expect(logs.length >= 1).toBe(true);
        expect(logs[0].createdAt).toBeInstanceOf(Date);
        expect(logs[0]).toEqual(expect.objectContaining({
            message: expect.any(String),
            level: expect.any(String),
        }));


    });


});