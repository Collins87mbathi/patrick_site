import { IReq, IRes, INext } from "../common/index";
import nodemailer from "nodemailer";
import { user, pass } from "../config/config";

class mailerController {
  public static sendMailer = async (req: IReq, res: IRes, next: INext) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });
    const mailOptions = {
      from: `${req.body.email}`,
      to: "collinsmbathi@gmail.com",
      subject: `Consultation`,
      html: `
        <div style="max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
        <p>${req.body.message}</p>
         </div>`,
    };
    await transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log("Email sent successfully" + info.response);
        res.status(200).send("email sent");
      }
    });
  };
}

export const { sendMailer } = mailerController;
