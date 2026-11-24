import { useState, type ReactNode } from 'react';
import {
  ArrowRight, Play, ShieldCheck, BadgeCheck, UserPlus, Search, FileSignature, Trophy, MessagesSquare, Timer, CheckCircle2,
  Users, Building2, Video, Lock, LifeBuoy, Fingerprint, Crown, ArrowUpRight, Check, Sprout, Send,
} from 'lucide-react';
import { useApp } from '../../store';
import { Accordion, Button, ClearingMark, Eyebrow, JobPlusMark, Reveal, cn } from '../../components/ui';
import { HEADSHOTS, IMG, PLAYERS } from '../../data/mock';
import { SectionHead } from './Layout';

export default function ClearingHome() {
  return (
    <>
      <Hero />
      <Ticker />
      <HowItWorks />
      <Journey />
      <Audiences />
      <PPMSupport />
      <Safeguarding />
      <Founding />
      <Grassroots />
      <JobPlusIntro />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const { go } = useApp();
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy text-white">
      <img src={IMG.stadium} alt="Floodlit football stadium" className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-40 pt-36 sm:px-8 lg:grid-cols-12 lg:pt-40">
        <div className="lg:col-span-7">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Football recruitment for released academy players
          </div>
          <h1 className="mt-7 animate-fade-up font-display text-[46px] font-extrabold leading-[0.96] tracking-[-0.045em] [animation-delay:80ms] sm:text-7xl lg:text-[88px]">
            Your Next Chapter <span className="text-lime">in Football</span> Starts Here.
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-white/70 [animation-delay:160ms] sm:text-xl">
            Connecting released academy players with verified football clubs, professional placement support, and new opportunities beyond the pitch.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:240ms]">
            <Button variant="lime" size="xl" onClick={() => go('players')} iconRight={<ArrowRight />}>I'm a Player</Button>
            <Button variant="glass" size="xl" onClick={() => go('clubs')}>I'm a Club</Button>
            <button onClick={() => go('how')} className="group ml-1 inline-flex items-center gap-3 text-[15px] font-semibold text-white/80 transition hover:text-white">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition group-hover:border-lime group-hover:bg-lime group-hover:text-navy"><Play className="h-4 w-4 fill-current" /></span>
              How It Works
            </button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:block"><HeroCard /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy/50 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
          {[
            { icon: BadgeCheck, t: 'Verified clubs only', d: 'Every club checked' },
            { icon: ShieldCheck, t: 'PPM-managed Claims', d: 'Human review, always' },
            { icon: Users, t: 'Guardian consent', d: 'For players aged 16–17' },
            { icon: Lock, t: 'Private by default', d: 'Contact details hidden' },
          ].map((f, i) => (
            <div key={f.t} className={cn('flex items-center gap-3 py-5', i > 0 && 'md:border-l md:border-white/10 md:pl-6', i % 2 === 1 && 'border-l border-white/10 pl-4 md:pl-6')}>
              <f.icon className="h-5 w-5 shrink-0 text-lime" />
              <div className="min-w-0"><div className="truncate text-sm font-semibold">{f.t}</div><div className="truncate text-xs text-white/50">{f.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  const p = PLAYERS[0];
  return (
    <div className="relative animate-fade-up [animation-delay:300ms]">
      <div className="absolute -inset-8 rounded-[48px] bg-lime/10 blur-3xl" />
      <div className="relative rounded-[30px] border border-white/15 bg-white/[0.07] p-3 shadow-2xl backdrop-blur-xl">
        <div className="relative overflow-hidden rounded-[22px]">
          <img src={p.photo} alt="" className="h-[330px] w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur">Sample profile</span>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-navy"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span>
          <div className="absolute inset-x-5 bottom-4">
            <div className="text-[11px] font-bold uppercase tracking-[.2em] text-lime">{p.position}</div>
            <div className="mt-1 font-display text-[28px] font-extrabold tracking-tight">{p.name}</div>
            <div className="mt-0.5 text-sm text-white/70">{p.age} · {p.country} · {p.academy}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2 pt-3">
          {[['Height', `${p.height} cm`], ['Foot', p.foot], ['Level', p.category]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white/[0.07] px-3 py-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{k}</div>
              <div className="mt-0.5 truncate text-sm font-semibold">{v}</div>
            </div>
          ))}
        </div>
        <div className="m-2 mt-0 flex items-center gap-3 rounded-xl bg-white/[0.07] p-2.5">
          <div className="relative h-12 w-20 overflow-hidden rounded-lg">
            <img src={p.thumb} className="h-full w-full object-cover" alt="" />
            <span className="absolute inset-0 grid place-items-center bg-navy/40"><Play className="h-4 w-4 fill-white text-white" /></span>
          </div>
          <div className="min-w-0 flex-1"><div className="text-sm font-semibold">Approved highlights</div><div className="text-xs text-white/55">Season 2024/25 · {p.videoLen}</div></div>
          <ShieldCheck className="h-5 w-5 text-lime" />
        </div>
      </div>
      <div className="absolute -left-12 top-20 hidden animate-float rounded-2xl border border-white/10 bg-navy/90 p-3.5 shadow-2xl backdrop-blur xl:block">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/45">Claim CLM-2051</div>
        <div className="mt-1 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-amber-400" /> PPM credibility review</div>
      </div>
      <div className="absolute -right-6 bottom-24 hidden animate-float rounded-2xl bg-lime p-3.5 text-navy shadow-2xl [animation-delay:1.6s] xl:block">
        <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60">Your PPM</div>
        <div className="mt-1 flex items-center gap-2 text-sm font-bold"><MessagesSquare className="h-4 w-4" /> Sarah is on it</div>
      </div>
    </div>
  );
}

function Ticker() {
  const items = ['Goalkeepers', 'Centre-backs', 'Full-backs', 'Defensive midfielders', 'Playmakers', 'Wingers', 'Strikers', 'Verified clubs', 'PPM-led Claims'];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-navy-2 py-5">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 font-display text-xl font-extrabold uppercase tracking-tight text-white/85 sm:text-2xl">
            {t}<span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { icon: UserPlus, t: 'Create your football profile', d: 'Add your academy background, positions, statistics and highlight videos — built to the standard clubs expect.' },
  { icon: Fingerprint, t: 'Complete verification', d: 'Identity, eligibility and academy history checks. Players aged 16–17 need guardian consent before going live.' },
  { icon: Search, t: 'Become discoverable', d: 'Verified clubs search by position, age, foot, height and availability. Your contact details are never shown.' },
  { icon: FileSignature, t: 'Claims, trials & placement', d: 'Clubs submit a Claim. Your Player Placement Manager reviews it, then guides discussions, trials and placement.' },
];
function HowItWorks() {
  const { go } = useApp();
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7"><SectionHead eyebrow="How Clearing+ works" title={<>Four steps from release <br className="hidden sm:block" />to your next club.</>} /></div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-slate-600">Being released is part of many football journeys. Clearing+ gives you a structured, safe and professional route back into the game.</p>
            <button onClick={() => go('how')} className="mt-5 inline-flex items-center gap-2 font-semibold text-navy hover:gap-3 transition-all">See the full process <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 90} className="h-full">
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-navy hover:bg-navy">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-slate-200 transition group-hover:text-lime">0{i + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mist text-navy transition group-hover:bg-white/10 group-hover:text-lime"><s.icon className="h-5 w-5" /></span>
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-navy transition group-hover:text-white">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 transition group-hover:text-white/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  { icon: FileSignature, t: 'Claim Submitted', who: 'Verified club', d: 'A verified club submits a Claim for a player, with details of the opportunity — a trial, scholarship or contract offer.' },
  { icon: ShieldCheck, t: 'PPM Review', who: 'Player Placement Manager', d: 'A PPM checks the credibility of the club and the opportunity: named staff, a safeguarding lead and realistic terms.' },
  { icon: CheckCircle2, t: 'Approved / Rejected', who: 'PPM decision', d: 'Credible Claims are approved and the £100 Claim Fee applies to the club. Rejected and withdrawn Claims are never charged.' },
  { icon: MessagesSquare, t: 'Player Discussion', who: 'Player, guardian & PPM', d: 'Your PPM walks you — and your guardian if you are 16–17 — through the opportunity before anything is agreed.' },
  { icon: Timer, t: 'Trial', who: 'Club & player', d: 'Trials are scheduled and tracked by your PPM, including travel guidance, named coaches and safeguarding contacts.' },
  { icon: Trophy, t: 'Placement', who: 'Signed', d: 'When a player signs, the placement fee is the greater of £3,000 or 10% of the first-year contract value.' },
];
function Journey() {
  const [a, setA] = useState(0);
  const s = JOURNEY[a];
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-lime/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead dark eyebrow="The player recruitment journey" title={<>Every step managed.<br /><span className="text-white/35">Nothing left to chance.</span></>} />
        <div className="no-scrollbar mt-14 overflow-x-auto pb-2">
          <div className="relative grid min-w-[760px] grid-cols-6 gap-3">
            <div className="absolute left-[8.33%] right-[8.33%] top-7 h-px bg-white/15" />
            <div className="absolute left-[8.33%] top-7 h-px bg-lime transition-all duration-500" style={{ width: `${(a / 5) * 83.33}%` }} />
            {JOURNEY.map((j, i) => (
              <button key={j.t} onClick={() => setA(i)} className="group relative flex flex-col items-center text-center">
                <span className={cn('relative z-10 grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300', i <= a ? 'border-lime bg-lime text-navy' : 'border-white/15 bg-navy-2 text-white/60 group-hover:border-white/40')}>
                  <j.icon className="h-6 w-6" />
                </span>
                <span className={cn('mt-4 text-sm font-semibold', i === a ? 'text-white' : 'text-white/55')}>{j.t}</span>
                <span className="mt-1 text-[11px] uppercase tracking-wider text-white/35">Step {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <div key={a} className="mt-10 grid animate-fade-up gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-9 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="text-xs font-bold uppercase tracking-[.18em] text-lime">{s.who}</div>
            <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight">{s.t}</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/65">{s.d}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
            <Button variant="glass" onClick={() => setA((a + 5) % 6)}>Previous</Button>
            <Button variant="lime" onClick={() => setA((a + 1) % 6)} iconRight={<ArrowRight />}>Next step</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const AUD = [
  { eyebrow: 'For players', title: "Released isn't the end. It's a reset.", img: IMG.training, points: ['A professional football profile built around your academy career', 'Highlight videos moderated and approved before clubs see them', 'A dedicated Player Placement Manager for every Claim', 'Annual membership from £24.99 — no hidden costs'], cta: ['Create your profile', 'register'], more: ['Player information', 'players'] },
  { eyebrow: 'For parents & guardians', title: 'Peace of mind at every step.', img: IMG.huddle, points: ['Guardian consent required for players aged 16–17', 'Clubs never contact players directly — every conversation runs through a PPM', 'Private documents and guardian details are never visible to clubs', 'A clear, confidential route to raise safeguarding concerns'], cta: ['Guardian information', 'parents'] },
  { eyebrow: 'For football clubs', title: 'Recruit verified talent with confidence.', img: IMG.coaches, points: ['Search verified, academy-trained players by position, age, foot and availability', 'Shortlist players and submit Claims in minutes', '£100 Claim Fee only after PPM credibility approval', 'Placement fee only when a player signs'], cta: ['Club information', 'clubs'], more: ['Register a club', 'register/club'] },
];
function Audiences() {
  const { go } = useApp();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-8 lg:space-y-32">
        {AUD.map((a, i) => (
          <div key={a.eyebrow} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={cn(i % 2 === 1 && 'lg:order-2')}>
              <div className="relative">
                <div className="overflow-hidden rounded-[32px]"><img src={a.img} alt="" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div>
                <div className={cn('absolute -bottom-6 hidden rounded-2xl bg-navy p-5 text-white shadow-2xl sm:block', i % 2 ? '-left-6' : '-right-6')}>
                  <div className="font-display text-3xl font-extrabold text-lime">0{i + 1}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[.16em] text-white/60">{a.eyebrow}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>{a.eyebrow}</Eyebrow>
              <h3 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-5xl">{a.title}</h3>
              <ul className="mt-8 space-y-4">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3.5 text-[16px] leading-relaxed text-slate-700">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/35 text-navy"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{p}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button variant="navy" size="lg" onClick={() => go(a.cta[1])} iconRight={<ArrowRight />}>{a.cta[0]}</Button>
                {a.more && <Button variant="outline" size="lg" onClick={() => go(a.more[1])}>{a.more[0]}</Button>}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

function Bubble({ them, children }: { them?: boolean; children: ReactNode }) {
  return <div className={cn('max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed', them ? 'rounded-tl-md bg-white text-slate-700 ring-1 ring-slate-200' : 'ml-auto rounded-tr-md bg-navy text-white')}>{children}</div>;
}
function PPMSupport() {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHead eyebrow="Player Placement Manager support" title="Every Claim has a human in the middle." desc="Your PPM reviews every Claim, manages communication between you and clubs, and stays with you from first contact to signing." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, t: 'Credibility checks', d: 'Every Claim reviewed before it reaches you.' },
              { icon: Lock, t: 'Controlled messaging', d: 'Clubs cannot message players directly.' },
              { icon: Timer, t: 'Trial coordination', d: 'Dates, travel guidance and contacts handled.' },
              { icon: Users, t: 'Families included', d: 'Guardians kept informed for 16–17s.' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <f.icon className="h-5 w-5 text-navy" />
                <div className="mt-3 font-display font-bold text-navy">{f.t}</div>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-lime/40 via-lime/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-navy/10">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <img src={HEADSHOTS[7]} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1"><div className="text-sm font-bold text-navy">Sarah Okafor</div><div className="text-xs text-emerald-600">● Player Placement Manager</div></div>
                <span className="hidden items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:inline-flex"><Lock className="h-3 w-3" /> PPM-managed</span>
              </div>
              <div className="space-y-3 bg-mist/60 p-5">
                <div className="mx-auto w-fit rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">Claim CLM-2051 · Ashford Rovers FC</div>
                <Bubble them>Hi Jordan — Ashford Rovers FC have submitted a Claim inviting you to a two-day trial. I've completed the credibility checks and it's approved.</Bubble>
                <Bubble>That's brilliant! What happens next?</Bubble>
                <Bubble them>I'll talk you through it tomorrow at 10:30, then confirm dates, travel and the named coach with the club.</Bubble>
                <div className="flex items-center gap-2 rounded-xl bg-lime/25 px-3 py-2 text-xs font-semibold text-navy"><CheckCircle2 className="h-4 w-4" /> Claim approved by PPM — status updated</div>
              </div>
              <div className="flex items-center gap-2 border-t border-slate-100 p-3">
                <div className="field flex items-center text-slate-400">Write a message…</div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-lime"><Send className="h-4 w-4" /></span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SAFE = [
  { icon: Fingerprint, t: 'Identity & eligibility checks', d: 'Every player is verified before their profile goes live.' },
  { icon: Building2, t: 'Verified clubs only', d: 'Clubs are verified before they can search, shortlist or submit Claims.' },
  { icon: Users, t: 'Guardian consent for 16–17s', d: 'Profiles stay hidden until a parent or guardian approves.' },
  { icon: Video, t: 'Moderated video', d: 'Every highlight video is reviewed before clubs can view it.' },
  { icon: Lock, t: 'Private by default', d: 'Contact details, documents and guardian information are never shown to clubs.' },
  { icon: LifeBuoy, t: 'Safeguarding reporting', d: 'A clear, confidential route to raise concerns with our safeguarding lead.' },
];
function Safeguarding() {
  const { go } = useApp();
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <img src={IMG.stadiumAerial} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead dark eyebrow="Verification & safeguarding" title="Safety built in — not bolted on." desc="Young players deserve a recruitment process that protects them. Every part of Clearing+ is designed around verification, consent and controlled communication." />
          <Button variant="glass" size="lg" className="mt-8" onClick={() => go('parents')} iconRight={<ArrowRight />}>Our safeguarding approach</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {SAFE.map((s, i) => (
            <Reveal key={s.t} delay={i * 70} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-lime/40 hover:bg-white/[0.07]">
                <s.icon className="h-6 w-6 text-lime" />
                <h3 className="mt-5 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founding() {
  const { go } = useApp();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-lime p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-grid-dark opacity-70" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[48px] border-navy/5" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1.5 text-xs font-bold text-lime"><Crown className="h-3.5 w-3.5" /> Founding Clubs Programme</div>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-navy sm:text-5xl lg:text-6xl">Help shape Clearing+ from day one.</h2>
              <p className="mt-5 max-w-lg text-lg text-navy/70">A limited number of verified clubs can join as Founding Clubs — with a free membership period and a direct voice in how the platform evolves.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="navy" size="lg" onClick={() => go('founding')} iconRight={<ArrowRight />}>Explore the programme</Button>
                <Button variant="outline" size="lg" className="border-navy/20 bg-transparent text-navy hover:bg-navy/5" onClick={() => go('interest')}>Register interest</Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Free membership period', 'An agreed free period, with the end date set individually for each club.'],
                ['Reduced player fees', 'Players released from Founding/member academies register for £24.99.'],
                ['Early access', 'Priority access to newly verified players in your region.'],
                ['Founding recognition', 'A Founding Club badge on your verified club profile.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-white/50 p-5 ring-1 ring-navy/10 backdrop-blur">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-lime"><Check className="h-4 w-4" strokeWidth={3} /></span>
                  <div className="mt-4 font-display text-lg font-bold text-navy">{t}</div>
                  <p className="mt-1.5 text-sm text-navy/65">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Grassroots() {
  const { go } = useApp();
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="font-display text-[150px] font-extrabold leading-[0.85] tracking-[-0.07em] text-navy sm:text-[230px]">5<span className="text-lime-dark">%</span></div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 text-xs font-bold text-lime"><Sprout className="h-3.5 w-3.5" /> Give Back to Grassroots</div>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <SectionHead eyebrow="Give back to grassroots" title="The game that raised us deserves something back." desc="5% of eligible Clearing+ platform revenue is ring-fenced for grassroots football — and reported transparently, quarter by quarter." />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[['Ring-fenced', 'Set aside from eligible platform revenue'], ['Reported quarterly', 'Clear, published allocation reporting'], ['Community-led', 'Grassroots causes nominated by members']].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><div className="font-display font-bold text-navy">{t}</div><p className="mt-1 text-sm text-slate-600">{d}</p></div>
            ))}
          </div>
          <button onClick={() => go('grassroots')} className="mt-8 inline-flex items-center gap-2 font-semibold text-navy transition-all hover:gap-3">How the programme works <ArrowRight className="h-4 w-4" /></button>
        </Reveal>
      </div>
    </section>
  );
}

function JobPlusIntro() {
  const { go } = useApp();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-[36px] bg-ink lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3 ring-1 ring-white/10"><JobPlusMark size={24} /><span className="text-xs font-semibold text-white/80">Job+ · Powered by Clearing+</span></div>
            <h2 className="mt-7 font-jakarta text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">Your skills go <span className="font-serif text-[1.12em] font-normal italic text-aqua">beyond</span> the pitch.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">Eligible Clearing+ players can opt in to Job+ — a career placement platform that turns football experience into a professional, human-reviewed CV and introductions to UK employers.</p>
            <ul className="mt-7 space-y-3 text-[15px] text-white/75">
              {['AI-assisted CV drafts, reviewed by a Player Placement Manager', 'A Football-to-Workplace Skills Profile', 'Introductions to verified UK employers (Version 1)'].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aqua" />{t}</li>
              ))}
            </ul>
            <Button variant="teal" size="lg" className="mt-9" onClick={() => go('home', 'jobplus')} iconRight={<ArrowUpRight />}>Explore Job+</Button>
          </div>
          <div className="relative min-h-[340px]">
            <img src={IMG.office2} alt="Colleagues in a modern office" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white p-4 shadow-2xl sm:left-auto sm:w-72">
              <div className="flex items-center gap-3">
                <img src={HEADSHOTS[0]} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div><div className="text-sm font-bold text-ink">Marcus Bennett</div><div className="text-xs text-slate-500">Operations Coordinator · Sample</div></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">{['Leadership', 'Planning', 'Resilience'].map((s) => <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal-dark">{s}</span>)}</div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600"><BadgeCheck className="h-3.5 w-3.5" /> Human-reviewed CV</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const CLEARING_FAQ = [
  { q: 'Who can register as a player?', a: 'Players released from professional or recognised football academies, aged 16 and over. Players aged 16–17 need verified guardian consent before their profile becomes visible to clubs.' },
  { q: 'How much does membership cost?', a: 'Annual membership is £24.99 for players from Founding/member academies, £49.99 for other UK players and £29.99 for international players. All prices are in GBP.' },
  { q: 'Can clubs contact me directly?', a: 'No. Club-to-player direct messaging is disabled by default. Communication is managed by your Player Placement Manager, who may enable a monitored, Claim-specific channel when appropriate.' },
  { q: 'What do clubs pay?', a: 'Clubs hold an annual licence (Founding Clubs receive a free period). A £100 Claim Fee applies only after a PPM approves a Claim as credible — rejected and withdrawn Claims are never charged. On signing, the placement fee is the greater of £3,000 or 10% of the first-year contract value.' },
  { q: 'What information can clubs see?', a: 'Your football profile: photo, age, country, position, preferred foot, height, academy background, availability and approved highlight videos. Clubs never see your phone number, email, private documents or guardian information.' },
  { q: 'What is Job+?', a: 'Job+ is our sister platform for eligible Clearing+ players exploring careers outside football. It creates an AI-assisted, human-reviewed CV and connects candidates with verified UK employers.' },
];
function FAQ() {
  const { go } = useApp();
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="FAQs" title="Questions, answered." desc="Can't find what you're looking for? Our team is happy to help." />
          <Button variant="navy" size="lg" className="mt-8" onClick={() => go('contact')} iconRight={<ArrowRight />}>Contact us</Button>
        </div>
        <div className="lg:col-span-8"><Accordion items={CLEARING_FAQ} /></div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { go } = useApp();
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-36">
      <img src={IMG.stadiumMatch} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/90" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <ClearingMark size={56} className="mx-auto" />
        <h2 className="mt-8 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Ready for your <span className="text-lime">next chapter?</span></h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">Join as a player, register your club, or tell us you're interested — we'll be in touch as we open in your region.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="lime" size="xl" onClick={() => go('register')}>Register as a Player</Button>
          <Button variant="glass" size="xl" onClick={() => go('register/club')}>Register a Club</Button>
          <Button variant="ghost" size="xl" className="text-white hover:bg-white/10 hover:text-white" onClick={() => go('interest')}>Register Interest</Button>
        </div>
      </div>
    </section>
  );
}
