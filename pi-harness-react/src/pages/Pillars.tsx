import { Link } from 'react-router-dom';
import { theme } from '../theme';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '8rem 2rem 4rem',
  },
  pageHeader: {
    textAlign: 'center' as const,
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
    maxWidth: '600px',
    margin: '0 auto',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    margin: '3rem 0',
    padding: '2rem',
    background: theme.colors.surfaceContainer,
    borderRadius: '12px',
  },
  stat: {
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: '0.75rem',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginTop: '0.5rem',
  },
  pillarCard: {
    background: theme.colors.surfaceContainer,
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  pillarCardBefore: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: `linear-gradient(180deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
  },
  pillarHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    marginBottom: '1rem',
  },
  pillarNum: {
    width: '48px',
    height: '48px',
    background: theme.colors.surfaceContainerHighest,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.colors.primary,
    flexShrink: 0,
  },
  pillarTitle: {
    flex: 1,
  },
  pillarTitleH2: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
  skillRef: {
    fontSize: '0.75rem',
    fontFamily: "'JetBrains Mono', monospace",
    color: theme.colors.secondary,
  },
  pillarQuestion: {
    fontStyle: 'italic',
    color: theme.colors.primary,
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  pillarDesc: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: '1.5rem',
  },
  pillarCardH3: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: theme.colors.onSurfaceVariant,
    marginBottom: '1rem',
  },
  checklist: {
    listStyle: 'none',
  },
  checklistLi: {
    padding: '0.5rem 0',
    paddingLeft: '1.5rem',
    position: 'relative' as const,
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.9375rem',
  },
  checklistLiBefore: {
    content: '"✓"',
    position: 'absolute' as const,
    left: 0,
    color: theme.colors.tertiary,
    fontWeight: 600,
  },
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

const pillars = [
  {
    num: 1,
    title: 'Skill Composition',
    skillRef: '→ pi-skills',
    question: '"What should pi be able to do?"',
    desc: 'What atomic skills and composed workflows the project needs. Skills capture complex workflows so pi can execute them reliably without re-explanation.',
    checklist: [
      'Project-specific skills or commands exist',
      'Skills have clear triggers and bounded scope',
      'Skill composition chains atomic skills together',
    ],
  },
  {
    num: 2,
    title: 'Context Engineering',
    skillRef: '→ pi-context, pi-scaffold',
    question: '"What does pi need to know?"',
    desc: 'What information pi loads and when. Context budget analysis, prompt organization, and progressive disclosure design.',
    checklist: [
      'Always-loaded prompts (project.md, style.md)',
      'On-demand prompts (deploy.md, migrate.md)',
      'Discovered at runtime (file contents, git history)',
      'Persistent memory (user, feedback, project)',
    ],
  },
  {
    num: 3,
    title: 'Orchestration & Routing',
    skillRef: '→ pi-routing',
    question: '"How should work be distributed?"',
    desc: 'How tasks route to specialist agents. Parallel vs serialize decisions, subagent delegation patterns, and build-loop workflows.',
    checklist: [
      'Subagent for independent, expensive tasks',
      'Inline for trivial tasks or tight iteration',
      'Parallel for independent research queries',
      'Serialize for state-changing sequences',
    ],
  },
  {
    num: 4,
    title: 'Persistence & State',
    skillRef: '→ pi-memory',
    question: '"What should pi remember?"',
    desc: 'Cross-session memory and knowledge. What persists, what doesn\'t, and how memories are organized and maintained.',
    checklist: [
      'User - role, preferences, expertise level',
      'Feedback - corrections AND confirmations',
      'Project - ongoing work, decisions, deadlines',
      'Reference - external systems, URLs',
    ],
  },
  {
    num: 5,
    title: 'Quality Gates',
    skillRef: '→ pi-gates, pi-hooks',
    question: '"How do we catch mistakes early?"',
    desc: 'Automated validation and feedback loops. Post-edit checks, pre-commit gates, and conversation-end drift detection.',
    checklist: [
      'Post-edit: Format, lint, parse validation',
      'Pre-commit: Changed-file checks (<10s)',
      'Pre-push: Full test suite (<2min)',
      'Conversation-end: Harness health check',
    ],
  },
  {
    num: 6,
    title: 'Permissions & Safety',
    skillRef: '→ pi-permissions',
    question: '"What can pi do without asking?"',
    desc: 'Permission boundaries: auto-allow safe operations, gate dangerous ones. Balance flow with guardrails.',
    checklist: [
      'Local + reversible = auto-allow (read, format, test)',
      'Local + hard-to-reverse = prompt (delete, reset)',
      'Shared state = always prompt (push, deploy)',
      'External systems = always prompt (API calls)',
    ],
  },
  {
    num: 7,
    title: 'Ergonomics & Trust',
    skillRef: '→ pi-ergonomics',
    question: '"How should pi communicate?"',
    desc: 'Interaction style and trust calibration. Verbosity, autonomy level, output format, and feedback capture.',
    checklist: [
      'Level 1: New user - confirm everything, verbose',
      'Level 2: Established - routine auto, confirm destructive',
      'Level 3: Power user - autonomous, terse',
    ],
  },
];

export function Pillars() {
  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div style={styles.sectionLabel}>Framework Foundation</div>
        <h1 style={styles.h1}>The 7 Pillars</h1>
        <p style={styles.subtitle}>
          Every aspect of pi configuration maps to one of seven foundational pillars. Together they form a comprehensive harness.
        </p>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.statValue}>7</div>
          <div style={styles.statLabel}>Pillars</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>21</div>
          <div style={styles.statLabel}>Max Score</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>13</div>
          <div style={styles.statLabel}>Atomic Skills</div>
        </div>
      </div>

      {pillars.map((pillar) => (
        <div key={pillar.num} style={styles.pillarCard}>
          <div style={styles.pillarCardBefore} />
          <div style={styles.pillarHeader}>
            <div style={styles.pillarNum}>{pillar.num}</div>
            <div style={styles.pillarTitle}>
              <h2 style={styles.pillarTitleH2}>{pillar.title}</h2>
              <span style={styles.skillRef}>{pillar.skillRef}</span>
            </div>
          </div>
          <p style={styles.pillarQuestion}>{pillar.question}</p>
          <p style={styles.pillarDesc}>{pillar.desc}</p>
          <h3 style={styles.pillarCardH3}>{pillar.num === 1 ? 'What Gets Scored' : pillar.num === 3 ? 'Decision Matrix' : pillar.num === 4 ? 'Memory Types' : pillar.num === 5 ? 'Gate Layers' : pillar.num === 6 ? 'Blast Radius Principle' : pillar.num === 7 ? 'Trust Levels' : 'Context Layers'}</h3>
          <ul style={styles.checklist}>
            {pillar.checklist.map((item) => (
              <li key={item} style={{ ...styles.checklistLi, paddingLeft: '1.5rem' }}>
                <span style={{ position: 'absolute', left: 0, color: theme.colors.tertiary, fontWeight: 600 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <footer style={styles.footer}>
        <Link to="/" style={styles.footerLink}>← Back to Home</Link>
      </footer>
    </div>
  );
}
