import nodemailer from "nodemailer";
import AppError from "../errors/appError";
import { HTTP_STATUS } from "../errors/httpStatus";
import { ISendMailOptions } from "../interface/sendMailOptions";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "z.abdurrahim6@gmail.com",
    pass: "wcgu exhr xrbi lfwj",
  },
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: ISendMailOptions) => {
  try {
    await transporter.sendMail({
      from: '"Future Shop" <no-reply@futureshop.com>',
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new AppError("Failed to send email", HTTP_STATUS.BAD_REQUEST);
  }
};
