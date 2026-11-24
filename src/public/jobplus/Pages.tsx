import { useState, type ReactNode } from 'react';
import { ArrowRight, Check, CheckCircle2, FileText, ShieldCheck, Handshake, Building2, Search, BadgeCheck, Users, Mail, MapPin, Clock, Sparkles, UserCheck, Briefcase } from 'lucide-react';
import { useApp } from '../../store';
import { Accordion, Button, Checkbox, Field, Input, InfoNote, Select, Stepper, Tabs, Textarea, UploadZone, cn } from '../../components/ui';
import { CVWorkflow, SkillsProfile } from '../../components/CV';
import CVBuilder from '../../components/CVBuilder';
import { INDUSTRIES, gbp, hiringFee } from '../../data/mock';
import { JobHead, JobPageHero } from './Layout';
import { JOB_FAQ } from './Home';

function Sec({ children, bg = 'bg-white', className }: { children: ReactNode; bg?: string; className?: string }) {
  return <section className={cn(bg, 'py-20 lg:py-28')}><div className={cn('mx-auto max-w-7xl px-5 sm:px-8', className)}>{children}</div></section>;
}
function Cards({ items, dark }: { items: { icon: typeof Check; t: string; d: string }[]; dark?: boolean }) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c) => (
        <div key={c.t} className={cn('rounded-3xl p-6', dark ? 'bg-white/[0.04] ring-1 ring-white/10' : 'bg-white ring-1 ring-stone')}>
          <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', dark ? 'bg-teal text-white' : 'bg-sand text-ink')}><c.icon className="h-5 w-5" /></span>
          <h3 className={cn('mt-5 font-jakarta text-lg font-bold', dark ? 'text-white' : 'text-ink')}>{c.t}</h3>
          <p className={cn('mt-1.5 text-sm leading-relaxed', dark ? 'text-white/60' : 'text-slate-600')}>{c.d}</p>
        </div>
      ))}
    </div>
  );
}
function NumberedSteps({ items }: { items: string[] }) {
  return (
    <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s} className="rounded-2xl bg-white p-5 ring-1 ring-stone"><div className="font-jakarta text-3xl font-extrabold text-teal/30">0{i + 1}</div><div className="mt-2 text-[15px] font-semibold text-ink">{s}</div></li>
      ))}
    </ol>
  );
}

