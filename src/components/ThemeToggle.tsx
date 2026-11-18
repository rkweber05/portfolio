"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// O tema vive em <html data-theme="...">. Um script no layout aplica o valor salvo
// antes da primeira pintura, para a página não piscar no tema errado.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Sem armazenamento (modo privado, por exemplo), o tema vale só nesta visita.
    }
    setTheme(next);
  }

  // Antes da hidratação não sabemos o tema: um espaço do mesmo tamanho evita salto.
  if (!theme) return <span className="theme-toggle" aria-hidden="true" />;

  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Usar tema claro" : "Usar tema escuro"}
      title={dark ? "Tema claro" : "Tema escuro"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        {dark ? (
          <path
            fill="currentColor"
            d="M12 4.5a1 1 0 0 1 1-1 1 1 0 0 1-1-1 1 1 0 0 1-1 1 1 1 0 0 1 1 1Zm9 7.5a9 9 0 1 1-9.7-8.97 1 1 0 0 1 .96 1.5A7 7 0 0 0 19.47 14.74a1 1 0 0 1 1.5.96c.02.1.03.2.03.3Z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2.5a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1ZM12 1a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1Zm11 11a1 1 0 0 1-1 1h-1.5a1 1 0 1 1 0-2H22a1 1 0 0 1 1 1ZM4.5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1Zm14.84 6.34a1 1 0 0 1-1.41 0l-1.06-1.06a1 1 0 0 1 1.41-1.42l1.06 1.07a1 1 0 0 1 0 1.41ZM7.13 7.13a1 1 0 0 1-1.41 0L4.66 6.07a1 1 0 0 1 1.41-1.41l1.06 1.06a1 1 0 0 1 0 1.41Zm11.21-2.47a1 1 0 0 1 0 1.41L17.28 7.13a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM7.13 16.87a1 1 0 0 1 0 1.42l-1.06 1.06a1 1 0 0 1-1.41-1.41l1.06-1.07a1 1 0 0 1 1.41 0Z"
          />
        )}
      </svg>
    </button>
  );
}
