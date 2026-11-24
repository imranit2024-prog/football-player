import { useState, type ReactNode } from 'react';
import {
  ArrowRight, Check, X, ShieldCheck, Search, Bookmark, FileSignature, MessagesSquare, Users, Video, Fingerprint, Lock, LifeBuoy,
  Building2, UserPlus, BadgeCheck, Crown, Sprout, Mail, Phone, Clock, CheckCircle2, Eye, EyeOff, Target, HeartHandshake, Compass,
  Briefcase, ArrowUpRight, User, Trophy, FileText, Timer, Scale,
} from 'lucide-react';
import { useApp } from '../../store';
import { Accordion, Button, Checkbox, ClaimPipeline, Field, Input, RadioCards, Reveal, Select, Tabs, Textarea, cn } from '../../components/ui';
import { COUNTRIES, IMG, PLAYER_FEES, TIERS, gbp, hiringFee, placementFee } from '../../data/mock';
import { PageHero, SectionHead } from './Layout';
import { CLEARING_FAQ } from './Home';

/* ------------------------------------------------------------------ shared bits */
function Wrap({ children, className, bg = 'bg-white' }: { children: ReactNode; className?: string; bg?: string }) {
  return <section className={cn(bg, 'py-20 lg:py-28')}><div className={cn('mx-auto max-w-7xl px-5 sm:px-8', className)}>{children}</div></section>;
}
function FeatureGrid({ items, dark }: { items: { icon: typeof Check; t: string; d: string }[]; dark?: boolean }) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <Reveal key={f.t} delay={(i % 3) * 80} className="h-full">
          <div className={cn('h-full rounded-3xl p-7 transition hover:-translate-y-1', dark ? 'border border-white/10 bg-white/[0.04]' : 'border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/60')}>
            <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', dark ? 'bg-lime/15 text-lime' : 'bg-navy text-lime')}><f.icon className="h-5 w-5" /></span>
            <h3 className={cn('mt-6 font-display text-lg font-bold', dark ? 'text-white' : 'text-navy')}>{f.t}</h3>
            <p className={cn('mt-2 text-[15px] leading-relaxed', dark ? 'text-white/60' : 'text-slate-600')}>{f.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.t} className="relative rounded-3xl border border-slate-200 bg-white p-7">
          <span className="font-display text-sm font-extrabold text-lime-dark">STEP {String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-3 font-display text-lg font-bold text-navy">{s.t}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
function CTABand({ title, text, actions }: { title: string; text: string; actions: ReactNode }) {
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-navy p-8 text-white sm:p-14">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime/20 blur-[90px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl"><h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2><p className="mt-4 text-lg text-white/60">{text}</p></div>
            <div className="flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Success({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-navy"><CheckCircle2 className="h-8 w-8" /></span>
      <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">{title}</h3>
      <p className="mt-2 max-w-sm text-slate-600">{text}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>Submit another response</Button>
    </div>
  );
}
export function FeeCards({ compact }: { compact?: boolean }) {
  const { go } = useApp();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PLAYER_FEES.map((f, i) => (
        <div key={f.key} className={cn('relative flex flex-col rounded-3xl p-7', i === 0 ? 'bg-navy text-white' : 'border border-slate-200 bg-white')}>
          {i === 0 && <span className="absolute right-5 top-5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-navy">Lowest fee</span>}
          <div className={cn('text-sm font-semibold', i === 0 ? 'text-white/70' : 'text-slate-500')}>{f.label}</div>
          <div className="mt-4 flex items-baseline gap-1"><span className={cn('font-display text-5xl font-extrabold tracking-tight', i === 0 ? 'text-lime' : 'text-navy')}>£{f.price}</span><span className={i === 0 ? 'text-white/50' : 'text-slate-400'}>/year</span></div>
          <p className={cn('mt-3 text-sm', i === 0 ? 'text-white/60' : 'text-slate-600')}>{f.desc}</p>
          {!compact && (
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {['Verified football profile', 'Moderated highlight videos', 'Dedicated PPM support', 'Job+ career opt-in (eligible players)'].map((t) => (
                <li key={t} className={cn('flex gap-2.5', i === 0 ? 'text-white/80' : 'text-slate-700')}><Check className={cn('mt-0.5 h-4 w-4 shrink-0', i === 0 ? 'text-lime' : 'text-lime-dark')} />{t}</li>
              ))}
            </ul>
          )}
          <Button variant={i === 0 ? 'lime' : 'navy'} className="mt-7 w-full" onClick={() => go('register')}>Register</Button>
        </div>
      ))}
    </div>
  );
}
function FeeCalculator() {
  const [v, setV] = useState(30000);
  const fee = placementFee(v);
  return (
    <div className="rounded-3xl bg-navy p-7 text-white sm:p-8">
      <div className="text-xs font-bold uppercase tracking-[.16em] text-lime">Placement fee calculator</div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div><div className="text-sm text-white/55">First-year contract value</div><div className="font-display text-3xl font-extrabold">{gbp(v)}</div></div>
        <div className="text-right"><div className="text-sm text-white/55">Placement fee</div><div className="font-display text-3xl font-extrabold text-lime">{gbp(fee)}</div></div>
      </div>
      <input type="range" min={10000} max={120000} step={500} value={v} onChange={(e) => setV(+e.target.value)} className="mt-6 w-full accent-lime" aria-label="Contract value" />
      <p className="mt-3 text-xs text-white/50">{v * 0.1 > 3000 ? '10% of the first-year contract value applies.' : 'The £3,000 minimum applies (10% would be ' + gbp(v * 0.1) + ').'}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ How it works */
export function HowItWorksPage() {
  const { go } = useApp();
  const [tab, setTab] = useState('players');
  const steps = tab === 'players'
    ? [
        { t: 'Register & choose your membership', d: 'Create an account and pick the right annual fee: £24.99, £49.99 or £29.99.' },
        { t: 'Build your football profile', d: 'Academy background, positions, statistics, photo and highlight videos.' },
        { t: 'Verification & consent', d: 'ID, eligibility and academy checks. Guardian consent if you are 16–17.' },
        { t: 'Get discovered by verified clubs', d: 'Clubs search and shortlist. Your contact details stay private.' },
        { t: 'PPM-managed Claims', d: 'Every Claim is reviewed by a Player Placement Manager before you discuss it.' },
        { t: 'Trial & placement', d: 'Your PPM coordinates trials and supports you through signing.' },
      ]
    : [
        { t: 'Register & verify your club', d: 'Submit club details, league tier and safeguarding information for verification.' },
        { t: 'Activate membership', d: 'Annual licence in GBP — or a free period for Founding Clubs.' },
        { t: 'Search & shortlist', d: 'Filter verified players by position, age, foot, height, country and availability.' },
        { t: 'Submit a Claim', d: 'Describe the opportunity, named staff and safeguarding lead in a guided form.' },
        { t: 'PPM credibility review', d: 'If approved, the £100 Claim Fee applies. Rejected or withdrawn Claims are free.' },
        { t: 'Discussion, trial & placement', d: 'Placement fee is the greater of £3,000 or 10% of the first-year contract value.' },
      ];
  return (
    <>
      <PageHero eyebrow="How it works" title="A clear, safe route back into professional football." desc="From profile to placement, every step is verified, supported by a Player Placement Manager and transparent on fees." img={IMG.drills}
        actions={<><Button variant="lime" size="lg" onClick={() => go('register')}>Register as a Player</Button><Button variant="glass" size="lg" onClick={() => go('register/club')}>Register a Club</Button></>} />
      <Wrap bg="bg-mist">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Step by step" title={tab === 'players' ? 'The player journey' : 'The club journey'} />
          <Tabs variant="pill" value={tab} onChange={setTab} tabs={[{ key: 'players', label: 'For players' }, { key: 'clubs', label: 'For clubs' }]} className="bg-white ring-1 ring-slate-200" />
        </div>
        <div key={tab} className="animate-fade-up"><Steps items={steps} /></div>
      </Wrap>
      <Wrap>
        <SectionHead eyebrow="The Claim workflow" title="Six stages, one accountable PPM." desc="A Claim is a club's formal expression of interest in a player. Here is how it moves through Clearing+." />
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          <ClaimPipeline status="Trial" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: FileSignature, t: 'Claim fee: £100', d: 'Charged only after PPM credibility approval. Rejected and withdrawn Claims are not charged.' },
              { icon: Trophy, t: 'Placement fee', d: 'The greater of £3,000 or 10% of the first-year contract value, on signing.' },
              { icon: Lock, t: 'Controlled contact', d: 'Club-to-player messaging is disabled by default; PPMs may enable a monitored, Claim-specific channel.' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-mist p-5"><f.icon className="h-5 w-5 text-navy" /><div className="mt-3 font-display font-bold text-navy">{f.t}</div><p className="mt-1 text-sm text-slate-600">{f.d}</p></div>
            ))}
          </div>
        </div>
      </Wrap>
      <Wrap bg="bg-mist">
        <SectionHead eyebrow="Player membership" title="Simple annual fees, in GBP." />
        <div className="mt-12"><FeeCards /></div>
      </Wrap>
      <CTABand title="Questions about the process?" text="Our team can walk players, families and clubs through every step." actions={<><Button variant="lime" size="lg" onClick={() => go('contact')}>Contact us</Button><Button variant="glass" size="lg" onClick={() => go('interest')}>Register Interest</Button></>} />
    </>
  );
}

