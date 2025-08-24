import nodemailer from "nodemailer";

export const EmailSend = (email, otp, message) => {
  const transPorter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject:message ,
    html: `<h1>this is one time use Otp :- ${otp}</h1>`,
  };

  transPorter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new ApiError(
        400,
        "error comes when sending mail to user, Error :- ",
        error
      );
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
