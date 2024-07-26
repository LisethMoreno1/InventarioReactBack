import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface EmailConfig {
  SMTP_HOST: string;
  SMTP_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
}

@Injectable()
export class MailService {
  private transporter;
  private config: EmailConfig;

  constructor() {
    const configPath = path.join(__dirname, '..', 'config.json');
    this.config = {
      SMTP_HOST: 'smtp.gmail.com',
      SMTP_PORT: 587,
      EMAIL_USER: 'lisethpatriciamorenomarrugo@gmail.com',
      EMAIL_PASS: 'cqpr cjjh tkan aszj',
    };

    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      this.config = JSON.parse(configData) as EmailConfig;
    } catch (error) {
/*       console.error('Error reading config file:', error);
 */    }

    this.transporter = nodemailer.createTransport({
      host: this.config.SMTP_HOST,
      port: this.config.SMTP_PORT,
      secure: false,
      auth: {
        user: this.config.EMAIL_USER,
        pass: this.config.EMAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: this.config.EMAIL_USER,
        to,
        subject,
        text,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
