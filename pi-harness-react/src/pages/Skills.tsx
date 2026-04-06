import { Link } from 'react-router-dom';
import { theme } from '../theme';

const styles = {
  container: {
    maxWidth: '1200px',
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
    maxWidth: '600px',
  },
  section: {
    marginBottom: '4rem',
  },
  sectionH2: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  skillCard: {
    background: theme.colors.surfaceContainer,
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.2s',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  skillPill: (color: string) => ({
    display: 'inline-block',
    fontSize: '0.625rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    marginBottom: '0.75rem',
    background: color,
    color: color === `rgba(163, 166, 255, 0.2)` ? theme.colors.primary : color === `rgba(195, 255, 205, 0.2)` ? theme.colors.tertiary : theme.colors.secondary,
  }),
  skillCardH3: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  skillCardP: {
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.875rem',
    marginBottom: '1rem',
  },
  skillCode: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    background: theme.colors.surfaceContainerLowest,
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    color: theme.colors.primary,
  },
  skillTriggers: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: `1px solid ${theme.colors.outlineVariant}`,
    fontSize: '0.75rem',
    color: theme.colors.onSurfaceVariant,
  },
  skillTriggersStrong: {
    color: theme.colors.onSurface,
  },
  codeExample: {
    background: theme.colors.surfaceContainerLowest,
    borderRadius: '12px',
    overflow: 'hidden',
    margin: '2rem 0',
  },
  codeHeader: {
    padding: '1rem 1.5rem',
    background: theme.colors.surfaceContainer,
    borderBottom: `1px solid ${theme.colors.outlineVariant}`,
    fontSize: '0.75rem',
    color: theme.colors.onSurfaceVariant,
  },
  codeContent: {
    padding: '1.5rem',
  },
  pre: {
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.8125rem',
    lineHeight: 1.8,
  },
  comment: { color: theme.colors.onSurfaceVariant },
  keyword: { color: theme.colors.primary },
  string: { color: theme.colors.tertiary },
  operator: { color: theme.colors.secondary },
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

const masterSkills = [
  {
    title: 'pi-engineer',
    desc: 'Master router that dispatches to the right specialist skill based on your request.',
    code: '/skill:pi-engineer',
    triggers: 'Triggers: "set up pi", "improve my harness", "audit my setup"',
  },
  {
    title: 'pi-init',
    desc: 'Bootstrap a complete pi harness from scratch. Orchestrates scaffold, permissions, memory, and hooks.',
    code: '/skill:pi-init',
    triggers: 'Triggers: "initialize harness", "bootstrap this project"',
  },
  {
    title: 'pi-loop',
    desc: 'Continuous improvement cycle: audit, identify weakest pillar, improve, validate, repeat.',
    code: '/skill:pi-loop',
    triggers: 'Triggers: "improve my harness", "keep improving"',
  },
  {
    title: 'pi-audit',
    desc: 'Evaluate harness maturity across all 7 pillars. Scores 0-21 with detailed recommendations.',
    code: '/skill:pi-audit',
    triggers: 'Triggers: "audit my harness", "check my setup"',
  },
];

const atomicSkills = [
  { title: 'pi-scaffold', category: 'Context', desc: 'Generate project-tailored prompts in .pi/prompts/ and setup harness structure.', code: '/skill:pi-scaffold' },
  { title: 'pi-context', category: 'Context', desc: 'Optimize what pi loads and when. Design context layers for maximum efficiency.', code: '/skill:pi-context' },
  { title: 'pi-memory', category: 'Persistence', desc: 'Design and maintain cross-session memory. User, feedback, project, and reference memories.', code: '/skill:pi-memory' },
  { title: 'pi-permissions', category: 'Safety', desc: 'Configure permission boundaries. Auto-allow safe ops, gate dangerous ones.', code: '/skill:pi-permissions' },
  { title: 'pi-hooks', category: 'Quality', desc: 'Implement automated behaviors: format-on-save, lint-on-edit, secret scanning.', code: '/skill:pi-hooks' },
  { title: 'pi-gates', category: 'Quality', desc: 'Design quality gates and feedback loops. Post-edit, pre-commit, pre-push validation.', code: '/skill:pi-gates' },
  { title: 'pi-skills', category: 'Composition', desc: 'Analyze workflows and decompose into skill system. Identify gaps and overlaps.', code: '/skill:pi-skills' },
  { title: 'pi-routing', category: 'Orchestration', desc: 'Design agent orchestration strategies. Parallel vs serialize, subagent delegation.', code: '/skill:pi-routing' },
  { title: 'pi-ergonomics', category: 'Ergonomics', desc: 'Tune interaction style: verbosity, trust level, output format, feedback capture.', code: '/skill:pi-ergonomics' },
];

