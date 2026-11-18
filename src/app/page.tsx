import { ContactForm } from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScaleBars } from "@/components/ScaleBars";
import { education, otherWork, profile, results, stack } from "@/lib/content";

const initials = profile.name
  .split(" ")
  .filter((_, i, a) => i === 0 || i === a.length - 1)
  .map((p) => p[0])
  .join("");

export default function Home() {
  return (
    <>
      <header className="top">
        <div className="wrap top__inner">
          <a className="brand" href="#inicio" aria-label={`${profile.name}, início`}>
            <span className="brand__mark" aria-hidden="true">{initials}</span>
            <span className="brand__name">{profile.name}</span>
          </a>
          <nav className="nav" aria-label="Seções">
            <a href="#resultados">Resultados</a>
            <a href="#formacao">Formação</a>
            <a className="nav__cta" href="#contato">Contato</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="wrap hero">
          <div className="hero__text">
            <h1>{profile.name}</h1>
            <p className="hero__role">{profile.role}</p>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__actions">
              <a className="button" href="#contato">Falar comigo</a>
              {profile.links.map((l) => (
                <a key={l.href} className="button button--ghost" href={l.href} rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </section>

        <section id="resultados" className="wrap section">
          <header className="section__head">
            <h2>Resultados</h2>
            <p>Três problemas que dava para medir, com o tamanho de cada um antes e depois.</p>
          </header>

          <div className="ledger ledger--3">
            {results.map((r) => (
              <article key={r.title} className="ledger__cell result">
                <h3 className="cell-title">{r.title}</h3>
                <p className="result__stat">
                  <strong>{r.stat}</strong> <span>{r.statLabel}</span>
                </p>
                <p className="result__context">{r.context}</p>
                <ScaleBars result={r} />
              </article>
            ))}
          </div>

          <h3 className="subhead">Também entreguei</h3>
          <ul className="ledger ledger--2">
            {otherWork.map((item) => (
              <li key={item} className="ledger__cell work">{item}</li>
            ))}
          </ul>
        </section>

        <section id="formacao" className="wrap section">
          <header className="section__head">
            <h2>Formação e tecnologias</h2>
          </header>

          <div className="ledger ledger--2">
            <div className="ledger__cell">
              <h3 className="cell-title">Formação acadêmica</h3>
              <p className="edu__course">{education.course}</p>
              <p className="edu__meta">{education.school}, curso {education.status.toLowerCase()}</p>
              <p className="edu__meta">{education.period}</p>
            </div>
            <div className="ledger__cell">
              <h3 className="cell-title">Tecnologias do dia a dia</h3>
              <ul className="chips">
                {stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contato" className="wrap section contact">
          <div className="contact__intro">
            <h2>Contato</h2>
            <p>
              Escreva sobre uma vaga, um projeto ou uma dúvida técnica. A mensagem chega direto no
              meu e-mail e eu respondo por lá.
            </p>
            <ul className="contact__links">
              {profile.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} rel="noreferrer">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="wrap bottom">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Next.js, PostgreSQL e Docker, em uma VPS própria.</p>
      </footer>
    </>
  );
}
