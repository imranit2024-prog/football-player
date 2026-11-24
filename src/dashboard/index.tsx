import type { ReactNode } from 'react';
import type { Role } from '../store';
import { DashboardShell, type NavGroup } from './Shell';
import { PlayerDashboard, playerNav } from './player';
import { ClubDashboard, clubNav } from './club';
import { AdminDashboard, adminNav } from './admin';
import { GuardianDashboard, guardianNav } from './guardian';
import { EmployerDashboard, employerNav } from './employer';
import { PPMDashboard, ppmNav } from './ppm';

type Entry = { nav: NavGroup[]; View: (p: { screen: string }) => ReactNode };

const REG: Record<Role, Entry> = {
  player: { nav: playerNav, View: PlayerDashboard },
  guardian: { nav: guardianNav, View: GuardianDashboard },
  clubUser: { nav: clubNav(false), View: ({ screen }) => <ClubDashboard screen={screen} admin={false} /> },
  clubAdmin: { nav: clubNav(true), View: ({ screen }) => <ClubDashboard screen={screen} admin /> },
  employer: { nav: employerNav, View: EmployerDashboard },
  ppm: { nav: ppmNav, View: PPMDashboard },
  admin: { nav: adminNav, View: AdminDashboard },
};

export function Dashboard({ role, screen }: { role: Role; screen: string }) {
  const entry = REG[role] ?? REG.player;
  const View = entry.View;
  return (
    <DashboardShell role={role} nav={entry.nav}>
      <View screen={screen} />
    </DashboardShell>
  );
}
