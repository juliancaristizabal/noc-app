import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('email.service.ts', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();



    test('should save email', async () => {

        const options: SendMailOptions = {
            to: 'juliancaristizabal@gmail.com',
            subject: 'email.service.ts',
            htmlBody: '<h2>Test - email.service.ts</h2>',
            attachments: [],
        };

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: [],
            html: "<h2>Test - email.service.ts</h2>",
            subject: "email.service.ts",
            to: "juliancaristizabal@gmail.com",
        })
    });





    test('should send email with attachments', async () => {

        const email = 'juliancaristizabal@gmail.com';

        await emailService.sendEmailsWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: [
                { "filename": "log-all.log", "path": "./logs/logs-all.log", },
                { "filename": "log-high.log", "path": "./logs/logs-high.log", },
                { "filename": "log-medium.log", "path": "./logs/logs-medium.log", },
            ],
        });

    });


    

    

});