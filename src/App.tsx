import { useEffect, type ComponentType } from 'react';
import { ROLE_META } from './data/mock';
import { AppProvider, useApp } from './store';
import { Button, Toaster } from './components/ui';
import { PreviewSwitcher } from './components/PreviewSwitcher';
import { ClearingFooter, ClearingHeader, PageHero } from './public/clearing/Layout';
import ClearingHome from './public/clearing/Home';
import {
  AboutPage, ClubsPage, ContactPage, EmployersPage, FoundingPage, GrassrootsPage, HowItWorksPage, InterestPage, LegalPage, ParentsPage, PlayersPage,
} from './public/clearing/Pages';
import { ForgotPage, LoginPage, RegisterPage } from './public/Auth';
import { JobFooter, JobHeader } from './public/jobplus/Layout';
import JobHome from './public/jobplus/Home';
import { CandidatesPage, EmployerRegisterPage, EmployersInfoPage, HowJobWorksPage, JobContactPage, OptInPage } from './public/jobplus/Pages';
import { Dashboard } from './dashboard';

const CLEARING: Record<string, ComponentType> = {
  home: ClearingHome, how: HowItWorksPage, players: PlayersPage, parents: ParentsPage, clubs: ClubsPage, employers: EmployersPage,
  founding: FoundingPage, grassroots: GrassrootsPage, about: AboutPage, contact: ContactPage, interest: InterestPage,
  terms: () => <LegalPage kind="terms" />, privacy: () => <LegalPage kind="privacy" />,
};
const JOBPLUS: Record<string, ComponentType> = {
  home: JobHome, candidates: CandidatesPage, employers: EmployersInfoPage, how: HowJobWorksPage, optin: OptInPage, register: OptInPage,
  'employer-register': EmployerRegisterPage, contact: JobContactPage,
};

function NotFound() {
  const { go } = useApp();
  return <PageHero eyebrow="404" title="This page is offside." desc="The page you were looking for doesn't exist in this prototype." actions={<Button variant="lime" size="lg" onClick={() => go('home', 'clearing')}>Back to home</Button>} />;
}

function Root() {
  const { mode, brand, page, role, screen } = useApp();
  useEffect(() => {
    document.title =
      mode === 'dashboard'
        ? `${ROLE_META[role].label} dashboard · ${brand === 'jobplus' ? 'Job+' : 'Clearing+'}`
        : brand === 'jobplus'
          ? 'Job+ — Your skills go beyond the pitch'
          : 'Clearing+ — Your next chapter in football starts here';
  }, [mode, brand, role]);
  if (mode === 'dashboard') return <Dashboard role={role} screen={screen} />;
  if (page === 'login') return <LoginPage />;
  if (page === 'forgot') return <ForgotPage />;
  if (brand === 'jobplus') {
    const Page = JOBPLUS[page] ?? JobHome;
    return (
      <div className="theme-jobplus bg-sand">
        <JobHeader />
        <main><Page /></main>
        <JobFooter />
      </div>
    );
  }
  if (page === 'register') return <RegisterPage />;
  const Page = CLEARING[page] ?? NotFound;
  return (
    <div>
      <ClearingHeader />
      <main><Page /></main>
      <ClearingFooter />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
      <Toaster />
      <PreviewSwitcher />
    </AppProvider>
  );
}
