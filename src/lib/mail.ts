import { Resend } from "resend";

type EventModel = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  place: {
    name: string;
    maxPeople: number;
    typeName: string;
  };
  typePlace: {
    name: string;
  };
  renter: {
    name: string;
    email: string;
  };
};

type CancelEventProps = {
  event: EventModel;
};


type placeData = {
  id: string;
  name: string;
  typeId: string;
  maxCapacity: number;
} 
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Código de verificação",
    html: `
        <h1>Código de verificação</h1>
        <p>Seu código de verificação é: ${token}</p>
        `,
  });
};

export const sendPassowrdResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

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
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

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

export const sendEventConfirmedEmail = async (email: string, place: placeData, date: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Evento confirmado",
    html: `
    <h2>🎉 Evento Confirmado! 🎉</h2>
    <p>Seu evento no local <strong>${place.name}</strong> foi confirmado com sucesso! 😊</p>
    <p>📅 Data do evento: <strong>${formatDate(date)}</strong></p>
    <p>Para mais informações, entre em contato com o suporte pelo WhatsApp: 
      <a href="https://wa.me/5541991820642?text=Ol%C3%A1,%20gostaria%20de%20tirar%20duvidas%20sobre%20a%20minha%20reserva" target="_blank">📞 +55 41 99182-0642</a>
    </p>
    <p>Estamos ansiosos para vê-lo lá! 🎊</p>
        `,
  });
}

export const sendEventCanceledEmail = async (
  email: string,
  placeName: string,
  eventDate: string,
  reason: string
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Evento cancelado",
    html: `
    <h2>😞 Evento Cancelado 😞</h2>
    <p>Infelizmente, tivemos que cancelar seu evento no local <strong>${placeName}</strong>. 😔</p>
    ${reason ? `<p>Motivo: ${reason}</p>` : ""}
    <p>📅 Data do evento: <strong>${formatDate(eventDate)}</strong></p>
    <p>Para mais informações, entre em contato com o suporte pelo WhatsApp: 
      <a href="https://wa.me/5541991820642?text=Ol%C3%A1,%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20cancelamento%20da%20minha%20reserva" target="_blank">📞 +55 41 99182-0642</a>
    </p>
    
        `,
  });
};
