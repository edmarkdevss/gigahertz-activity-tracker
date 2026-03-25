import * as React from 'react';
import { useState, useEffect, useReducer, Suspense, createContext, useContext, useMemo, useCallback } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLoaderData, useRouteError, useNavigation, useSubmit, Form, redirect, Link, NavLink, useParams } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

type AuthAction =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' };

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const storedToken = localStorage.getItem('cybersafe_tvi_token');
    const storedUser = localStorage.getItem('cybersafe_tvi_user');
    if (storedToken && storedUser) {
      dispatch({ type: 'LOGIN', payload: { user: JSON.parse(storedUser), token: storedToken } });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

const ThemeContext = createContext<{ dark: boolean; toggle: () => void } | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(true);
  const toggle = useCallback(() => setDark(d => !d), []);
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme failed');
  return ctx;
};

const Spinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '200px' }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a3af5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="4.93" x2="19.07" y2="7.76"></line>
      </svg>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

const Navigation = () => {
  const { state, dispatch } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cybersafe_tvi_token');
    localStorage.removeItem('cybersafe_tvi_user');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const navStyle = {
    background: dark ? '#0f172a' : '#ffffff',
    borderBottom: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`,
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50
  };

  const linkStyle = {
    color: dark ? '#f8fafc' : '#0f172a',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '15px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'background 0.2s'
  };

  return (
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: '#1a3af5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '20px' }}>⚡</div>
            <span style={{ fontSize: '22px', fontWeight: 900, color: dark ? '#fff' : '#0f172a', letterSpacing: '-0.5px' }}>PROJECT HYACINTH</span>
          </Link>
          <div style={{ display: 'flex', gap: '8px' }}>
            <NavLink to="/products" style={({isActive}) => ({ ...linkStyle, background: isActive ? (dark ? '#1e293b' : '#f1f5f9') : 'transparent' })}>Hardware</NavLink>
            <NavLink to="/gaming" style={({isActive}) => ({ ...linkStyle, background: isActive ? (dark ? '#1e293b' : '#f1f5f9') : 'transparent' })}>Gaming Core</NavLink>
            <NavLink to="/support" style={({isActive}) => ({ ...linkStyle, background: isActive ? (dark ? '#1e293b' : '#f1f5f9') : 'transparent' })}>TVI Support</NavLink>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={toggle} style={{ background: 'transparent', border: `1px solid ${dark ? '#334155' : '#cbd5e1'}`, color: dark ? '#fff' : '#000', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
            {dark ? '☀ Light' : '🌙 Dark'}
          </button>
          {state.isAuthenticated ? (
              <>
                <Link to="/dashboard" style={{ ...linkStyle, background: '#1a3af5', color: '#fff' }}>Dashboard</Link>
                <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', padding: '8px 16px' }}>Disconnect</button>
              </>
          ) : (
              <Link to="/login" style={{ ...linkStyle, background: '#1a3af5', color: '#fff' }}>Authenticate</Link>
          )}
        </div>
      </nav>
  );
};

const Footer = () => {
  const { dark } = useTheme();
  return (
      <footer style={{ background: dark ? '#020617' : '#f8fafc', borderTop: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, padding: '48px 32px', textAlign: 'center', color: dark ? '#64748b' : '#94a3b8' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', fontWeight: 700 }}>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About CyberSafe</Link>
          <Link to="/support" style={{ color: 'inherit', textDecoration: 'none' }}>System Documentation</Link>
        </div>
        <p style={{ fontSize: '13px', margin: 0 }}>Project Hyacinth Architecture. Built with React Router v6.</p>
      </footer>
  );
};

const TechRoot = () => {
  const { dark } = useTheme();
  const navigation = useNavigation();

  return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: dark ? '#020617' : '#ffffff', color: dark ? '#f8fafc' : '#0f172a', transition: 'background 0.3s, color 0.3s', fontFamily: 'system-ui, sans-serif' }}>
        <Navigation />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {navigation.state === 'loading' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#1a3af5', animation: 'pulse 1s infinite' }} />
          )}
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
  );
};

const RootBoundary = () => {
  const error = useRouteError() as any;
  return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#f8fafc', fontFamily: 'system-ui' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', maxWidth: '600px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠</div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px', color: '#ef4444' }}>FATAL SYSTEM ERROR</h1>
          <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '16px', lineHeight: 1.5 }}>
            {error.status === 404 ? "The requested directory could not be located in the primary databanks." : error.message || "An unexpected critical failure occurred during routing."}
          </p>
          <Link to="/" style={{ display: 'inline-block', padding: '12px 24px', background: '#1a3af5', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 700 }}>Return to Primary Interface</Link>
        </div>
      </div>
  );
};

const RouteError = () => {
  const error = useRouteError() as any;
  return (
      <div style={{ padding: '32px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', margin: '32px', color: '#ef4444' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 800 }}>Sub-Routing Exception</h3>
        <p style={{ margin: 0, fontWeight: 600 }}>{error.message || "Component failed to mount."}</p>
      </div>
  );
};

const AuthLayout = () => {
  return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', backgroundImage: 'radial-gradient(circle at 50% 0%, #1e293b 0%, transparent 70%)' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <Outlet />
        </div>
      </div>
  );
};

const DashboardLayout = () => {
  const { dark } = useTheme();
  const { state } = useAuth();
  const location = useNavigation();

  return (
      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '280px', background: dark ? '#0f172a' : '#f8fafc', borderRight: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '32px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <img src={state.user?.avatar} alt="" style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#1a3af5', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '16px', color: dark ? '#fff' : '#0f172a' }}>{state.user?.name}</div>
                <div style={{ fontSize: '13px', color: dark ? '#94a3b8' : '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{state.user?.role} NODE</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <NavLink to="/dashboard" end style={({isActive}) => ({ padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, color: isActive ? '#fff' : (dark ? '#cbd5e1' : '#475569'), background: isActive ? '#1a3af5' : 'transparent', transition: 'all 0.2s' })}>⌘ Hub Overview</NavLink>
              <NavLink to="/dashboard/settings/profile" style={({isActive}) => ({ padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, color: isActive ? '#fff' : (dark ? '#cbd5e1' : '#475569'), background: isActive ? '#1a3af5' : 'transparent', transition: 'all 0.2s' })}>⚙ Profile Settings</NavLink>
              <NavLink to="/dashboard/settings/security" style={({isActive}) => ({ padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, color: isActive ? '#fff' : (dark ? '#cbd5e1' : '#475569'), background: isActive ? '#1a3af5' : 'transparent', transition: 'all 0.2s' })}>🔒 Security & TVI</NavLink>
              {state.user?.role === 'admin' && (
                  <NavLink to="/admin" style={({isActive}) => ({ padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, color: isActive ? '#fff' : (dark ? '#cbd5e1' : '#475569'), background: isActive ? '#ef4444' : 'transparent', marginTop: '16px', border: `1px solid ${isActive ? 'transparent' : '#ef4444'}` })}>🛡 Admin Override</NavLink>
              )}
            </div>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '48px', overflowY: 'auto', position: 'relative' }}>
          {location.state === 'loading' ? <Spinner /> : <Outlet />}
        </main>
      </div>
  );
};

const AdminLayout = () => {
  const { dark } = useTheme();
  return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: dark ? '#020617' : '#f1f5f9' }}>
        <div style={{ background: '#0f172a', padding: '16px 32px', display: 'flex', gap: '24px', borderBottom: '1px solid #1e293b' }}>
          <NavLink to="/admin" end style={({isActive}) => ({ color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent', paddingBottom: '16px', marginBottom: '-17px' })}>System Analytics</NavLink>
          <NavLink to="/admin/users" style={({isActive}) => ({ color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent', paddingBottom: '16px', marginBottom: '-17px' })}>User Management</NavLink>
        </div>
        <div style={{ flex: 1, padding: '48px' }}>
          <Outlet />
        </div>
      </div>
  );
};

const TechHome = () => {
  const { dark } = useTheme();
  return (
      <div style={{ padding: '64px 32px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', margin: '0 0 24px 0', background: `linear-gradient(135deg, ${dark ? '#fff' : '#0f172a'}, #1a3af5)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            NEXT-GEN ARCHITECTURE
          </h1>
          <p style={{ fontSize: '20px', color: dark ? '#94a3b8' : '#475569', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Project Hyacinth integrates advanced hardware cataloging with the HORRAH security module, running seamlessly on React Router v6 data APIs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/products" style={{ padding: '16px 32px', background: '#1a3af5', color: '#fff', borderRadius: '12px', fontWeight: 800, textDecoration: 'none', fontSize: '16px', boxShadow: '0 10px 25px rgba(26,58,245,0.3)' }}>Explore Hardware</Link>
            <Link to="/gaming" style={{ padding: '16px 32px', background: dark ? '#1e293b' : '#e2e8f0', color: dark ? '#fff' : '#0f172a', borderRadius: '12px', fontWeight: 800, textDecoration: 'none', fontSize: '16px' }}>Gaming Library</Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            { title: "CyberSafe TVI", desc: "Enterprise-grade threat vector identification and real-time mitigation protocols.", icon: "🛡" },
            { title: "HORRAH Module", desc: "High-output routing and reactivity algorithms handling massive data arrays instantly.", icon: "⚡" },
            { title: "Gigahertz Core", desc: "Deep system integration optimized for extreme hardware benchmarking.", icon: "⚙" }
          ].map((f, i) => (
              <div key={i} style={{ background: dark ? '#0f172a' : '#f8fafc', padding: '32px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 12px 0' }}>{f.title}</h3>
                <p style={{ color: dark ? '#94a3b8' : '#64748b', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Login = () => {
  const { dark } = useTheme();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
      <div style={{ background: dark ? '#0f172a' : '#ffffff', padding: '48px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, boxShadow: dark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0' }}>Initialize Connection</h2>
          <p style={{ color: dark ? '#94a3b8' : '#64748b', margin: 0 }}>Authenticate to access Project Hyacinth</p>
        </div>
        <Form method="post" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569', textTransform: 'uppercase' }}>Identification Array</label>
            <input type="email" name="email" required defaultValue="piolo.daniele@cybersafe.tvi" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569', textTransform: 'uppercase' }}>Security Hash</label>
            <input type="password" name="password" required defaultValue="password123" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={isSubmitting} style={{ padding: '16px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '12px', opacity: isSubmitting ? 0.7 : 1 }}>
            {isSubmitting ? 'VERIFYING ENCRYPTION...' : 'ESTABLISH LINK'}
          </button>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', fontWeight: 600, color: dark ? '#64748b' : '#94a3b8' }}>
          Unregistered node? <Link to="/register" style={{ color: '#1a3af5', textDecoration: 'none' }}>Provision here</Link>
        </div>
      </div>
  );
};

const Register = () => {
  const { dark } = useTheme();
  return (
      <div style={{ background: dark ? '#0f172a' : '#ffffff', padding: '48px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 32px 0', textAlign: 'center' }}>Provision New Node</h2>
        <Form method="post" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" name="name" placeholder="Full Designation" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', boxSizing: 'border-box' }} />
          <input type="email" name="email" placeholder="Communication Relay" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', boxSizing: 'border-box' }} />
          <input type="password" name="password" placeholder="Security Hash" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', boxSizing: 'border-box' }} />
          <button type="submit" style={{ padding: '16px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', marginTop: '12px' }}>INITIALIZE</button>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', fontWeight: 600 }}>
          <Link to="/login" style={{ color: '#1a3af5', textDecoration: 'none' }}>Return to Login</Link>
        </div>
      </div>
  );
};

const Overview = () => {
  const { dark } = useTheme();
  const data = useLoaderData() as any;
  const { state } = useAuth();

  return (
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-1px' }}>Welcome back, {state.user?.name.split(' ')[0]}!</h1>
        <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '16px', margin: '0 0 40px 0', fontWeight: 500 }}>HORRAH Module active. CyberSafe TVI scanning continuous.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: "Network Latency", value: data.latency, unit: "ms", color: "#10b981" },
            { label: "Threats Mitigated", value: data.threats, unit: "", color: "#38bdf8" },
            { label: "Active Nodes", value: data.nodes, unit: "", color: "#8b5cf6" }
          ].map((stat, i) => (
              <div key={i} style={{ background: dark ? '#0f172a' : '#fff', padding: '32px', borderRadius: '20px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, boxShadow: dark ? 'none' : '0 10px 25px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: dark ? '#64748b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{stat.label}</div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: stat.color, letterSpacing: '-2px', lineHeight: 1 }}>
                  {stat.value}<span style={{ fontSize: '20px', marginLeft: '4px' }}>{stat.unit}</span>
                </div>
              </div>
          ))}
        </div>

        <div style={{ background: dark ? '#0f172a' : '#fff', borderRadius: '20px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px', borderBottom: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, fontWeight: 800, fontSize: '18px' }}>Recent System Events</div>
          <div style={{ padding: '0' }}>
            {data.events.map((e: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px', borderBottom: i !== data.events.length - 1 ? `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` : 'none', background: i % 2 === 0 ? 'transparent' : (dark ? '#020617' : '#f8fafc') }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: e.type === 'alert' ? '#ef4444' : '#10b981' }} />
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{e.message}</span>
                  </div>
                  <span style={{ color: dark ? '#64748b' : '#94a3b8', fontSize: '13px', fontWeight: 600 }}>{e.time}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

const Products = () => {
  const { dark } = useTheme();
  const products = useLoaderData() as any[];

  return (
      <div style={{ padding: '48px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '40px', fontWeight: 900, margin: '0 0 8px 0' }}>Hardware Catalog</h1>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '16px', margin: 0, fontWeight: 500 }}>Approved components for Gigahertz core systems.</p>
          </div>
          <Link to="/dashboard/products/new" style={{ padding: '12px 24px', background: '#1a3af5', color: '#fff', borderRadius: '8px', fontWeight: 800, textDecoration: 'none' }}>+ Register Hardware</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {products.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: dark ? '#0f172a' : '#fff', borderRadius: '24px', padding: '32px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = dark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(26,58,245,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', background: dark ? '#020617' : '#f8fafc', borderRadius: '16px', marginBottom: '24px' }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>{p.name}</h3>
                  <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '14px', margin: '0 0 24px 0', lineHeight: 1.5, height: '42px', overflow: 'hidden' }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#1a3af5' }}>${p.price}</span>
                    <span style={{ background: p.stock > 0 ? '#ecfdf5' : '#fef2f2', color: p.stock > 0 ? '#10b981' : '#ef4444', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>{p.stock > 0 ? 'IN STOCK' : 'DEPLETED'}</span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
};

const ProductDetail = () => {
  const { dark } = useTheme();
  const product = useLoaderData() as any;

  return (
      <div style={{ padding: '64px 32px', maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/products" style={{ color: '#1a3af5', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>← Back to Catalog</Link>
        <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, background: dark ? '#0f172a' : '#f8fafc', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', padding: '80px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
            {product.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-1px', lineHeight: 1.1 }}>{product.name}</h1>
            <p style={{ fontSize: '18px', color: dark ? '#94a3b8' : '#475569', lineHeight: 1.6, marginBottom: '32px' }}>{product.longDesc}</p>
            <div style={{ fontSize: '40px', fontWeight: 900, color: '#1a3af5', marginBottom: '40px' }}>${product.price}</div>
            <button style={{ width: '100%', padding: '20px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(26,58,245,0.3)' }}>REQUISITION HARDWARE</button>
          </div>
        </div>
      </div>
  );
};

const CreateProduct = () => {
  const { dark } = useTheme();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
      <div style={{ maxWidth: '600px', margin: '0 auto', background: dark ? '#0f172a' : '#fff', padding: '48px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 32px 0' }}>Register Hardware</h2>
        <Form method="post" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>DESIGNATION</label>
            <input type="text" name="name" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>PRICE INDEX ($)</label>
            <input type="number" name="price" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>SPECIFICATIONS</label>
            <textarea name="desc" required rows={4} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={isSubmitting} style={{ padding: '20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '16px' }}>
            {isSubmitting ? 'PROCESSING...' : 'COMMIT TO DATABASE'}
          </button>
        </Form>
      </div>
  );
};

const Gaming = () => {
  const { dark } = useTheme();
  return (
      <div style={{ padding: '48px 32px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', borderBottom: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, paddingBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-2px' }}>Gaming Core</h1>
            <div style={{ display: 'flex', gap: '24px' }}>
              <NavLink to="/gaming/library" style={({isActive}) => ({ color: isActive ? '#1a3af5' : (dark ? '#94a3b8' : '#64748b'), textDecoration: 'none', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' })}>Library</NavLink>
              <NavLink to="/gaming/stats" style={({isActive}) => ({ color: isActive ? '#1a3af5' : (dark ? '#94a3b8' : '#64748b'), textDecoration: 'none', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' })}>Telemetry Stats</NavLink>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
  );
};

const GameLibrary = () => {
  const { dark } = useTheme();
  const games = [
    { id: 'gta', title: 'Grand Theft Auto: San Andreas', hours: 452, status: 'Installed', icon: '🚲' },
    { id: 'fnv', title: 'Fallout: New Vegas', hours: 310, status: 'Installed', icon: '☢' },
    { id: 'f1', title: 'F1 2026', hours: 128, status: 'Updating', icon: '🏎' },
  ];
  return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
        {games.map(g => (
            <div key={g.id} style={{ background: dark ? '#0f172a' : '#fff', borderRadius: '20px', padding: '32px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: dark ? '#020617' : '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>{g.icon}</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0', lineHeight: 1.3 }}>{g.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: dark ? '#94a3b8' : '#64748b', fontWeight: 600 }}>{g.hours} hrs on record</p>
                <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '11px', fontWeight: 800, padding: '4px 10px', background: g.status === 'Installed' ? '#d1fae5' : '#dbeafe', color: g.status === 'Installed' ? '#059669' : '#2563eb', borderRadius: '12px', textTransform: 'uppercase' }}>{g.status}</span>
              </div>
            </div>
        ))}
      </div>
  );
};

const GameStats = () => {
  const { dark } = useTheme();
  return (
      <div>
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #1e3a8a)', borderRadius: '24px', padding: '48px', color: '#fff', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 8px 0' }}>Oracle Red Bull Racing Telemetry</h2>
            <p style={{ opacity: 0.8, fontSize: '16px', margin: 0, fontWeight: 500 }}>Max Verstappen - Car #1 Analysis</p>
          </div>
          <div style={{ fontSize: '64px' }}>🏎</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { label: "Top Speed", val: "342 km/h" },
            { label: "Avg Lap Delta", val: "-0.124s" },
            { label: "Tyre Wear", val: "Optimal" },
            { label: "ERS Deployment", val: "94%" }
          ].map((s, i) => (
              <div key={i} style={{ background: dark ? '#0f172a' : '#fff', padding: '24px', borderRadius: '16px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
                <div style={{ fontSize: '12px', color: dark ? '#94a3b8' : '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: dark ? '#fff' : '#0f172a' }}>{s.val}</div>
              </div>
          ))}
        </div>
      </div>
  );
};

const Support = () => {
  const { dark } = useTheme();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 32px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-1px' }}>CyberSafe TVI Support</h1>
        <p style={{ fontSize: '18px', color: dark ? '#94a3b8' : '#475569', marginBottom: '48px', lineHeight: 1.6 }}>
          Encountering anomalies in the HORRAH module or need hardware requisition support? Submit a diagnostic ticket below.
        </p>

        <Form method="post" style={{ background: dark ? '#0f172a' : '#fff', padding: '40px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>IDENTIFICATION</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>PRIORITY LEVEL</label>
              <select name="priority" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
                <option value="low">Standard</option>
                <option value="high">Critical Failure</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>DIAGNOSTIC LOG / DESCRIPTION</label>
            <textarea name="message" required rows={6} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '20px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'TRANSMITTING PACKET...' : 'SUBMIT TICKET'}
          </button>
        </Form>
      </div>
  );
};

const Settings = () => {
  const { dark } = useTheme();
  return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 32px 0' }}>Configuration</h1>
        <Outlet />
      </div>
  );
};

const ProfileSettings = () => {
  const { dark } = useTheme();
  const { state } = useAuth();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
      <div style={{ background: dark ? '#0f172a' : '#fff', padding: '40px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '48px' }}>
          <img src={state.user?.avatar} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '32px', background: '#1a3af5', objectFit: 'cover' }} />
          <div>
            <button style={{ padding: '12px 24px', background: dark ? '#1e293b' : '#f1f5f9', color: dark ? '#fff' : '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', marginBottom: '12px' }}>Change Avatar</button>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '13px', margin: 0, fontWeight: 500 }}>JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <Form method="post" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>FULL DESIGNATION</label>
            <input type="text" name="name" defaultValue={state.user?.name} required style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: dark ? '#cbd5e1' : '#475569' }}>AUDIO PREFERENCE (MCR / GREEN DAY SYNC)</label>
            <select name="audio" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: dark ? '#020617' : '#f8fafc', border: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}`, color: dark ? '#fff' : '#000', fontSize: '15px', fontWeight: 600, outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
              <option>The Black Parade (MCR) Overlay</option>
              <option>Uno, Dos, Tre (Green Day) Overlay</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2', marginTop: '16px' }}>
            <button type="submit" disabled={isSubmitting} style={{ padding: '16px 32px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'UPDATING...' : 'SAVE CONFIGURATION'}
            </button>
          </div>
        </Form>
      </div>
  );
};

const SecuritySettings = () => {
  const { dark } = useTheme();
  return (
      <div style={{ background: dark ? '#0f172a' : '#fff', padding: '40px', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 24px 0' }}>CyberSafe TVI Protocols</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: dark ? '#020617' : '#f8fafc', borderRadius: '16px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>Multi-Factor Authentication</div>
              <div style={{ fontSize: '14px', color: dark ? '#94a3b8' : '#64748b' }}>Require cryptographic token on new devices.</div>
            </div>
            <button style={{ padding: '8px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>ENABLED</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: dark ? '#020617' : '#f8fafc', borderRadius: '16px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>Session Timeout</div>
              <div style={{ fontSize: '14px', color: dark ? '#94a3b8' : '#64748b' }}>Force disconnect after 30 minutes of inactivity.</div>
            </div>
            <button style={{ padding: '8px 24px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>DISABLED</button>
          </div>
        </div>
      </div>
  );
};

const AdminDashboard = () => {
  const { dark } = useTheme();
  const data = useLoaderData() as any;
  return (
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 40px 0', letterSpacing: '-1px' }}>Global System Overview</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { label: "Total Nodes", value: data.totalUsers },
            { label: "Active Subsystems", value: data.activeServices },
            { label: "Threat Index", value: data.threatLevel, color: '#10b981' },
            { label: "HORRAH Load", value: data.load + "%" }
          ].map((stat, i) => (
              <div key={i} style={{ background: dark ? '#0f172a' : '#fff', padding: '32px', borderRadius: '20px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, borderTop: `4px solid ${stat.color || '#1a3af5'}` }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: dark ? '#64748b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{stat.label}</div>
                <div style={{ fontSize: '40px', fontWeight: 900, color: stat.color || (dark ? '#fff' : '#0f172a'), letterSpacing: '-2px' }}>{stat.value}</div>
              </div>
          ))}
        </div>
      </div>
  );
};

const UserManagement = () => {
  const { dark } = useTheme();
  const users = [
    { id: "USR-001", name: "Piolo Daniele N. Janda", role: "Super Admin", status: "Active" },
    { id: "USR-002", name: "Rozi", role: "Systems Analyst", status: "Active" },
    { id: "USR-003", name: "Edmark", role: "Database Engineer", status: "Offline" }
  ];

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Node Directory</h1>
          <button style={{ padding: '12px 24px', background: '#1a3af5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>+ PROVISION NODE</button>
        </div>

        <div style={{ background: dark ? '#0f172a' : '#fff', borderRadius: '24px', border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ background: dark ? '#020617' : '#f8fafc', borderBottom: `2px solid ${dark ? '#1e293b' : '#e2e8f0'}` }}>
              <th style={{ padding: '24px 32px', fontSize: '13px', fontWeight: 800, color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>ID</th>
              <th style={{ padding: '24px 32px', fontSize: '13px', fontWeight: 800, color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Designation</th>
              <th style={{ padding: '24px 32px', fontSize: '13px', fontWeight: 800, color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Role Vector</th>
              <th style={{ padding: '24px 32px', fontSize: '13px', fontWeight: 800, color: dark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>State</th>
              <th style={{ padding: '24px 32px' }}></th>
            </tr>
            </thead>
            <tbody>
            {users.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: i !== users.length -1 ? `1px solid ${dark ? '#1e293b' : '#e2e8f0'}` : 'none' }}>
                  <td style={{ padding: '24px 32px', fontWeight: 800, color: dark ? '#64748b' : '#94a3b8', fontSize: '14px' }}>{u.id}</td>
                  <td style={{ padding: '24px 32px', fontWeight: 800, fontSize: '16px' }}>{u.name}</td>
                  <td style={{ padding: '24px 32px', fontWeight: 600, color: dark ? '#cbd5e1' : '#475569' }}>{u.role}</td>
                  <td style={{ padding: '24px 32px' }}>
                    <span style={{ background: u.status === 'Active' ? '#d1fae5' : '#f1f5f9', color: u.status === 'Active' ? '#059669' : '#64748b', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>{u.status}</span>
                  </td>
                  <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#1a3af5', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>EDIT</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

const About = () => {
  const { dark } = useTheme();
  return (
      <div style={{ padding: '64px 32px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🛡</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', margin: '0 0 24px 0' }}>CyberSafe TVI Architecture</h1>
        <p style={{ fontSize: '20px', color: dark ? '#94a3b8' : '#475569', lineHeight: 1.8, fontWeight: 500, margin: 0 }}>
          This system was engineered to handle complex data matrices and provide unbreakable routing architecture using React Router v6. It features the HORRAH optimization layer to guarantee absolute performance during load.
        </p>
      </div>
  );
};

const NotFound = () => {
  const { dark } = useTheme();
  return (
      <div style={{ padding: '120px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '120px', fontWeight: 900, color: '#ef4444', margin: '0 0 16px 0', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 24px 0' }}>DIRECTORY NOT FOUND</h2>
        <p style={{ fontSize: '18px', color: dark ? '#94a3b8' : '#475569', marginBottom: '40px' }}>The node you are attempting to access does not exist in the current configuration.</p>
        <Link to="/" style={{ padding: '16px 32px', background: '#1a3af5', color: '#fff', borderRadius: '12px', fontWeight: 800, textDecoration: 'none', fontSize: '16px' }}>RETURN TO HUB</Link>
      </div>
  );
};

const fakeNetworkDelay = () => new Promise(res => setTimeout(res, 800));

const authLoader = async () => {
  if (localStorage.getItem('cybersafe_tvi_token')) return redirect("/dashboard");
  return null;
};

const protectedLoader = async ({ request }: any) => {
  if (!localStorage.getItem('cybersafe_tvi_token')) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect(`/?${params.toString()}`);
  }
  return null;
};

const adminLoader = async ({ request }: any) => {
  const authCheck = await protectedLoader({ request });
  if (authCheck) return authCheck;
  const user = JSON.parse(localStorage.getItem('cybersafe_tvi_user') || '{}');
  if (user.role !== "admin") return redirect("/dashboard");
  return null;
};

const loginAction = async ({ request }: any) => {
  const formData = await request.formData();
  await fakeNetworkDelay();
  const email = formData.get("email") as string;
  const isPiolo = email.toLowerCase().includes('piolo');
  const role = email.toLowerCase().includes('admin') || isPiolo ? 'admin' : 'user';
  const user = {
    id: "SYS-" + Math.floor(Math.random() * 10000),
    name: isPiolo ? 'Piolo Daniele N. Janda' : email.split('@')[0],
    email,
    role,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email
  };
  localStorage.setItem('cybersafe_tvi_token', 'SECURE_TOKEN_XYZ');
  localStorage.setItem('cybersafe_tvi_user', JSON.stringify(user));
  return redirect("/dashboard");
};

const registerAction = async ({ request }: any) => {
  await fakeNetworkDelay();
  return redirect("/login");
};

const overviewLoader = async () => {
  await fakeNetworkDelay();
  return {
    latency: Math.floor(Math.random() * 20) + 10,
    threats: Math.floor(Math.random() * 500) + 100,
    nodes: 42,
    events: [
      { message: "HORRAH Module initialized successfully.", time: "08:00 AM", type: "success" },
      { message: "Minor packet loss detected on Sector 4.", time: "09:14 AM", type: "alert" },
      { message: "Admin Piolo Janda authenticated.", time: "10:02 AM", type: "success" }
    ]
  };
};

const productsLoader = async () => {
  await fakeNetworkDelay();
  return [
    { id: "hw-1", name: "Gigahertz Core GPU", desc: "Next-gen processing unit tailored for extreme rendering and computational heavy lifting.", price: "1,299", stock: 14, icon: "💻" },
    { id: "hw-2", name: "TVI Neural Engine", desc: "Dedicated hardware for CyberSafe threat vector identification algorithms.", price: "899", stock: 5, icon: "🧠" },
    { id: "hw-3", name: "Quantum RAM Array", desc: "Ultra-low latency memory modules for real-time HORRAH execution.", price: "450", stock: 0, icon: "⚡" }
  ];
};

const productDetailLoader = async ({ params }: any) => {
  await fakeNetworkDelay();
  return {
    id: params.productId,
    name: "Gigahertz Core System Component",
    longDesc: "This hardware piece is essential for maintaining the operational integrity of the CyberSafe TVI network. It guarantees 99.9% uptime during critical loads and interfaces perfectly with the HORRAH routing module.",
    price: "1,299",
    icon: "⚙"
  };
};

const createProductAction = async ({ request }: any) => {
  await fakeNetworkDelay();
  return redirect("/dashboard/products");
};

const supportAction = async ({ request }: any) => {
  await fakeNetworkDelay();
  return redirect("/");
};

const profileAction = async ({ request }: any) => {
  await fakeNetworkDelay();
  return null;
};

const adminStatsLoader = async () => {
  await fakeNetworkDelay();
  return {
    totalUsers: 142,
    activeServices: 28,
    threatLevel: "Minimal",
    load: 14
  };
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ThemeProvider>
          <AuthProvider>
            <TechRoot />
          </AuthProvider>
        </ThemeProvider>
    ),
    errorElement: <RootBoundary />,
    children: [
      {
        id: "public",
        path: "",
        element: <AuthLayout />,
        loader: authLoader,
        children: [
          { index: true, element: <TechHome /> },
          { path: "login", element: <Login />, action: loginAction },
          { path: "register", element: <Register />, action: registerAction },
        ],
      },
      {
        id: "protected",
        path: "dashboard",
        element: <DashboardLayout />,
        loader: protectedLoader,
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Overview />, loader: overviewLoader },
          {
            path: "products",
            children: [
              { index: true, element: <Products />, loader: productsLoader },
              { path: "new", element: <CreateProduct />, loader: adminLoader, action: createProductAction },
              { path: ":productId", element: <ProductDetail />, loader: productDetailLoader },
            ],
          },
          {
            path: "gaming",
            element: <Gaming />,
            children: [
              { index: true, element: <GameLibrary /> },
              { path: "library", element: <GameLibrary /> },
              { path: "stats", element: <GameStats /> },
            ]
          },
          { path: "support", element: <Support />, action: supportAction },
          {
            path: "settings",
            element: <Settings />,
            children: [
              { index: true, element: <ProfileSettings /> },
              { path: "profile", element: <ProfileSettings />, action: profileAction },
              { path: "security", element: <SecuritySettings /> },
            ]
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        loader: adminLoader,
        children: [
          { index: true, element: <AdminDashboard />, loader: adminStatsLoader },
          { path: "users", element: <UserManagement /> },
        ]
      },
      { path: "about", element: <About /> },
      { path: "support", element: <Support />, action: supportAction },
      { path: "*", element: <NotFound /> },
    ],
  },
]);