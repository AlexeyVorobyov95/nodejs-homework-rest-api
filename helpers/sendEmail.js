import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "alina0952205313@gmail.com",
  };

  await sgMail.send(email);
  return true;
};

export default sendEmail;
