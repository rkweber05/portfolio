import { ContactForm } from "@/components/ContactForm";
import { ScaleBars } from "@/components/ScaleBars";
import { education, otherWork, profile, results } from "@/lib/content";

export default function Home() {
  const [headline, ...rest] = results;

  return (
    <>
      <header className="top">
        <a className="top__name" href="#inicio">{profile.name}</a>
        <nav aria-label="Seções">
          <a href="#resultados">Resultados</a>
          <a href="#formacao">Formação</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero">
          <h1>{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__intro">{profile.intro}</p>

          <figure className="hero__figure">
            <ScaleBars result={headline} animated />
            <figcaption>
              {headline.title}, antes e depois. As barras estão em escala: a de baixo é esse
              risco no começo da linha.
            </figcaption>
          </figure>
        </section>

        <section id="resultados" className="section">
          <h2>Resultados</h2>
          <div className="results">
            {[headline, ...rest].map((r) => (
              <article key={r.title} className="result">
                <div className="result__text">
                  <h3>{r.title}</h3>
                  <p>{r.context}</p>
                  <p className="result__summary">{r.summary}</p>
                </div>
                <ScaleBars result={r} />
              </article>
            ))}
          </div>

          <h3 className="section__sub">Também fiz</h3>
          <ul className="plain">
            {otherWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="formacao" className="section">
          <h2>Formação acadêmica</h2>
          <ul className="education">
            {education.map((e) => (
              <li key={e.course + e.school}>
                <span className="education__course">{e.course}</span>
                <span className="education__school">{e.school}</span>
                <span className="education__period">{e.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contato" className="section section--contact">
          <h2>Contato</h2>
          <p className="section__lead">
            Escreva sobre uma vaga, um projeto ou uma dúvida técnica. A mensagem chega no meu e-mail.
          </p>
          <ContactForm />
        </section>
      </main>

      <footer className="bottom">
        <ul>
          {profile.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