/* ------------------------------------------------------------------ Players */
export function PlayersPage() {
  const { go } = useApp();
  return (
    <>
      <PageHero eyebrow="For players" title="Your academy career counts. Make it visible." desc="Build a verified football profile that clubs can trust — with a Player Placement Manager in your corner from first Claim to signing." img={IMG.training}
        actions={<><Button variant="lime" size="lg" onClick={() => go('register')} iconRight={<ArrowRight />}>Create your profile</Button><Button variant="glass" size="lg" onClick={() => go('how')}>How it works</Button></>} />
      <Wrap>
        <SectionHead eyebrow="What you get" title="Everything you need to get back in the game." />
        <FeatureGrid items={[
          { icon: User, t: 'Professional football profile', d: 'Positions, statistics, academy background and availability — presented to club standards.' },
          { icon: Video, t: 'Moderated highlight videos', d: 'Upload highlights; our team approves them before verified clubs can watch.' },
          { icon: BadgeCheck, t: 'Verified status', d: 'A verified badge shows clubs your identity and academy history have been checked.' },
          { icon: ShieldCheck, t: 'Dedicated PPM', d: 'A Player Placement Manager reviews every Claim and supports your decisions.' },
          { icon: Timer, t: 'Trial coordination', d: 'Dates, travel guidance and named contacts — managed for you.' },
          { icon: Briefcase, t: 'Job+ career opt-in', d: 'Explore careers beyond football with a human-reviewed CV (eligible players).' },
        ]} />
      </Wrap>
      <Wrap bg="bg-mist">
        <SectionHead eyebrow="Your privacy" title="What clubs see — and what they never see." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-navy"><Eye className="h-5 w-5 text-lime-dark" /> Visible to verified clubs</div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{['Profile photo', 'Name & age', 'Country', 'Position(s)', 'Preferred foot', 'Height', 'Academy background', 'Availability', 'Approved highlight videos'].map((t) => <li key={t} className="flex gap-2.5 text-sm text-slate-700"><Check className="h-4 w-4 text-emerald-600" />{t}</li>)}</ul>
          </div>
          <div className="rounded-3xl bg-navy p-7 text-white">
            <div className="flex items-center gap-2 font-display text-lg font-bold"><EyeOff className="h-5 w-5 text-lime" /> Never shown to clubs</div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{['Phone number', 'Email address', 'Home address', 'Private documents', 'Guardian information', 'Payment details'].map((t) => <li key={t} className="flex gap-2.5 text-sm text-white/80"><X className="h-4 w-4 text-rose-400" />{t}</li>)}</ul>
          </div>
        </div>
      </Wrap>
      <Wrap>
        <SectionHead eyebrow="Membership" title="One annual fee. No surprises." desc="All prices in GBP. Your fee depends on where you're based and which academy released you." />
        <div className="mt-12"><FeeCards /></div>
      </Wrap>
      <Wrap bg="bg-mist" className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><SectionHead eyebrow="Player FAQs" title="Good to know." /></div>
        <div className="lg:col-span-8"><Accordion items={CLEARING_FAQ.slice(0, 5)} /></div>
      </Wrap>
    </>
  );
}

