import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Loader2, UserCheck, CheckCircle2, Download, Eye, MessageSquare, PencilLine, Send } from 'lucide-react';
import { useApp } from '../store';
import { Button, Card, Checkbox, Chips, Field, Input, InfoNote, Select, Stepper, Tabs, Textarea, cn } from './ui';
import { CVDocument, CVWorkflow, SkillsProfile } from './CV';
import { CV_SAMPLE, HEADSHOTS, INDUSTRIES, gbp } from '../data/mock';

const STEPS = ['Personal', 'Career interests', 'Football', 'Skills', 'Education & work', 'Availability', 'References & consent'];
const INTERESTS = ['Operations', 'Sales', 'Coaching & fitness', 'Trades', 'Hospitality', 'Customer success', 'Recruitment', 'Public services', 'Tech support'];
const SKILLS = ['Leadership', 'Teamwork', 'Resilience', 'Communication', 'Discipline', 'Performance under pressure', 'Coachability', 'Data & analysis', 'Time management'];
const GEN = ['Analysing football experience', 'Translating transferable skills', 'Structuring Professional CV', 'Building Skills Profile'];

export default function CVBuilder({ embedded }: { embedded?: boolean }) {
  const { toast } = useApp();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<'form' | 'generating' | 'preview'>('form');
  const [genStep, setGenStep] = useState(0);
  const [stage, setStage] = useState(1);
  const [tab, setTab] = useState('cv');
  const [f, setF] = useState({
    name: 'Marcus Bennett', email: 'marcus.b@example.com', phone: '07700 900123', city: 'Manchester', dob: '2003-09-21',
    interests: ['Operations', 'Sales'], industry: INDUSTRIES[0].name, role: 'Operations Coordinator',
    academy: 'Kingsmere United Academy', years: '8', positions: 'Central Midfielder', achievements: 'U18 captain 2022/23. Academy Player of the Season 2021.',
    skills: ['Leadership', 'Teamwork', 'Resilience', 'Communication'], example: 'Led the U18 squad through a 12-game unbeaten run, running pre-match team meetings.',
    edu: 'BTEC Level 3 Extended Diploma in Sport', eduOrg: 'Academy education programme', eduYear: '2023',
    job: 'Weekend Stock Assistant', employer: 'Independent retailer, Stockport', jobDates: '2023 – 2025',
    availability: 'Immediately', location: 'Greater Manchester', pattern: ['Full-time'], licence: 'Full UK licence', rtw: 'UK citizen', salary: 27000,
    ref1: 'Head of Academy Education', ref2: 'Store Manager', c1: true, c2: true, c3: false,
  });
  const set = <K extends keyof typeof f>(k: K) => (v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (phase !== 'generating') return;
    setGenStep(0);
    const t = setInterval(() => setGenStep((s) => s + 1), 650);
    const done = setTimeout(() => { setPhase('preview'); setStage(1); toast('AI draft generated from your answers (simulated).', 'info'); }, 650 * GEN.length + 300);
    return () => { clearInterval(t); clearTimeout(done); };
  }, [phase, toast]);

  const cvData = { name: f.name || CV_SAMPLE.name, email: f.email, phone: f.phone, location: `${f.city}, UK`, title: f.role ? `${f.role} · Former academy footballer` : CV_SAMPLE.title };

  if (phase === 'generating')
    return (
      <Card className="mx-auto max-w-xl p-8 text-center sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-ink text-aqua"><Sparkles className="h-7 w-7 animate-pulse" /></span>
        <h3 className="mt-6 font-jakarta text-2xl font-extrabold text-ink">Drafting your CV…</h3>
        <p className="mt-1 text-sm text-slate-500">Simulated AI draft — no AI service is called in this prototype.</p>
        <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left">
          {GEN.map((g, i) => (
            <li key={g} className={cn('flex items-center gap-3 text-sm transition', i <= genStep ? 'text-ink' : 'text-slate-300')}>
              {i < genStep ? <CheckCircle2 className="h-5 w-5 text-teal" /> : i === genStep ? <Loader2 className="h-5 w-5 animate-spin text-teal" /> : <span className="h-5 w-5 rounded-full border-2 border-slate-200" />}{g}
            </li>
          ))}
        </ul>
      </Card>
    );

  if (phase === 'preview')
    return (
      <div className="space-y-6">
        <Card className="p-5 sm:p-7"><CVWorkflow current={stage} /></Card>
        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <div>
            <Tabs variant="pill" value={tab} onChange={setTab} tabs={[{ key: 'cv', label: 'Professional CV' }, { key: 'skills', label: 'Football-to-Workplace Skills Profile' }]} className="mb-5 bg-white ring-1 ring-stone" />
            <div key={tab} className="animate-fade-up">{tab === 'cv' ? <CVDocument data={cvData} highlight={stage === 1} /> : <SkillsProfile name={cvData.name} />}</div>
          </div>
          <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <Card className="p-5">
              <div className="text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Current stage</div>
              <div className="mt-1 font-jakarta text-lg font-extrabold text-ink">{['', 'AI Draft Preview', 'PPM Human Review', 'Candidate Approval', 'Published Profile'][stage]}</div>
              {stage === 1 && (
                <>
                  <p className="mt-2 text-sm text-slate-600">This is an AI-assisted first draft. Highlighted text will be checked by your PPM.</p>
                  <div className="mt-4 grid gap-2">
                    <Button variant="teal" className="rounded-xl" icon={<Send />} onClick={() => { setStage(2); toast('Draft sent to Sarah Okafor for human review.'); }}>Submit for PPM review</Button>
                    <Button variant="outline" className="rounded-xl" icon={<PencilLine />} onClick={() => { setPhase('form'); setStep(0); }}>Edit my answers</Button>
                  </div>
                </>
              )}
              {stage === 2 && (
                <>
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-sand p-3"><img src={HEADSHOTS[7]} alt="" className="h-10 w-10 rounded-full object-cover" /><div className="text-sm"><div className="font-semibold text-ink">Sarah Okafor</div><div className="text-slate-500">Reviewing · usually 1–2 working days</div></div></div>
                  <Button variant="ink" className="mt-4 w-full rounded-xl" icon={<UserCheck />} onClick={() => { setStage(3); toast('PPM review complete — please approve your CV.'); }}>Simulate PPM review complete</Button>
                </>
              )}
              {stage === 3 && (
                <>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {['Strengthened captaincy evidence', 'Removed date of birth (not needed)', 'Added FA coaching course to certifications'].map((c) => <li key={c} className="flex gap-2"><MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{c}</li>)}
                  </ul>
                  <div className="mt-4 grid gap-2">
                    <Button variant="teal" className="rounded-xl" icon={<CheckCircle2 />} onClick={() => { setStage(4); toast('Your Job+ profile is now published to verified UK employers.'); }}>Approve & publish</Button>
                    <Button variant="outline" className="rounded-xl" onClick={() => { setStage(2); toast('Change request sent to your PPM.', 'info'); }}>Request changes</Button>
                  </div>
                </>
              )}
              {stage === 4 && (
                <>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-5 w-5" /> Live to verified UK employers</div>
                  <div className="mt-4 grid gap-2">
                    <Button variant="outline" className="rounded-xl" icon={<Download />} onClick={() => toast('PDF export is a visual demo only.', 'info')}>Download PDF</Button>
                    <Button variant="ghost" className="rounded-xl" icon={<Eye />} onClick={() => setTab(tab === 'cv' ? 'skills' : 'cv')}>Switch document</Button>
                  </div>
                </>
              )}
            </Card>
            <InfoNote tone="teal">Employers only see your published profile. Introductions always go through your PPM, and you choose whether to proceed.</InfoNote>
          </div>
        </div>
      </div>
    );

  return (
    <Card className={cn('p-5 sm:p-8', !embedded && 'shadow-xl shadow-ink/5')}>
      <Stepper steps={STEPS} current={step} className="mb-8" />
      <div key={step} className="animate-fade-up">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required><Input value={f.name} onChange={(e) => set('name')(e.target.value)} /></Field>
            <Field label="Email" required><Input type="email" value={f.email} onChange={(e) => set('email')(e.target.value)} /></Field>
            <Field label="Phone" required><Input value={f.phone} onChange={(e) => set('phone')(e.target.value)} /></Field>
            <Field label="Town / city" required><Input value={f.city} onChange={(e) => set('city')(e.target.value)} /></Field>
            <Field label="Date of birth" hint="Used for eligibility only — not shown on your CV."><Input type="date" value={f.dob} onChange={(e) => set('dob')(e.target.value)} /></Field>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-5">
            <Field label="Career interests"><Chips options={INTERESTS} value={f.interests} onChange={set('interests')} /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred industry" required><Select value={f.industry} onChange={(e) => set('industry')(e.target.value)} options={INDUSTRIES.map((i) => i.name)} /></Field>
              <Field label="Preferred job role" required><Input value={f.role} onChange={(e) => set('role')(e.target.value)} /></Field>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Academy" required><Input value={f.academy} onChange={(e) => set('academy')(e.target.value)} /></Field>
            <Field label="Years in academy football"><Input type="number" value={f.years} onChange={(e) => set('years')(e.target.value)} /></Field>
            <Field label="Position(s)" className="sm:col-span-2"><Input value={f.positions} onChange={(e) => set('positions')(e.target.value)} /></Field>
            <Field label="Responsibilities & achievements" className="sm:col-span-2" hint="Captaincy, awards, mentoring, community work…"><Textarea value={f.achievements} onChange={(e) => set('achievements')(e.target.value)} /></Field>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <Field label="Select your strongest transferable skills"><Chips options={SKILLS} value={f.skills} onChange={set('skills')} /></Field>
            <Field label="Give an example of one of these skills in action"><Textarea value={f.example} onChange={(e) => set('example')(e.target.value)} /></Field>
          </div>
        )}
        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-sm font-bold text-ink sm:col-span-3">Education</div>
            <Field label="Qualification" className="sm:col-span-2"><Input value={f.edu} onChange={(e) => set('edu')(e.target.value)} /></Field>
            <Field label="Year"><Input value={f.eduYear} onChange={(e) => set('eduYear')(e.target.value)} /></Field>
            <Field label="Institution" className="sm:col-span-3"><Input value={f.eduOrg} onChange={(e) => set('eduOrg')(e.target.value)} /></Field>
            <div className="mt-2 text-sm font-bold text-ink sm:col-span-3">Work experience</div>
            <Field label="Role"><Input value={f.job} onChange={(e) => set('job')(e.target.value)} /></Field>
            <Field label="Employer"><Input value={f.employer} onChange={(e) => set('employer')(e.target.value)} /></Field>
            <Field label="Dates"><Input value={f.jobDates} onChange={(e) => set('jobDates')(e.target.value)} /></Field>
          </div>
        )}
        {step === 5 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Availability" required><Select value={f.availability} onChange={(e) => set('availability')(e.target.value)} options={['Immediately', '2 weeks', '1 month', '3 months']} /></Field>
            <Field label="Preferred work location" required><Input value={f.location} onChange={(e) => set('location')(e.target.value)} /></Field>
            <Field label="Work pattern" className="sm:col-span-2"><Chips options={['Full-time', 'Part-time', 'Apprenticeship', 'Hybrid', 'Shift work']} value={f.pattern} onChange={set('pattern')} /></Field>
            <Field label="Driving licence"><Select value={f.licence} onChange={(e) => set('licence')(e.target.value)} options={['Full UK licence', 'Provisional', 'None']} /></Field>
            <Field label="Right to work in the UK" required><Select value={f.rtw} onChange={(e) => set('rtw')(e.target.value)} options={['UK citizen', 'Irish citizen', 'Settled / pre-settled status', 'Visa holder', 'Not yet confirmed']} /></Field>
            <Field label={<span className="flex justify-between">Expected salary <b className="text-ink">{gbp(f.salary)}</b></span>} className="sm:col-span-2">
              <input type="range" min={18000} max={40000} step={500} value={f.salary} onChange={(e) => set('salary')(+e.target.value)} className="w-full accent-teal" aria-label="Expected salary" />
              <div className="mt-1 flex justify-between text-xs text-slate-400"><span>£18,000</span><span>£40,000</span></div>
            </Field>
          </div>
        )}
        {step === 6 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Reference 1"><Input value={f.ref1} onChange={(e) => set('ref1')(e.target.value)} /></Field>
              <Field label="Reference 2"><Input value={f.ref2} onChange={(e) => set('ref2')(e.target.value)} /></Field>
            </div>
            <div className="space-y-3 rounded-2xl bg-sand p-4">
              <Checkbox checked={f.c1} onChange={set('c1')} label="I agree to an AI-assisted CV draft being created from my answers." />
              <Checkbox checked={f.c2} onChange={set('c2')} label="I agree to my draft being reviewed by a Clearing+ Player Placement Manager." />
              <Checkbox checked={f.c3} onChange={set('c3')} label="Once I approve it, my profile may be shown to verified UK employers." desc="You can unpublish your profile at any time." />
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} icon={<ArrowLeft />}>Back</Button>
        {step < STEPS.length - 1 ? (
          <Button variant="ink" size="lg" onClick={() => setStep(step + 1)} iconRight={<ArrowRight />}>Continue</Button>
        ) : (
          <Button variant="teal" size="lg" icon={<Sparkles />} onClick={() => { if (!(f.c1 && f.c2 && f.c3)) { toast('Please accept all three consent statements.', 'error'); return; } setPhase('generating'); }}>Generate my CV draft</Button>
        )}
      </div>
    </Card>
  );
}
