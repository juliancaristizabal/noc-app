import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments: Attachment[];
};

interface Attachment {
    filename: string;
    path: string;
};

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
    ){};

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email sent to ${Array.isArray(to) ? to.join(', ') : to}`,
                origin: 'email.service.ts'
            });
            
            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email not sent to `,
                origin: 'email.service.ts'
            });

            return false;
        };

    };


    async sendEmailsWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Deserunt excepteur pariatur sunt nisi nulla culpa velit commodo eu consequat dolore ea.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'log-all.log', path: './logs/logs-all.log' },
            { filename: 'log-high.log', path: './logs/logs-high.log' },
            { filename: 'log-medium.log', path: './logs/logs-medium.log' }
        ];

        return this.sendEmail({
            to: to,
            subject: subject,
            htmlBody: htmlBody,
            attachments: attachments
        });

    };



};


