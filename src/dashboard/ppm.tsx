import { useState } from 'react';
import { LayoutDashboard, ListChecks, FileSignature, MessagesSquare, Bell, Timer, Users, Sparkles, Handshake, LifeBuoy, CheckCircle2, XCircle, ShieldCheck, Clock, Trophy, Calendar, ArrowRight, Send, BadgeCheck, MessageSquare } from 'lucide-react';
import { useApp, usePersist } from '../store';
import { Avatar, Badge, Button, Card, CardHeader, Checkbox, ClaimPipeline, DataTable, Drawer, Field, InfoNote, Input, Modal, PageHeader, Select, StatCard, Tabs, Textarea, Timeline, Toggle, cn } from '../components/ui';
import { BarChart } from '../components/charts';
import { Messenger } from '../components/Messenger';
import { CVDocument, CVWorkflow } from '../components/CV';
import { Safeguarding } from './admin2';
import type { NavGroup } from './Shell';
import { CANDIDATES, CLAIMS, CLAIM_STAGES, CLUBS, NOTIFS, PLAYERS, PPM_THREADS, gbp, hiringFee, placementFee, type Claim } from '../data/mock';

const ME = 'Sarah Okafor';

export const ppmNav: NavGroup[] = [
  { title: 'Workspace', items: [
    { key: 'overview', label: 'PPM Overview', icon: LayoutDashboard },
    { key: 'queue', label: 'Claim Review Queue', icon: ListChecks, badge: 4 },
    { key: 'assigned', label: 'Assigned Claims', icon: FileSignature },
    { key: 'messages', label: 'Communication CRM', icon: MessagesSquare, badge: 3 },
    { key: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  ] },
  { title: 'Football', items: [{ key: 'trials', label: 'Trials & Placements', icon: Timer }] },
  { title: 'Job+', items: [
    { key: 'candidates', label: 'Job+ Candidate Review', icon: Users },
    { key: 'cv', label: 'AI CV Draft Review', icon: Sparkles, badge: 2 },
    { key: 'intros', label: 'Introductions & Hires', icon: Handshake },
  ] },
  { title: 'Care', items: [{ key: 'safeguarding', label: 'Safeguarding Cases', icon: LifeBuoy }] },
];

function useClaims() {
  const [claims, setClaims] = usePersist<Claim[]>('ppm-claims', CLAIMS);
  const update = (id: string, p: Partial<Claim>) => setClaims((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c)));
  return { claims, update };
}

export function PPMDashboard({ screen }: { screen: string }) {
  const st = useClaims();
  const [sel, setSel] = useState<string | null>(null);
  const selected = st.claims.find((c) => c.id === sel) ?? null;
  let body;
  switch (screen) {
    case 'queue': body = <Queue claims={st.claims} onOpen={setSel} />; break;
    case 'assigned': body = <Assigned claims={st.claims} onOpen={setSel} />; break;
    case 'messages': body = (<><PageHeader title="Communication CRM" desc="PPM-controlled messaging with players, guardians, clubs and candidates. Monitored club–player channels are Claim-specific." /><Messenger threads={PPM_THREADS} me={ME} ppm /></>); break;
    case 'notifications': body = <Notifications />; break;
    case 'trials': body = <Trials st={st} />; break;
    case 'candidates': body = <JobCandidates />; break;
    case 'cv': body = <CVReview />; break;
    case 'intros': body = <Intros />; break;
    case 'safeguarding': body = <Safeguarding ppmView />; break;
    default: body = <Overview claims={st.claims} onOpen={setSel} />;
  }
  return (
    <>
      {body}
      <ClaimReview claim={selected} onClose={() => setSel(null)} update={st.update} />
    </>
  );
}

