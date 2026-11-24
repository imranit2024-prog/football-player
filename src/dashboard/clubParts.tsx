import { useState } from 'react';
import { Bookmark, BookmarkCheck, Play, FileSignature, Eye, MapPin, Ruler, Footprints, BadgeCheck, Lock, CheckCircle2, ArrowLeft, ArrowRight, Trophy, Timer, Building2 } from 'lucide-react';
import { useApp } from '../store';
import { Badge, Button, Checkbox, ClaimPipeline, Field, InfoNote, Input, Modal, RadioCards, Select, Stepper, Textarea, cn } from '../components/ui';
import { CLAIM_FEE, MY_CLUB, PLAYERS, gbp, placementFee, type Claim, type Player } from '../data/mock';

export function PlayerCard({ p, shortlisted, onToggle, onView, onClaim, onPlay }: { p: Player; shortlisted: boolean; onToggle: () => void; onView: () => void; onClaim: () => void; onPlay: () => void }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.photo} alt={p.name} loading="lazy" className="h-full w-full object-cover object-[50%_25%] transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-extrabold text-navy">{p.pos}</span>
          {p.verified && <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-navy"><BadgeCheck className="h-3 w-3" /> Verified</span>}
        </div>
        <button onClick={onToggle} className={cn('absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition', shortlisted ? 'bg-lime text-navy' : 'bg-navy/50 text-white hover:bg-navy/70')} aria-label="Shortlist">
          {shortlisted ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
        <div className="absolute inset-x-3 bottom-3 text-white">
          <div className="font-display text-lg font-extrabold leading-tight">{p.name}</div>
          <div className="text-xs text-white/75">{p.position} · {p.age} · {p.country}</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[{ i: Footprints, v: p.foot }, { i: Ruler, v: `${p.height} cm` }, { i: MapPin, v: p.country }].map((x, k) => (
            <div key={k} className="rounded-xl bg-slate-50 px-2 py-2"><x.i className="mx-auto h-3.5 w-3.5 text-slate-400" /><div className="mt-1 truncate text-[12px] font-semibold text-slate-800">{x.v}</div></div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 text-[12.5px]">
          <span className="truncate text-slate-500">{p.academy}</span>
          <Badge className="shrink-0">{p.availability}</Badge>
        </div>
        <button onClick={onPlay} className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-2 text-left transition hover:border-slate-300 hover:bg-slate-50">
          <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg"><img src={p.thumb} alt="" className="h-full w-full object-cover" /><span className="absolute inset-0 grid place-items-center bg-navy/40"><Play className="h-3.5 w-3.5 fill-white text-white" /></span></span>
          <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">Approved highlights</span><span className="text-[11px] text-slate-500">{p.videoLen} · moderated</span></span>
        </button>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="rounded-xl" icon={<Eye />} onClick={onView}>View profile</Button>
          <Button size="sm" variant="navy" className="rounded-xl" icon={<FileSignature />} onClick={onClaim}>Submit Claim</Button>
        </div>
      </div>
    </div>
  );
}

export function VideoModal({ p, onClose }: { p: Player | null; onClose: () => void }) {
  return (
    <Modal open={!!p} onClose={onClose} title={p ? `${p.name} — approved highlights` : ''} subtitle="Static preview · video moderated by Clearing+" size="lg">
      {p && (
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy">
          <img src={p.thumb} alt="" className="h-full w-full object-cover opacity-70" />
          <span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-navy"><Play className="h-7 w-7 fill-current" /></span></span>
          <div className="absolute inset-x-4 bottom-4"><div className="h-1 rounded-full bg-white/25"><div className="h-full w-1/4 rounded-full bg-lime" /></div><div className="mt-2 flex justify-between text-xs text-white/80"><span>0:42</span><span>{p.videoLen}</span></div></div>
        </div>
      )}
    </Modal>
  );
}

export function PlayerProfileModal({ p, onClose, shortlisted, onToggle, onClaim }: { p: Player | null; onClose: () => void; shortlisted: boolean; onToggle: () => void; onClaim: () => void }) {
  return (
    <Modal open={!!p} onClose={onClose} size="lg" title={p?.name} subtitle={p && `${p.position} · ${p.age} · ${p.country}`}
      footer={p && <><Button variant="outline" icon={shortlisted ? <BookmarkCheck /> : <Bookmark />} onClick={onToggle}>{shortlisted ? 'Shortlisted' : 'Shortlist'}</Button><Button variant="navy" icon={<FileSignature />} onClick={onClaim}>Submit Claim</Button></>}>
      {p && (
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
            <img src={p.photo} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover object-top" />
            <div>
              <div className="flex flex-wrap gap-2"><Badge tone="lime" dot={false}>{p.pos} · {p.secondary}</Badge>{p.verified && <Badge tone="green">Verified</Badge>}<Badge>{p.availability}</Badge></div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{p.bio}</p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[['Age', p.age], ['Country', p.country], ['Preferred foot', p.foot], ['Height', `${p.height} cm`], ['Academy level', p.category], ['Released', p.released]].map(([k, v]) => (
                  <div key={k as string} className="rounded-xl bg-slate-50 p-3"><div className="text-[11px] uppercase tracking-wider text-slate-400">{k}</div><div className="mt-0.5 text-sm font-semibold text-slate-900">{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Building2 className="h-3.5 w-3.5" /> Academy background</div>
              <div className="mt-2 font-semibold text-slate-900">{p.academy}</div>
              <div className="text-sm text-slate-500">{p.category} · released {p.released}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Trophy className="h-3.5 w-3.5" /> Last two seasons</div>
              <div className="mt-2 grid grid-cols-3 text-center">{[['Apps', p.apps], ['Goals', p.goals], ['Assists', p.assists]].map(([k, v]) => <div key={k as string}><div className="font-display text-2xl font-extrabold text-slate-900">{v}</div><div className="text-xs text-slate-500">{k}</div></div>)}</div>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy">
            <img src={p.thumb} alt="" className="h-full w-full object-cover opacity-75" />
            <span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-navy"><Play className="h-6 w-6 fill-current" /></span></span>
            <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-2.5 py-1 text-xs font-semibold text-white">Approved highlights · {p.videoLen}</span>
          </div>
          <InfoNote icon={Lock}>Phone numbers, email addresses, private documents and guardian information are never available to clubs. All contact is managed by a Player Placement Manager.</InfoNote>
        </div>
      )}
    </Modal>
  );
}

const STEPS = ['Player & opportunity', 'Details', 'Contacts & safeguarding', 'Fees & terms', 'Review'];

export function ClaimForm({ open, onClose, player, onSubmitted }: { open: boolean; onClose: () => void; player: Player | null; onSubmitted: (c: Claim) => void }) {
  const { toast } = useApp();
  const options = PLAYERS.filter((p) => p.verified);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Claim | null>(null);
  const [pid, setPid] = useState(player?.id ?? options[0].id);
  const [type, setType] = useState('Trial invitation');
  const [contract, setContract] = useState(24000);
  const [d, setD] = useState({ safe: false, contact: false, accurate: false, fees: false });
  const p = options.find((x) => x.id === (player?.id ?? pid)) ?? options[0];
  const reset = () => { setStep(0); setDone(null); setD({ safe: false, contact: false, accurate: false, fees: false }); onClose(); };

  const next = () => {
    if (step === 2 && !(d.safe && d.contact && d.accurate)) return toast('Please confirm all safeguarding declarations.', 'error');
    if (step === 3 && !d.fees) return toast('Please accept the Claim fee terms.', 'error');
    if (step < STEPS.length - 1) return setStep(step + 1);
    const claim: Claim = { id: `CLM-${2052 + Math.floor(Math.random() * 40)}`, player: p.name, playerId: p.id, club: MY_CLUB.name, country: MY_CLUB.country, status: 'Submitted', submitted: '14 Mar 2026', ppm: 'Unassigned', type, contract: type === 'Contract offer' ? contract : undefined, note: type === 'Trial invitation' ? 'Trial invitation submitted via Clearing+.' : `${type} submitted via Clearing+.` };
    setDone(claim);
    onSubmitted(claim);
    toast(`${claim.id} submitted — a PPM will review it within 2 working days.`);
  };

  return (
    <Modal open={open} onClose={reset} size="lg" title={done ? 'Claim submitted' : 'Submit a Claim'} subtitle={done ? undefined : `For ${p.name} · ${p.position}`}
      footer={done ? <Button variant="navy" onClick={reset}>Done</Button> : (
        <div className="flex w-full justify-between">
          <Button variant="ghost" icon={<ArrowLeft />} disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
          <Button variant={step === STEPS.length - 1 ? 'lime' : 'navy'} iconRight={<ArrowRight />} onClick={next}>{step === STEPS.length - 1 ? 'Submit Claim' : 'Continue'}</Button>
        </div>
      )}>
      {done ? (
        <div className="space-y-6 py-2">
          <div className="flex items-center gap-4 rounded-2xl bg-lime/20 p-4 ring-1 ring-lime-dark/20"><CheckCircle2 className="h-8 w-8 shrink-0 text-navy" /><div><div className="font-display text-lg font-bold text-navy">{done.id} · {done.player}</div><div className="text-sm text-slate-600">Submitted to the PPM review queue. No fee is charged unless the Claim is approved.</div></div></div>
          <ClaimPipeline status="Submitted" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[{ i: Timer, t: 'PPM review', d: 'Usually within 2 working days' }, { i: CheckCircle2, t: '£100 on approval', d: 'Not charged if rejected or withdrawn' }, { i: Trophy, t: 'Placement fee', d: 'Greater of £3,000 or 10%' }].map((x) => <div key={x.t} className="rounded-2xl bg-slate-50 p-4"><x.i className="h-5 w-5 text-navy" /><div className="mt-2 text-sm font-bold text-slate-900">{x.t}</div><div className="text-xs text-slate-500">{x.d}</div></div>)}
          </div>
        </div>
      ) : (
        <>
          <Stepper steps={STEPS} current={step} className="mb-7" />
          <div key={step} className="animate-fade-up">
            {step === 0 && (
              <div className="space-y-5">
                {!player && <Field label="Player"><Select value={pid} onChange={(e) => setPid(e.target.value)} options={options.map((o) => ({ value: o.id, label: `${o.name} · ${o.pos} · ${o.age}` }))} /></Field>}
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"><img src={p.photo} alt="" className="h-14 w-14 rounded-xl object-cover object-top" /><div><div className="font-semibold text-slate-900">{p.name}</div><div className="text-sm text-slate-500">{p.position} · {p.age} · {p.academy}</div></div><Badge className="ml-auto">{p.availability}</Badge></div>
                <Field label="Type of opportunity"><RadioCards cols={3} value={type} onChange={setType} options={[{ value: 'Trial invitation', label: 'Trial invitation', desc: 'Invite to train or play' }, { value: 'Scholarship', label: 'Scholarship', desc: 'Development pathway' }, { value: 'Contract offer', label: 'Contract offer', desc: 'Professional terms' }]} /></Field>
                <div className="grid gap-4 sm:grid-cols-2"><Field label="Proposed start date"><Input type="date" defaultValue="2026-03-24" /></Field><Field label="Intended role / position"><Input defaultValue={p.position} /></Field></div>
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Describe the opportunity" className="sm:col-span-2"><Textarea rows={4} defaultValue="Two-day trial with the first-team squad including a behind-closed-doors fixture. Travel expenses covered." /></Field>
                <Field label="Trial / start location"><Input defaultValue="Ashford Rovers Training Ground, Kent" /></Field>
                <Field label="Duration"><Select options={['1 day', '2 days', '1 week', '2 weeks', 'N/A']} defaultValue="2 days" /></Field>
                {type === 'Contract offer' && (
                  <Field label="Estimated first-year contract value (GBP)" className="sm:col-span-2" hint={`Placement fee if signed: ${gbp(placementFee(contract))} (greater of £3,000 or 10%).`}>
                    <Input type="number" value={contract} onChange={(e) => setContract(+e.target.value)} />
                  </Field>
                )}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Supervising coach"><Input defaultValue="Paul Stanton (Head Coach)" /></Field>
                  <Field label="Recruitment contact"><Input defaultValue="Graham Whitlock" /></Field>
                  <Field label="Safeguarding officer"><Input defaultValue="Jenna Moss" /></Field>
                  <Field label="Safeguarding officer email"><Input defaultValue="safeguarding@ashfordrovers.example" /></Field>
                </div>
                <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                  <Checkbox checked={d.safe} onChange={(v) => setD({ ...d, safe: v })} label="All staff involved hold valid enhanced DBS checks." />
                  <Checkbox checked={d.contact} onChange={(v) => setD({ ...d, contact: v })} label="We will not contact the player or family directly outside Clearing+." desc="Communication is managed by the assigned PPM." />
                  <Checkbox checked={d.accurate} onChange={(v) => setD({ ...d, accurate: v })} label="The information in this Claim is accurate." />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-navy p-5 text-white"><div className="text-sm text-white/60">Claim Fee</div><div className="mt-1 font-display text-3xl font-extrabold text-lime">{gbp(CLAIM_FEE)}</div><p className="mt-2 text-xs text-white/60">Charged only after PPM credibility approval. Rejected and withdrawn Claims are not charged.</p></div>
                  <div className="rounded-2xl border border-slate-200 p-5"><div className="text-sm text-slate-500">Placement fee (on signing)</div><div className="mt-1 font-display text-3xl font-extrabold text-slate-900">{gbp(placementFee(type === 'Contract offer' ? contract : 24000))}</div><p className="mt-2 text-xs text-slate-500">Greater of £3,000 or 10% of first-year contract value{type === 'Contract offer' ? ` (${gbp(contract)})` : ' — example at £24,000'}.</p></div>
                </div>
                <Checkbox checked={d.fees} onChange={(v) => setD({ ...d, fees: v })} label="I understand and accept the Claim and placement fee terms." />
              </div>
            )}
            {step === 4 && (
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                {[['Player', `${p.name} · ${p.position}`], ['Club', MY_CLUB.name], ['Opportunity', type], ...(type === 'Contract offer' ? [['Contract value', gbp(contract)]] : []), ['Safeguarding', 'Declarations confirmed'], ['Fees', `£100 on approval · placement ${gbp(placementFee(type === 'Contract offer' ? contract : 24000))}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm"><span className="text-slate-500">{k}</span><span className="text-right font-semibold text-slate-900">{v}</span></div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
