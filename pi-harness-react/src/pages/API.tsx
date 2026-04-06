import { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '8rem 2rem 4rem',
  },
  pageHeader: {
    marginBottom: '4rem',
  },
  sectionLabel: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: theme.colors.secondary,
    marginBottom: '1rem',
  },
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: '4rem',
  },
  sectionH2: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${theme.colors.outlineVariant}`,
  },
  apiItem: {
    background: theme.colors.surfaceContainer,
    borderRadius: '12px',
    marginBottom: '1rem',
    overflow: 'hidden' as const,
  },
  apiHeader: {
    padding: '1.25rem 1.5rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 0.2s',
  },
  apiName: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  apiMethod: (color: string) => ({
    fontSize: '0.625rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    background: color,
    color: color === `rgba(163, 166, 255, 0.2)` ? theme.colors.primary : theme.colors.tertiary,
  }),
  apiTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  apiArrow: (open: boolean) => ({
    color: theme.colors.onSurfaceVariant,
    transition: 'transform 0.2s',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  apiBody: {
    padding: '0 1.5rem 1.5rem',
    borderTop: `1px solid ${theme.colors.outlineVariant}`,
  },
  apiBodyP: {
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.9375rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  apiCode: {
    background: theme.colors.surfaceContainerLowest,
    borderRadius: '8px',
    padding: '1rem',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.8125rem',
    overflowX: 'auto' as const,
  },
  apiCodeLine: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  type: { color: theme.colors.primary },
  param: { color: theme.colors.secondary },
  string: { color: theme.colors.tertiary },
  footer: {
    padding: '3rem 2rem',
    borderTop: `1px solid ${theme.colors.surfaceContainerHigh}`,
    textAlign: 'center' as const,
  },
  footerLink: {
    color: theme.colors.onSurfaceVariant,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
  },
};

interface ApiItem {
  method: 'PUT' | 'GET';
  title: string;
  desc: string;
  params?: { name: string; type: string; desc: string }[];
  returns?: string;
  example?: string;
}

const apiItems: ApiItem[] = [
  {
    method: 'PUT',
    title: '/skill:pi-init',
    desc: 'Bootstrap a new pi harness with recommended structure.',
    params: [
      { name: 'project', type: 'string', desc: 'Project name' },
      { name: 'template', type: 'string', desc: 'Template to use (default, minimal, full)' },
    ],
    returns: 'Harness structure object',
    example: '/skill:pi-init project=myapp template=full',
  },
  {
    method: 'GET',
    title: '/skill:pi-audit',
    desc: 'Audit the current harness configuration.',
    returns: 'Audit report with scores and recommendations',
    example: '/skill:pi-audit',
  },
  {
    method: 'PUT',
    title: '/skill:pi-scaffold',
    desc: 'Generate project-specific prompts and memory structure.',
    params: [
      { name: 'type', type: 'string', desc: 'Project type (react, node, python, etc.)' },
    ],
    example: '/skill:pi-scaffold type=react-ts',
  },
  {
    method: 'GET',
    title: '/skill:pi-memory',
    desc: 'Get current memory state and statistics.',
    returns: 'Memory index with categories and freshness indicators',
  },
  {
    method: 'PUT',
    title: '/skill:pi-memory/add',
    desc: 'Add a new memory entry.',
    params: [
      { name: 'category', type: 'string', desc: 'Memory category (user, project, feedback)' },
      { name: 'key', type: 'string', desc: 'Memory key' },
      { name: 'value', type: 'string', desc: 'Memory content' },
    ],
    example: '/skill:pi-memory/add category=user key=pref value="prefers terse output"',
  },
  {
    method: 'GET',
    title: '/skill:pi-permissions',
    desc: 'Get current permission configuration.',
    returns: 'Permission rules object with allow/deny lists',
  },
  {
    method: 'PUT',
    title: '/skill:pi-permissions/allow',
    desc: 'Add an allowed operation pattern.',
    params: [
      { name: 'pattern', type: 'string', desc: 'Operation pattern (e.g., Bash(npm *), Read, Write)' },
    ],
    example: '/skill:pi-permissions/allow pattern="Bash(git status)"',
  },
  {
    method: 'GET',
    title: '/skill:pi-hooks',
    desc: 'List all configured hooks.',
    returns: 'Array of hook configurations',
  },
  {
    method: 'PUT',
    title: '/skill:pi-hooks/add',
    desc: 'Add a new hook.',
    params: [
      { name: 'type', type: 'string', desc: 'Hook type (PostToolUse, PreToolUse, Stop)' },
      { name: 'matcher', type: 'string', desc: 'Tool name pattern to match' },
      { name: 'command', type: 'string', desc: 'Command to execute' },
    ],
    example: '/skill:pi-hooks/add type=PostToolUse matcher=Edit command="bash lint.sh"',
  },
  {
    method: 'GET',
    title: '/skill:pi-loop',
    desc: 'Run continuous improvement loop once.',
    returns: 'Improvement report with changes made',
    example: '/skill:pi-loop iterations=3',
  },
];

function ApiAccordion({ item }: { item: ApiItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.apiItem}>
      <div style={styles.apiHeader} onClick={() => setOpen(!open)}>
        <div style={styles.apiName}>
          <span style={styles.apiMethod(item.method === 'PUT' ? 'rgba(163, 166, 255, 0.2)' : 'rgba(195, 255, 205, 0.2)')}>
            {item.method}
          </span>
          <span style={styles.apiTitle}>{item.title}</span>
        </div>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={styles.apiArrow(open)}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
      {open && (
        <div style={styles.apiBody}>
          <p style={styles.apiBodyP}>{item.desc}</p>
          {item.params && (
            <>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.onSurfaceVariant, marginBottom: '0.5rem' }}>
                Parameters
              </div>
              {item.params.map((p) => (
                <div key={p.name} style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.colors.secondary }}>{p.name}</span>
                  <span style={{ color: theme.colors.onSurfaceVariant }}>: </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.colors.primary, fontSize: '0.75rem' }}>{p.type}</span>
                  <span style={{ color: theme.colors.onSurfaceVariant }}> — {p.desc}</span>
                </div>
              ))}
            </>
          )}
          {item.returns && (
            <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: theme.colors.onSurfaceVariant }}>Returns: </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.colors.tertiary }}>{item.returns}</span>
            </div>
          )}
          {item.example && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.onSurfaceVariant, marginBottom: '0.5rem' }}>
                Example
              </div>
              <code style={styles.apiCode}>
                <span style={styles.apiCodeLine}>{item.example}</span>
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function API() {
  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div style={styles.sectionLabel}>Reference</div>
        <h1 style={styles.h1}>API Reference</h1>
        <p style={styles.subtitle}>Skill commands and their parameters.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionH2}>Skills API</h2>
        {apiItems.map((item) => (
          <ApiAccordion key={item.title} item={item} />
        ))}
      </div>

      <footer style={styles.footer}>
        <Link to="/" style={styles.footerLink}>← Back to Home</Link>
      </footer>
    </div>
  );
}
