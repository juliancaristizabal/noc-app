import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('check-service.test.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const successCallBack = jest.fn();
    const errorCallBack = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallBack,
        errorCallBack
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {


        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );


    });



    test('should call successCallback when fetch returns true', async () => {


        const wasOk = await checkService.execute('https://urlmala.com');

        expect(wasOk).toBe(false);
        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });



});