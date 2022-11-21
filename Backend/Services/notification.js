import mongoose from "mongoose";
import { sendEmail } from "../Utilities/email.js";

//Registers a new user.
export const notifyEmail = async (req, res) => {
  const msg = {
    to: "hanish.punamiya@sjsu.edu",
    from: "hanish.punamiya@sjsu.edu",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  res.sendStatus(await sendEmail(msg));
};