/* ------------------------------------------------------------------ Parents */
export function ParentsPage() {
  const { go, openDashboard } = useApp();
  return (
    <>
      <PageHero eyebrow="For parents & guardians" title="Support their next step — safely." desc="Clearing+ is designed around young people. For players aged 16–17, nothing goes live without your consent, and clubs never contact your child directly." img={IMG.huddle}
        actions={<><Button variant="lime" size="lg" onClick={() => openDashboard('guardian')} iconRight={<ArrowRight />}>Preview guardian dashboard</Button><Button variant="glass" size="lg" onClick={() => go('contact')}>Talk to our team</Button></>} />
      <Wrap>
        <SectionHead eyebrow="Guardian consent (16–17)" title="You stay in control." desc="Consent is requested, recorded and can be withdrawn at any time from your guardian dashboard." />
        <Steps items={[
          { t: 'Your child registers', d: 'They add your name and email address as their parent or guardian.' },
          { t: 'You are invited', d: 'You receive a secure invitation to create a guardian account.' },
          { t: 'Verify & review', d: 'Confirm your identity and review exactly what clubs will see.' },
          { t: 'Give consent', d: 'Approve the profile. Only then does it become visible to verified clubs.' },
          { t: 'Stay informed', d: 'Get notified about Claims, trials and PPM conversations.' },
          { t: 'Withdraw any time', d: 'Withdrawing consent hides the profile from clubs immediately.' },
        ]} />
      </Wrap>
      <Wrap bg="bg-navy">
        <SectionHead dark eyebrow="Our safeguarding commitments" title="Protection at every touchpoint." />
        <FeatureGrid dark items={[
          { icon: Building2, t: 'Verified clubs only', d: 'Clubs provide safeguarding and staff details before they can submit Claims.' },
          { icon: MessagesSquare, t: 'No direct club contact', d: 'Conversations are managed by a PPM; monitored channels only when approved.' },
          { icon: Lock, t: 'Private information protected', d: 'Documents and guardian details are never visible to clubs.' },
          { icon: Video, t: 'Video moderation', d: 'Every video is reviewed before it becomes visible.' },
          { icon: Fingerprint, t: 'Identity checks', d: 'Players and guardians are verified before profiles go live.' },
          { icon: LifeBuoy, t: 'Report a concern', d: 'A confidential safeguarding form in every guardian dashboard.' },
        ]} />
        <div className="mt-10 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-5 text-sm text-rose-100">If a child is in immediate danger, call <b>999</b>. For non-urgent concerns, use the safeguarding form in your guardian dashboard or contact our safeguarding team.</div>
      </Wrap>
      <CTABand title="See what guardians see." text="Explore the guardian dashboard preview — consent states, claim notifications and safeguarding tools." actions={<Button variant="lime" size="lg" onClick={() => openDashboard('guardian')}>Open guardian preview</Button>} />
    </>
  );
}

