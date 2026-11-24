import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Lock, Mail, User, Users, Building2, Briefcase, CreditCard, CheckCircle2, Loader2, ShieldCheck, KeyRound, BadgeCheck } from 'lucide-react';
import { ROLES, useApp, type Role } from '../store';
import { Button, Checkbox, ClearingLogo, Field, Input, InfoNote, JobPlusLogo, RadioCards, Select, Stepper, Textarea, Toggle, UploadZone, cn } from '../components/ui';
import { ROLE_ICONS } from '../components/PreviewSwitcher';
import { COUNTRIES, IMG, PLAYER_FEES, POSITIONS, ROLE_META, TIERS, UK } from '../data/mock';

function AuthShell({ children, wide, title, sub }: { children: ReactNode; wide?: boolean; title: string; sub: ReactNode }) {
  const { brand, go } = useApp();
  const job = brand === 'jobplus';
  return (
    <div className={cn('grid min-h-screen lg:grid-cols-[1fr_1.1fr]', job && 'theme-jobplus')}>
      <div className="relative hidden overflow-hidden lg:block">
        <img src={job ? IMG.office3 : IMG.stadium} alt="" className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
        <div className={cn('absolute inset-0', job ? 'bg-gradient-to-t from-ink via-ink/60 to-ink/10' : 'bg-gradient-to-t from-navy via-navy/70 to-navy/20')} />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <button onClick={() => go('home')} className="w-fit">{job ? <JobPlusLogo dark /> : <ClearingLogo />}</button>
          <div className="max-w-md">
            <h2 className={cn('text-4xl font-extrabold leading-[1.05] tracking-[-0.03em]', job ? 'font-jakarta' : 'font-display')}>
              {job ? <>Your skills go <span className="font-serif font-normal italic text-aqua">beyond</span> the pitch.</> : <>Your next chapter in football <span className="text-lime">starts here.</span></>}
            </h2>
            <div className="mt-8 space-y-3 text-sm text-white/75">
              {(job ? ['Human-reviewed professional CVs', 'Verified UK employers', 'PPM-managed introductions'] : ['Verified clubs only', 'PPM-managed Claims', 'Guardian consent for 16–17s']).map((t) => (
                <div key={t} className="flex items-center gap-2.5"><BadgeCheck className={cn('h-4 w-4', job ? 'text-aqua' : 'text-lime')} />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex items-center justify-between gap-4 p-5 sm:p-8">
          <button onClick={() => go('home')} className="lg:hidden">{job ? <JobPlusLogo sub={false} /> : <ClearingLogo dark={false} />}</button>
          <button onClick={() => go('home')} className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="h-4 w-4" /> Back to website</button>
        </div>
        <div className="flex flex-1 justify-center px-5 pb-20 sm:px-8">
          <div className={cn('w-full pt-4 lg:pt-10', wide ? 'max-w-2xl' : 'max-w-md')}>
            <h1 className={cn('text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl', job ? 'font-jakarta' : 'font-display')}>{title}</h1>
            <p className="mt-2 text-slate-500">{sub}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { brand, go, openDashboard, toast } = useApp();
  const job = brand === 'jobplus';
  const [role, setRole] = useState<Role>(job ? 'employer' : 'player');
  return (
    <AuthShell title="Welcome back" sub={<>New here? <button onClick={() => go(job ? 'optin' : 'register')} className="font-semibold text-slate-900 underline underline-offset-4">Create an account</button></>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast(`Signed in as ${ROLE_META[role].label} (demo — no real authentication).`); openDashboard(role); }}>
        <Field label="Email address"><div className="relative"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input type="email" defaultValue={ROLE_META[role].email} key={role} className="pl-10" /></div></Field>
        <Field label={<span className="flex justify-between">Password <button type="button" onClick={() => go('forgot')} className="font-semibold text-slate-500 hover:text-slate-900">Forgot password?</button></span>}>
          <div className="relative"><Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input type="password" defaultValue="demo-password" className="pl-10" /></div>
        </Field>
        <Field label="Demo role" hint="Prototype only: choose which dashboard to preview.">
          <Select value={role} onChange={(e) => setRole(e.target.value as Role)} options={ROLES.map((r) => ({ value: r, label: ROLE_META[r].label }))} />
        </Field>
        <Button type="submit" variant={job ? 'teal' : 'navy'} size="lg" className="w-full rounded-xl" iconRight={<ArrowRight />}>Sign in</Button>
      </form>
      <div className="my-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or jump straight in<span className="h-px flex-1 bg-slate-200" /></div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ROLES.map((r) => {
          const I = ROLE_ICONS[r];
          return (
            <button key={r} onClick={() => openDashboard(r)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-[13px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              <I className="h-4 w-4 text-slate-400" />{ROLE_META[r].label}
            </button>
          );
        })}
      </div>
    </AuthShell>
  );
}

export function ForgotPage() {
  const { go, toast } = useApp();
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title={sent ? 'Check your inbox' : 'Reset your password'} sub={sent ? 'If an account exists, we have sent a reset link. (Demo — no email is sent.)' : "Enter your account email and we'll send a reset link."}>
      {sent ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200"><CheckCircle2 className="h-5 w-5" /> Reset link sent</div>
          <Button variant="navy" size="lg" className="w-full rounded-xl" onClick={() => go('login')}>Back to sign in</Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); toast('Password reset requested (demo).'); }}>
          <Field label="Email address"><div className="relative"><KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input required type="email" placeholder="you@example.com" className="pl-10" /></div></Field>
          <Button type="submit" variant="navy" size="lg" className="w-full rounded-xl">Send reset link</Button>
          <button type="button" onClick={() => go('login')} className="w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-900">Back to sign in</button>
        </form>
      )}
    </AuthShell>
  );
}

