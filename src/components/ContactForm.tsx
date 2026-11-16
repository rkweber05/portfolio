"use client";

import { useState } from "react";
import { contactSchema, toFieldErrors, type FieldErrors } from "@/lib/validation";

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Valida no navegador para dar retorno imediato. A API valida de novo:
    // nunca se confia só no cliente.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setFields(toFieldErrors(parsed.error));
      setError("Revise os campos destacados.");
      return;
    }

    setFields({});
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: data.website ?? "" }),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      setFields(body.fields ?? {});
      setError(body.error ?? "A mensagem não foi enviada. Tente de novo.");
    } catch {
      setError("Sem conexão com o servidor. Verifique sua internet e tente de novo.");
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="form__done" role="status">
        <p>Mensagem enviada. Respondo pelo e-mail que você informou.</p>
        <button type="button" className="button button--quiet" onClick={() => setStatus("idle")}>
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(fields.name)}
          aria-describedby={fields.name ? "name-error" : undefined}
        />
        {fields.name && <p id="name-error" className="field__error">{fields.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(fields.email)}
          aria-describedby={fields.email ? "email-error" : undefined}
        />
        {fields.email && <p id="email-error" className="field__error">{fields.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(fields.message)}
          aria-describedby={fields.message ? "message-error" : undefined}
        />
        {fields.message && <p id="message-error" className="field__error">{fields.message}</p>}
      </div>

      {/* Honeypot: invisível para pessoas, irresistível para robôs. */}
      <div className="field--trap" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__footer">
        <button type="submit" className="button" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>
        {error && <p className="form__error" role="alert">{error}</p>}
      </div>
    </form>
  );
}