/* ------------------------------------------------------------------ Clubs */
export function ClubsPage() {
  const { go, openDashboard } = useApp();
  return (
    <>
      <PageHero eyebrow="For football clubs" title="Recruit verified academy talent — with confidence." desc="Search verified players, shortlist in seconds and submit Claims backed by professional Player Placement Managers." img={IMG.coaches}
        actions={<><Button variant="lime" size="lg" onClick={() => go('register/club')} iconRight={<ArrowRight />}>Register your club</Button><Button variant="glass" size="lg" onClick={() => openDashboard('clubAdmin')}>Preview club dashboard</Button></>} />
      <Wrap>
        <SectionHead eyebrow="Recruitment tools" title="A scouting workflow built for modern clubs." />
        <FeatureGrid items={[
          { icon: Search, t: 'Advanced player search', d: 'Filter by position, age, country, foot, height, academy level and availability.' },
          { icon: Video, t: 'Approved highlights', d: 'Watch moderated highlight videos directly from player cards.' },
          { icon: Bookmark, t: 'Shortlists', d: 'Build shortlists and share them across your recruitment staff.' },
          { icon: FileSignature, t: 'Guided Claims', d: 'Submit a Claim in a structured, multi-step form in minutes.' },
          { icon: ShieldCheck, t: 'PPM partnership', d: 'A PPM manages communication, trials and placements with you.' },
          { icon: Users, t: 'Staff accounts', d: 'Club Admins manage staff access and Club User permissions.' },
        ]} />
      </Wrap>
      <Wrap bg="bg-mist">
        <SectionHead eyebrow="Club fees" title="Pay for outcomes, not noise." desc="All fees are in GBP and shown clearly before you submit anything." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7"><Building2 className="h-6 w-6 text-navy" /><div className="mt-5 font-display text-xl font-bold text-navy">Annual club licence</div><p className="mt-2 text-sm text-slate-600">An annual licence fee in GBP, set according to your country and league tier. Founding Clubs receive a free period with an agreed end date.</p></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7"><FileSignature className="h-6 w-6 text-navy" /><div className="mt-5 font-display text-xl font-bold text-navy">£100 Claim Fee</div><p className="mt-2 text-sm text-slate-600">Applies only after a PPM approves your Claim as credible. Rejected and withdrawn Claims are never charged.</p></div>
          <FeeCalculator />
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 bg-mist px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500"><span>First-year contract</span><span>10% value</span><span>Placement fee</span></div>
          {[18000, 30000, 45000, 80000].map((v) => (
            <div key={v} className="grid grid-cols-3 border-t border-slate-100 px-6 py-3.5 text-sm"><span className="font-semibold text-navy">{gbp(v)}</span><span className="text-slate-500">{gbp(v * 0.1)}</span><span className="font-bold text-navy">{gbp(placementFee(v))}</span></div>
          ))}
        </div>
      </Wrap>
      <CTABand title="Ready to recruit with confidence?" text="Register your club or apply to become a Founding Club." actions={<><Button variant="lime" size="lg" onClick={() => go('register/club')}>Register your club</Button><Button variant="glass" size="lg" onClick={() => go('founding')}>Founding Clubs</Button></>} />
    </>
  );
}

