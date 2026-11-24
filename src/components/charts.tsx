import { useId, useState } from 'react';
import { cn } from '../utils/cn';

const useSafeId = () => useId().replace(/[^a-zA-Z0-9]/g, '');

function smooth(pts: [number, number][]) {
  if (!pts.length) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}
const niceMax = (v: number) => {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
};
export const shortNum = (n: number) =>
  n >= 1e6 ? (n / 1e6).toFixed(1) + 'm' : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e4 || n % 1000 === 0 ? 0 : 1) + 'k' : String(Math.round(n));

type Series = { name: string; data: number[]; color: string };

export function AreaChart({ series, labels, height = 240, prefix = '' }: { series: Series[]; labels: string[]; height?: number; prefix?: string }) {
  const id = useSafeId();
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = height, L = 44, R = 12, T = 14, B = 28;
  const max = niceMax(Math.max(...series.flatMap((s) => s.data)));
  const n = labels.length;
  const step = (W - L - R) / (n - 1);
  const x = (i: number) => L + i * step;
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const left = hover == null ? 0 : Math.min(85, Math.max(15, (x(hover) / W) * 100));
  return (
    <div className="relative w-full select-none">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseLeave={() => setHover(null)}>
        <defs>
          {series.map((s, si) => (
            <linearGradient key={si} id={`${id}g${si}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.26" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(max * t)} y2={y(max * t)} stroke="#E2E8F0" strokeDasharray={t ? '3 4' : undefined} />
            <text x={L - 8} y={y(max * t) + 4} textAnchor="end" fontSize="11" fill="#94A3B8">{prefix}{shortNum(max * t)}</text>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={hover === i ? '#0F172A' : '#94A3B8'}>{l}</text>
        ))}
        {series.map((s, si) => {
          const line = smooth(s.data.map((v, i) => [x(i), y(v)] as [number, number]));
          return (
            <g key={si}>
              <path d={`${line} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={`url(#${id}g${si})`} />
              <path d={line} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          );
        })}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="#CBD5E1" />}
        {hover != null && series.map((s, si) => <circle key={si} cx={x(hover)} cy={y(s.data[hover])} r="4.5" fill="#fff" stroke={s.color} strokeWidth="2.5" />)}
        {labels.map((_, i) => (
          <rect key={i} x={x(i) - step / 2} y={T} width={step} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      {hover != null && (
        <div className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl bg-navy px-3 py-2 text-xs text-white shadow-xl" style={{ left: `${left}%` }}>
          <div className="mb-1 font-semibold text-white/60">{labels[hover]}</div>
          {series.map((s) => (
            <div key={s.name} className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.name}: <b>{prefix}{s.data[hover].toLocaleString('en-GB')}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BarChart({ data, keys, colors, names, height = 220, prefix = '' }: { data: Record<string, string | number>[]; keys: string[]; colors: string[]; names?: string[]; height?: number; prefix?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = height, L = 44, R = 8, T = 12, B = 28;
  const totals = data.map((d) => keys.reduce((s, k) => s + (Number(d[k]) || 0), 0));
  const max = niceMax(Math.max(...totals, 1));
  const slot = (W - L - R) / data.length;
  const bw = Math.min(34, slot * 0.56);
  const h = (v: number) => (v / max) * (H - T - B);
  return (
    <div className="relative w-full select-none">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={H - B - h(max * t)} y2={H - B - h(max * t)} stroke="#E2E8F0" strokeDasharray={t ? '3 4' : undefined} />
            <text x={L - 8} y={H - B - h(max * t) + 4} textAnchor="end" fontSize="11" fill="#94A3B8">{prefix}{shortNum(max * t)}</text>
          </g>
        ))}
        {data.map((d, i) => {
          let acc = 0;
          const cx = L + slot * i + slot / 2;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={L + slot * i + 2} y={T} width={slot - 4} height={H - T - B} rx="8" fill={hover === i ? '#F1F5F9' : 'transparent'} />
              {keys.map((k, ki) => {
                const v = Number(d[k]) || 0;
                const hh = h(v);
                const yy = H - B - acc - hh;
                acc += hh;
                return <rect key={k} x={cx - bw / 2} y={yy} width={bw} height={Math.max(0, hh)} rx={ki === keys.length - 1 ? 5 : 1} fill={colors[ki]} />;
              })}
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill={hover === i ? '#0F172A' : '#94A3B8'}>{String(d.label)}</text>
            </g>
          );
        })}
      </svg>
      {hover != null && (
        <div className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl bg-navy px-3 py-2 text-xs text-white shadow-xl" style={{ left: `${Math.min(85, Math.max(15, ((L + slot * hover + slot / 2) / W) * 100))}%` }}>
          <div className="mb-1 font-semibold text-white/60">{String(data[hover].label)}</div>
          {keys.map((k, ki) => (
            <div key={k} className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full" style={{ background: colors[ki] }} />
              {names?.[ki] ?? k}: <b>{prefix}{Number(data[hover][k]).toLocaleString('en-GB')}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Donut({ segments, size = 168, thickness = 20, label, sub }: { segments: { label: string; value: number; color: string }[]; size?: number; thickness?: number; label?: string; sub?: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={thickness} strokeDasharray={`${Math.max(0, len - 2)} ${c}`} strokeDashoffset={-off} />;
          off += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-xl font-extrabold text-slate-900">{label}</div>
          {sub && <div className="text-xs text-slate-500">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

export function Legend({ items, format }: { items: { label: string; value: number; color: string }[]; format?: (n: number) => string }) {
  const total = items.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <ul className="w-full space-y-2.5">
      {items.map((it) => (
        <li key={it.label} className="flex items-center justify-between gap-3 text-[13px]">
          <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />{it.label}</span>
          <span className="font-semibold tabular-nums text-slate-900">{format ? format(it.value) : it.value.toLocaleString('en-GB')} <span className="font-normal text-slate-400">· {Math.round((it.value / total) * 100)}%</span></span>
        </li>
      ))}
    </ul>
  );
}

export function Sparkline({ data, color = '#102A43', width = 96, height = 32 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const id = useSafeId();
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * width, height - 3 - ((v - min) / (max - min || 1)) * (height - 6)] as [number, number]);
  const d = smooth(pts);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${width},${height} L0,${height} Z`} fill={`url(#${id}s)`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HBarList({ items, color = 'bg-navy', format }: { items: { label: string; value: number }[]; color?: string; format?: (n: number) => string }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3.5">
      {items.map((it) => (
        <div key={it.label}>
          <div className="mb-1.5 flex items-center justify-between text-[13px]">
            <span className="font-medium text-slate-700">{it.label}</span>
            <span className="font-semibold tabular-nums text-slate-900">{format ? format(it.value) : it.value.toLocaleString('en-GB')}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
