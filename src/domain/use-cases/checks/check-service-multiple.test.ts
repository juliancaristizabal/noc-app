import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';


describe('check-service-multiple', () => {


    const mockRepositoryOne = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepositoryTwo = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepositoryThree = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallBack = jest.fn();
    const errorCallBack = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepositoryOne, mockRepositoryTwo, mockRepositoryThree],
        successCallBack,
        errorCallBack
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('should save logs in all repositorys', async () => {

        const url = 'https://google.com';

        const checkIsOk = await checkServiceMultiple.execute(url);

        expect(checkIsOk).toBe(true)
        expect(mockRepositoryOne.saveLog).toHaveBeenCalled();
        expect(mockRepositoryTwo.saveLog).toHaveBeenCalled();
        expect(mockRepositoryThree.saveLog).toHaveBeenCalled();
    });


    test('should call successCallback when fetch returns true', async () => {

        const url = 'https://google.com';

        const checkIsOk = await checkServiceMultiple.execute(url);

        expect(successCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(checkIsOk).toBe(true);

    });

    test('should call errorCallBack when fetch returns false', async () => {

        const url = 'https://urlmala.com';

        const checkIsOk = await checkServiceMultiple.execute(url);

        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(checkIsOk).toBe(false);

    });
})