import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
};

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ( error:string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly LogRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){};

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            };

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            this.LogRepository.saveLog(log);
            this.successCallback();
            return true;
            
        } catch (error) {
            
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.errorCallback(errorMessage);        
            this.LogRepository.saveLog(log);

            return false;
        };

    };

};
