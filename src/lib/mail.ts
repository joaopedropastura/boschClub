import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string, 
    token: string
) => {
  const confirmLink = `${process.env.URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirme seu email",
    html: `
        <h1>Confirme seu email</h1>
        <p>Clique no link abaixo para confirmar seu email</p>
        <a href="${confirmLink}">Confirmar email</a>
        `,
    });

};