const STEPS: Record<string, string[]> = {
  player: ['Account type', 'Your details', 'Football background', 'Membership', 'Payment'],
  club: ['Account type', 'Club details', 'Verification', 'Membership', 'Review'],
  guardian: ['Account type', 'Your details', 'Link player', 'Consent'],
};
const ageFrom = (dob: string) => {
  const d = new Date(dob);
  if (isNaN(d.getTime())) return 18;
  return Math.floor((new Date(2026, 2, 14).getTime() - d.getTime()) / 31557600000);
};

export function RegisterPage() {
  const { go, openDashboard, toast } = useApp();
  const preset = window.location.hash.split('/')[3];
  const [type, setType] = useState(preset === 'club' ? 'club' : preset === 'guardian' ? 'guardian' : 'player');
  const [step, setStep] = useState(preset === 'club' ? 1 : 0);
  const [done, setDone] = useState(false);
  const [paying, setPaying] = useState(false);
  const [f, setF] = useState({ first: 'Jordan', last: 'Ellis', email: 'jordan.ellis@example.com', dob: '2006-08-14', country: 'England', foot: 'Right', founding: true, foundingClub: true, agree: false, consent1: false, consent2: false, consent3: false, signature: '', club: 'Ashford Rovers FC' });
  const set = (k: keyof typeof f) => (v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const steps = STEPS[type];
  const age = ageFrom(f.dob);
  const uk = UK.includes(f.country);
  const fee = !uk ? PLAYER_FEES[2] : f.founding ? PLAYER_FEES[0] : PLAYER_FEES[1];
  const last = step === steps.length - 1;

  const next = () => {
    if (type === 'guardian' && last && !(f.consent1 && f.consent2 && f.consent3 && f.signature)) { toast('Please complete all consent declarations and sign.', 'error'); return; }
    if (type === 'club' && step === 3 && !f.agree) { toast('Please accept the club fee terms to continue.', 'error'); return; }
    if (!last) { setStep(step + 1); window.scrollTo(0, 0); return; }
    if (type === 'player') {
      setPaying(true);
      setTimeout(() => { setPaying(false); setDone(true); toast(`Payment of £${fee.price} simulated — no real charge.`); }, 1600);
    } else { setDone(true); toast('Registration submitted (demo).'); }
  };

  if (done) {
    const dash: Role = type === 'club' ? 'clubAdmin' : type === 'guardian' ? 'guardian' : 'player';
    return (
      <AuthShell title={type === 'club' ? 'Club registration submitted' : `Welcome to Clearing+, ${f.first}!`} sub="Your account has been created in this demo.">
        <div className="space-y-4">
          <div className="rounded-2xl bg-lime/20 p-5 ring-1 ring-lime-dark/20">
            <div className="flex items-center gap-2 font-semibold text-navy"><CheckCircle2 className="h-5 w-5" /> What happens next</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {(type === 'club' ? ['Our verification team reviews your club details (2–3 working days)', 'You will be notified once your club is verified', 'Founding Club applications are reviewed separately']
                : type === 'guardian' ? ["Your consent has been recorded", "Ethan's profile can now be reviewed for verification", 'You can withdraw consent at any time']
                : [`Membership active: ${fee.label} · £${fee.price}/year`, 'Complete your football profile and upload highlights', age < 18 ? 'We have emailed your guardian to request consent' : 'Verification checks begin automatically']).map((t) => (
                <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />{t}</li>
              ))}
            </ul>
          </div>
          <Button variant="navy" size="lg" className="w-full rounded-xl" onClick={() => openDashboard(dash)} iconRight={<ArrowRight />}>Go to my dashboard</Button>
          <Button variant="outline" size="lg" className="w-full rounded-xl" onClick={() => go('home')}>Back to website</Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell wide title="Create your account" sub={<>Already registered? <button onClick={() => go('login')} className="font-semibold text-slate-900 underline underline-offset-4">Sign in</button></>}>
      <Stepper steps={steps} current={step} className="mb-8" />
      <div key={type + step} className="animate-fade-up">
        {step === 0 && (
          <div className="space-y-4">
            <RadioCards cols={3} value={type} onChange={(v) => { setType(v); }} options={[
              { value: 'player', label: 'Player', icon: User, desc: 'Released academy player, aged 16+' },
              { value: 'guardian', label: 'Parent / Guardian', icon: Users, desc: 'Of a player aged 16–17' },
              { value: 'club', label: 'Football club', icon: Building2, desc: 'Recruitment staff' },
            ]} />
            <button onClick={() => go('employer-register', 'jobplus')} className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-4 text-left text-sm text-slate-600 hover:border-slate-400">
              <Briefcase className="h-5 w-5 text-teal" /><span className="flex-1">Hiring former players for non-football roles? <b className="text-slate-900">Register as a Job+ employer</b></span><ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {type === 'player' && step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" required><Input value={f.first} onChange={(e) => set('first')(e.target.value)} /></Field>
            <Field label="Last name" required><Input value={f.last} onChange={(e) => set('last')(e.target.value)} /></Field>
            <Field label="Email" required><Input type="email" value={f.email} onChange={(e) => set('email')(e.target.value)} /></Field>
            <Field label="Mobile number" required><Input placeholder="07700 900000" /></Field>
            <Field label="Date of birth" required hint={`Age: ${age}`}><Input type="date" value={f.dob} onChange={(e) => set('dob')(e.target.value)} /></Field>
            <Field label="Country of residence" required><Select value={f.country} onChange={(e) => set('country')(e.target.value)} options={COUNTRIES} /></Field>
            <Field label="Create password" required className="sm:col-span-2"><Input type="password" placeholder="At least 10 characters" /></Field>
            {age < 18 && (
              <div className="grid gap-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 sm:col-span-2 sm:grid-cols-2">
                <div className="flex gap-2 text-sm text-amber-800 sm:col-span-2"><ShieldCheck className="h-5 w-5 shrink-0" />You're under 18, so a parent or guardian must give consent before your profile is visible to clubs.</div>
                <Field label="Guardian full name" required><Input placeholder="e.g. Michelle Brooks" /></Field>
                <Field label="Guardian email" required><Input type="email" placeholder="guardian@example.com" /></Field>
              </div>
            )}
          </div>
        )}
        {type === 'player' && step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary position" required><Select options={POSITIONS} defaultValue="Central Midfielder" /></Field>
            <Field label="Secondary position"><Select options={['None', ...POSITIONS]} defaultValue="Defensive Midfielder" /></Field>
            <Field label="Preferred foot" required className="sm:col-span-2"><RadioCards cols={3} value={f.foot} onChange={set('foot')} options={[{ value: 'Right', label: 'Right' }, { value: 'Left', label: 'Left' }, { value: 'Both', label: 'Both' }]} /></Field>
            <Field label="Height (cm)" required><Input type="number" defaultValue={181} /></Field>
            <Field label="Former academy" required><Input defaultValue="Kingsmere United Academy" /></Field>
            <Field label="Academy category / level"><Select options={['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Club Academy Scotland', 'International academy']} defaultValue="Category 2" /></Field>
            <Field label="Release date" required><Input type="month" defaultValue="2025-05" /></Field>
            <Field label="Short bio" className="sm:col-span-2"><Textarea rows={3} defaultValue="Composed deep-lying playmaker with a wide passing range. U18 captain in 2024/25." /></Field>
          </div>
        )}
        {type === 'player' && step === 3 && (
          <div className="space-y-5">
            <Toggle checked={f.founding} onChange={set('founding')} label="I was released by a Founding Club or member academy" desc="Eligible players receive the lowest annual fee (verified during checks)." />
            <div className="grid gap-3 sm:grid-cols-3">
              {PLAYER_FEES.map((p) => (
                <div key={p.key} className={cn('rounded-2xl border p-4 transition', p.key === fee.key ? 'border-[var(--accent-strong)] bg-[var(--brand-soft)] ring-4 ring-[var(--accent-ring)]' : 'border-slate-200 opacity-60')}>
                  <div className="text-xs font-semibold text-slate-500">{p.label}</div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-navy">£{p.price}</div>
                  <div className="text-xs text-slate-500">per year</div>
                  {p.key === fee.key && <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-lime-dark">Your plan</div>}
                </div>
              ))}
            </div>
            <InfoNote>Your plan is based on your country ({f.country}) and academy. All prices are in GBP and renew annually. You can cancel renewal at any time.</InfoNote>
          </div>
        )}
        {type === 'player' && step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-navy p-5 text-white">
              <div><div className="text-sm text-white/60">Annual membership</div><div className="font-semibold">{fee.label}</div></div>
              <div className="font-display text-3xl font-extrabold text-lime">£{fee.price}</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name on card" className="sm:col-span-2"><Input defaultValue={`${f.first} ${f.last}`} /></Field>
              <Field label="Card number" className="sm:col-span-2"><div className="relative"><CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input defaultValue="4242 4242 4242 4242" className="pl-10 tracking-wider" /></div></Field>
              <Field label="Expiry"><Input defaultValue="08 / 28" /></Field>
              <Field label="CVC"><Input defaultValue="123" /></Field>
            </div>
            <InfoNote tone="amber" icon={Lock}>Demo mode — this is a visual payment mockup. No payment details are processed or stored.</InfoNote>
          </div>
        )}

        {type === 'club' && step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Club name" required className="sm:col-span-2"><Input value={f.club} onChange={(e) => set('club')(e.target.value)} /></Field>
            <Field label="Country" required><Select options={COUNTRIES} /></Field>
            <Field label="League tier" required><Select options={TIERS} defaultValue="Tier 5" /></Field>
            <Field label="Town / city"><Input defaultValue="Ashford" /></Field>
            <Field label="Website"><Input placeholder="https://" /></Field>
            <Field label="Your name" required><Input defaultValue="Graham Whitlock" /></Field>
            <Field label="Your role" required><Input defaultValue="Head of Recruitment" /></Field>
            <Field label="Work email" required className="sm:col-span-2"><Input type="email" defaultValue="g.whitlock@ashfordrovers.example" /></Field>
          </div>
        )}
        {type === 'club' && step === 2 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="FA / association affiliation no." required><Input placeholder="e.g. AFF-102938" /></Field>
              <Field label="Company / registration no."><Input placeholder="Optional" /></Field>
              <Field label="Safeguarding officer" required><Input placeholder="Full name" /></Field>
              <Field label="Safeguarding officer email" required><Input type="email" placeholder="name@club.com" /></Field>
            </div>
            <UploadZone label="Upload verification documents" hint="Affiliation certificate, safeguarding policy · PDF up to 10MB" />
          </div>
        )}
        {type === 'club' && step === 3 && (
          <div className="space-y-4">
            <Toggle checked={f.foundingClub} onChange={set('foundingClub')} label="Apply for the Founding Clubs Programme" desc="Founding Clubs receive a free membership period with an agreed end date." />
            <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Club fees (GBP)</div>
              <ul className="mt-3 space-y-2">
                <li>• Annual club licence — set by country and league tier{f.foundingClub && ' (free period if accepted as a Founding Club)'}</li>
                <li>• £100 Claim Fee — only after PPM credibility approval; rejected or withdrawn Claims are not charged</li>
                <li>• Placement fee — the greater of £3,000 or 10% of first-year contract value</li>
              </ul>
            </div>
            <Checkbox checked={f.agree} onChange={set('agree')} label="I accept the club fee terms and confirm I am authorised to register this club." />
          </div>
        )}
        {type === 'club' && step === 4 && (
          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
            {[['Club', f.club], ['Contact', 'Graham Whitlock · Head of Recruitment'], ['Verification', 'Documents uploaded'], ['Founding Club', f.foundingClub ? 'Applying' : 'Not applying'], ['Fee terms', f.agree ? 'Accepted' : 'Not accepted']].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-5 py-3.5 text-sm"><span className="text-slate-500">{k}</span><span className="text-right font-semibold text-slate-900">{v}</span></div>
            ))}
          </div>
        )}

        {type === 'guardian' && step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required><Input defaultValue="Michelle Brooks" /></Field>
            <Field label="Relationship" required><Select options={['Mother', 'Father', 'Legal guardian', 'Other carer']} /></Field>
            <Field label="Email" required><Input type="email" defaultValue="m.brooks@example.com" /></Field>
            <Field label="Mobile" required><Input defaultValue="07700 900456" /></Field>
            <Field label="Create password" required className="sm:col-span-2"><Input type="password" placeholder="At least 10 characters" /></Field>
          </div>
        )}
        {type === 'guardian' && step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Player invitation code" required hint="Found in the email we sent you."><Input defaultValue="CLR-7Q4K-2M" /></Field>
            <Field label="Player's date of birth" required><Input type="date" defaultValue="2008-10-02" /></Field>
            <div className="flex items-center gap-4 rounded-2xl bg-mist p-4 sm:col-span-2">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-bold text-lime">EB</span>
              <div><div className="font-semibold text-slate-900">Ethan Brooks · 17</div><div className="text-sm text-slate-500">Striker · Redbank Town Academy</div></div>
              <span className="ml-auto text-xs font-semibold text-emerald-600">Match found</span>
            </div>
          </div>
        )}
        {type === 'guardian' && step === 3 && (
          <div className="space-y-4">
            <Checkbox checked={f.consent1} onChange={set('consent1')} label="I confirm I am the parent or legal guardian of Ethan Brooks." />
            <Checkbox checked={f.consent2} onChange={set('consent2')} label="I consent to Ethan's football profile being visible to verified clubs." desc="Contact details, documents and guardian information are never shown to clubs." />
            <Checkbox checked={f.consent3} onChange={set('consent3')} label="I understand I can withdraw consent at any time from my dashboard." />
            <Field label="Type your full name as signature" required><Input value={f.signature} onChange={(e) => set('signature')(e.target.value)} placeholder="Michelle Brooks" className="font-serif text-lg italic" /></Field>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} icon={<ArrowLeft />}>Back</Button>
        <Button variant={type === 'player' && last ? 'lime' : 'navy'} size="lg" onClick={next} disabled={paying} iconRight={paying ? <Loader2 className="animate-spin" /> : <ArrowRight />}>
          {paying ? 'Processing…' : type === 'player' && last ? `Pay £${fee.price} (demo)` : last ? 'Submit' : 'Continue'}
        </Button>
      </div>
    </AuthShell>
  );
}
