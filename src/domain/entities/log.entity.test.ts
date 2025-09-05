import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {

    const entityData = {
        origin: 'log.entity.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.high,
    };

    const logEntity = new LogEntity(entityData);



    test('should test LogEntity correctly', () => {

        expect(logEntity).toBeInstanceOf(LogEntity);
        expect(logEntity).toEqual(expect.objectContaining({
            origin: expect.any(String),
            message: expect.any(String),
            level: expect.stringContaining(LogSeverityLevel.high),
            createdAt: expect.any(Date),
        }));

    });



    test('should create a LogEntity station from json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2025-08-21T14:56:30.457Z","origin":"check-service.ts"}`;
        const logJson = LogEntity.fromJson(json);

        expect(logJson.createdAt).toBeInstanceOf(Date);
        expect(typeof LogEntity.fromJson).toBe('function');
        expect(logJson).toEqual(expect.objectContaining({
            message: expect.stringContaining("Service https://google.com"),
            level: expect.stringContaining(LogSeverityLevel.low),
            origin: expect.stringContaining("check"),
        }));

    });



    test('should create a logEntity from object', () => {

        const logObject = LogEntity.fromObject(entityData);

        expect(logObject).toBeInstanceOf(LogEntity);
        expect(typeof LogEntity.fromObject).toBe('function');
        expect(logObject).toEqual(expect.objectContaining({
            message: expect.stringContaining("test"),
            level: expect.stringContaining(LogSeverityLevel.high),
            origin: expect.stringContaining("log.entity"),
        }));
        expect(logObject.createdAt).toBeInstanceOf(Date);

    });
});