function Overview({ claims, onOpen }: { claims: Claim[]; onOpen: (id: string) => void }) {
  const { setScreen } = useApp();
  const queue = claims.filter((c) => ['Submitted', 'PPM Review'].includes(c.status));
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><div className="text-xs font-bold uppercase tracking-[.18em] text-lime">Player Placement Manager</div><h1 className="mt-1 font-display text-3xl font-extrabold">Morning, Sarah</h1><p className="mt-1 text-sm text-white/60">{queue.length} Claims in the review queue · 1 trial today · 2 CV drafts waiting.</p></div>
          <div className="flex gap-2"><Button variant="lime" icon={<ListChecks />} onClick={() => setScreen('queue')}>Open review queue</Button><Button variant="glass" icon={<MessagesSquare />} onClick={() => setScreen('messages')}>Messages</Button></div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Review queue" value={queue.length} hint="2 unassigned" icon={ListChecks} tone="amber" />
        <StatCard label="My active Claims" value={claims.filter((c) => c.ppm === ME && !['Rejected', 'Withdrawn', 'Placement'].includes(c.status)).length} icon={FileSignature} />
        <StatCard label="Trials this week" value={claims.filter((c) => c.status === 'Trial').length} icon={Timer} tone="violet" />
        <StatCard label="Avg. review time" value="1.4 days" delta="0.3 days faster" icon={Clock} tone="emerald" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Needs your review" desc="Credibility checks before players are contacted" action={<Button size="sm" variant="ghost" onClick={() => setScreen('queue')}>View queue</Button>} />
          <ul className="divide-y divide-slate-100 p-2 sm:p-3">
            {queue.slice(0, 4).map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-3 p-3">
                <Avatar name={c.player} src={PLAYERS.find((p) => p.id === c.playerId)?.photo} size={40} />
                <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-slate-900">{c.player} <span className="font-normal text-slate-400">←</span> {c.club}</div><div className="text-xs text-slate-500">{c.id} · {c.type} · {c.submitted} · {c.ppm}</div></div>
                <Badge>{c.status}</Badge>
                <Button size="sm" variant="navy" onClick={() => onOpen(c.id)} iconRight={<ArrowRight />}>Review</Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Today" desc="Thursday 14 March" />
          <div className="p-5 sm:p-6"><Timeline items={[
            { title: 'Credibility review · CLM-2051', time: '09:30', tone: 'amber', icon: ShieldCheck },
            { title: 'Call with Jordan Ellis', time: '10:30', tone: 'blue', icon: MessagesSquare },
            { title: 'Trial check-in · Kai Mensah @ Bramley City', time: '14:00', tone: 'violet', icon: Timer },
            { title: 'CV review · Luca Romano', time: '16:00', tone: 'teal', icon: Sparkles },
          ]} /></div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2"><CardHeader title="Claim decisions" desc="Last 8 weeks" /><div className="p-4 sm:p-6"><BarChart data={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((w, i) => ({ label: w, approved: [3, 4, 2, 5, 4, 6, 5, 7][i], rejected: [1, 0, 1, 2, 1, 1, 0, 1][i] }))} keys={['approved', 'rejected']} names={['Approved', 'Rejected']} colors={['#102A43', '#F43F5E']} /></div></Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Job+ tasks</div>
          <div className="mt-4 space-y-3">
            {[{ t: '2 AI CV drafts to review', to: 'cv', i: Sparkles }, { t: '2 employer introduction requests', to: 'intros', i: Handshake }, { t: '1 candidate eligibility check', to: 'candidates', i: Users }].map((x) => (
              <button key={x.t} onClick={() => setScreen(x.to)} className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"><x.i className="h-4 w-4 text-teal" /><span className="flex-1">{x.t}</span><ArrowRight className="h-4 w-4 text-slate-300" /></button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Queue({ claims, onOpen }: { claims: Claim[]; onOpen: (id: string) => void }) {
  const [mine, setMine] = useState(false);
  const rows = claims.filter((c) => ['Submitted', 'PPM Review'].includes(c.status) && (!mine || c.ppm === ME));
  return (
    <div className="space-y-6">
      <PageHeader title="Claim Review Queue" desc="Check credibility before any player is contacted. Approval triggers the £100 Claim Fee; rejections are never charged." />
      <DataTable rows={rows} onRowClick={(r) => onOpen(r.id)} rowKey={(r) => r.id} toolbar={<Toggle checked={mine} onChange={setMine} label="Assigned to me" />} columns={[
        { key: 'id', label: 'Claim', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> },
        { key: 'player', label: 'Player', render: (r) => <div className="flex items-center gap-2"><Avatar name={r.player} src={PLAYERS.find((p) => p.id === r.playerId)?.photo} size={28} /><b className="text-slate-900">{r.player}</b></div> },
        { key: 'club', label: 'Club' }, { key: 'country', label: 'Country' }, { key: 'type', label: 'Type' }, { key: 'submitted', label: 'Submitted' },
        { key: 'ppm', label: 'PPM', render: (r) => (r.ppm === 'Unassigned' ? <Badge>Unassigned</Badge> : r.ppm) }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
      ]} />
    </div>
  );
}

function Assigned({ claims, onOpen }: { claims: Claim[]; onOpen: (id: string) => void }) {
  const [tab, setTab] = useState('active');
  const mine = claims.filter((c) => c.ppm === ME);
  const rows = mine.filter((c) => (tab === 'active' ? !['Rejected', 'Withdrawn', 'Placement'].includes(c.status) : ['Rejected', 'Withdrawn', 'Placement'].includes(c.status)));
  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Claims" desc="Every Claim you are accountable for, from approval to placement." />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'active', label: 'Active', count: mine.filter((c) => !['Rejected', 'Withdrawn', 'Placement'].includes(c.status)).length }, { key: 'closed', label: 'Closed', count: mine.filter((c) => ['Rejected', 'Withdrawn', 'Placement'].includes(c.status)).length }]} />
      <div className="grid gap-4">
        {rows.map((c) => (
          <Card key={c.id} className="cursor-pointer p-5 transition hover:shadow-lg sm:p-6" onClick={() => onOpen(c.id)}>
            <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Avatar name={c.player} src={PLAYERS.find((p) => p.id === c.playerId)?.photo} size={42} /><div><div className="font-semibold text-slate-900">{c.player} ← {c.club}</div><div className="text-xs text-slate-500">{c.id} · {c.type} · {c.submitted}</div></div></div><Badge>{c.status}</Badge></div>
            <div className="mt-5"><ClaimPipeline status={c.status} /></div>
          </Card>
        ))}
        {!rows.length && <Card className="p-10 text-center text-sm text-slate-500">No Claims here.</Card>}
      </div>
    </div>
  );
}

const NEXT: Record<string, string> = { Approved: 'Player Discussion', 'Player Discussion': 'Trial', Trial: 'Placement' };
function ClaimReview({ claim, onClose, update }: { claim: Claim | null; onClose: () => void; update: (id: string, p: Partial<Claim>) => void }) {
  const { toast } = useApp();
  const [checks, setChecks] = useState({ club: true, coach: true, safe: false, realistic: false, eligible: true });
  const [rejecting, setRejecting] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [contract, setContract] = useState(28000);
  const [reason, setReason] = useState('Insufficient detail about the opportunity');
  if (!claim) return null;
  const club = CLUBS.find((c) => c.name === claim.club);
  const player = PLAYERS.find((p) => p.id === claim.playerId);
  const inReview = ['Submitted', 'PPM Review'].includes(claim.status);
  const allOk = Object.values(checks).every(Boolean);
  const approve = () => { update(claim.id, { status: 'Approved', ppm: claim.ppm === 'Unassigned' ? ME : claim.ppm }); toast(`${claim.id} approved — £100 Claim Fee invoiced to ${claim.club}. Player can now be contacted.`); };
  const advance = () => {
    const n = NEXT[claim.status];
    if (n === 'Placement') return setPlacing(true);
    update(claim.id, { status: n, trialDate: n === 'Trial' ? '28 Mar 2026' : claim.trialDate });
    toast(`${claim.id} moved to ${n}.`);
  };
  return (
    <>
      <Drawer open={!!claim} onClose={onClose} wide title={`${claim.id} · ${claim.player}`} subtitle={`${claim.club} · ${claim.type}`}
        footer={inReview ? (
          <><Button variant="outline" onClick={() => toast('Information request sent to the club via CRM.', 'info')}>Request info</Button><Button variant="danger" icon={<XCircle />} onClick={() => setRejecting(true)}>Reject</Button><Button variant="navy" icon={<CheckCircle2 />} onClick={() => { if (!allOk) return toast('Complete all credibility checks before approving.', 'error'); approve(); }}>Approve Claim</Button></>
        ) : NEXT[claim.status] ? <Button variant="navy" iconRight={<ArrowRight />} onClick={advance}>Move to {NEXT[claim.status]}</Button> : undefined}>
        <div className="space-y-6">
          <ClaimPipeline status={claim.status} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Player</div>
              <div className="mt-2 flex items-center gap-3"><Avatar name={claim.player} src={player?.photo} size={44} /><div><div className="font-semibold text-slate-900">{claim.player}</div><div className="text-xs text-slate-500">{player ? `${player.position} · ${player.age} · ${player.country}` : 'Placed player'}</div></div></div>
              {player && player.age < 18 && <div className="mt-3 text-xs font-semibold text-amber-700">Under 18 · guardian {player.guardian} included in discussions</div>}
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Club</div>
              <div className="mt-2 flex items-center gap-3"><Avatar name={claim.club} size={44} /><div><div className="font-semibold text-slate-900">{claim.club}</div><div className="text-xs text-slate-500">{club ? `${club.country} · ${club.tier} · ${club.verified}` : claim.country}</div></div></div>
              {club?.founding && <Badge className="mt-3" tone="lime">Founding Club</Badge>}
            </div>
          </div>
          <div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity</div><p className="mt-2 text-sm text-slate-700">{claim.note}</p>{claim.contract && <p className="mt-1 text-sm text-slate-500">Contract value {gbp(claim.contract)} · placement fee {gbp(placementFee(claim.contract))}</p>}</div>
          {inReview && (
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between"><div className="font-display font-bold text-slate-900">Credibility checklist</div><span className="text-xs font-semibold text-slate-500">{Object.values(checks).filter(Boolean).length}/5</span></div>
              <div className="mt-4 space-y-3">
                <Checkbox checked={checks.club} onChange={(v) => setChecks({ ...checks, club: v })} label="Club verified with active membership" desc={club ? `${club.verified} · ${club.status}` : undefined} />
                <Checkbox checked={checks.coach} onChange={(v) => setChecks({ ...checks, coach: v })} label="Named supervising coach provided" />
                <Checkbox checked={checks.safe} onChange={(v) => setChecks({ ...checks, safe: v })} label="Safeguarding officer confirmed and DBS declared" />
                <Checkbox checked={checks.realistic} onChange={(v) => setChecks({ ...checks, realistic: v })} label="Opportunity details are realistic and specific" />
                <Checkbox checked={checks.eligible} onChange={(v) => setChecks({ ...checks, eligible: v })} label="Player eligible (verified; guardian consent if 16–17)" />
              </div>
            </div>
          )}
          <InfoNote>{inReview ? 'Approving triggers the £100 Claim Fee to the club. Rejected and withdrawn Claims are never charged.' : 'Claim Fee status: ' + (['Rejected', 'Withdrawn'].includes(claim.status) ? 'not charged.' : 'charged on approval.')}</InfoNote>
          <Field label="Internal notes"><Textarea rows={3} placeholder="Visible to PPMs and admins only…" /></Field>
        </div>
      </Drawer>
      <Modal open={rejecting} onClose={() => setRejecting(false)} size="sm" title="Reject Claim" footer={<Button variant="danger" onClick={() => { update(claim.id, { status: 'Rejected', note: `Rejected: ${reason}. No fee charged.` }); setRejecting(false); toast(`${claim.id} rejected — no fee charged.`, 'info'); }}>Reject Claim</Button>}>
        <Field label="Reason (shared with club)"><Select value={reason} onChange={(e) => setReason(e.target.value)} options={['Insufficient detail about the opportunity', 'Safeguarding information missing', 'Club verification incomplete', 'Opportunity not suitable for player', 'Duplicate Claim']} /></Field>
        <p className="mt-3 text-xs text-slate-500">The club is not charged for rejected Claims.</p>
      </Modal>
      <Modal open={placing} onClose={() => setPlacing(false)} size="sm" title="Confirm placement" footer={<Button variant="lime" onClick={() => { update(claim.id, { status: 'Placement', contract }); setPlacing(false); toast(`Placement confirmed — fee ${gbp(placementFee(contract))} invoiced to ${claim.club}.`); }}>Confirm placement</Button>}>
        <Field label="First-year contract value (GBP)"><Input type="number" value={contract} onChange={(e) => setContract(+e.target.value)} /></Field>
        <div className="mt-4 rounded-2xl bg-navy p-4 text-white"><div className="text-sm text-white/60">Placement fee (greater of £3,000 or 10%)</div><div className="font-display text-3xl font-extrabold text-lime">{gbp(placementFee(contract))}</div></div>
      </Modal>
    </>
  );
}

function Trials({ st }: { st: ReturnType<typeof useClaims> }) {
  const { toast } = useApp();
  const [outcome, setOutcome] = useState<Claim | null>(null);
  const [o, setO] = useState('Contract offered');
  const [contract, setContract] = useState(26000);
  const trials = st.claims.filter((c) => c.status === 'Trial');
  const placements = st.claims.filter((c) => c.status === 'Placement').map((c) => ({ ...c, fee: c.contract ? placementFee(c.contract) : 3000 }));
  return (
    <div className="space-y-6">
      <PageHeader title="Trials & Placements" desc="Coordinate trials, record outcomes and confirm placements." />
      <DataTable title="Trials" search={false} rows={trials} rowKey={(r) => r.id} columns={[
        { key: 'player', label: 'Player', render: (r) => <b className="text-slate-900">{r.player}</b> }, { key: 'club', label: 'Club' }, { key: 'trialDate', label: 'Date', render: (r) => <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-slate-400" />{r.trialDate}</span> },
        { key: 'ppm', label: 'PPM' }, { key: 'status', label: 'Status', render: () => <Badge>Scheduled</Badge> },
        { key: 'a', label: '', render: (r) => <Button size="xs" variant="navy" onClick={() => setOutcome(r)}>Record outcome</Button> },
      ]} />
      <DataTable title="Placement status" search={false} rows={placements} rowKey={(r) => r.id} columns={[
        { key: 'player', label: 'Player', render: (r) => <b className="text-slate-900">{r.player}</b> }, { key: 'club', label: 'Club' }, { key: 'country', label: 'Country' },
        { key: 'contract', label: 'Contract', align: 'right', render: (r) => (r.contract ? gbp(r.contract) : '—') }, { key: 'fee', label: 'Placement fee', align: 'right', render: (r) => <b>{gbp(r.fee)}</b> },
        { key: 'status', label: 'Status', render: () => <Badge>Placed</Badge> },
      ]} />
      <Modal open={!!outcome} onClose={() => setOutcome(null)} size="sm" title="Record trial outcome" subtitle={outcome ? `${outcome.player} @ ${outcome.club}` : ''}
        footer={<Button variant="navy" onClick={() => {
          if (!outcome) return;
          if (o === 'Contract offered') { st.update(outcome.id, { status: 'Placement', contract }); toast(`Placement confirmed — fee ${gbp(placementFee(contract))}.`); }
          else if (o === 'Not progressed') { st.update(outcome.id, { status: 'Withdrawn', note: 'Trial completed — not progressed.' }); toast('Claim closed after trial.', 'info'); }
          else toast('Trial extension recorded.', 'info');
          setOutcome(null);
        }}>Save outcome</Button>}>
        <div className="space-y-4">
          <Field label="Outcome"><Select value={o} onChange={(e) => setO(e.target.value)} options={['Contract offered', 'Trial extended', 'Not progressed']} /></Field>
          {o === 'Contract offered' && <><Field label="First-year contract value (GBP)"><Input type="number" value={contract} onChange={(e) => setContract(+e.target.value)} /></Field><div className="rounded-xl bg-lime/20 p-3 text-sm text-navy">Placement fee: <b>{gbp(placementFee(contract))}</b></div></>}
        </div>
      </Modal>
    </div>
  );
}

function JobCandidates() {
  const { toast } = useApp();
  const [rows, setRows] = usePersist('ppm-jobcands', [
    { name: 'Marcus Bennett', age: 22, city: 'Manchester', consent: 'n/a', status: 'Approved' },
    { name: 'Luca Romano', age: 21, city: 'London', consent: 'n/a', status: 'Approved' },
    { name: 'Ethan Brooks', age: 17, city: 'Redbank', consent: 'Pending', status: 'Awaiting review' },
    { name: 'Rhys Morgan', age: 19, city: 'Porthaven', consent: 'n/a', status: 'Awaiting review' },
  ]);
  return (
    <div className="space-y-6">
      <PageHeader title="Job+ Candidate Review" desc="Confirm eligibility before players start their Job+ career profile." />
      <DataTable rows={rows} rowKey={(r) => r.name} columns={[
        { key: 'name', label: 'Player', render: (r) => <div className="flex items-center gap-2"><Avatar name={r.name} size={28} /><b className="text-slate-900">{r.name}</b></div> }, { key: 'age', label: 'Age' }, { key: 'city', label: 'Location' },
        { key: 'verified', label: 'Clearing+ verified', render: () => <Badge>Verified</Badge> }, { key: 'consent', label: 'Guardian consent', render: (r) => <Badge dot={false}>{r.consent}</Badge> },
        { key: 'status', label: 'Status', render: (r) => <Badge>{r.status === 'Awaiting review' ? 'Pending' : r.status}</Badge> },
        { key: 'a', label: '', render: (r) => r.status !== 'Approved' ? <Button size="xs" variant="teal" disabled={r.consent === 'Pending'} onClick={() => { setRows((x) => x.map((y) => (y.name === r.name ? { ...y, status: 'Approved' } : y))); toast(`${r.name} approved for Job+.`); }}>{r.consent === 'Pending' ? 'Awaiting consent' : 'Approve'}</Button> : null },
      ]} />
    </div>
  );
}

function CVReview() {
  const { toast } = useApp();
  const [drafts, setDrafts] = usePersist('ppm-cv', CANDIDATES.filter((c) => ['AI Draft', 'PPM Review', 'Candidate Approval'].includes(c.cv)));
  const [id, setId] = useState(drafts[0]?.id);
  const [checks, setChecks] = useState({ facts: true, tone: false, sensitive: false, evidence: false });
  const d = drafts.find((x) => x.id === id) ?? drafts[0];
  const stage = d ? ({ 'AI Draft': 1, 'PPM Review': 2, 'Candidate Approval': 3, Published: 4 } as Record<string, number>)[d.cv] ?? 1 : 1;
  const set = (cv: string) => d && setDrafts((x) => x.map((y) => (y.id === d.id ? { ...y, cv } : y)));
  return (
    <div className="theme-jobplus space-y-6">
      <PageHeader eyebrow="Job+ · Human review" title="AI CV Draft Review" desc="Every AI-assisted draft is checked by a PPM before the candidate approves it. No AI service is called in this prototype." />
      <div className="grid gap-6 xl:grid-cols-[260px_1fr_320px]">
        <Card className="h-fit p-2">
          {drafts.map((x) => (
            <button key={x.id} onClick={() => setId(x.id)} className={cn('flex w-full items-center gap-3 rounded-xl p-3 text-left transition', x.id === d?.id ? 'bg-slate-100' : 'hover:bg-slate-50')}>
              <Avatar name={x.name} src={x.photo} size={36} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-ink">{x.name}</div><div className="truncate text-xs text-slate-500">{x.role}</div></div><Badge dot={false}>{x.cv}</Badge>
            </button>
          ))}
        </Card>
        {d && (
          <div className="space-y-4">
            <Card className="p-4 sm:p-5"><CVWorkflow current={stage} /></Card>
            <CVDocument highlight={stage <= 2} data={{ name: d.name, title: `${d.role} · Former academy footballer`, location: `${d.city}, UK` }} />
          </div>
        )}
        {d && (
          <Card className="h-fit p-5 xl:sticky xl:top-24">
            <div className="font-jakarta font-bold text-ink">Review checklist</div>
            <div className="mt-4 space-y-3">
              <Checkbox checked={checks.facts} onChange={(v) => setChecks({ ...checks, facts: v })} label="Facts match football history" />
              <Checkbox checked={checks.tone} onChange={(v) => setChecks({ ...checks, tone: v })} label="Tone is professional and accurate" />
              <Checkbox checked={checks.sensitive} onChange={(v) => setChecks({ ...checks, sensitive: v })} label="No sensitive personal data" />
              <Checkbox checked={checks.evidence} onChange={(v) => setChecks({ ...checks, evidence: v })} label="Skills supported by evidence" />
            </div>
            <Field label="Comments for candidate" className="mt-5"><Textarea rows={3} defaultValue="Strengthened the captaincy section and removed date of birth." /></Field>
            <div className="mt-4 grid gap-2">
              <Button variant="teal" icon={<Send />} onClick={() => { if (!Object.values(checks).every(Boolean)) return toast('Complete the review checklist first.', 'error'); set('Candidate Approval'); toast(`Reviewed CV sent to ${d.name} for approval.`); }}>Approve & send to candidate</Button>
              <Button variant="outline" icon={<MessageSquare />} onClick={() => { set('AI Draft'); toast('Draft returned for regeneration (simulated).', 'info'); }}>Return for edits</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Intros() {
  const { toast } = useApp();
  const [reqs, setReqs] = usePersist('ppm-intros', [
    { id: 'INT-116', employer: 'Meridian Logistics Ltd', candidate: 'Aaron Clarke-Wright', job: 'Graduate Sales Executive', status: 'Pending PPM review' },
    { id: 'INT-121', employer: 'Halden Facilities Group', candidate: 'Josh Whitaker', job: 'Facilities Apprentice', status: 'Pending PPM review' },
    { id: 'INT-119', employer: 'Ashgrove Hospitality', candidate: 'Kieran Doyle', job: 'Assistant Venue Manager', status: 'Introduced' },
    { id: 'INT-114', employer: 'Meridian Logistics Ltd', candidate: 'Daniel Hughes', job: 'Graduate Sales Executive', status: 'Offer' },
  ]);
  const [hire, setHire] = useState<string | null>(null);
  const [salary, setSalary] = useState(26000);
  const set = (id: string, status: string) => setReqs((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  return (
    <div className="theme-jobplus space-y-6">
      <PageHeader title="Employer Introductions & Hire Confirmation" desc="Review employer requests before sharing with candidates, then confirm hires (15% of first-year base salary)." />
      <DataTable rows={reqs} rowKey={(r) => r.id} columns={[
        { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-xs font-bold">{r.id}</span> }, { key: 'employer', label: 'Employer', render: (r) => <b className="text-ink">{r.employer}</b> },
        { key: 'candidate', label: 'Candidate' }, { key: 'job', label: 'Role' }, { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
        { key: 'a', label: '', render: (r) => r.status === 'Pending PPM review' ? <div className="flex gap-1.5"><Button size="xs" variant="outline" onClick={() => { set(r.id, 'Declined'); toast('Request declined.', 'info'); }}>Decline</Button><Button size="xs" variant="teal" onClick={() => { set(r.id, 'Introduced'); toast(`Introduction shared with ${r.candidate}.`); }}>Approve & share</Button></div> : r.status === 'Offer' ? <Button size="xs" variant="teal" icon={<BadgeCheck />} onClick={() => setHire(r.id)}>Confirm hire</Button> : null },
      ]} />
      <Modal open={!!hire} onClose={() => setHire(null)} size="sm" title="Confirm hire" footer={<Button variant="teal" onClick={() => { if (hire) set(hire, 'Hired'); setHire(null); toast(`Hire confirmed — employer invoiced ${gbp(hiringFee(salary))} (15%).`); }}>Confirm hire</Button>}>
        <Field label="First-year base salary (GBP)"><Input type="number" value={salary} onChange={(e) => setSalary(+e.target.value)} /></Field>
        <div className="mt-4 rounded-2xl bg-ink p-4 text-white"><div className="text-sm text-white/60">Hiring success fee (15%)</div><div className="font-jakarta text-3xl font-extrabold text-aqua">{gbp(hiringFee(salary))}</div></div>
      </Modal>
    </div>
  );
}

function Notifications() {
  const [tab, setTab] = useState('all');
  const [items, setItems] = useState([...NOTIFS.ppm, { title: 'Monitored channel CLM-2050: new message from Kai Mensah', time: 'Yesterday', unread: false }, { title: 'Guardian Michelle Brooks replied', time: 'Yesterday', unread: false }, { title: 'Placement fee invoice paid: CLM-2044', time: '2 days ago', unread: false }]);
  const list = tab === 'unread' ? items.filter((i) => i.unread) : items;
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" desc="Claims, messages, trials and Job+ activity." actions={<Button variant="outline" onClick={() => setItems((i) => i.map((x) => ({ ...x, unread: false })))}>Mark all read</Button>} />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'all', label: 'All', count: items.length }, { key: 'unread', label: 'Unread', count: items.filter((i) => i.unread).length }]} />
      <Card className="divide-y divide-slate-100">
        {list.map((n, i) => (
          <button key={i} onClick={() => setItems((x) => x.map((y) => (y.title === n.title ? { ...y, unread: false } : y)))} className="flex w-full items-start gap-4 p-4 text-left hover:bg-slate-50 sm:p-5">
            <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', n.unread ? 'bg-navy text-lime' : 'bg-slate-100 text-slate-400')}><Bell className="h-4 w-4" /></span>
            <span className="flex-1"><span className={cn('block text-sm', n.unread ? 'font-semibold text-slate-900' : 'text-slate-600')}>{n.title}</span><span className="text-xs text-slate-400">{n.time}</span></span>
            {n.unread && <span className="mt-2 h-2 w-2 rounded-full bg-lime-dark" />}
          </button>
        ))}
        {!list.length && <div className="p-10 text-center text-sm text-slate-500">You're all caught up. <Trophy className="inline h-4 w-4" /></div>}
      </Card>
      <p className="text-xs text-slate-400">Stages tracked: {CLAIM_STAGES.join(' → ')}</p>
    </div>
  );
}
