import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema, toFieldErrors } from "@/lib/validation";

export const dynamic = "force-dynamic";

function clientIp(req: Request): string {
  // Atrás do Cloudflare, o IP real do visitante vem neste cabeçalho.
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot: campo invisível para pessoas. Se veio preenchido, é robô.
  // Respondemos "ok" para ele não saber que foi barrado.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos." },
      { status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revise os campos destacados.", fields: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }
  const input = parsed.data;

  // 1) Banco primeiro: é a fonte da verdade. Se falhar, a mensagem não foi recebida.
  let id: string;
  try {
    const { rows } = await pool.query<{ id: string }>(
      "INSERT INTO contact_messages (name, email, message, ip) VALUES ($1, $2, $3, $4) RETURNING id",
      [input.name, input.email, input.message, ip],
    );
    id = rows[0].id;
  } catch (err) {
    console.error("contact: falha ao salvar", err);
    return NextResponse.json(
      { error: "Não foi possível salvar sua mensagem agora. Tente de novo em instantes." },
      { status: 503 },
    );
  }

  // 2) E-mail depois: é só a notificação. Se falhar, a mensagem continua salva
  //    com email_sent_at = NULL e pode ser reenviada.
  try {
    await sendContactEmail(input);
    await pool.query("UPDATE contact_messages SET email_sent_at = now() WHERE id = $1", [id]);
  } catch (err) {
    console.error(`contact: mensagem ${id} salva, mas o e-mail falhou`, err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
