import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Brand = 'clearing' | 'jobplus';
export type Role = 'player' | 'guardian' | 'clubUser' | 'clubAdmin' | 'employer' | 'ppm' | 'admin';
export const ROLES: Role[] = ['player', 'guardian', 'clubUser', 'clubAdmin', 'employer', 'ppm', 'admin'];
export type ToastTone = 'success' | 'info' | 'error';

type Route = { mode: 'public' | 'dashboard'; brand: Brand; page: string; role: Role; screen: string };
type Toast = { id: number; msg: string; tone: ToastTone };

/** Hash routes: #/clearing/<page>, #/jobplus/<page>, #/app/<role>/<screen> */
function parse(hash: string): Route {
  const [a, b, c] = hash.replace(/^#\/?/, '').split('/');
  if (a === 'app') {
    const role = (ROLES as string[]).includes(b) ? (b as Role) : 'player';
    return { mode: 'dashboard', brand: role === 'employer' ? 'jobplus' : 'clearing', page: 'home', role, screen: c || 'overview' };
  }
  return { mode: 'public', brand: a === 'jobplus' ? 'jobplus' : 'clearing', page: b || 'home', role: 'player', screen: 'overview' };
}

type Ctx = Route & {
  go: (page: string, brand?: Brand) => void;
  openDashboard: (role: Role, screen?: string) => void;
  setScreen: (screen: string) => void;
  toast: (msg: string, tone?: ToastTone) => void;
  toasts: Toast[];
  dismiss: (id: number) => void;
};

const AppCtx = createContext<Ctx | null>(null);

const nav = (h: string) => {
  if (window.location.hash === h) window.scrollTo(0, 0);
  else window.location.hash = h;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onHash = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = useCallback((page: string, brand?: Brand) => nav(`#/${brand ?? route.brand}/${page}`), [route.brand]);
  const openDashboard = useCallback((role: Role, screen = 'overview') => nav(`#/app/${role}/${screen}`), []);
  const setScreen = useCallback((screen: string) => nav(`#/app/${route.role}/${screen}`), [route.role]);
  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((msg: string, tone: ToastTone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-3), { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const value = useMemo(
    () => ({ ...route, go, openDashboard, setScreen, toast, toasts, dismiss }),
    [route, go, openDashboard, setScreen, toast, toasts, dismiss],
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}

/** Session-only state that survives screen changes inside dashboards (no persistence across reloads). */
const memory = new Map<string, unknown>();
export function usePersist<T>(key: string, init: T): [T, (v: T | ((p: T) => T)) => void] {
  const [v, setV] = useState<T>(() => (memory.has(key) ? (memory.get(key) as T) : init));
  const set = useCallback(
    (nv: T | ((p: T) => T)) =>
      setV((p) => {
        const r = typeof nv === 'function' ? (nv as (p: T) => T)(p) : nv;
        memory.set(key, r);
        return r;
      }),
    [key],
  );
  return [v, set];
}
