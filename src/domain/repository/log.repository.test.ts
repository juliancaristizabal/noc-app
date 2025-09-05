import { LogEntity, LogSeverityLevel } from "../entities/log.entity"
import { LogRepository } from "./log.repository"

describe('log.repository.test.ts', () => {

    const log = new LogEntity({
        message: 'test-message',
        origin: 'log.repository.test.ts',
        level: LogSeverityLevel.low
    });


    class MockLogRepository implements LogRepository {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        };

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log];
        };

    };


    test('should test class LogRepository', async () => {

        const mockLogRepository = new MockLogRepository();

        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(typeof mockLogRepository.saveLog).toBe('function');
        expect(typeof mockLogRepository.getLogs).toBe('function');

        await mockLogRepository.saveLog(log);
        const logs = await mockLogRepository.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    });
});