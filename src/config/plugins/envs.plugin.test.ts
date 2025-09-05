import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {


    test('should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'google@gmail.com',
            MAILER_SECRET_KEY: 'xxxxx',
            PROD: false,
            MONGO_URL: 'mongodb://test:mongodb@localhost:27018',
            MONGO_DB_NAME: 'NOC-TESTING',
            MONGO_USER: 'test',
            MONGO_PASS: 'mongodb'
        })
        
    });


    // TODO:
    // // // // // // // // // // // // // // // // // // // // // // 
    // test('should return error if not found env', async() => {

    //     jest.resetModules();
    //     process.env.PORT = 'ABC';
        
    //     try {

    //         const path = './envs.plugin'
    //         await import(path)
    //         expect(true).toBe(false);

    //     } catch (error) {
            
    //         expect(`${error}`).toContain('"PORT" should be a valid integer')
    //         // console.log(error);            

    //     };

    // });


});
