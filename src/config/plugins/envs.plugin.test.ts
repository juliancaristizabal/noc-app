import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {


    test('should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'juliancaristizabal@gmail.com',
            MAILER_SECRET_KEY: 'mfqisggmpgqclqvx',
            PROD: false,
            MONGO_URL: 'mongodb://julian:mongotest@localhost:27017',
            MONGO_DB_NAME: 'NOC-TESTING',
            MONGO_USER: 'julian',
            MONGO_PASS: 'mongotest'
        })
        
    });



    test('should return error if not found env', async() => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        console.log(envs);
        
        try {

            await import('./envs.plugin')
            expect(true).toBe(false);

        } catch (error) {
            
            expect(`${error}`).toContain('"PORT" should be a valid integer')
            // console.log(error);            

        };

    });


});
