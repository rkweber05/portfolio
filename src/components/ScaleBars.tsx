import type { Result } from "@/lib/content";

// Duas barras na mesma escala: a maior ocupa 100% da trilha e a outra, a fração real.
export function ScaleBars({ result }: { result: Result }) {
  const max = Math.max(result.before.value, result.after.value);
  const pct = (v: number) => `${Math.max((v / max) * 100, 0.6)}%`;

  const rows = [
    { key: "before", name: "Antes", data: result.before },
    { key: "after", name: "Depois", data: result.after },
  ] as const;

  return (
    <dl className="bars">
      {rows.map(({ key, name, data }) => (
        <div key={key} className="bars__row">
          <dt>{name}</dt>
          <dd className="bars__value">{data.label}</dd>
          <dd className="bars__track" aria-hidden="true">
            <span className={`bars__bar bars__bar--${key}`} style={{ width: pct(data.value) }} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
