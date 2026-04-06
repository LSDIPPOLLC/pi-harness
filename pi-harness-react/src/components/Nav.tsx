import { Link, useLocation } from 'react-router-dom';
import { theme } from '../theme';

const styles = {
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(14, 14, 14, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(72, 72, 71, 0.15)',
  },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: theme.colors.onSurface,
    textDecoration: 'none',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: `linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.colors.onPrimary,
  },
  navLinks: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
  },
  navLink: (active: boolean) => ({
    color: active ? theme.colors.primary : theme.colors.onSurfaceVariant,
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    borderBottom: active ? `2px solid ${theme.colors.primary}` : 'none',
    paddingBottom: '2px',
  }),
};

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/pillars', label: 'Pillars' },
  { path: '/skills', label: 'Skills' },
  { path: '/api', label: 'API' },
];

export function Nav() {
  const location = useLocation();
  
  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>π</div>
          <span>Harness</span>
        </Link>
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              style={styles.navLink(location.pathname === item.path)}
            >
              {item.label}
            </Link>
          ))}
          <a 
            href="https://github.com/LSDIPPOLLC/pi-harness" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.navLink(false)}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
