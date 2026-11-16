import { z } from "zod";

// O mesmo schema valida no navegador e na API: uma regra só, dois lugares.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "Nome muito longo."),
  email: z.string().trim().max(254, "E-mail muito longo.").pipe(z.email("Informe um e-mail válido.")),
  message: z
    .string()
    .trim()
    .min(10, "Escreva pelo menos 10 caracteres.")
    .max(5000, "A mensagem passou de 5.000 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
