import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Search, Send, Paperclip, Lock, ShieldCheck, ArrowLeft, Eye, FileSignature, AlertTriangle, NotebookPen } from 'lucide-react';
import { useApp } from '../store';
import { Avatar, Badge, Card, Toggle, cn } from './ui';
import type { Thread } from '../data/mock';

const REPLIES: Record<string, string> = {
  PPM: "Thanks — I've noted that on the Claim record and will come back to you shortly.",
  Player: 'Thanks Sarah, that works for me.',
  Club: "Understood — we'll confirm by the end of the day.",
  Guardian: "Thank you, that's really helpful.",
  Monitored: 'Thanks, noted.',
  Candidate: 'Great, thank you!',
};

export function Messenger({ threads: initial, me, ppm, banner }: { threads: Thread[]; me: string; ppm?: boolean; banner?: ReactNode }) {
  const { toast } = useApp();
  const [threads, setThreads] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id);
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [view, setView] = useState<'list' | 'chat'>('list');
  const [monitored, setMonitored] = useState<Record<string, boolean>>({ 'CLM-2050': true });
  const box = useRef<HTMLDivElement>(null);
  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  const kinds = useMemo(() => ['All', ...Array.from(new Set(initial.map((t) => t.kind)))], [initial]);
  const list = threads.filter((t) => (filter === 'All' || t.kind === filter) && (t.name + t.sub + (t.claim ?? '')).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const b = box.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [active?.messages.length, typing, activeId]);

  const now = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const push = (id: string, m: { from: 'me' | 'them' | 'system'; author: string; text: string }) =>
    setThreads((ts) => ts.map((th) => (th.id === id ? { ...th, messages: [...th.messages, { id: Date.now() + Math.random(), time: now(), ...m }] } : th)));

  const send = () => {
    const t = text.trim();
    if (!t || !active) return;
    push(active.id, { from: 'me', author: me, text: t });
    setText('');
    if (active.kind === 'Support') return;
    setTyping(true);
    const id = active.id;
    const kind = active.kind;
    const name = active.name;
    setTimeout(() => {
      setTyping(false);
      push(id, { from: 'them', author: name, text: REPLIES[kind] ?? 'Thanks!' });
    }, 1500);
  };

  const open = (id: string) => {
    setActiveId(id);
    setView('chat');
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: 0 } : t)));
  };

  const toggleMonitored = (claim: string, v: boolean) => {
    setMonitored((m) => ({ ...m, [claim]: v }));
    if (active) push(active.id, { from: 'system', author: 'System', text: `Monitored club–player channel ${v ? 'enabled' : 'disabled'} by ${me} for ${claim}.` });
    toast(v ? `Monitored channel enabled for ${claim}. All messages remain visible to the PPM.` : `Monitored channel disabled for ${claim}.`, v ? 'success' : 'info');
  };

  if (!active) return null;
  return (
    <Card className="grid h-[calc(100vh-190px)] min-h-[560px] overflow-hidden lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_270px]">
      <div className={cn('flex min-h-0 flex-col border-r border-slate-100', view === 'chat' && 'hidden lg:flex')}>
        <div className="space-y-3 border-b border-slate-100 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search conversations" className="field h-10 pl-9" />
          </div>
          {kinds.length > 2 && (
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
              {kinds.map((k) => (
                <button key={k} onClick={() => setFilter(k)} className={cn('whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition', filter === k ? 'bg-[var(--brand)] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>{k}</button>
              ))}
            </div>
          )}
        </div>
        <ul className="thin-scroll flex-1 overflow-y-auto p-2">
          {list.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const a = t.id === active.id;
            return (
              <li key={t.id}>
                <button onClick={() => open(t.id)} className={cn('flex w-full items-start gap-3 rounded-xl p-3 text-left transition', a ? 'bg-slate-100' : 'hover:bg-slate-50')}>
                  <div className="relative">
                    <Avatar name={t.name} src={t.avatar} size={42} />
                    {t.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold text-slate-900">{t.name}</span><span className="shrink-0 text-[11px] text-slate-400">{last?.time}</span></div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      {t.monitored && <Eye className="h-3 w-3 shrink-0 text-violet-500" />}
                      <span className="truncate text-xs text-slate-500">{last?.text}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">{t.kind}</span>
                      {t.claim && <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">{t.claim}</span>}
                      {t.unread > 0 && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[var(--brand)] px-1.5 text-[10px] font-bold text-white">{t.unread}</span>}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
          {!list.length && <li className="p-6 text-center text-sm text-slate-400">No conversations match.</li>}
        </ul>
      </div>

      <div className={cn('flex min-h-0 flex-col', view === 'list' && 'hidden lg:flex')}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <button onClick={() => setView('list')} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Back"><ArrowLeft className="h-4 w-4" /></button>
          <Avatar name={active.name} src={active.avatar} size={38} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-slate-900">{active.name}</div>
            <div className="truncate text-xs text-slate-500">{active.sub}</div>
          </div>
          {ppm && active.claim && (
            <button onClick={() => toggleMonitored(active.claim!, !monitored[active.claim!])} title="Monitored club–player channel for this Claim"
              className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 transition xl:hidden', monitored[active.claim] ? 'bg-violet-50 text-violet-700 ring-violet-200' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50')}>
              <Eye className="h-3 w-3" /> Channel {monitored[active.claim] ? 'on' : 'off'}
            </button>
          )}
          {active.monitored ? <Badge tone="violet">Monitored</Badge> : <span className="hidden items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:inline-flex"><Lock className="h-3 w-3" /> PPM-controlled</span>}
        </div>
        {banner && <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">{banner}</div>}
        <div ref={box} className="thin-scroll flex-1 space-y-3 overflow-y-auto bg-slate-50/50 p-4 sm:p-6">
          {active.messages.map((m) => {
            if (m.from === 'system')
              return <div key={m.id} className="mx-auto flex w-fit max-w-[90%] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />{m.text}</div>;
            const mine = m.from === 'me';
            return (
              <div key={m.id} className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}>
                {(!mine && (active.monitored || active.kind === 'Support')) && <span className="mb-1 px-1 text-[11px] font-semibold text-slate-500">{m.author}</span>}
                <div className={cn('max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%]', mine ? 'rounded-br-md bg-[var(--brand)] text-white' : 'rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200')}>{m.text}</div>
                <span className="mt-1 px-1 text-[10.5px] text-slate-400">{m.time}</span>
              </div>
            );
          })}
          {typing && (
            <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-slate-200">
              {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 120}ms` }} />)}
            </div>
          )}
        </div>
        <div className="border-t border-slate-100 p-3">
          <div className="flex items-end gap-2">
            <button onClick={() => toast('Attachments are a visual demo in this prototype.', 'info')} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-slate-100" aria-label="Attach"><Paperclip className="h-4 w-4" /></button>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={1} placeholder="Write a message…  (Enter to send)"
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              className="field max-h-32 min-h-11 flex-1 resize-none py-2.5" />
            <button onClick={send} disabled={!text.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--brand)] text-white transition disabled:opacity-40" aria-label="Send"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <aside className="thin-scroll hidden min-h-0 flex-col overflow-y-auto border-l border-slate-100 p-5 xl:flex">
        <div className="flex flex-col items-center text-center">
          <Avatar name={active.name} src={active.avatar} size={64} />
          <div className="mt-3 font-display font-bold text-slate-900">{active.name}</div>
          <div className="text-xs text-slate-500">{active.sub}</div>
        </div>
        {active.claim && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><FileSignature className="h-3.5 w-3.5" /> Linked Claim</div>
            <div className="mt-1.5 font-semibold text-slate-900">{active.claim}</div>
          </div>
        )}
        <div className="mt-4 rounded-2xl border border-slate-200 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Messaging permissions</div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">Direct club-to-player messaging is disabled by default. A PPM may enable a monitored, Claim-specific channel.</p>
          {ppm && active.claim ? (
            <Toggle className="mt-4" checked={!!monitored[active.claim]} onChange={(v) => toggleMonitored(active.claim!, v)} label="Monitored channel" desc={`Club ↔ player for ${active.claim}`} />
          ) : (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600"><Lock className="h-3.5 w-3.5" /> Managed by your PPM</div>
          )}
        </div>
        {ppm && (
          <div className="mt-4 grid gap-2">
            <button onClick={() => toast('Call note logged to the Claim record (demo).')} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><NotebookPen className="h-4 w-4" /> Log call note</button>
            <button onClick={() => toast('Escalated to the safeguarding lead (demo).', 'info')} className="flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"><AlertTriangle className="h-4 w-4" /> Escalate to safeguarding</button>
          </div>
        )}
      </aside>
    </Card>
  );
}
