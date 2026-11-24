import { useState } from 'react';
import {
  ArrowRight, Check, Crown, Users, Shield, MessageCircle, Timer, Gauge, GraduationCap, BarChart3, Sparkles, BadgeCheck,
  Search, Building2, Handshake, FileText, UserCheck, Truck, Briefcase, Dumbbell, HardHat, Utensils, Headphones, UserPlus, Landmark, ArrowUpRight, MapPin,
} from 'lucide-react';
import { useApp } from '../../store';
import { Accordion, Button, ClearingLogo, Reveal, Tabs, cn } from '../../components/ui';
import { CVDocument, CVWorkflow, SkillsProfile } from '../../components/CV';
import { HEADSHOTS, IMG, INDUSTRIES, SKILL_MAP, gbp, hiringFee } from '../../data/mock';
import { JobHead } from './Layout';

export default function JobHome() {
  return (
    <>
      <Hero />
      <Transition />
      <Skills />
      <AIReview />
      <Journey />
      <Employers />
      <Industries />
      <CVPreview />
      <Benefits />
      <PoweredBy />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const { go } = useApp();
  return (
    <section className="relative overflow-hidden bg-sand pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 bg-dots opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -right-40 top-20 h-[560px] w-[560px] rounded-full bg-aqua/20 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-stone"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> Career placement for former academy players</div>
          <h1 className="mt-7 animate-fade-up font-jakarta text-[46px] font-extrabold leading-[1.0] tracking-[-0.045em] text-ink [animation-delay:80ms] sm:text-7xl lg:text-[80px]">
            Your skills go <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-teal">beyond</span> the pitch.
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600 [animation-delay:160ms] sm:text-xl">Transform the skills developed through football into meaningful career opportunities.</p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Button variant="ink" size="xl" onClick={() => go('optin')} iconRight={<ArrowRight />}>Start your career profile</Button>
            <Button variant="outline" size="xl" onClick={() => go('employers')}>I'm an employer</Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            {['AI-assisted, human-reviewed CVs', 'Verified UK employers', 'PPM support throughout'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-teal/15 text-teal"><Check className="h-3 w-3" strokeWidth={3} /></span>{t}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] sm:aspect-[5/5] lg:aspect-[4/4.6]">
              <img src={IMG.pro} alt="Young professional in a blazer" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">Sample candidate</span>
            </div>
            <div className="absolute -left-3 top-8 w-60 animate-float rounded-2xl bg-white p-4 shadow-2xl shadow-ink/15 sm:-left-12">
              <div className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Skill translation</div>
              {SKILL_MAP.slice(0, 2).map((s) => (
                <div key={s.work} className="mt-3">
                  <div className="text-[11px] text-slate-500">{s.football}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[13px] font-bold text-ink"><ArrowRight className="h-3.5 w-3.5 text-teal" />{s.work}</div>
                </div>
              ))}
            </div>
            <div className="absolute -right-3 bottom-16 w-[270px] animate-float rounded-2xl bg-ink p-4 text-white shadow-2xl [animation-delay:1.8s] sm:-right-10">
              <div className="flex items-center gap-3">
                <img src={HEADSHOTS[0]} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0"><div className="text-sm font-bold">Marcus Bennett</div><div className="text-xs text-white/55">Operations Coordinator</div></div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-gradient-to-r from-teal to-aqua" /></div>
              <div className="mt-2 flex items-center justify-between text-[11px]"><span className="inline-flex items-center gap-1 font-semibold text-aqua"><BadgeCheck className="h-3.5 w-3.5" /> Human review complete</span><span className="text-white/50">94% match</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Transition() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(13,158,151,.18),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <JobHead dark eyebrow="Football-to-career transition" title="From the dressing room to the workplace." desc="Academy football builds habits employers value: discipline, teamwork, composure and a relentless drive to improve. Job+ helps you name them, evidence them and use them." />
          <div className="mt-10 rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <div className="text-xs font-bold uppercase tracking-[.16em] text-aqua">Selected translation</div>
            <div className="mt-3 font-jakarta text-2xl font-bold">{SKILL_MAP[active].work}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/60">Evidence: “{SKILL_MAP[active].football}” — written into your CV in language recruiters recognise, then checked by your PPM.</p>
          </div>
        </div>
        <div className="space-y-3 lg:col-span-7">
          {SKILL_MAP.map((s, i) => (
            <button key={s.work} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
              className={cn('grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl p-5 text-left ring-1 transition-all duration-300', active === i ? 'bg-white text-ink ring-white' : 'bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]')}>
              <span className={cn('text-[14px]', active === i ? 'text-slate-500' : 'text-white/55')}>{s.football}</span>
              <span className={cn('grid h-9 w-9 place-items-center rounded-full transition', active === i ? 'bg-teal text-white' : 'bg-white/5 text-white/40')}><ArrowRight className="h-4 w-4" /></span>
              <span className="font-jakarta text-[15px] font-bold">{s.work}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { icon: Crown, t: 'Leadership', d: 'Captaincy, mentoring younger players, setting standards.' },
  { icon: Users, t: 'Teamwork', d: 'Working towards shared goals in high-performing teams.' },
  { icon: Shield, t: 'Resilience', d: 'Bouncing back from setbacks, injuries and selection decisions.' },
  { icon: MessageCircle, t: 'Communication', d: 'Clear, concise information under pressure.' },
  { icon: Timer, t: 'Discipline', d: 'Early starts, structured routines, reliability.' },
  { icon: Gauge, t: 'Performance under pressure', d: 'Making good decisions when it matters most.' },
  { icon: GraduationCap, t: 'Coachability', d: 'Taking feedback and turning it into improvement.' },
  { icon: BarChart3, t: 'Data & analysis', d: 'Using video and performance data to improve.' },
];
function Skills() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <JobHead center eyebrow="Transferable workplace skills" title="Eight strengths you already have." desc="Every Job+ profile highlights the transferable skills behind your football career — with real examples to back them up." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 80} className="h-full">
              <div className="group h-full rounded-3xl bg-white p-6 ring-1 ring-stone transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand text-ink transition group-hover:bg-teal group-hover:text-white"><s.icon className="h-5 w-5" /></span>
                <h3 className="mt-6 font-jakarta text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIReview() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <JobHead eyebrow="AI-assisted · human-reviewed" title={<>A CV written with AI.<br /><span className="text-slate-400">Approved by people.</span></>} />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[32px] bg-sand p-7 ring-1 ring-stone sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink ring-1 ring-stone"><Sparkles className="h-3.5 w-3.5 text-teal" /> Step 1 · AI-assisted draft</div>
              <h3 className="mt-6 font-jakarta text-2xl font-bold text-ink">Your answers become a first draft in minutes.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">Tell us about your football career, education, interests and availability. Job+ generates a structured CV draft and a skills profile using that information.</p>
              <div className="mt-7 space-y-2.5 rounded-2xl bg-white p-5 ring-1 ring-stone">
                {[92, 78, 85, 60].map((w, i) => <div key={i} className="h-2.5 animate-pulse rounded-full bg-gradient-to-r from-teal/30 via-aqua/30 to-transparent" style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }} />)}
                <div className="pt-2 text-xs font-semibold text-teal">Drafting “Profile” section…</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-[32px] bg-ink p-7 text-white sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><UserCheck className="h-3.5 w-3.5 text-aqua" /> Step 2 · Human review</div>
              <h3 className="mt-6 font-jakarta text-2xl font-bold">A Player Placement Manager checks every word.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">Your PPM reviews accuracy, tone and evidence, removes anything sensitive and suggests improvements. Nothing is published until you approve it.</p>
              <div className="mt-7 space-y-2.5 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                {['Facts verified against football history', 'Tone and language checked', 'No sensitive personal data', 'Candidate approval requested'].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm"><span className="grid h-5 w-5 place-items-center rounded-full bg-teal"><Check className="h-3 w-3" strokeWidth={3} /></span>{t}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-6 rounded-[28px] bg-sand p-6 ring-1 ring-stone sm:p-8">
          <div className="mb-6 text-sm font-semibold text-slate-600">The Job+ CV workflow</div>
          <CVWorkflow current={2} />
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  { t: 'Opt in from Clearing+', d: 'Eligible Clearing+ players opt in to Job+ from their dashboard — guardians consent for 16–17s.' },
  { t: 'Complete your career profile', d: 'Career interests, football experience, education, availability, right to work and more.' },
  { t: 'Review your AI-assisted draft', d: 'See your Professional CV and Skills Profile take shape instantly.' },
  { t: 'PPM human review', d: 'Your PPM refines the draft and checks accuracy before anything goes live.' },
  { t: 'Approve & get introduced', d: 'Approve your profile, become visible to verified UK employers and receive PPM-managed introductions.' },
];
function Journey() {
  const { go } = useApp();
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <JobHead eyebrow="The Job+ candidate journey" title="Five steps to your next role." desc="Designed for players who want structure, support and a CV they're proud of." />
            <Button variant="teal" size="lg" className="mt-8" onClick={() => go('optin')} iconRight={<ArrowRight />}>Start step one</Button>
          </div>
        </div>
        <ol className="space-y-4 lg:col-span-7">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.t} delay={i * 60}>
              <li className="flex gap-6 rounded-3xl bg-white p-6 ring-1 ring-stone sm:p-7">
                <span className="font-jakarta text-4xl font-extrabold tracking-tight text-teal/25">0{i + 1}</span>
                <div><h3 className="font-jakarta text-lg font-bold text-ink">{j.t}</h3><p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{j.d}</p></div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Employers() {
  const { go } = useApp();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <JobHead eyebrow="How employers find talent" title="Disciplined, coachable people — ready to work." desc="Verified UK employers search published candidate profiles and request introductions through a Player Placement Manager." />
          <div className="mt-10 space-y-5">
            {[
              { icon: Building2, t: 'Register & verify', d: 'UK-registered employers complete a quick verification.' },
              { icon: Search, t: 'Search published profiles', d: 'Filter by industry, location, availability, licence and right to work.' },
              { icon: Handshake, t: 'Request an introduction', d: 'Your request goes to the candidate via their PPM — no cold contact.' },
              { icon: FileText, t: 'Hire with confidence', d: 'A 15% success fee on first-year base salary, only when you hire.' },
            ].map((s) => (
              <div key={s.t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-ink ring-1 ring-stone"><s.icon className="h-5 w-5" /></span>
                <div><div className="font-jakarta font-bold text-ink">{s.t}</div><p className="mt-0.5 text-[15px] text-slate-600">{s.d}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="ink" size="lg" onClick={() => go('employer-register')} iconRight={<ArrowRight />}>Register as an employer</Button>
            <Button variant="outline" size="lg" onClick={() => go('employers')}>Employer information</Button>
          </div>
        </div>
        <Reveal>
          <div className="relative rounded-[32px] bg-sand p-4 ring-1 ring-stone sm:p-6">
            <div className="flex items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-stone">
              <Search className="h-4 w-4 text-slate-400" /><span className="flex-1 text-sm text-slate-500">Operations · Manchester · Full UK licence</span>
              <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">Search</span>
            </div>
            <div className="mt-3 space-y-3">
              {[
                { n: 'Marcus B.', r: 'Operations Coordinator', s: 27000, m: 94, img: HEADSHOTS[0] },
                { n: 'Femi A.', r: 'Warehouse Team Leader', s: 28000, m: 91 },
                { n: 'Daniel H.', r: 'Personal Trainer', s: 24000, m: 88, img: HEADSHOTS[2] },
              ].map((c) => (
                <div key={c.n} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone transition hover:shadow-lg">
                  {c.img ? <img src={c.img} alt="" className="h-12 w-12 rounded-full object-cover" /> : <span className="grid h-12 w-12 place-items-center rounded-full bg-teal/10 font-bold text-teal">{c.n[0]}</span>}
                  <div className="min-w-0 flex-1"><div className="text-sm font-bold text-ink">{c.n}</div><div className="truncate text-xs text-slate-500">{c.r} · expects {gbp(c.s)}</div></div>
                  <div className="text-right"><div className="font-jakarta text-lg font-extrabold text-teal">{c.m}%</div><div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">match</div></div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-ink p-4 text-sm text-white/75">Example: hire at {gbp(28000)} base salary → success fee <b className="text-aqua">{gbp(hiringFee(28000))}</b> (15%).</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const IND_ICONS = [Truck, Briefcase, Dumbbell, HardHat, Utensils, Headphones, UserPlus, Landmark];
function Industries() {
  return (
    <section className="bg-ink py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <JobHead dark eyebrow="Career opportunities & industries" title="Where former players thrive." />
          <p className="max-w-sm text-sm text-white/50">Example salary ranges for entry and early-career roles in the UK, shown for illustration only.</p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = IND_ICONS[i];
            return (
              <div key={ind.name} className="group bg-ink p-7 transition hover:bg-[#151b22]">
                <Icon className="h-6 w-6 text-aqua" />
                <h3 className="mt-8 font-jakarta text-lg font-bold">{ind.name}</h3>
                <p className="mt-1.5 text-sm text-white/50">{ind.roles}</p>
                <div className="mt-5 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-aqua ring-1 ring-white/10">{ind.range}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CVPreview() {
  const [tab, setTab] = useState('cv');
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <JobHead center eyebrow="Professional CV preview" title="Two documents. One clear story." desc="Every candidate receives a Professional CV and a Football-to-Workplace Skills Profile." />
        <div className="mt-10 flex justify-center">
          <Tabs variant="pill" value={tab} onChange={setTab} tabs={[{ key: 'cv', label: 'Professional CV' }, { key: 'skills', label: 'Skills Profile' }]} className="bg-white ring-1 ring-stone" />
        </div>
        <div key={tab} className="mt-10 animate-fade-up">{tab === 'cv' ? <CVDocument /> : <SkillsProfile />}</div>
        <p className="mt-6 text-center text-xs text-slate-500">Sample content for a fictional candidate.</p>
      </div>
    </section>
  );
}

function Benefits() {
  const { go } = useApp();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <JobHead center eyebrow="Benefits" title="Built for candidates and employers." />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[32px] bg-sand p-8 ring-1 ring-stone sm:p-10">
            <div className="text-xs font-bold uppercase tracking-[.16em] text-teal">For candidates</div>
            <h3 className="mt-3 font-jakarta text-3xl font-extrabold tracking-tight text-ink">A career built on who you already are.</h3>
            <ul className="mt-7 space-y-3.5">
              {['A professional CV and skills profile, reviewed by a person', 'Introductions only through your PPM — no cold contact', 'Control over when your profile is published', 'Support from people who understand football'].map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-slate-700"><Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />{t}</li>
              ))}
            </ul>
            <Button variant="teal" size="lg" className="mt-8" onClick={() => go('candidates')}>Candidate information</Button>
          </div>
          <div className="rounded-[32px] bg-ink p-8 text-white sm:p-10">
            <div className="text-xs font-bold uppercase tracking-[.16em] text-aqua">For employers</div>
            <h3 className="mt-3 font-jakarta text-3xl font-extrabold tracking-tight">Reliable people with proven habits.</h3>
            <ul className="mt-7 space-y-3.5">
              {['Access a distinctive, early-career talent pool', 'Human-reviewed profiles with evidenced skills', 'PPM-managed introductions and hiring support', '15% of first-year base salary — only on a successful hire'].map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-white/75"><Check className="mt-0.5 h-5 w-5 shrink-0 text-aqua" />{t}</li>
              ))}
            </ul>
            <Button variant="white" size="lg" className="mt-8" onClick={() => go('employers')}>Employer information</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PoweredBy() {
  const { go } = useApp();
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-navy p-8 text-white sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <ClearingLogo />
              <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Powered by Clearing+.</h3>
              <p className="mt-3 text-white/60">Job+ is part of the Clearing+ family. Candidates are eligible Clearing+ players, supported by the same Player Placement Managers — whether their next step is on the pitch or beyond it.</p>
            </div>
            <Button variant="lime" size="lg" onClick={() => go('home', 'clearing')} iconRight={<ArrowUpRight />}>Visit Clearing+</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const JOB_FAQ = [
  { q: 'Who is eligible for Job+?', a: 'Job+ is available to eligible Clearing+ players who opt in from their dashboard. Players aged 16–17 need guardian consent.' },
  { q: 'Is the CV written by AI?', a: 'AI helps create a first draft from your answers. A Player Placement Manager then reviews and refines it, and nothing is published until you approve it.' },
  { q: 'Which employers can use Job+?', a: 'Version 1 supports verified UK employers only. International employer features are not part of this release.' },
  { q: 'How do employers contact me?', a: 'Employers request an introduction, which is reviewed by your PPM and shared with you. You decide whether to proceed.' },
  { q: 'What does it cost employers?', a: 'Employers pay a hiring success fee of 15% of the candidate’s first-year base salary, only when a hire is confirmed. All prices are in GBP.' },
];
function FAQ() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4"><JobHead eyebrow="FAQs" title="Good questions." desc="Everything you need to know about Job+." /></div>
        <div className="lg:col-span-8"><Accordion items={JOB_FAQ} accent="border-teal bg-teal text-white" /></div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { go } = useApp();
  return (
    <section className="bg-sand pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-teal px-6 py-20 text-center text-white sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,.25),transparent_60%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl">Start building your <span className="font-serif font-normal italic">next</span> career today.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Create your career profile in around 15 minutes. Your PPM takes it from there.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button variant="ink" size="xl" onClick={() => go('optin')} iconRight={<ArrowRight />}>Start your career profile</Button>
              <Button variant="glass" size="xl" onClick={() => go('employer-register')}>Hire through Job+</Button>
            </div>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70"><MapPin className="h-3.5 w-3.5" /> UK employers only in Version 1</div>
          </div>
        </div>
      </div>
    </section>
  );
}