/* ------------------------------------------------------------------ Employers */
export function EmployersPage() {
  const { go } = useApp();
  return (
    <>
      <PageHero eyebrow="For employers" title="Hire disciplined, coachable early-career talent." desc="Through Job+, verified UK employers meet former academy players with human-reviewed CVs and evidenced transferable skills." img={IMG.office1}
        actions={<><Button variant="teal" size="lg" onClick={() => go('employer-register', 'jobplus')} iconRight={<ArrowUpRight />}>Register on Job+</Button><Button variant="glass" size="lg" onClick={() => go('employers', 'jobplus')}>Employer information</Button></>} />
      <Wrap>
        <SectionHead eyebrow="Why former players" title="Habits you can't teach in an interview." />
        <FeatureGrid items={[
          { icon: Target, t: 'Performance mindset', d: 'Years of setting targets, reviewing performance and improving.' },
          { icon: Users, t: 'Team-first culture', d: 'Used to high standards, feedback and shared goals.' },
          { icon: Clock, t: 'Reliability', d: 'Structured routines, punctuality and early starts are second nature.' },
        ]} />
      </Wrap>
      <Wrap bg="bg-mist" className="grid items-center gap-10 lg:grid-cols-2">
        <SectionHead eyebrow="Simple, success-based fees" title="15% of first-year base salary." desc="Only payable when a hire is confirmed. Version 1 supports UK employers only. All amounts in GBP." />
        <div className="rounded-3xl bg-ink p-7 text-white">
          {[24000, 28000, 32000].map((s) => (
            <div key={s} className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"><span className="text-white/70">Base salary {gbp(s)}</span><span className="font-display text-xl font-extrabold text-aqua">{gbp(hiringFee(s))}</span></div>
          ))}
        </div>
      </Wrap>
    </>
  );
}

