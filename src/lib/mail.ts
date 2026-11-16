import nodemailer from "nodemailer";
import type { ContactInput } from "./validation";

const port = Number(process.env.SMTP_PORT ?? 1025);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "localhost",
  port,
  secure: port === 465,
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

export async function sendContactEmail(input: ContactInput): Promise<void> {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    // Responder o e-mail já vai direto para quem escreveu.
    replyTo: { name: input.name, address: input.email },
    subject: `Contato pelo site: ${input.name}`,
    // Só texto puro: nada do que o visitante digita é interpretado como HTML.
    text: `Nome: ${input.name}\nE-mail: ${input.email}\n\n${input.message}\n`,
  });
}
