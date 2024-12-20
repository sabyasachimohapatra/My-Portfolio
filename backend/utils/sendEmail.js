import nodemailer from "nodemailer"
export const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

    
        const info = await transporter.sendMail({
          from: process.env.SMTP_MAIL, // sender address
          to: options.email, // list of receivers
          subject: options.subject, // Subject line
          text: options.message, // plain text body
        });
      
      
}