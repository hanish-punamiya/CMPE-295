import nodemailer from "nodemailer";

export const sendMail = async (messageBody, emailAddresses) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1f8de520820ba9",
      pass: "58fee3ba7d2b81",
    },
  });

  const mailData = {
    from: "hanish.punamiya@sjsu.edu", // sender address
    to: emailAddresses, // list of receivers
    subject: "Breaking News!",
    text: "Breaking News",
    html: `<b>Hey there! </b>
                       <br> This is our first message sent with Nodemailer<br/>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
