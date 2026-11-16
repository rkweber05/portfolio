// Todo o texto do site mora aqui. Edite este arquivo e o resto se ajusta.

export const profile = {
  name: "Rodrigo Kunzler Weber",
  role: "Engenheiro de software",
  intro:
    "Sou líder técnico da Appstore em uma plataforma de pagamentos, onde trabalho com PHP e Laravel no sistema principal e Go em microsserviços. Gosto de construir o que ainda não existe e de assumir os problemas difíceis, aqueles em que ninguém sabe por onde começar, como a query abaixo.",
  links: [
    { label: "GitHub", href: "https://github.com/rkweber05" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rodrigo-kweber/" },
  ],
};

export type Result = {
  title: string;
  context: string;
  before: { label: string; value: number };
  after: { label: string; value: number };
  summary: string;
};

// `value` precisa estar na mesma unidade nos dois lados: as barras são desenhadas em escala.
export const results: Result[] = [
  {
    title: "Query mais pesada do banco",
    context:
      "Era a consulta que mais consumia o banco principal. Reescrevi o filtro e movi a leitura para a réplica.",
    before: { label: "165 s", value: 165000 },
    after: { label: "170 ms", value: 170 },
    summary: "Quase 1.000 vezes mais rápida",
  },
  {
    title: "Pipeline de deploy",
    context:
      "Cada deploy da API segurava correções por dez minutos. Otimizei o pipeline e validei com o time de SRE.",
    before: { label: "10 min", value: 10 },
    after: { label: "2 min", value: 2 },
    summary: "80% menos tempo por entrega",
  },
  {
    title: "Chamados sobre Pix e boleto no ambiente de testes",
    context:
      "Parceiros não conseguiam testar pagamentos de ponta a ponta. Entreguei Pix e boleto simulados e a gestão das próprias credenciais.",
    before: { label: "27 em 30 dias", value: 27 },
    after: { label: "2 a 3 em 30 dias", value: 3 },
    summary: "Cerca de 90% menos chamados, com meses sem nenhum",
  },
];

export const otherWork: string[] = [
  "Migração de Laravel 10 para 13 em uma semana.",
  "Autenticação em dois fatores e controle de acesso a credenciais em uma plataforma de apps para parceiros.",
  "Investigação de incidentes de webhook até a causa raiz, com post-mortem no dia seguinte.",
  "Mentoria de pessoas novas no time e passagem organizada da sustentação.",
];

export const education: { course: string; school: string; period: string }[] = [
  { course: "Análise e Desenvolvimento de Sistemas", school: "Feevale, curso concluído", period: "Fevereiro de 2023 a Julho de 2025" },
];
