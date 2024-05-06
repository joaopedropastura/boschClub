import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPassowrdResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Redefinir senha",
    html: `
        <h1>Redefinir senha</h1>
        <p>Clique no link abaixo para redefinir sua senha</p>
        <a href="${resetLink}">Redefinir senha</a>
        `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
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
