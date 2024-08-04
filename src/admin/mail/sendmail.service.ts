import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailService {
  private transporter:any;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
     
    });
  }
  
  async sendMail(to: string, otp: number) {
    const mailOptions = {
      from: "Webprowale.netlify.app",
      to: to,
      subject: "Webprowale Admin Logs",
      text: `One Time OTP \n OTP: ${otp}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
