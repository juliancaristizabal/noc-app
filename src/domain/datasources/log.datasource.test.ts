import { logModel } from "../../data/mongo";
import { SeverityLevel } from "../../generated/prisma";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe('log.data.sourve LogDataSource', () => { 

    const log = new LogEntity({
        message: 'test-message',
        origin: 'log.datasource.test.ts',
        level: LogSeverityLevel.low
    })



    class MockLogDataSource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        };
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log];
        };
    };



    test('should test the abstract class', async() => { 
        
        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(typeof mockLogDataSource.saveLog).toBe('function');
        expect(typeof mockLogDataSource.saveLog).toBe('function');

        await mockLogDataSource.saveLog(log);
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

     });
});