export function CandidatesPage() {
  const { go } = useApp();
  return (
    <>
      <JobPageHero eyebrow="For candidates" title={<>Turn your football career into <span className="font-serif font-normal italic text-teal">a career.</span></>} desc="Job+ is open to eligible Clearing+ players who want to explore work beyond football — with a CV that tells your story properly."
        actions={<><Button variant="ink" size="lg" onClick={() => go('optin')} iconRight={<ArrowRight />}>Start your career profile</Button><Button variant="outline" size="lg" onClick={() => go('how')}>How it works</Button></>}
        aside={<SkillsProfile className="max-w-md scale-[.92] lg:origin-right" />} />
      <Sec>
        <JobHead eyebrow="What you'll get" title="Support that goes further than a template." />
        <Cards items={[
          { icon: FileText, t: 'Professional CV', d: 'A recruiter-ready CV built from your answers and football career.' },
          { icon: Sparkles, t: 'Skills Profile', d: 'A visual Football-to-Workplace Skills Profile for employers.' },
          { icon: UserCheck, t: 'Human review', d: 'Your PPM checks accuracy and tone before anything goes live.' },
          { icon: Handshake, t: 'Managed introductions', d: 'Employers request introductions through your PPM — you decide.' },
        ]} />
      </Sec>
      <Sec bg="bg-sand" className="grid gap-12 lg:grid-cols-2">
        <div>
          <JobHead eyebrow="Eligibility" title="Who can join Job+?" />
          <ul className="mt-8 space-y-4">
            {['Registered and verified Clearing+ player', 'Aged 16 or over — guardian consent required for 16–17s', 'Looking for work in the UK', 'Happy for a PPM to review your CV before publishing'].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div><Accordion items={JOB_FAQ.slice(0, 4)} accent="border-teal bg-teal text-white" /></div>
      </Sec>
    </>
  );
}

export function EmployersInfoPage() {
  const { go, openDashboard } = useApp();
  return (
    <>
      <JobPageHero eyebrow="For employers · UK only" title="Hire people who know how to perform." desc="Meet former academy footballers with human-reviewed CVs and evidenced transferable skills — and only pay when you hire."
        actions={<><Button variant="ink" size="lg" onClick={() => go('employer-register')} iconRight={<ArrowRight />}>Register as an employer</Button><Button variant="outline" size="lg" onClick={() => openDashboard('employer')}>Preview employer dashboard</Button></>}
        aside={
          <div className="rounded-[32px] bg-ink p-7 text-white shadow-2xl">
            <div className="text-xs font-bold uppercase tracking-[.16em] text-aqua">Hiring success fee</div>
            <div className="mt-3 font-jakarta text-6xl font-extrabold">15%</div>
            <p className="mt-2 text-sm text-white/60">of first-year base salary, payable only on a confirmed hire.</p>
            <div className="mt-6 space-y-2">
              {[24000, 28000, 32000].map((s) => <div key={s} className="flex justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"><span className="text-white/70">{gbp(s)} salary</span><b className="text-aqua">{gbp(hiringFee(s))}</b></div>)}
            </div>
          </div>
        } />
      <Sec>
        <JobHead eyebrow="Why hire through Job+" title="A talent pool you won't find on job boards." />
        <Cards items={[
          { icon: BadgeCheck, t: 'Human-reviewed profiles', d: 'Every CV is checked by a Player Placement Manager.' },
          { icon: Users, t: 'Proven team players', d: 'Years in high-performance, feedback-driven environments.' },
          { icon: Handshake, t: 'Managed introductions', d: 'Your PPM briefs candidates and coordinates next steps.' },
          { icon: ShieldCheck, t: 'Verified employers only', d: 'We verify every employer to protect our candidates.' },
        ]} />
      </Sec>
      <Sec bg="bg-sand">
        <JobHead eyebrow="Verification requirements" title="What we'll ask for." />
        <NumberedSteps items={['UK-registered company details', 'Companies House or charity number', 'A named hiring contact', 'Confirmation of right-to-work checks']} />
        <InfoNote tone="teal" className="mt-6">Version 1 supports UK employers only. International employer features are out of scope for this release.</InfoNote>
      </Sec>
    </>
  );
}

export function HowJobWorksPage() {
  const { go } = useApp();
  const [tab, setTab] = useState('candidates');
  const cand = ['Opt in from your Clearing+ dashboard', 'Complete your career profile', 'Review your AI-assisted draft', 'PPM human review', 'Approve & publish', 'Receive managed introductions', 'Interview with employers', 'Start your new role'];
  const emp = ['Register & verify (UK only)', 'Create job listings', 'Search published candidates', 'Save candidates', 'Request an introduction', 'PPM shares with candidate', 'Interview & offer', 'Confirm hire · 15% fee'];
  return (
    <>
      <JobPageHero eyebrow="How Job+ works" title="Clear steps for candidates and employers." desc="Job+ keeps a Player Placement Manager at the centre of every CV and every introduction." />
      <Sec>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <JobHead eyebrow="Step by step" title={tab === 'candidates' ? 'The candidate journey' : 'The employer journey'} />
          <Tabs variant="pill" value={tab} onChange={setTab} tabs={[{ key: 'candidates', label: 'Candidates' }, { key: 'employers', label: 'Employers' }]} className="bg-sand ring-1 ring-stone" />
        </div>
        <div key={tab} className="animate-fade-up"><NumberedSteps items={tab === 'candidates' ? cand : emp} /></div>
      </Sec>
      <Sec bg="bg-ink">
        <JobHead dark eyebrow="CV workflow" title="From form to published profile." />
        <div className="mt-12 rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-10"><CVWorkflow current={4} dark /></div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="teal" size="lg" onClick={() => go('optin')} iconRight={<ArrowRight />}>Start your CV</Button>
          <Button variant="glass" size="lg" onClick={() => go('employer-register')}>Register as an employer</Button>
        </div>
      </Sec>
    </>
  );
}

export function OptInPage() {
  return (
    <>
      <JobPageHero eyebrow="Candidate opt-in" title="Build your career profile." desc="Around 15 minutes. Your answers create an AI-assisted draft, which your Player Placement Manager reviews before anything is published." />
      <section className="bg-sand pb-24"><div className="mx-auto max-w-6xl px-5 sm:px-8"><CVBuilder /></div></section>
    </>
  );
}

export function EmployerRegisterPage() {
  const { openDashboard, toast } = useApp();
  const [step, setStep] = useState(0);
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);
  const steps = ['Company', 'Verification', 'Hiring needs', 'Review'];
  return (
    <>
      <JobPageHero eyebrow="Employer registration · UK only" title="Start hiring through Job+." desc="Register your company in a few minutes. We verify every employer before candidates become visible." />
      <section className="bg-sand pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-stone sm:p-9">
            {done ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-teal text-white"><CheckCircle2 className="h-8 w-8" /></span>
                <h3 className="mt-6 font-jakarta text-2xl font-extrabold text-ink">Registration submitted</h3>
                <p className="mt-2 max-w-sm text-slate-600">Our team will verify your company within 2 working days. (Demo — nothing was sent.)</p>
                <Button variant="ink" size="lg" className="mt-6" onClick={() => openDashboard('employer')} iconRight={<ArrowRight />}>Preview employer dashboard</Button>
              </div>
            ) : (
              <>
                <Stepper steps={steps} current={step} className="mb-8" />
                <div key={step} className="animate-fade-up">
                  {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Company name" required className="sm:col-span-2"><Input defaultValue="Meridian Logistics Ltd" /></Field>
                      <Field label="Industry" required><Select options={INDUSTRIES.map((i) => i.name)} /></Field>
                      <Field label="Company size"><Select options={['1–49', '50–249', '250–500', '500+']} defaultValue="250–500" /></Field>
                      <Field label="Head office (UK)" required><Input defaultValue="Manchester" /></Field>
                      <Field label="Website"><Input defaultValue="https://meridian.example" /></Field>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Companies House number" required><Input defaultValue="09876543" /></Field>
                        <Field label="Country" hint="Version 1 supports UK employers only."><Select options={['United Kingdom']} /></Field>
                        <Field label="Hiring contact" required><Input defaultValue="Hannah Clarke" /></Field>
                        <Field label="Work email" required><Input type="email" defaultValue="h.clarke@meridian.example" /></Field>
                      </div>
                      <UploadZone label="Upload proof of company (optional)" hint="Certificate of incorporation · PDF" />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Roles you're hiring for" className="sm:col-span-2"><Textarea rows={3} defaultValue="Operations coordinators, warehouse team leaders, graduate sales executives." /></Field>
                      <Field label="Typical salary range (GBP)"><Input defaultValue="£24,000 – £31,000" /></Field>
                      <Field label="Locations"><Input defaultValue="Greater Manchester" /></Field>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-ink p-5 text-white"><div className="text-sm text-white/60">Hiring success fee</div><div className="mt-1 font-jakarta text-2xl font-extrabold">15% of first-year base salary</div><div className="mt-1 text-sm text-white/60">e.g. {gbp(28000)} salary → {gbp(hiringFee(28000))} · payable only on confirmed hire</div></div>
                      <Checkbox checked={agree} onChange={setAgree} label="I accept the Job+ employer terms and confirm my company is registered in the UK." />
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
                  <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                  <Button variant={step === 3 ? 'teal' : 'ink'} size="lg" iconRight={<ArrowRight />} onClick={() => {
                    if (step < 3) return setStep(step + 1);
                    if (!agree) return toast('Please accept the employer terms.', 'error');
                    setDone(true); toast('Employer registration submitted (demo).');
                  }}>{step === 3 ? 'Submit registration' : 'Continue'}</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function JobContactPage() {
  const { toast } = useApp();
  const [sent, setSent] = useState(false);
  return (
    <>
      <JobPageHero eyebrow="Contact" title="Talk to the Job+ team." desc="Candidates, employers and partners — we'd love to hear from you." />
      <section className="bg-sand pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            {[{ icon: Mail, t: 'Candidates', d: 'candidates@jobplus.academy' }, { icon: Building2, t: 'Employers', d: 'employers@jobplus.academy' }, { icon: Clock, t: 'Hours', d: 'Mon–Fri · 9:00–17:30' }, { icon: MapPin, t: 'Coverage', d: 'UK employers only (V1)' }].map((c) => (
              <div key={c.t} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone"><span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white"><c.icon className="h-4 w-4" /></span><div><div className="text-xs font-semibold text-slate-500">{c.t}</div><div className="text-sm font-semibold text-ink">{c.d}</div></div></div>
            ))}
          </div>
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-stone sm:p-8 lg:col-span-8">
            {sent ? (
              <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-teal" /><h3 className="mt-4 font-jakarta text-2xl font-extrabold text-ink">Thanks — message received</h3><p className="mt-2 text-slate-600">We'll reply within two working days. (Demo only.)</p><Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Send another</Button></div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); toast('Message sent (demo).'); }}>
                <Field label="Name" required><Input required /></Field>
                <Field label="Email" required><Input required type="email" /></Field>
                <Field label="I'm a…" className="sm:col-span-2"><Select options={['Candidate', 'Employer', 'Partner', 'Other']} /></Field>
                <Field label="Message" required className="sm:col-span-2"><Textarea required rows={5} /></Field>
                <div className="sm:col-span-2"><Button type="submit" variant="teal" size="lg" icon={<Briefcase />}>Send message</Button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export { Search };