const mcpSkills = [
  {
    title: 'Playwright MCP',
    desc: 'Browser automation via Playwright MCP. Navigate pages, extract content, fill forms, take screenshots.',
    code: '.pi/extensions/playwright-mcp.ts',
    triggers: 'Tools: browser_navigate, browser_screenshot, browser_click, browser_fill, browser_evaluate',
  },
  {
    title: 'Custom MCP',
    desc: 'Add any MCP server as a pi extension. Connect to code generation, search, or custom tools.',
    code: '.pi/extensions/*.ts',
    triggers: 'Pattern: Register MCP tools via ExtensionAPI',
  },
];

const pillColors: Record<string, string> = {
  Master: 'rgba(163, 166, 255, 0.2)',
  Composed: 'rgba(80, 225, 249, 0.2)',
  Atomic: 'rgba(195, 255, 205, 0.2)',
  MCP: 'rgba(195, 255, 205, 0.2)',
};

const SkillCard = ({ skill, type }: { skill: typeof masterSkills[0]; type: string }) => (
  <div style={styles.skillCard}>
    <span style={styles.skillPill(pillColors[type] || pillColors.Atomic)}>{type}</span>
    <h3 style={styles.skillCardH3}>{skill.title}</h3>
    <p style={styles.skillCardP}>{skill.desc}</p>
    <code style={styles.skillCode}>{skill.code}</code>
    {'triggers' in skill && skill.triggers && (
      <div style={styles.skillTriggers}>
        <strong style={styles.skillTriggersStrong}>{skill.triggers.split(':')[0]}:</strong>
        {skill.triggers.split(':')[1]}
      </div>
    )}
  </div>
);

export function Skills() {
  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div style={styles.sectionLabel}>Extension Modules</div>
        <h1 style={styles.h1}>Skills</h1>
        <p style={styles.subtitle}>Composable skill modules that extend pi with specialized capabilities.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionH2}>Master Skills</h2>
        <p style={{ color: theme.colors.onSurfaceVariant, marginBottom: '1.5rem' }}>
          Core routing and orchestration skills that coordinate other skills.
        </p>
        <div style={styles.skillsGrid}>
          {masterSkills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} type="Master" />
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionH2}>Atomic Skills</h2>
        <p style={{ color: theme.colors.onSurfaceVariant, marginBottom: '1.5rem' }}>
          Single-purpose skills that do one thing well.
        </p>
        <div style={styles.skillsGrid}>
          {atomicSkills.map((skill) => (
            <div key={skill.title} style={styles.skillCard}>
              <span style={styles.skillPill(pillColors.Atomic)}>{skill.category}</span>
              <h3 style={styles.skillCardH3}>{skill.title}</h3>
              <p style={styles.skillCardP}>{skill.desc}</p>
              <code style={styles.skillCode}>{skill.code}</code>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionH2}>Using Skills</h2>
        
        <div style={styles.codeExample}>
          <div style={styles.codeHeader}>Invoking Skills</div>
          <div style={styles.codeContent}>
            <pre style={styles.pre}>
              <code>
                <span style={styles.comment}>// Direct skill invocation</span>
                <span style={styles.keyword}>/skill:</span>pi-audit
              </code>
            </pre>
          </div>
        </div>

        <div style={styles.codeExample}>
          <div style={styles.codeHeader}>Skill Composition</div>
          <div style={styles.codeContent}>
            <pre style={styles.pre}>
              <code>
                <span style={styles.comment}>// pi-init orchestrates multiple skills:</span>
                pi-init <span style={styles.operator}>=</span> pi-scaffold <span style={styles.operator}>+</span> pi-permissions <span style={styles.operator}>+</span> pi-memory <span style={styles.operator}>+</span> pi-hooks
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionH2}>MCP Extensions</h2>
        <p style={{ color: theme.colors.onSurfaceVariant, marginBottom: '1.5rem' }}>
          Pi supports MCP (Model Context Protocol) via extensions. Add MCP servers to extend pi with browser automation, file system access, and more.
        </p>
        <div style={styles.skillsGrid}>
          {mcpSkills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} type="MCP" />
          ))}
        </div>

        <div style={styles.codeExample}>
          <div style={styles.codeHeader}>Available Playwright Tools</div>
          <div style={styles.codeContent}>
            <pre style={styles.pre}>
              <code>
                <span style={styles.comment}>// Browser automation tools registered as:</span>
                <span style={styles.keyword}>/skill:</span>playwright_browser_navigate     <span style={styles.comment}>// Navigate to URL</span>
                <span style={styles.keyword}>/skill:</span>playwright_browser_screenshot  <span style={styles.comment}>// Take page screenshot</span>
                <span style={styles.keyword}>/skill:</span>playwright_browser_click       <span style={styles.comment}>// Click element</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <Link to="/" style={styles.footerLink}>← Back to Home</Link>
      </footer>
    </div>
  );
}
