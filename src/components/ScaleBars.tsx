import type { Result } from "@/lib/content";

// Duas barras na mesma escala: a maior ocupa 100% e a outra, a fração real.
export function ScaleBars({ result, animated = false }: { result: Result; animated?: boolean }) {
  const max = Math.max(result.before.value, result.after.value);
  const pct = (v: number) => `${Math.max((v / max) * 100, 0.15)}%`;

  return (
    <dl className={animated ? "bars bars--animated" : "bars"}>
      <div className="bars__row">
        <dt>Antes</dt>
        <dd>
          <span className="bars__bar bars__bar--before" style={{ width: pct(result.before.value) }} />
          <span className="bars__value">{result.before.label}</span>
        </dd>
      </div>
      <div className="bars__row">
        <dt>Depois</dt>
        <dd>
          <span className="bars__bar bars__bar--after" style={{ width: pct(result.after.value) }} />
          <span className="bars__value">{result.after.label}</span>
        </dd>
      </div>
    </dl>
  );
}