/* ------------------------------------------------------------------ Founding */
export function FoundingPage() {
  const { toast } = useApp();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Founding Clubs Programme" title={<>Shape the platform. <span className="text-lime">Lead the way.</span></>} desc="A limited group of verified clubs will help define how Clearing+ supports released academy players — with a free membership period and early access." img={IMG.stadiumTop} />
      <Wrap>
        <SectionHead eyebrow="Programme benefits" title="Recognition, access and a real voice." />
        <FeatureGrid items={[
          { icon: Crown, t: 'Founding Club badge', d: 'Permanent recognition on your verified club profile.' },
          { icon: Clock, t: 'Free membership period', d: 'A free period with an agreed end date, set individually for each club.' },
          { icon: Search, t: 'Early access', d: 'Priority access to newly verified players in your region.' },
          { icon: Users, t: 'Reduced player fees', d: 'Players released from Founding/member academies pay £24.99 per year.' },
          { icon: MessagesSquare, t: 'Product input', d: 'Regular sessions with our product and placement teams.' },
          { icon: ShieldCheck, t: 'Dedicated PPM contact', d: 'A named Player Placement Manager for your club.' },
        ]} />
      </Wrap>
      <Wrap bg="bg-mist" className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Apply" title="Express interest in a Founding Club place." desc="Places are limited and subject to club verification. Applying does not commit your club to anything." />
          <ul className="mt-8 space-y-3 text-[15px] text-slate-700">{['Submit your application', 'Verification & safeguarding checks', 'Agree your free-period end date', 'Go live as a Founding Club'].map((t, i) => <li key={t} className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-lime">{i + 1}</span>{t}</li>)}</ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
          {sent ? <Success title="Application received" text="Thanks — our club partnerships team will be in touch within 3 working days. (Demo only.)" onReset={() => setSent(false)} /> : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); toast('Founding Club application submitted (demo).'); }}>
              <Field label="Club name" required className="sm:col-span-2"><Input required placeholder="e.g. Ashford Rovers FC" /></Field>
              <Field label="Country" required><Select options={COUNTRIES} /></Field>
              <Field label="League tier" required><Select options={TIERS} /></Field>
              <Field label="Contact name" required><Input required placeholder="Full name" /></Field>
              <Field label="Role at club" required><Input required placeholder="e.g. Head of Recruitment" /></Field>
              <Field label="Work email" required className="sm:col-span-2"><Input required type="email" placeholder="name@club.com" /></Field>
              <Field label="Why would your club like to join?" className="sm:col-span-2"><Textarea placeholder="Tell us about your recruitment approach…" /></Field>
              <div className="sm:col-span-2"><Button type="submit" variant="navy" size="lg" iconRight={<ArrowRight />}>Submit application</Button></div>
            </form>
          )}
        </div>
      </Wrap>
    </>
  );
}

