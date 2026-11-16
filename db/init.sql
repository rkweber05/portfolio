-- Roda uma única vez, quando o volume do Postgres é criado pela primeira vez.
CREATE TABLE IF NOT EXISTS contact_messages (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  ip            TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- NULL = salvo no banco, mas o e-mail ainda não saiu (dá para reenviar depois).
  email_sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);
