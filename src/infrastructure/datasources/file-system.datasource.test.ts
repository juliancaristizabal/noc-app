import path from "path";
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from '../../domain/datasources/log.datasource';




describe('file-system.datasource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeAll(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });



    test('should first create log files if they not exists', () => {

        new FileSystemDatasource();

        const checkFileSourceExists = fs.existsSync(logPath);
        const files = fs.readdirSync(logPath);

        expect(checkFileSourceExists).toBe(true);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);

    });






    test('should save a log in logs-all.log', async () => {

        const LogDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.low
        });

        await LogDatasource.saveLog(log);

        const allLogsData = fs.readFileSync(`${logPath}/logs-all.log`, 'utf8');

        expect(allLogsData).toContain(JSON.stringify(log));
        expect(allLogsData).toContain('file-system.datasource.test.ts');

    });





    test('should save a log in logs-all.log and medium.log', async () => {

        const LogDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.medium
        });

        await LogDatasource.saveLog(log);

        const allLogsData = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf8');

        expect(allLogsData).toContain(JSON.stringify(log));
        expect(allLogsData).toContain('file-system.datasource.test.ts');

    });






    test('should save a log in logs-all.log and high.log', async () => {

        const LogDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.high
        });

        await LogDatasource.saveLog(log);

        const allLogsData = fs.readFileSync(`${logPath}/logs-high.log`, 'utf8');

        expect(allLogsData).toContain(JSON.stringify(log));
        expect(allLogsData).toContain('file-system.datasource.test.ts');

    });



    test('should return all logs', async () => {

        const LogDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.low
        });
        const logMedium = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.medium
        });
        const logHigh = new LogEntity({
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
            level: LogSeverityLevel.high
        });

        await LogDatasource.saveLog(logLow);
        await LogDatasource.saveLog(logMedium);
        await LogDatasource.saveLog(logHigh);


        const logsLow = await LogDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await LogDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await LogDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));


    });

    test('should not throw an error if path exists', () => {

        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();

    });


    test('should not throw an error if severity level is not defined', async () => {

        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'false_level' as LogSeverityLevel;

        try {

            await logDatasource.getLogs(customSeverityLevel);

            expect(true).toBeFalsy();

        } catch (error) {
            
            const errorString = `${error}`;             

            expect(errorString).toContain('Error: false_level not implemented.')
        };

    });


});