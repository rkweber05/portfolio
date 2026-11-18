# Página de desenvolvedor

Next.js (TypeScript) + PostgreSQL + Mailpit, tudo em Docker Compose.

## Rodar

```bash
docker compose up --build
```

| O quê | Onde |
| --- | --- |
| Site | http://localhost:3000 |
| E-mails capturados (Mailpit) | http://localhost:8025 |
| Saúde da aplicação | http://localhost:3000/api/health |

Ver as mensagens salvas:

```bash
docker compose exec db psql -U portfolio -d portfolio -c "SELECT id, name, email, created_at, email_sent_at FROM contact_messages;"
```

Parar: `docker compose down`. Apagar também o banco: `docker compose down -v`.

## Desenvolver com hot reload

```bash
docker compose up -d db mailpit
cp .env.example .env.local
# em .env.local, adicione:
# DATABASE_URL=postgres://portfolio:portfolio_dev@localhost:5432/portfolio
# e troque SMTP_HOST para localhost
npm install
npm run dev
```

## O que editar

Todo o texto está em `src/lib/content.ts`. Procure por `PREENCHER`.

## Como o formulário funciona

```
navegador ──POST /api/contact──▶ API
                                  1. honeypot e limite por IP
                                  2. validação (zod, o mesmo schema do navegador)
                                  3. INSERT no Postgres        ← fonte da verdade
                                  4. envio do e-mail por SMTP  ← notificação
                                  5. UPDATE email_sent_at
```

Se o e-mail falhar, a mensagem continua salva com `email_sent_at = NULL` e o visitante recebe sucesso: o que ele precisava (entregar a mensagem) aconteceu.

## Estrutura

```
.github/workflows/   CI/CD: checagem, build da imagem, deploy na VPS
deploy/              Compose de produção, Caddyfile e modelo do .env da VPS
db/init.sql          cria a tabela na primeira subida do banco
src/app/             página e rotas da API
src/components/      formulário e barras em escala
src/lib/             conteúdo, validação, banco, e-mail, limite de requisições
Dockerfile           build em 3 estágios, imagem final só com o necessário
docker-compose.yml   app + db + mailpit
```

## Deploy

```
push na main ─▶ check (typecheck) ─▶ publish (imagem no GHCR, tag = SHA do commit)
                                  ─▶ deploy (SSH na VPS: pull + up -d --wait) ─▶ teste em /api/health
```

Na VPS, em `~/app/`: `docker-compose.yml`, `Caddyfile`, `init.sql` (enviados pelo pipeline) e `.env` (criado à mão, nunca versionado).

**Secrets do GitHub** (Settings > Secrets and variables > Actions): `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_HOST_KEY`.

**Rollback:** cada deploy usa uma imagem com o SHA do commit. Para voltar, rode na VPS
`cd ~/app && IMAGE=ghcr.io/<usuario>/<repo>:<sha-antigo> docker compose up -d`.

**Ao ligar o proxy do Cloudflare:** o IP real do visitante passa a vir em `CF-Connecting-IP`. Remova o `header_up -CF-Connecting-IP` do Caddyfile e restrinja as portas 80/443 da VPS aos IPs do Cloudflare.