/* ------------------------------------------------------------------ Grassroots */
export function GrassrootsPage() {
  const { go } = useApp();
  return (
    <>
      <PageHero eyebrow="Give Back to Grassroots" title={<>5% back to the <span className="text-lime">grassroots</span> game.</>} desc="Every player started somewhere. 5% of eligible Clearing+ platform revenue is ring-fenced to support grassroots football." img={IMG.youthMatch} />
      <Wrap>
        <SectionHead eyebrow="How it works" title="Transparent by design." />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[{ icon: Scale, t: 'Eligible revenue', d: 'Membership, licence, Claim and placement revenue.' }, { icon: Sprout, t: '5% ring-fenced', d: 'Set aside each month in a dedicated allocation.' }, { icon: HeartHandshake, t: 'Quarterly allocation', d: 'Allocations recorded by our team each quarter.' }, { icon: FileText, t: 'Published report', d: 'A clear report of amounts and recipients.' }].map((s, i) => (
            <div key={s.t} className="relative rounded-3xl border border-slate-200 bg-white p-6">
              <span className="font-display text-sm font-extrabold text-lime-dark">0{i + 1}</span>
              <s.icon className="mt-4 h-6 w-6 text-navy" />
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{s.t}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
          <div className="flex items-center justify-between bg-mist px-6 py-4"><div className="font-display font-bold text-navy">Illustrative quarterly report</div><span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">Example figures</span></div>
          {[['Q3 2025', 41200], ['Q4 2025', 52600], ['Q1 2026', 68900]].map(([q, rev]) => (
            <div key={q as string} className="grid grid-cols-3 border-t border-slate-100 px-6 py-4 text-sm"><span className="font-semibold text-navy">{q}</span><span className="text-slate-500">Eligible revenue {gbp(rev as number)}</span><span className="text-right font-bold text-navy">{gbp((rev as number) * 0.05)} ring-fenced</span></div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">Allocations are recorded and reported by the Clearing+ team. Recipients are announced in each quarterly report.</p>
      </Wrap>
      <CTABand title="Know a grassroots cause we should hear about?" text="Members can nominate grassroots clubs and programmes for future allocations." actions={<Button variant="lime" size="lg" onClick={() => go('contact')}>Get in touch</Button>} />
    </>
  );
}

/* ------------------------------------------------------------------ About */
export function AboutPage() {
  const { go } = useApp();
  return (
    <>
      <PageHero eyebrow="About us" title="Built for the moment football says “not this time”." desc="Clearing+ exists so that release from an academy is a transition — not an ending. We connect players with verified opportunities, and with careers beyond the pitch through Job+." img={IMG.stadiumMatch} />
      <Wrap className="grid gap-12 lg:grid-cols-2">
        <div><SectionHead eyebrow="Our mission" title="Every released player deserves a professional next step." /></div>
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>Each year, many young players leave academy football. Their talent, discipline and commitment don't disappear — but the route forward is often unclear.</p>
          <p>Clearing+ provides a verified, safeguarded and transparent platform where players are discovered by credible clubs, supported by Player Placement Managers, and encouraged to explore careers through Job+.</p>
        </div>
      </Wrap>
      <Wrap bg="bg-mist">
        <SectionHead eyebrow="Our values" title="What guides every decision." />
        <FeatureGrid items={[
          { icon: ShieldCheck, t: 'Safety first', d: 'Verification, consent and controlled contact are non-negotiable.' },
          { icon: Compass, t: 'Player-centred', d: 'We design every process around the player and their family.' },
          { icon: Scale, t: 'Transparent', d: 'Clear fees in GBP, clear rules, clear reporting.' },
          { icon: HeartHandshake, t: 'Human support', d: 'Real people review Claims and CVs — not just algorithms.' },
          { icon: Sprout, t: 'Give back', d: '5% of eligible revenue supports grassroots football.' },
          { icon: Target, t: 'Ambitious', d: 'We measure ourselves by successful placements and hires.' },
        ]} />
      </Wrap>
      <Wrap>
        <SectionHead eyebrow="Our teams" title="The people behind every placement." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['Player Placement Managers', 'Review Claims, manage communication and support trials and placements.'], ['Safeguarding', 'Led by a designated safeguarding lead with clear escalation routes.'], ['Verification', 'Checks players, guardians, clubs and employers before they go live.'], ['Club & employer partnerships', 'Onboards verified clubs and UK employers.']].map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-navy p-7 text-white"><div className="font-display text-lg font-bold">{t}</div><p className="mt-2 text-sm text-white/60">{d}</p></div>
          ))}
        </div>
      </Wrap>
      <CTABand title="Join the Clearing+ community." text="Players, families, clubs and employers — there's a place for you." actions={<><Button variant="lime" size="lg" onClick={() => go('interest')}>Register Interest</Button><Button variant="glass" size="lg" onClick={() => go('contact')}>Contact us</Button></>} />
    </>
  );
}

/* ------------------------------------------------------------------ Contact */
export function ContactPage() {
  const { toast } = useApp();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." desc="Questions from players, families, clubs, employers and media are all welcome. We aim to reply within two working days." />
      <Wrap bg="bg-mist" className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          {[{ icon: Mail, t: 'General enquiries', d: 'hello@clearingplus.com' }, { icon: Building2, t: 'Clubs & partnerships', d: 'clubs@clearingplus.com' }, { icon: ShieldCheck, t: 'Safeguarding', d: 'safeguarding@clearingplus.com' }, { icon: Phone, t: 'Office hours', d: 'Mon–Fri, 9:00–17:30 (UK)' }].map((c) => (
            <div key={c.t} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy text-lime"><c.icon className="h-5 w-5" /></span>
              <div><div className="text-sm font-semibold text-slate-500">{c.t}</div><div className="font-semibold text-navy">{c.d}</div></div>
            </div>
          ))}
          <p className="px-1 text-xs text-slate-500">Contact details are placeholders for this prototype.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-8">
          {sent ? <Success title="Message sent" text="Thanks for getting in touch — we'll reply within two working days. (Demo only, nothing was sent.)" onReset={() => setSent(false)} /> : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); toast('Message sent (demo).'); }}>
              <Field label="Full name" required><Input required placeholder="Your name" /></Field>
              <Field label="Email" required><Input required type="email" placeholder="you@example.com" /></Field>
              <Field label="I am a…" required><Select options={['Player', 'Parent / Guardian', 'Club', 'Employer', 'Media', 'Other']} /></Field>
              <Field label="Subject" required><Input required placeholder="How can we help?" /></Field>
              <Field label="Message" required className="sm:col-span-2"><Textarea required rows={6} placeholder="Write your message…" /></Field>
              <div className="sm:col-span-2"><Button type="submit" variant="navy" size="lg" iconRight={<ArrowRight />}>Send message</Button></div>
            </form>
          )}
        </div>
      </Wrap>
    </>
  );
}

