import sgMail from "@sendgrid/mail"


export const sendEmail = async ({to, from, subject, text, html})=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {to, from, subject, text, html};
    try {
        await sgMail.send(msg);
        console.log('Email sent');
        return 200;
    } catch (error) {
        console.error(error)
        return 500;
    }
}