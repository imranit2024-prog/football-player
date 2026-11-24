// ---------------------------------------------------------------------------
// Static mock data for the Clearing+ / Job+ UI prototype.
// All people, clubs, employers and figures are fictional sample content.
// ---------------------------------------------------------------------------

export const px = (id: number, w = 1200, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${h ? `&h=${h}&fit=crop` : ''}`;

export const IMG = {
  stadium: px(28827841, 2200),
  stadiumAerial: px(35898730, 1600),
  stadiumMatch: px(36862525, 1800),
  stadiumTop: px(38443770, 1600),
  training: px(38616172, 1400),
  youthMatch: px(36702030, 1400),
  huddle: px(40508480, 1400),
  drills: px(29783082, 1400),
  coaches: px(40508481, 1400),
  ball: px(19932627, 1400),
  office1: px(5257756, 1400),
  office2: px(7682459, 1400),
  office3: px(7792859, 1400),
  office4: px(8297445, 1400),
  office5: px(5257763, 1400),
  office6: px(7651923, 1400),
  pro: px(5308640, 900),
};
export const THUMBS = [38616172, 36702030, 29783082, 40508480, 36862525, 19932627].map((id) => px(id, 640, 400));
export const PLAYER_PHOTOS = [38849260, 14741748, 29046507, 6078304, 31606001, 38895730, 27684724, 39356366].map((id) => px(id, 500, 640));
export const HEADSHOTS = [5308640, 26150470, 6942776, 5197205, 38740728, 26150471, 33680700, 7717254].map((id) => px(id, 240, 240));

export const gbp = (n: number, dp = 0) =>
  '£' + n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp });
export const placementFee = (contract: number) => Math.max(3000, Math.round(contract * 0.1));
export const hiringFee = (salary: number) => Math.round(salary * 0.15);
export const CLAIM_FEE = 100;

export const PLAYER_FEES = [
  { key: 'founding', label: 'Founding / member academy', price: 24.99, desc: 'Players released from a Founding Club or member academy.' },
  { key: 'uk', label: 'Other UK players', price: 49.99, desc: 'Players based in England, Scotland, Wales or Northern Ireland.' },
  { key: 'intl', label: 'International players', price: 29.99, desc: 'Players based outside the United Kingdom.' },
];

export const COUNTRIES = ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Ireland', 'Portugal', 'Spain', 'Germany', 'Norway', 'Sweden', 'Netherlands'];
export const UK = ['England', 'Scotland', 'Wales', 'Northern Ireland'];
export const POSITIONS = ['Goalkeeper', 'Centre-Back', 'Right-Back', 'Left-Back', 'Defensive Midfielder', 'Central Midfielder', 'Attacking Midfielder', 'Right Winger', 'Left Winger', 'Striker', 'Centre-Forward'];
export const TIERS = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6', 'Tier 7'];

// ---------------------------------------------------------------- Players
export type Player = {
  id: string; name: string; age: number; country: string; position: string; pos: string; secondary: string;
  foot: 'Right' | 'Left' | 'Both'; height: number; academy: string; category: string; released: string;
  availability: string; verified: boolean; photo: string; thumb: string; videoLen: string;
  apps: number; goals: number; assists: number; plan: string; guardian?: string; bio: string;
};

const P = (o: Omit<Player, 'photo' | 'thumb'>, i: number): Player => ({ ...o, photo: PLAYER_PHOTOS[i % 8], thumb: THUMBS[i % 6] });

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Jordan Ellis', age: 19, country: 'England', position: 'Central Midfielder', pos: 'CM', secondary: 'CDM', foot: 'Right', height: 181, academy: 'Kingsmere United Academy', category: 'Category 2', released: 'May 2025', availability: 'Available now', verified: true, videoLen: '3:12', apps: 46, goals: 7, assists: 12, plan: 'Founding/member academy', bio: 'Composed deep-lying playmaker with a wide passing range and strong press resistance. U18 captain in 2024/25.' },
  { id: 'p2', name: 'Kai Mensah', age: 18, country: 'England', position: 'Right Winger', pos: 'RW', secondary: 'LW', foot: 'Left', height: 175, academy: 'Castleton Athletic Academy', category: 'Category 3', released: 'June 2025', availability: 'Available now', verified: true, videoLen: '2:48', apps: 38, goals: 14, assists: 9, plan: 'Founding/member academy', bio: 'Direct, inverted winger who loves to carry the ball. Excellent 1v1 output and recovery pace.' },
  { id: 'p3', name: "Liam O'Connor", age: 20, country: 'Ireland', position: 'Centre-Back', pos: 'CB', secondary: 'RB', foot: 'Right', height: 189, academy: 'Dunmore Celtic Academy', category: 'Elite Academy', released: 'May 2025', availability: 'Available from July', verified: true, videoLen: '4:05', apps: 51, goals: 4, assists: 2, plan: 'International', bio: 'Aerially dominant centre-back, comfortable stepping into midfield. Strong organiser of a back line.' },
  { id: 'p4', name: 'Ethan Brooks', age: 17, country: 'England', position: 'Striker', pos: 'ST', secondary: 'CF', foot: 'Right', height: 183, academy: 'Redbank Town Academy', category: 'Category 2', released: 'April 2025', availability: 'In discussions', verified: true, videoLen: '2:31', apps: 29, goals: 18, assists: 5, plan: 'Other UK', guardian: 'Michelle Brooks', bio: 'Penalty-box striker with clever movement and a quick release. Guardian consent approved.' },
  { id: 'p5', name: 'Mateus Silva', age: 19, country: 'Portugal', position: 'Left-Back', pos: 'LB', secondary: 'LWB', foot: 'Left', height: 178, academy: 'Sporting Alvor Academy', category: 'Formação', released: 'June 2025', availability: 'Available now', verified: true, videoLen: '3:40', apps: 44, goals: 3, assists: 10, plan: 'International', bio: 'Overlapping full-back with high work rate and a dangerous left-footed delivery.' },
  { id: 'p6', name: 'Callum Baird', age: 21, country: 'Scotland', position: 'Goalkeeper', pos: 'GK', secondary: '—', foot: 'Right', height: 192, academy: 'Glenmore FC Academy', category: 'Club Academy Scotland', released: 'May 2024', availability: 'Available now', verified: true, videoLen: '3:05', apps: 40, goals: 0, assists: 1, plan: 'Other UK', bio: 'Commanding shot-stopper, excellent distribution with both feet. 14 clean sheets last season.' },
  { id: 'p7', name: 'Theo Asante', age: 18, country: 'England', position: 'Attacking Midfielder', pos: 'CAM', secondary: 'CM', foot: 'Both', height: 176, academy: 'Bramley City Academy', category: 'Category 3', released: 'May 2025', availability: 'Available now', verified: true, videoLen: '2:56', apps: 35, goals: 9, assists: 13, plan: 'Founding/member academy', bio: 'Two-footed creator who finds pockets between the lines. High chance-creation numbers.' },
  { id: 'p8', name: 'Noah Fischer', age: 20, country: 'Germany', position: 'Defensive Midfielder', pos: 'CDM', secondary: 'CB', foot: 'Right', height: 185, academy: 'SV Rheinau Academy', category: 'NLZ', released: 'June 2025', availability: 'Available from July', verified: true, videoLen: '3:22', apps: 48, goals: 2, assists: 6, plan: 'International', bio: 'Disciplined screening midfielder, reads the game early. Strong in duels and transitions.' },
  { id: 'p9', name: 'Rhys Morgan', age: 19, country: 'Wales', position: 'Right-Back', pos: 'RB', secondary: 'RWB', foot: 'Right', height: 179, academy: 'Porthaven AFC Academy', category: 'Category 3', released: 'May 2025', availability: 'Available now', verified: true, videoLen: '2:44', apps: 41, goals: 1, assists: 8, plan: 'Other UK', bio: 'Energetic right-back who defends front-foot and supports attacks relentlessly.' },
  { id: 'p10', name: 'Samuel Okoro', age: 18, country: 'England', position: 'Centre-Forward', pos: 'CF', secondary: 'ST', foot: 'Left', height: 186, academy: 'Holloway Wanderers Academy', category: 'Category 2', released: 'May 2025', availability: 'Available now', verified: true, videoLen: '3:18', apps: 33, goals: 16, assists: 7, plan: 'Other UK', bio: 'Physical target forward with good link-up play and a strong left foot.' },
  { id: 'p11', name: 'Oskar Lindqvist', age: 20, country: 'Sweden', position: 'Central Midfielder', pos: 'CM', secondary: 'CAM', foot: 'Left', height: 182, academy: 'Vallby IK Academy', category: 'Elite', released: 'Nov 2024', availability: 'Available now', verified: true, videoLen: '3:01', apps: 52, goals: 8, assists: 11, plan: 'International', bio: 'Box-to-box midfielder with excellent engine and late runs into the area.' },
  { id: 'p12', name: 'Harvey Collins', age: 17, country: 'England', position: 'Left Winger', pos: 'LW', secondary: 'RW', foot: 'Right', height: 172, academy: 'Thornbury FC Academy', category: 'Category 3', released: 'May 2025', availability: 'Available now', verified: false, videoLen: '2:12', apps: 27, goals: 8, assists: 6, plan: 'Other UK', guardian: 'Karen Collins', bio: 'Tricky, quick winger. Profile pending guardian consent before going live.' },
].map((p, i) => P(p as Omit<Player, 'photo' | 'thumb'>, i));

// ---------------------------------------------------------------- Clubs
export type Club = {
  id: string; name: string; country: string; tier: string; city: string; founding: boolean; freeUntil: string;
  status: string; verified: string; fee: number; staff: number; claims: number; joined: string;
};
export const CLUBS: Club[] = [
  { id: 'c1', name: 'Ashford Rovers FC', country: 'England', tier: 'Tier 5', city: 'Ashford', founding: true, freeUntil: '2026-08-31', status: 'Active', verified: 'Verified', fee: 1800, staff: 4, claims: 5, joined: 'Sep 2025' },
  { id: 'c2', name: 'Kingsmere United', country: 'England', tier: 'Tier 4', city: 'Kingsmere', founding: false, freeUntil: '', status: 'Active', verified: 'Verified', fee: 3600, staff: 7, claims: 9, joined: 'Aug 2025' },
  { id: 'c3', name: 'Castleton Athletic', country: 'England', tier: 'Tier 6', city: 'Castleton', founding: true, freeUntil: '2026-06-30', status: 'Active', verified: 'Verified', fee: 1200, staff: 3, claims: 4, joined: 'Oct 2025' },
  { id: 'c4', name: 'Harbour Town FC', country: 'Wales', tier: 'Tier 2', city: 'Harbour Town', founding: false, freeUntil: '', status: 'Pending', verified: 'In review', fee: 1800, staff: 2, claims: 1, joined: 'Feb 2026' },
  { id: 'c5', name: 'Glenmore FC', country: 'Scotland', tier: 'Tier 3', city: 'Stirling', founding: false, freeUntil: '', status: 'Active', verified: 'Verified', fee: 2400, staff: 5, claims: 5, joined: 'Sep 2025' },
  { id: 'c6', name: 'Dunmore Celtic', country: 'Ireland', tier: 'Tier 2', city: 'Galway', founding: false, freeUntil: '', status: 'Active', verified: 'Verified', fee: 2400, staff: 4, claims: 3, joined: 'Nov 2025' },
  { id: 'c7', name: 'FC Nordvik', country: 'Norway', tier: 'Tier 2', city: 'Narvik', founding: false, freeUntil: '', status: 'Active', verified: 'Verified', fee: 3000, staff: 3, claims: 4, joined: 'Oct 2025' },
  { id: 'c8', name: 'CD Montserra', country: 'Spain', tier: 'Tier 4', city: 'Girona', founding: false, freeUntil: '', status: 'Trial', verified: 'Verified', fee: 2400, staff: 2, claims: 1, joined: 'Jan 2026' },
  { id: 'c9', name: 'SV Rheinau', country: 'Germany', tier: 'Tier 4', city: 'Mannheim', founding: false, freeUntil: '', status: 'Pending', verified: 'Pending', fee: 2400, staff: 2, claims: 1, joined: 'Mar 2026' },
  { id: 'c10', name: 'Sporting Alvor', country: 'Portugal', tier: 'Tier 3', city: 'Portimão', founding: false, freeUntil: '', status: 'Active', verified: 'Verified', fee: 2400, staff: 3, claims: 3, joined: 'Dec 2025' },
  { id: 'c11', name: 'Elmstead United', country: 'England', tier: 'Tier 5', city: 'Colchester', founding: true, freeUntil: '2026-09-30', status: 'Active', verified: 'Verified', fee: 1800, staff: 3, claims: 3, joined: 'Sep 2025' },
  { id: 'c12', name: 'Lindley Park Rangers', country: 'Northern Ireland', tier: 'Tier 3', city: 'Lisburn', founding: false, freeUntil: '', status: 'Expired', verified: 'Verified', fee: 1200, staff: 1, claims: 0, joined: 'Jul 2025' },
  { id: 'c13', name: 'Bramley City', country: 'England', tier: 'Tier 3', city: 'Leeds', founding: true, freeUntil: '2026-12-31', status: 'Active', verified: 'Verified', fee: 4800, staff: 6, claims: 6, joined: 'Aug 2025' },
  { id: 'c14', name: 'Porthaven AFC', country: 'Wales', tier: 'Tier 3', city: 'Porthaven', founding: false, freeUntil: '', status: 'Suspended', verified: 'Rejected', fee: 1200, staff: 1, claims: 0, joined: 'Jan 2026' },
];
export const MY_CLUB = CLUBS[0];

// ---------------------------------------------------------------- Claims
export const CLAIM_STAGES = ['Submitted', 'PPM Review', 'Approved', 'Player Discussion', 'Trial', 'Placement'];
export type Claim = {
  id: string; player: string; playerId: string; club: string; country: string; status: string; submitted: string;
  ppm: string; type: string; contract?: number; trialDate?: string; note: string;
};
export const CLAIMS: Claim[] = [
  { id: 'CLM-2051', player: 'Jordan Ellis', playerId: 'p1', club: 'Ashford Rovers FC', country: 'England', status: 'PPM Review', submitted: '10 Mar 2026', ppm: 'Sarah Okafor', type: 'Trial invitation', note: 'Two-day trial with the first-team squad ahead of pre-season.' },
  { id: 'CLM-2050', player: 'Kai Mensah', playerId: 'p2', club: 'Ashford Rovers FC', country: 'England', status: 'Player Discussion', submitted: '04 Mar 2026', ppm: 'Sarah Okafor', type: 'Contract offer', contract: 22000, note: 'One-year professional contract with option.' },
  { id: 'CLM-2049', player: "Liam O'Connor", playerId: 'p3', club: 'FC Nordvik', country: 'Norway', status: 'Trial', submitted: '01 Mar 2026', ppm: 'Daniel Reyes', type: 'Trial invitation', trialDate: '24 Mar 2026', note: 'One-week trial including a reserve fixture.' },
  { id: 'CLM-2048', player: 'Callum Baird', playerId: 'p6', club: 'Glenmore FC', country: 'Scotland', status: 'Placement', submitted: '12 Feb 2026', ppm: 'Priya Nair', type: 'Contract offer', contract: 28000, note: 'Two-year contract signed 10 Mar 2026.' },
  { id: 'CLM-2047', player: 'Mateus Silva', playerId: 'p5', club: 'Kingsmere United', country: 'England', status: 'Rejected', submitted: '08 Feb 2026', ppm: 'Daniel Reyes', type: 'Trial invitation', note: 'Insufficient trial detail provided. No fee charged.' },
  { id: 'CLM-2046', player: 'Theo Asante', playerId: 'p7', club: 'Ashford Rovers FC', country: 'England', status: 'Withdrawn', submitted: '05 Feb 2026', ppm: 'Sarah Okafor', type: 'Trial invitation', note: 'Withdrawn by club. No fee charged.' },
  { id: 'CLM-2045', player: 'Noah Fischer', playerId: 'p8', club: 'SV Rheinau', country: 'Germany', status: 'Submitted', submitted: '11 Mar 2026', ppm: 'Unassigned', type: 'Contract offer', contract: 34000, note: 'Awaiting PPM assignment.' },
  { id: 'CLM-2044', player: 'Samuel Okoro', playerId: 'p10', club: 'Kingsmere United', country: 'England', status: 'Placement', submitted: '20 Jan 2026', ppm: 'Tom Whitfield', type: 'Contract offer', contract: 46000, note: 'Professional contract signed 05 Mar 2026.' },
  { id: 'CLM-2043', player: 'Ethan Brooks', playerId: 'p4', club: 'Castleton Athletic', country: 'England', status: 'Player Discussion', submitted: '02 Mar 2026', ppm: 'Priya Nair', type: 'Scholarship', note: 'Scholarship discussion with player and guardian.' },
  { id: 'CLM-2042', player: 'Rhys Morgan', playerId: 'p9', club: 'Harbour Town FC', country: 'Wales', status: 'Submitted', submitted: '12 Mar 2026', ppm: 'Unassigned', type: 'Trial invitation', note: 'Club verification still in review.' },
  { id: 'CLM-2041', player: 'Oskar Lindqvist', playerId: 'p11', club: 'Sporting Alvor', country: 'Portugal', status: 'Approved', submitted: '27 Feb 2026', ppm: 'Daniel Reyes', type: 'Trial invitation', note: 'Approved — awaiting player discussion.' },
  { id: 'CLM-2040', player: 'Jordan Ellis', playerId: 'p1', club: 'Kingsmere United', country: 'England', status: 'Approved', submitted: '18 Feb 2026', ppm: 'Sarah Okafor', type: 'Trial invitation', note: 'Approved by PPM. Discussion booked.' },
  { id: 'CLM-2039', player: 'Jordan Ellis', playerId: 'p1', club: 'Elmstead United', country: 'England', status: 'Rejected', submitted: '22 Jan 2026', ppm: 'Sarah Okafor', type: 'Trial invitation', note: 'Did not meet credibility criteria. No fee charged.' },
  { id: 'CLM-2038', player: 'Kai Mensah', playerId: 'p2', club: 'Bramley City', country: 'England', status: 'Trial', submitted: '15 Feb 2026', ppm: 'Sarah Okafor', type: 'Trial invitation', trialDate: '18 Mar 2026', note: 'Three-day trial at the training ground.' },
  { id: 'CLM-2037', player: 'Theo Asante', playerId: 'p7', club: 'Elmstead United', country: 'England', status: 'PPM Review', submitted: '09 Mar 2026', ppm: 'Tom Whitfield', type: 'Trial invitation', note: 'Credibility checks in progress.' },
  { id: 'CLM-2034', player: 'Oskar Lindqvist', playerId: 'p11', club: 'Ashford Rovers FC', country: 'England', status: 'Trial', submitted: '19 Feb 2026', ppm: 'Daniel Reyes', type: 'Trial invitation', trialDate: '19 Mar 2026', note: 'Trial confirmed — travel guidance shared.' },
  { id: 'CLM-2031', player: 'Ben Hartley', playerId: 'p0', club: 'Ashford Rovers FC', country: 'England', status: 'Placement', submitted: '12 Jan 2026', ppm: 'Sarah Okafor', type: 'Contract offer', contract: 24000, note: 'One-year contract signed 14 Feb 2026.' },
];

export const PPMS = [
  { name: 'Sarah Okafor', region: 'North & Midlands', active: 14, capacity: 20, avgDays: 1.4, photo: HEADSHOTS[7] },
  { name: 'Daniel Reyes', region: 'International', active: 11, capacity: 18, avgDays: 1.9, photo: HEADSHOTS[2] },
  { name: 'Priya Nair', region: 'South · Safeguarding lead', active: 9, capacity: 15, avgDays: 1.2, photo: HEADSHOTS[6] },
  { name: 'Tom Whitfield', region: 'Scotland, Wales & NI', active: 16, capacity: 18, avgDays: 2.1, photo: HEADSHOTS[0] },
];

// ---------------------------------------------------------------- Job+
export const EMPLOYERS = [
  { id: 'e1', name: 'Meridian Logistics Ltd', city: 'Manchester', sector: 'Logistics & Supply Chain', size: '250–500', status: 'Verified', vacancies: 4, hires: 2, joined: 'Nov 2025' },
  { id: 'e2', name: 'Halden Facilities Group', city: 'Birmingham', sector: 'Facilities Management', size: '500+', status: 'Verified', vacancies: 6, hires: 3, joined: 'Oct 2025' },
  { id: 'e3', name: 'Northlight Fitness', city: 'Leeds', sector: 'Health & Fitness', size: '50–250', status: 'Pending', vacancies: 0, hires: 0, joined: 'Mar 2026' },
  { id: 'e4', name: 'Carrow Build Partners', city: 'Bristol', sector: 'Construction', size: '250–500', status: 'Verified', vacancies: 3, hires: 2, joined: 'Dec 2025' },
  { id: 'e5', name: 'Brightwell Retail Group', city: 'London', sector: 'Retail', size: '500+', status: 'In review', vacancies: 0, hires: 0, joined: 'Mar 2026' },
  { id: 'e6', name: 'Ashgrove Hospitality', city: 'Liverpool', sector: 'Hospitality', size: '50–250', status: 'Verified', vacancies: 2, hires: 1, joined: 'Jan 2026' },
  { id: 'e7', name: 'Pennine Energy Services', city: 'Sheffield', sector: 'Energy & Utilities', size: '250–500', status: 'Rejected', vacancies: 0, hires: 0, joined: 'Feb 2026' },
];

export type Job = { id: string; title: string; location: string; type: string; min: number; max: number; status: string; matches: number; intros: number; posted: string; industry: string };
export const JOBS: Job[] = [
  { id: 'J-301', title: 'Operations Coordinator', location: 'Manchester', type: 'Full-time', min: 27000, max: 30000, status: 'Live', matches: 14, intros: 3, posted: '02 Mar 2026', industry: 'Logistics & Operations' },
  { id: 'J-302', title: 'Graduate Sales Executive', location: 'Manchester (Hybrid)', type: 'Full-time', min: 26000, max: 28000, status: 'Live', matches: 22, intros: 2, posted: '24 Feb 2026', industry: 'Sales' },
  { id: 'J-303', title: 'Warehouse Team Leader', location: 'Trafford Park', type: 'Full-time', min: 29500, max: 31000, status: 'Live', matches: 9, intros: 1, posted: '18 Feb 2026', industry: 'Logistics & Operations' },
  { id: 'J-304', title: 'Fleet Planning Apprentice', location: 'Salford', type: 'Apprenticeship', min: 21000, max: 21000, status: 'Draft', matches: 0, intros: 0, posted: '—', industry: 'Logistics & Operations' },
  { id: 'J-305', title: 'Customer Success Associate', location: 'Remote (UK)', type: 'Full-time', min: 25000, max: 26500, status: 'Closed', matches: 31, intros: 4, posted: '12 Jan 2026', industry: 'Customer Success' },
];

export type Candidate = {
  id: string; name: string; age: number; city: string; football: string; industry: string; role: string; salary: number;
  availability: string; licence: string; rtw: string; skills: string[]; cv: string; match: number; photo?: string;
};
export const CANDIDATES: Candidate[] = [
  { id: 'k1', name: 'Marcus Bennett', age: 22, city: 'Manchester', football: 'Former Category 2 academy midfielder · U18 captain', industry: 'Logistics & Operations', role: 'Operations Coordinator', salary: 27000, availability: 'Immediately', licence: 'Full UK licence', rtw: 'UK citizen', skills: ['Leadership', 'Communication', 'Resilience', 'Planning'], cv: 'Published', match: 94, photo: HEADSHOTS[0] },
  { id: 'k2', name: 'Femi Adebayo', age: 22, city: 'Manchester', football: 'Former academy defensive midfielder', industry: 'Logistics & Operations', role: 'Warehouse Team Leader', salary: 28000, availability: '1 month', licence: 'Full UK licence', rtw: 'UK citizen', skills: ['Leadership', 'Organisation', 'Composure'], cv: 'Published', match: 91 },
  { id: 'k3', name: 'Daniel Hughes', age: 21, city: 'Leeds', football: 'Former academy goalkeeper', industry: 'Health & Fitness', role: 'Personal Trainer', salary: 24000, availability: '2 weeks', licence: 'Full UK licence', rtw: 'UK citizen', skills: ['Coaching', 'Discipline', 'Motivation'], cv: 'Published', match: 88, photo: HEADSHOTS[2] },
  { id: 'k4', name: 'Aaron Clarke-Wright', age: 23, city: 'Birmingham', football: 'Former academy winger', industry: 'Sales', role: 'Business Development Executive', salary: 26000, availability: '1 month', licence: 'Provisional', rtw: 'UK citizen', skills: ['Competitive drive', 'Resilience', 'Communication'], cv: 'Published', match: 86, photo: HEADSHOTS[1] },
  { id: 'k5', name: 'Josh Whitaker', age: 20, city: 'Bristol', football: 'Former academy centre-back', industry: 'Construction & Trades', role: 'Site Operations Apprentice', salary: 21000, availability: 'Immediately', licence: 'Full UK licence', rtw: 'UK citizen', skills: ['Teamwork', 'Reliability', 'Safety awareness'], cv: 'PPM Review', match: 81, photo: HEADSHOTS[3] },
  { id: 'k6', name: 'Kieran Doyle', age: 22, city: 'Liverpool', football: 'Former academy full-back', industry: 'Hospitality', role: 'Assistant Venue Manager', salary: 25000, availability: '2 weeks', licence: 'Full UK licence', rtw: 'Irish citizen', skills: ['Customer focus', 'Composure', 'Teamwork'], cv: 'Published', match: 79, photo: HEADSHOTS[4] },
  { id: 'k7', name: 'Luca Romano', age: 21, city: 'London', football: 'Former academy forward', industry: 'Customer Success', role: 'Customer Success Associate', salary: 26000, availability: 'Immediately', licence: 'None', rtw: 'Settled status', skills: ['Communication', 'Problem solving', 'Adaptability'], cv: 'AI Draft', match: 77, photo: HEADSHOTS[5] },
  { id: 'k8', name: 'Ryan Patel', age: 20, city: 'Leicester', football: 'Former academy striker', industry: 'Recruitment', role: 'Trainee Recruitment Consultant', salary: 24000, availability: 'Immediately', licence: 'Full UK licence', rtw: 'UK citizen', skills: ['Target-driven', 'Resilience', 'Relationships'], cv: 'Candidate Approval', match: 74 },
];

export const INDUSTRIES = [
  { name: 'Logistics & Operations', range: '£24k – £32k', roles: 'Operations coordinator, team leader, planner' },
  { name: 'Sales & Business Development', range: '£24k – £30k + bonus', roles: 'Sales executive, account manager' },
  { name: 'Health, Fitness & Coaching', range: '£21k – £28k', roles: 'Personal trainer, community coach' },
  { name: 'Construction & Trades', range: '£20k – £30k', roles: 'Apprenticeships, site operations' },
  { name: 'Hospitality & Events', range: '£22k – £28k', roles: 'Venue supervisor, matchday operations' },
  { name: 'Customer Success', range: '£23k – £28k', roles: 'Customer success, account support' },
  { name: 'Recruitment', range: '£22k – £27k + commission', roles: 'Trainee recruitment consultant' },
  { name: 'Facilities & Public Services', range: '£22k – £29k', roles: 'Facilities supervisor, leisure management' },
];

export const CV_SAMPLE = {
  name: 'Marcus Bennett',
  title: 'Operations & Logistics Professional',
  location: 'Manchester, UK',
  email: 'marcus.b@example.com',
  phone: '07700 900123',
  summary:
    'Disciplined, team-first professional with eight years in a Category 2 football academy environment, including a season as U18 captain. Brings proven leadership, structured planning and composure under pressure to an operations role. Comfortable with performance data, early starts and high-standards environments.',
  experience: [
    { role: 'Academy Scholar & U18 Captain', org: 'Kingsmere United Academy', period: '2017 – 2025', points: ['Led a squad of 24 players and acted as the link between players, coaching and welfare staff', 'Followed demanding weekly schedules balancing training, education and recovery', 'Reviewed match video and performance data to set and track individual targets'] },
    { role: 'Weekend Stock Assistant (part-time)', org: 'Independent retailer, Stockport', period: '2023 – 2025', points: ['Supported deliveries, stock rotation and replenishment in a busy store', 'Trusted with opening and closing procedures and cash handling'] },
  ],
  education: [
    { q: 'BTEC Level 3 Extended Diploma in Sport — D*D*D', org: 'Academy education programme', year: '2023' },
    { q: 'GCSEs — 8 including Maths (6) and English Language (6)', org: 'Secondary school, Stockport', year: '2021' },
  ],
  skills: ['Leadership', 'Team coordination', 'Planning & scheduling', 'Performance data', 'Communication', 'Resilience'],
  certs: ['FA Introduction to Coaching Football', 'Emergency First Aid at Work', 'Full UK driving licence'],
};
export const SKILL_MAP = [
  { football: 'Captaincy of the U18 squad', work: 'Leadership & people management', score: 92 },
  { football: 'Match preparation & game plans', work: 'Planning & organisation', score: 88 },
  { football: 'Video and performance analysis', work: 'Data-informed decision making', score: 81 },
  { football: 'High-pressure competitive matches', work: 'Composure & resilience', score: 94 },
  { football: 'Daily training discipline', work: 'Reliability & time management', score: 96 },
  { football: 'Dressing-room communication', work: 'Communication & teamwork', score: 90 },
];

// ---------------------------------------------------------------- Finance
export const PAYMENTS = [
  { id: 'PAY-90412', date: '12 Mar 2026', payer: 'Jordan Ellis', type: 'Player membership', country: 'England', amount: 24.99, status: 'Paid', method: 'Visa •• 4242' },
  { id: 'PAY-90411', date: '12 Mar 2026', payer: "Liam O'Connor", type: 'Player membership', country: 'Ireland', amount: 29.99, status: 'Paid', method: 'Mastercard •• 1881' },
  { id: 'PAY-90410', date: '11 Mar 2026', payer: 'Ashford Rovers FC', type: 'Claim fee', country: 'England', amount: 100, status: 'Paid', method: 'Invoice' },
  { id: 'PAY-90409', date: '10 Mar 2026', payer: 'Glenmore FC', type: 'Placement fee', country: 'Scotland', amount: 3000, status: 'Pending', method: 'Invoice' },
  { id: 'PAY-90408', date: '09 Mar 2026', payer: 'Meridian Logistics Ltd', type: 'Job+ hiring fee', country: 'England', amount: 4200, status: 'Paid', method: 'BACS' },
  { id: 'PAY-90407', date: '08 Mar 2026', payer: 'Kingsmere United', type: 'Club licence', country: 'England', amount: 3600, status: 'Paid', method: 'BACS' },
  { id: 'PAY-90406', date: '07 Mar 2026', payer: 'Callum Baird', type: 'Player membership', country: 'Scotland', amount: 49.99, status: 'Paid', method: 'Visa •• 0937' },
  { id: 'PAY-90405', date: '06 Mar 2026', payer: 'Mateus Silva', type: 'Player membership', country: 'Portugal', amount: 29.99, status: 'Refunded', method: 'Visa •• 5120' },
  { id: 'PAY-90404', date: '05 Mar 2026', payer: 'Kingsmere United', type: 'Placement fee', country: 'England', amount: 4600, status: 'Paid', method: 'BACS' },
  { id: 'PAY-90403', date: '04 Mar 2026', payer: 'FC Nordvik', type: 'Claim fee', country: 'Norway', amount: 100, status: 'Paid', method: 'Card' },
  { id: 'PAY-90402', date: '03 Mar 2026', payer: 'Theo Asante', type: 'Player membership', country: 'England', amount: 24.99, status: 'Paid', method: 'Apple Pay' },
  { id: 'PAY-90401', date: '02 Mar 2026', payer: 'Halden Facilities Group', type: 'Job+ hiring fee', country: 'England', amount: 3900, status: 'Pending', method: 'Invoice' },
  { id: 'PAY-90400', date: '01 Mar 2026', payer: 'Sporting Alvor', type: 'Club licence', country: 'Portugal', amount: 2400, status: 'Paid', method: 'BACS' },
  { id: 'PAY-90399', date: '28 Feb 2026', payer: 'Noah Fischer', type: 'Player membership', country: 'Germany', amount: 29.99, status: 'Failed', method: 'Visa •• 7702' },
  { id: 'PAY-90398', date: '27 Feb 2026', payer: 'Sporting Alvor', type: 'Claim fee', country: 'Portugal', amount: 100, status: 'Paid', method: 'Card' },
  { id: 'PAY-90397', date: '26 Feb 2026', payer: 'Rhys Morgan', type: 'Player membership', country: 'Wales', amount: 49.99, status: 'Paid', method: 'Visa •• 3310' },
  { id: 'PAY-90396', date: '24 Feb 2026', payer: 'FC Nordvik', type: 'Club licence', country: 'Norway', amount: 3000, status: 'Paid', method: 'BACS' },
  { id: 'PAY-90395', date: '21 Feb 2026', payer: 'Dunmore Celtic', type: 'Placement fee', country: 'Ireland', amount: 3600, status: 'Paid', method: 'BACS' },
];

export const CLUB_INVOICES = [
  { id: 'INV-2026-0187', date: '05 Mar 2026', desc: 'Claim fee — CLM-2050 · Kai Mensah', amount: 100, status: 'Paid', due: '19 Mar 2026' },
  { id: 'INV-2026-0164', date: '21 Feb 2026', desc: 'Claim fee — CLM-2034 · Oskar Lindqvist', amount: 100, status: 'Paid', due: '07 Mar 2026' },
  { id: 'INV-2026-0151', date: '14 Feb 2026', desc: 'Placement fee — CLM-2031 · Ben Hartley · contract £24,000', amount: 3000, status: 'Due', due: '14 Mar 2026' },
  { id: 'INV-2025-0098', date: '01 Sep 2025', desc: 'Annual club licence — Founding Club free period', amount: 0, status: 'Paid', due: '01 Sep 2025' },
];

export const PLACEMENTS = [
  { id: 'PLC-021', player: 'Callum Baird', club: 'Glenmore FC', country: 'Scotland', contract: 28000, date: '10 Mar 2026', invoice: 'Pending' },
  { id: 'PLC-020', player: 'Samuel Okoro', club: 'Kingsmere United', country: 'England', contract: 46000, date: '05 Mar 2026', invoice: 'Paid' },
  { id: 'PLC-019', player: 'Ben Hartley', club: 'Ashford Rovers FC', country: 'England', contract: 24000, date: '14 Feb 2026', invoice: 'Due' },
  { id: 'PLC-018', player: 'Diogo Pereira', club: 'Sporting Alvor', country: 'Portugal', contract: 31000, date: '30 Jan 2026', invoice: 'Paid' },
  { id: 'PLC-017', player: 'Erik Hansen', club: 'FC Nordvik', country: 'Norway', contract: 52000, date: '19 Jan 2026', invoice: 'Paid' },
  { id: 'PLC-016', player: 'Reece Evans', club: 'Dunmore Celtic', country: 'Ireland', contract: 36000, date: '11 Jan 2026', invoice: 'Paid' },
  { id: 'PLC-015', player: 'Ewan Murray', club: 'Glenmore FC', country: 'Scotland', contract: 19500, date: '08 Dec 2025', invoice: 'Paid' },
  { id: 'PLC-014', player: 'Finn Doherty', club: 'Bramley City', country: 'England', contract: 38500, date: '20 Nov 2025', invoice: 'Paid' },
];

export const HIRES = [
  { id: 'HIR-014', candidate: 'Marcus Bennett', employer: 'Meridian Logistics Ltd', role: 'Operations Coordinator', salary: 28000, start: '06 Apr 2026', status: 'Confirmed', invoice: 'Paid' },
  { id: 'HIR-013', candidate: 'Connor Walsh', employer: 'Halden Facilities Group', role: 'Facilities Supervisor', salary: 26000, start: '23 Mar 2026', status: 'Confirmed', invoice: 'Pending' },
  { id: 'HIR-012', candidate: 'Jake Turner', employer: 'Carrow Build Partners', role: 'Site Operations Apprentice', salary: 21500, start: '02 Mar 2026', status: 'Started', invoice: 'Paid' },
  { id: 'HIR-011', candidate: 'Liam Barnes', employer: 'Ashgrove Hospitality', role: 'Assistant Venue Manager', salary: 25500, start: '16 Feb 2026', status: 'Started', invoice: 'Paid' },
  { id: 'HIR-010', candidate: 'Owen Fletcher', employer: 'Meridian Logistics Ltd', role: 'Warehouse Team Leader', salary: 30000, start: '02 Feb 2026', status: 'Started', invoice: 'Paid' },
  { id: 'HIR-009', candidate: 'Kian Shaw', employer: 'Halden Facilities Group', role: 'Leisure Duty Manager', salary: 24500, start: '12 Jan 2026', status: 'Started', invoice: 'Paid' },
];

// ---------------------------------------------------------------- Trust & safety
export const VIDEOS = [
  { id: 'VID-781', player: 'Jordan Ellis', title: '2024/25 Season Highlights', len: '3:12', submitted: '11 Mar 2026', status: 'Pending', thumb: THUMBS[0] },
  { id: 'VID-780', player: 'Harvey Collins', title: 'U18 Cup Run — Goals & Assists', len: '2:12', submitted: '11 Mar 2026', status: 'Pending', thumb: THUMBS[1] },
  { id: 'VID-779', player: 'Rhys Morgan', title: 'Defensive Actions Compilation', len: '2:44', submitted: '10 Mar 2026', status: 'Pending', thumb: THUMBS[2] },
  { id: 'VID-778', player: 'Noah Fischer', title: 'Full Match vs. U19 Rivals', len: '8:40', submitted: '09 Mar 2026', status: 'Approved', thumb: THUMBS[3] },
  { id: 'VID-777', player: 'Kai Mensah', title: '1v1s & Final Third', len: '2:48', submitted: '08 Mar 2026', status: 'Approved', thumb: THUMBS[4] },
  { id: 'VID-776', player: 'Samuel Okoro', title: 'Training Ground Finishing', len: '1:54', submitted: '06 Mar 2026', status: 'Rejected', thumb: THUMBS[5] },
];

export const CONSENTS = [
  { player: 'Ethan Brooks', age: 17, guardian: 'Michelle Brooks', relation: 'Mother', status: 'Approved', requested: '02 Feb 2026', updated: '04 Feb 2026' },
  { player: 'Harvey Collins', age: 17, guardian: 'Karen Collins', relation: 'Mother', status: 'Pending', requested: '08 Mar 2026', updated: '—' },
  { player: 'Leo Fernandes', age: 16, guardian: 'Paulo Fernandes', relation: 'Father', status: 'Pending', requested: '10 Mar 2026', updated: '—' },
  { player: 'Jamie Walsh', age: 17, guardian: 'Sinead Walsh', relation: 'Mother', status: 'Withdrawn', requested: '14 Jan 2026', updated: '27 Feb 2026' },
  { player: 'Ollie Grant', age: 16, guardian: 'David Grant', relation: 'Father', status: 'Approved', requested: '21 Jan 2026', updated: '22 Jan 2026' },
  { player: 'Arlo Kennedy', age: 17, guardian: 'Claire Kennedy', relation: 'Mother', status: 'Approved', requested: '05 Feb 2026', updated: '06 Feb 2026' },
  { player: 'Zach Okafor', age: 16, guardian: 'Grace Okafor', relation: 'Legal guardian', status: 'Pending', requested: '12 Mar 2026', updated: '—' },
];

export const SAFEGUARDING = [
  { id: 'SG-0118', title: 'Attempted contact outside the platform', player: 'Ethan Brooks (17)', reporter: 'Guardian', priority: 'High', status: 'Investigating', assigned: 'Priya Nair', opened: '09 Mar 2026' },
  { id: 'SG-0117', title: 'Inappropriate language in trial feedback', player: 'Harvey Collins (17)', reporter: 'PPM', priority: 'Medium', status: 'Open', assigned: 'Priya Nair', opened: '06 Mar 2026' },
  { id: 'SG-0115', title: 'Unverified agent approach', player: 'Kai Mensah (18)', reporter: 'Player', priority: 'Medium', status: 'Resolved', assigned: 'Sarah Okafor', opened: '21 Feb 2026' },
  { id: 'SG-0112', title: 'Travel arrangements for trial', player: 'Leo Fernandes (16)', reporter: 'Guardian', priority: 'Low', status: 'Resolved', assigned: 'Tom Whitfield', opened: '02 Feb 2026' },
];

export const AUDIT = [
  { time: '12 Mar 2026 · 16:42', actor: 'Sarah Okafor', role: 'PPM', action: 'Approved Claim', target: 'CLM-2050', ip: '81.2.xx.xx' },
  { time: '12 Mar 2026 · 15:10', actor: 'Elena Marsh', role: 'Platform Admin', action: 'Edited free-period end date', target: 'Elmstead United', ip: '86.14.xx.xx' },
  { time: '12 Mar 2026 · 14:55', actor: 'Graham Whitlock', role: 'Club Admin', action: 'Submitted Claim', target: 'CLM-2051', ip: '92.40.xx.xx' },
  { time: '12 Mar 2026 · 11:21', actor: 'Priya Nair', role: 'PPM', action: 'Opened safeguarding case', target: 'SG-0118', ip: '81.2.xx.xx' },
  { time: '11 Mar 2026 · 17:03', actor: 'Elena Marsh', role: 'Platform Admin', action: 'Verified club', target: 'Bramley City', ip: '86.14.xx.xx' },
  { time: '11 Mar 2026 · 13:47', actor: 'Daniel Reyes', role: 'PPM', action: 'Rejected Claim (no charge)', target: 'CLM-2047', ip: '81.2.xx.xx' },
  { time: '11 Mar 2026 · 10:12', actor: 'System', role: 'System', action: 'Guardian consent reminder sent', target: 'Harvey Collins', ip: '—' },
  { time: '10 Mar 2026 · 18:30', actor: 'Hannah Clarke', role: 'Employer', action: 'Requested introduction', target: 'Marcus Bennett', ip: '51.9.xx.xx' },
  { time: '10 Mar 2026 · 16:05', actor: 'Elena Marsh', role: 'Platform Admin', action: 'Approved video', target: 'VID-778', ip: '86.14.xx.xx' },
  { time: '10 Mar 2026 · 09:44', actor: 'Tom Whitfield', role: 'PPM', action: 'Confirmed placement', target: 'CLM-2044', ip: '81.2.xx.xx' },
  { time: '09 Mar 2026 · 15:29', actor: 'Jordan Ellis', role: 'Player', action: 'Updated privacy settings', target: 'Profile p1', ip: '82.31.xx.xx' },
  { time: '09 Mar 2026 · 12:02', actor: 'Elena Marsh', role: 'Platform Admin', action: 'Toggled Founding Club', target: 'Castleton Athletic', ip: '86.14.xx.xx' },
];

// ---------------------------------------------------------------- Analytics series
export const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
export const REG_SERIES = [86, 112, 164, 241, 198, 176, 205, 232, 190, 268, 301, 287];
export const REV_CLEARING = [6200, 7900, 11800, 16400, 14100, 13200, 15600, 17900, 14800, 21400, 24600, 23100];
export const REV_JOBPLUS = [0, 0, 1200, 2600, 3900, 3100, 4400, 5200, 3800, 7800, 9100, 8400];
export const REVENUE_STREAMS = [
  { label: 'Player memberships', value: 61240, color: '#B6F24B' },
  { label: 'Club licences', value: 48600, color: '#102A43' },
  { label: 'Claim fees', value: 6300, color: '#38BDF8' },
  { label: 'Placement fees', value: 52800, color: '#6366F1' },
  { label: 'Job+ hiring fees', value: 49500, color: '#0D9E97' },
];
export const COUNTRY_PLAYERS = [
  { label: 'England', value: 1284 }, { label: 'Scotland', value: 236 }, { label: 'Ireland', value: 171 }, { label: 'Wales', value: 142 },
  { label: 'Portugal', value: 96 }, { label: 'Northern Ireland', value: 88 }, { label: 'Spain', value: 84 }, { label: 'Germany', value: 77 },
  { label: 'Netherlands', value: 61 }, { label: 'Norway', value: 58 }, { label: 'Sweden', value: 49 },
];
export const PROFILE_VIEWS = [12, 18, 15, 22, 27, 24, 31, 29, 38, 42, 47, 53];
export const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

// Generated registration rows for admin tables & CSV exports
const FIRST = ['Jack', 'Oliver', 'Harry', 'George', 'Leo', 'Alfie', 'Charlie', 'Freddie', 'Archie', 'Isaac', 'Reece', 'Tyler', 'Kian', 'Ewan', 'Finn', 'Lewis', 'Rory', 'Dylan', 'Ciaran', 'Tiago', 'Diogo', 'Pablo', 'Marco', 'Lukas', 'Jonas', 'Erik', 'Mats', 'Daan'];
const LAST = ['Walker', 'Hughes', 'Turner', 'Barnes', 'Fletcher', 'Shaw', 'Gray', 'Mitchell', 'Doherty', 'Campbell', 'Murray', 'Byrne', 'Evans', 'Rees', 'Kennedy', 'Costa', 'Pereira', 'Garcia', 'Romero', 'Weber', 'Hoffmann', 'Hansen', 'Berg', 'de Vries', 'Jansen', 'Kerr', 'Quinn', 'Lynch'];
const CW = ['England', 'England', 'England', 'Scotland', 'Wales', 'Ireland', 'England', 'Northern Ireland', 'Portugal', 'Spain', 'Germany', 'Norway', 'Netherlands', 'Sweden', 'England', 'Scotland'];
const VST = ['Verified', 'Verified', 'Pending', 'Verified', 'In review', 'Verified', 'Rejected', 'Verified'];
const POS_SHORT = ['GK', 'CB', 'RB', 'LB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST'];
export const REGISTRATIONS = Array.from({ length: 44 }, (_, i) => {
  const country = CW[i % CW.length];
  const uk = UK.includes(country);
  const plan = !uk ? 'International' : i % 3 === 0 ? 'Founding/member academy' : 'Other UK';
  const fee = plan === 'International' ? 29.99 : plan === 'Other UK' ? 49.99 : 24.99;
  const day = 28 - (i % 27);
  const month = i < 15 ? 'Mar' : i < 30 ? 'Feb' : 'Jan';
  const age = 16 + (i % 6);
  return {
    id: `PLY-${3400 - i}`,
    name: `${FIRST[(i * 7) % FIRST.length]} ${LAST[(i * 11) % LAST.length]}`,
    age,
    country,
    position: POS_SHORT[i % POS_SHORT.length],
    plan,
    fee,
    registered: `${String(day).padStart(2, '0')} ${month} 2026`,
    verification: VST[i % VST.length],
    guardian: age < 18 ? (i % 4 === 0 ? 'Pending' : 'Approved') : 'n/a',
  };
});

// ---------------------------------------------------------------- Messaging
export type Msg = { id: number; from: 'me' | 'them' | 'system'; author: string; text: string; time: string };
export type Thread = { id: string; name: string; sub: string; kind: string; claim?: string; avatar?: string; unread: number; online?: boolean; monitored?: boolean; messages: Msg[] };

export const PPM_THREADS: Thread[] = [
  { id: 't1', name: 'Jordan Ellis', sub: 'Player · Central Midfielder', kind: 'Player', claim: 'CLM-2051', avatar: PLAYER_PHOTOS[0], unread: 2, online: true, messages: [
    { id: 1, from: 'system', author: 'System', text: 'Claim CLM-2051 from Ashford Rovers FC assigned to Sarah Okafor', time: 'Tue 09:02' },
    { id: 2, from: 'me', author: 'Sarah Okafor', text: "Hi Jordan — Ashford Rovers FC have submitted a Claim inviting you to a two-day trial. I'm running credibility checks now and will update you by Thursday.", time: 'Tue 09:15' },
    { id: 3, from: 'them', author: 'Jordan Ellis', text: "Brilliant, thank you Sarah. Do you know which dates they're looking at?", time: 'Tue 10:41' },
    { id: 4, from: 'them', author: 'Jordan Ellis', text: 'I have a college exam on the 20th, so anything around that would be tricky.', time: 'Tue 10:42' },
  ] },
  { id: 't2', name: 'Ashford Rovers FC', sub: 'Club · Graham Whitlock', kind: 'Club', claim: 'CLM-2051', unread: 1, messages: [
    { id: 1, from: 'them', author: 'Graham Whitlock', text: 'Morning Sarah, we have submitted a trial Claim for Jordan Ellis. Proposed dates are 24–25 March at our training ground.', time: 'Mon 08:30' },
    { id: 2, from: 'me', author: 'Sarah Okafor', text: 'Thanks Graham. Could you confirm the named coach supervising the trial and your safeguarding officer?', time: 'Mon 11:04' },
    { id: 3, from: 'them', author: 'Graham Whitlock', text: 'Of course — Head Coach Paul Stanton, Safeguarding Officer Jenna Moss. Both DBS-checked.', time: 'Mon 14:22' },
  ] },
  { id: 't3', name: 'Michelle Brooks', sub: 'Guardian of Ethan Brooks (17)', kind: 'Guardian', claim: 'CLM-2043', unread: 0, messages: [
    { id: 1, from: 'them', author: 'Michelle Brooks', text: "Hi, Ethan mentioned Castleton Athletic's scholarship offer. Could we discuss what accommodation support looks like?", time: 'Mon 19:10' },
    { id: 2, from: 'me', author: 'Sarah Okafor', text: "Absolutely. I'll join the call with Priya and the club's welfare lead. Does Thursday at 6pm suit you?", time: 'Tue 08:45' },
  ] },
  { id: 't4', name: 'Kai Mensah ↔ Ashford Rovers FC', sub: 'Monitored Claim channel', kind: 'Monitored', claim: 'CLM-2050', unread: 0, monitored: true, messages: [
    { id: 1, from: 'system', author: 'System', text: 'Monitored channel enabled by Sarah Okafor for CLM-2050. All messages are visible to the PPM.', time: 'Wed 12:00' },
    { id: 2, from: 'them', author: 'Graham Whitlock (Ashford Rovers)', text: 'Hi Kai, great to speak today. The contract summary has been shared through your PPM.', time: 'Wed 12:14' },
    { id: 3, from: 'them', author: 'Kai Mensah', text: "Thanks — I'll go through it with my family this weekend.", time: 'Wed 12:31' },
  ] },
  { id: 't5', name: 'Marcus Bennett', sub: 'Job+ candidate · CV review', kind: 'Candidate', unread: 0, avatar: HEADSHOTS[0], messages: [
    { id: 1, from: 'me', author: 'Sarah Okafor', text: "Marcus, I've reviewed your AI-drafted CV. I've strengthened the captaincy section — please check and approve.", time: 'Fri 15:20' },
    { id: 2, from: 'them', author: 'Marcus Bennett', text: 'Looks great, approved! Thank you.', time: 'Fri 16:02' },
  ] },
];

export const PLAYER_THREADS: Thread[] = [
  { id: 'pt1', name: 'Sarah Okafor', sub: 'Your Player Placement Manager', kind: 'PPM', claim: 'CLM-2051', avatar: HEADSHOTS[7], unread: 1, online: true, messages: [
    { id: 1, from: 'them', author: 'Sarah Okafor', text: "Hi Jordan — Ashford Rovers FC have submitted a Claim inviting you to a two-day trial. I'm running credibility checks now and will update you by Thursday.", time: 'Tue 09:15' },
    { id: 2, from: 'me', author: 'Jordan Ellis', text: "Brilliant, thank you Sarah. Do you know which dates they're looking at?", time: 'Tue 10:41' },
    { id: 3, from: 'them', author: 'Sarah Okafor', text: "They've proposed 24–25 March. I've noted your exam on the 20th — no clash. I'll confirm once approved.", time: 'Tue 11:02' },
  ] },
  { id: 'pt2', name: 'Clearing+ Verification', sub: 'Support team', kind: 'Support', unread: 0, messages: [
    { id: 1, from: 'them', author: 'Verification Team', text: 'Your academy history is being verified with your former academy. This usually takes 2–3 working days.', time: '08 Mar' },
  ] },
];

export const CLUB_THREADS: Thread[] = [
  { id: 'ct1', name: 'Sarah Okafor', sub: 'PPM · CLM-2051 · CLM-2050', kind: 'PPM', claim: 'CLM-2051', avatar: HEADSHOTS[7], unread: 1, online: true, messages: [
    { id: 1, from: 'me', author: 'Graham Whitlock', text: 'Morning Sarah, we have submitted a trial Claim for Jordan Ellis. Proposed dates are 24–25 March at our training ground.', time: 'Mon 08:30' },
    { id: 2, from: 'them', author: 'Sarah Okafor', text: 'Thanks Graham. Could you confirm the named coach supervising the trial and your safeguarding officer?', time: 'Mon 11:04' },
    { id: 3, from: 'me', author: 'Graham Whitlock', text: 'Of course — Head Coach Paul Stanton, Safeguarding Officer Jenna Moss. Both DBS-checked.', time: 'Mon 14:22' },
    { id: 4, from: 'them', author: 'Sarah Okafor', text: "Perfect. I'll complete the credibility review today.", time: 'Mon 15:01' },
  ] },
  { id: 'ct2', name: 'Kai Mensah (monitored)', sub: 'Monitored channel · CLM-2050', kind: 'Monitored', claim: 'CLM-2050', avatar: PLAYER_PHOTOS[1], unread: 0, monitored: true, messages: [
    { id: 1, from: 'system', author: 'System', text: 'Monitored channel enabled by your PPM for CLM-2050. All messages are visible to Sarah Okafor.', time: 'Wed 12:00' },
    { id: 2, from: 'me', author: 'Graham Whitlock', text: 'Hi Kai, great to speak today. The contract summary has been shared through your PPM.', time: 'Wed 12:14' },
    { id: 3, from: 'them', author: 'Kai Mensah', text: "Thanks — I'll go through it with my family this weekend.", time: 'Wed 12:31' },
  ] },
  { id: 'ct3', name: 'Daniel Reyes', sub: 'PPM · CLM-2034', kind: 'PPM', claim: 'CLM-2034', avatar: HEADSHOTS[2], unread: 0, messages: [
    { id: 1, from: 'them', author: 'Daniel Reyes', text: "Oskar's flights are confirmed for the 18th. He'll arrive at the training ground by 9:30 on the 19th.", time: 'Thu 10:20' },
  ] },
];

export const GUARDIAN_THREADS: Thread[] = [
  { id: 'gt1', name: 'Priya Nair', sub: "Ethan's Player Placement Manager", kind: 'PPM', claim: 'CLM-2043', avatar: HEADSHOTS[6], unread: 1, online: true, messages: [
    { id: 1, from: 'them', author: 'Priya Nair', text: "Hello Michelle — Castleton Athletic's scholarship Claim has been approved after our credibility review. I'd like to talk you and Ethan through it.", time: 'Mon 17:40' },
    { id: 2, from: 'me', author: 'Michelle Brooks', text: 'Thank you Priya. Could we discuss what accommodation support looks like?', time: 'Mon 19:10' },
    { id: 3, from: 'them', author: 'Priya Nair', text: "Of course. I've invited the club's welfare lead to join us on Thursday at 6pm.", time: 'Tue 08:45' },
  ] },
];

// ---------------------------------------------------------------- Roles & notifications
export const ROLE_META: Record<string, { label: string; name: string; email: string; title: string; org: string; photo?: string; brand: 'clearing' | 'jobplus'; desc: string }> = {
  player: { label: 'Player', name: 'Jordan Ellis', email: 'jordan.ellis@example.com', title: 'Central Midfielder', org: 'Player · Member since Jan 2026', photo: PLAYER_PHOTOS[0], brand: 'clearing', desc: 'Profile, videos, Claims & membership' },
  guardian: { label: 'Guardian', name: 'Michelle Brooks', email: 'm.brooks@example.com', title: 'Parent / Guardian', org: 'Guardian of Ethan Brooks (17)', brand: 'clearing', desc: 'Consent, progress & safeguarding' },
  clubUser: { label: 'Club User', name: 'Lauren Hale', email: 'l.hale@ashfordrovers.example', title: 'Scout', org: 'Ashford Rovers FC', brand: 'clearing', desc: 'Search, shortlist & Claims' },
  clubAdmin: { label: 'Club Admin', name: 'Graham Whitlock', email: 'g.whitlock@ashfordrovers.example', title: 'Head of Recruitment', org: 'Ashford Rovers FC', photo: HEADSHOTS[1], brand: 'clearing', desc: 'Everything + staff & billing' },
  employer: { label: 'Employer', name: 'Hannah Clarke', email: 'h.clarke@meridian.example', title: 'Talent Acquisition Lead', org: 'Meridian Logistics Ltd', photo: HEADSHOTS[6], brand: 'jobplus', desc: 'Job+ vacancies & candidates' },
  ppm: { label: 'Placement Manager', name: 'Sarah Okafor', email: 's.okafor@clearingplus.com', title: 'Senior PPM', org: 'Clearing+ Placement Team', photo: HEADSHOTS[7], brand: 'clearing', desc: 'Claim review, CRM & placements' },
  admin: { label: 'Platform Admin', name: 'Elena Marsh', email: 'e.marsh@clearingplus.com', title: 'Platform Administrator', org: 'Clearing+ HQ', brand: 'clearing', desc: 'Enterprise admin & reporting' },
};

export const NOTIFS: Record<string, { title: string; time: string; unread?: boolean }[]> = {
  player: [
    { title: 'Ashford Rovers FC submitted a Claim — now in PPM review', time: '2h ago', unread: true },
    { title: 'Your highlight video "2024/25 Season Highlights" is in moderation', time: 'Yesterday', unread: true },
    { title: 'Sarah Okafor sent you a message', time: 'Yesterday' },
    { title: 'Your profile was viewed by 6 verified clubs this week', time: '3 days ago' },
  ],
  guardian: [
    { title: 'Castleton Athletic Claim approved by PPM', time: '1h ago', unread: true },
    { title: 'Priya Nair sent you a message', time: 'Yesterday', unread: true },
    { title: "Ethan's video was approved by moderation", time: '4 days ago' },
  ],
  club: [
    { title: 'CLM-2050 approved — £100 Claim Fee invoiced', time: '3h ago', unread: true },
    { title: '4 new verified players match your saved search', time: 'Today', unread: true },
    { title: 'Trial for Oskar Lindqvist confirmed for 19 Mar', time: 'Yesterday' },
    { title: 'Invoice INV-2026-0151 is due on 14 Mar', time: '2 days ago' },
  ],
  employer: [
    { title: 'Marcus Bennett accepted your introduction request', time: '1h ago', unread: true },
    { title: '3 new candidates match "Operations Coordinator"', time: 'Today', unread: true },
    { title: 'Hiring fee invoice INV-JP-0042 paid', time: '3 days ago' },
  ],
  ppm: [
    { title: 'New Claim CLM-2051 assigned to you', time: '25m ago', unread: true },
    { title: 'Jordan Ellis replied in CLM-2051', time: '1h ago', unread: true },
    { title: 'AI CV draft ready for review: Luca Romano', time: 'Today', unread: true },
    { title: 'Trial outcome due: Kai Mensah @ Bramley City', time: 'Tomorrow' },
  ],
  admin: [
    { title: '18 player verifications awaiting review', time: '10m ago', unread: true },
    { title: 'High-priority safeguarding case SG-0118 opened', time: '1h ago', unread: true },
    { title: 'Club verification submitted: SV Rheinau', time: 'Today' },
    { title: 'Monthly revenue report ready (Feb 2026)', time: '2 days ago' },
  ],
};