/* ------------------------------------------------------------------ Register interest */
export function InterestPage() {
  const { toast } = useApp();
  const [role, setRole] = useState('player');
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Register interest" title="Be first to know." desc="Tell us who you are and we'll contact you as Clearing+ opens in your region." />
      <Wrap bg="bg-mist">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          {sent ? <Success title="You're on the list" text="Thanks for registering your interest. We'll be in touch soon. (Demo only.)" onReset={() => { setSent(false); setAgree(false); }} /> : (
            <form onSubmit={(e) => { e.preventDefault(); if (!agree) { toast('Please accept the privacy notice to continue.', 'error'); return; } setSent(true); toast('Interest registered (demo).'); }}>
              <div className="text-sm font-semibold text-slate-700">I'm registering as a…</div>
              <div className="mt-3"><RadioCards cols={4} value={role} onChange={setRole} options={[
                { value: 'player', label: 'Player', icon: User, desc: 'Released academy player' },
                { value: 'parent', label: 'Parent / Guardian', icon: Users, desc: 'Of a player aged 16–17' },
                { value: 'club', label: 'Club', icon: Building2, desc: 'Recruitment staff' },
                { value: 'employer', label: 'Employer', icon: Briefcase, desc: 'UK employer (Job+)' },
              ]} /></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required><Input required placeholder="Your name" /></Field>
                <Field label="Email" required><Input required type="email" placeholder="you@example.com" /></Field>
                <Field label="Country" required><Select options={role === 'employer' ? ['England', 'Scotland', 'Wales', 'Northern Ireland'] : COUNTRIES} /></Field>
                <Field label={role === 'club' ? 'Club name' : role === 'employer' ? 'Company name' : 'Former academy'}><Input placeholder="Optional" /></Field>
                <Field label="Anything else?" className="sm:col-span-2"><Textarea rows={3} placeholder="Optional message" /></Field>
              </div>
              <Checkbox className="mt-5" checked={agree} onChange={setAgree} label="I agree to Clearing+ contacting me about my interest." desc="See our Privacy Policy. You can unsubscribe at any time." />
              <Button type="submit" variant="navy" size="lg" className="mt-6" iconRight={<UserPlus />}>Register interest</Button>
            </form>
          )}
        </div>
      </Wrap>
    </>
  );
}

/* ------------------------------------------------------------------ Legal */
export function LegalPage({ kind }: { kind: 'terms' | 'privacy' }) {
  const terms = kind === 'terms';
  const sections = terms
    ? ['Introduction', 'Eligibility & accounts', 'Player memberships & fees', 'Club licences, Claims & placement fees', 'Messaging & conduct', 'Safeguarding', 'Liability', 'Changes to these terms']
    : ['Who we are', 'Information we collect', 'How we use information', 'What clubs and employers can see', 'Guardian consent for 16–17s', 'Data retention', 'Your rights', 'Contact us'];
  return (
    <>
      <PageHero eyebrow="Legal" title={terms ? 'Terms of Use' : 'Privacy Policy'} desc="Placeholder page for the UI prototype. Final legal copy will be provided and approved separately." />
      <Wrap className="grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-28 rounded-2xl border border-slate-200 p-5">
            <div className="text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Contents</div>
            <ol className="mt-4 space-y-2.5 text-sm">{sections.map((s, i) => <li key={s}><a href={`#sec-${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="text-slate-600 hover:text-navy">{i + 1}. {s}</a></li>)}</ol>
          </div>
        </aside>
        <div className="space-y-10 lg:col-span-9">
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">This is placeholder content and does not constitute legal terms. Last updated: March 2026 (prototype).</div>
          {sections.map((s, i) => (
            <section key={s} id={`sec-${i}`} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-extrabold text-navy">{i + 1}. {s}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">This section will describe {s.toLowerCase()} for {terms ? 'users of Clearing+ and Job+' : 'personal information processed by Clearing+ and Job+'}. Content will be written in plain English, reference UK data protection requirements where relevant, and explain how the rules apply to players, guardians, clubs, employers and staff.</p>
              <p className="mt-3 leading-relaxed text-slate-600">All fees referenced on the platform are charged in GBP. Players aged 16–17 require verified guardian consent. Club-to-player messaging is disabled by default and only enabled by a Player Placement Manager as a monitored, Claim-specific channel.</p>
            </section>
          ))}
        </div>
      </Wrap>
    </>
  );
}
