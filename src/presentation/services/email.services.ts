import nodemailer from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter: any;
    
    constructor(
        private readonly mailerService : string,
        private readonly mailerEmail: string,
        private readonly senderEmailPassWord: string,
        private readonly postToProvider: boolean,
    ) {
        this.transporter = nodemailer.createTransport( {
            service: this.mailerService,
            auth: {
              user: this.mailerEmail,
              pass: this.senderEmailPassWord,
            },
        });
    }

    async sendEmail( options: SendMailOptions ): Promise<boolean> {
      if (!this.postToProvider) return true; // if the email is not set to be sent, return true
      const { to, subject, htmlBody, attachements = [] } = options;
      try {
        const sentInformation = await this.transporter.sendMail( {
          to: to,
          subject: subject,
          html: htmlBody,
          attachments: attachements,
        });
        // console.log( sentInformation );
        return true;
      } catch ( error ) {
        return false;
      }
    }



}
