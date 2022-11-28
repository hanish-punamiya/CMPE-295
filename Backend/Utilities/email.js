import sgMail from "@sendgrid/mail";

export const sendEmail = async ({ to, from, subject, text, html }) => {
  sgMail.setApiKey("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");
  const msg = { to, from, subject, text, html };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return 200;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
