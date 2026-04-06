import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    padding: '8rem 2rem 4rem',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  heroBefore: {
    content: '""',
    position: 'absolute' as const,
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '600px',
    background: `radial-gradient(ellipse, rgba(92, 95, 253, 0.08) 0%, transparent 70%)`,
    pointerEvents: 'none' as const,
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative' as const,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: theme.colors.surfaceContainer,
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme.colors.primary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '2rem',
    border: '1px solid rgba(163, 166, 255, 0.2)',
  },
  h1: {
    fontSize: 'clamp(3rem, 10vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    maxWidth: '900px',
  },
  pi: {
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    color: theme.colors.onSurfaceVariant,
    maxWidth: '600px',
    marginBottom: '3rem',
    lineHeight: 1.5,
  },
  heroCta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.9375rem',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
    color: theme.colors.onPrimary,
  },
  btnSecondary: {
    background: theme.colors.surfaceContainerHighest,
    color: theme.colors.onSurface,
    border: `1px solid ${theme.colors.outlineVariant}`,
  },
  pillars: {
    padding: '6rem 2rem',
    background: theme.colors.surfaceContainerLow,
  },
  pillarsInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    background: theme.colors.outlineVariant,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  pillar: {
    background: theme.colors.surfaceContainer,
    padding: '2rem 1.5rem',
    textAlign: 'center' as const,
    transition: 'background 0.2s',
  },
  pillarNum: {
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.colors.primary,
    opacity: 0.6,
    marginBottom: '0.75rem',
  },
  pillarName: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme.colors.onSurface,
    lineHeight: 1.4,
  },
  features: {
    padding: '6rem 2rem',
  },
  featuresInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featuresHeader: {
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
  h2: {
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  featureCard: {
    background: theme.colors.surfaceContainer,
    borderRadius: '12px',
    padding: '2rem',
    transition: 'all 0.2s',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    background: theme.colors.surfaceContainerHighest,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  featureCardH3: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
  },
  featureCardP: {
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  codeSection: {
    padding: '6rem 2rem',
    background: theme.colors.surfaceContainerLow,
  },
  codeInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  codeTabs: {
    display: 'flex',
    gap: '0.5rem',
  },
  codeTab: (active: boolean) => ({
    padding: '0.5rem 1rem',
    background: active ? theme.colors.primaryDim : theme.colors.surfaceContainer,
    border: active ? `1px solid ${theme.colors.primary}` : '1px solid transparent',
    borderRadius: '6px',
    color: active ? theme.colors.onSurface : theme.colors.onSurfaceVariant,
    fontSize: '0.8125rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  codeBlock: {
    background: theme.colors.surfaceContainerLowest,
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  codeDots: {
    display: 'flex',
    gap: '6px',
    padding: '1rem 1.5rem',
    background: theme.colors.surfaceContainer,
    borderBottom: `1px solid ${theme.colors.surfaceContainerHigh}`,
  },
  codeDot: (color: string) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color,
  }),
  codeContent: {
    padding: '2rem',
    overflowX: 'auto' as const,
  },
  pre: {
    margin: 0,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
    fontSize: '0.8125rem',
    lineHeight: 1.8,
    color: theme.colors.onSurface,
  },
  comment: { color: theme.colors.onSurfaceVariant },
  key: { color: theme.colors.primary },
  string: { color: theme.colors.tertiary },
  punctuation: { color: theme.colors.onSurfaceVariant },
  quickstart: {
    padding: '6rem 2rem',
  },
  quickstartInner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  quickstartHeader: {
    textAlign: 'center' as const,
    marginBottom: '4rem',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  step: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start' as const,
  },
  stepNumber: {
    width: '48px',
    height: '48px',
    background: `linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: theme.colors.onPrimary,
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepContentH3: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  stepContentP: {
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.9375rem',
  },
  stepCode: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.8125rem',
    background: theme.colors.surfaceContainer,
    padding: '0.125rem 0.5rem',
    borderRadius: '4px',
    color: theme.colors.primary,
  },
  footer: {
    padding: '3rem 2rem',
    borderTop: `1px solid ${theme.colors.surfaceContainerHigh}`,
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '1.5rem',
  },
  footerLinks: {
    display: 'flex',
    gap: '2rem',
  },
  footerLink: {
    color: theme.colors.onSurfaceVariant,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
  },
  footerCopy: {
    color: theme.colors.onSurfaceVariant,
    fontSize: '0.8125rem',
  },
};

const pillars = [
  'Skill Composition',
  'Context Engineering',
  'Orchestration',
  'Persistence',
  'Quality Gates',
  'Permissions',
  'Ergonomics',
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6M9 13h6M9 17h4"/>
      </svg>
    ),
    title: '7 Pillar System',
    desc: 'Structured framework organizing all aspects of agent configuration into 7 interconnected pillars.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Prompts & Memory',
    desc: 'Advanced prompt engineering with persistent cross-session memory for context-aware behavior.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <path d="M9 12l2 2 4-4"/>
        <path d="M12 3a9 9 0 1 0 9 9"/>
      </svg>
    ),
    title: 'Quality Gates',
    desc: 'Automated validation with post-edit checks, pre-commit hooks, and conversation-end drift detection.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: '13 Atomic Skills',
    desc: 'Composable skill modules that extend pi with specialized functions and tools.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Permission Guards',
    desc: 'Auto-allow safe operations, gate dangerous ones. Balance flow with guardrails.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Continuous Improvement',
    desc: 'Audit your harness, identify gaps, improve iteratively. Maturity scoring 0-21.',
  },
];

const codeExamples = {
  settings: `{
  "skills": [".pi/skills"],
  "prompts": [".pi/prompts"],
  "permissions": {
    "allow": [
      "Bash(npm test *)",
      "Read",
      "Edit",
      "Write"
    ]
  },
  "hooks": [
    {
      "type": "PostToolUse",
      "matcher": "Edit|Write",
      "command": "bash hooks/pi-validate.sh"
    }
  ]
}`,
  memory: `# .pi/memory/MEMORY.md
# Memory Index

## User
- [User Role](user_role.md) — Senior eng, prefers terse

## Feedback
- [Testing](feedback_testing.md) — Use real DB in tests`,
  hooks: `#!/usr/bin/env bash
# hooks/pi-validate.sh

set -euo pipefail

FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty')
[[ -z "$FILE_PATH" ]] && exit 0

# Check for secrets
if grep -qiE '(AKIA|sk-|ghp_)' "$FILE_PATH"; then
    echo "BLOCKED: Potential secret detected"
    exit 2
fi`,
};

const steps = [
  { num: 1, title: 'Install Skills', desc: 'Copy the skills directory to your project and configure in .pi/settings.json' },
  { num: 2, title: 'Bootstrap', desc: 'Run /skill:pi-init to scaffold your project harness with prompts, memory, and permissions' },
  { num: 3, title: 'Audit', desc: 'Run /skill:pi-audit to score your harness and identify improvement areas' },
  { num: 4, title: 'Iterate', desc: 'Use /skill:pi-loop to continuously improve your harness over time' },
];

export function Home() {
  const [activeTab, setActiveTab] = React.useState('settings');

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={{ ...styles.heroBefore, position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: `radial-gradient(ellipse, rgba(92, 95, 253, 0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Elite-Grade Configuration Framework
          </div>
          <h1 style={styles.h1}>
            <span style={styles.pi}>Pi Harness</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Configuration framework for the pi coding agent. Build robust, maintainable agentic systems with a structured 7-pillar approach.
          </p>
          <div style={styles.heroCta}>
            <a href="#quickstart" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <Link to="/pillars" style={{ ...styles.btn, ...styles.btnSecondary }}>
              Learn the Pillars
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Pillars Section */}
      <section style={styles.pillars}>
        <div style={styles.pillarsInner}>
          <div style={styles.pillarsGrid}>
            {pillars.map((pillar, i) => (
              <div key={pillar} style={styles.pillar}>
                <div style={styles.pillarNum}>{i + 1}</div>
                <div style={styles.pillarName}>{pillar}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresInner}>
          <div style={styles.featuresHeader}>
            <div style={styles.sectionLabel}>Core Capabilities</div>
            <h2 style={styles.h2}>Everything you need to configure pi</h2>
            <p style={{ color: theme.colors.onSurfaceVariant, fontSize: '1.125rem', maxWidth: '500px' }}>
              A comprehensive framework for building production-ready agentic systems
            </p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureCardH3}>{f.title}</h3>
                <p style={styles.featureCardP}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section style={styles.codeSection}>
        <div style={styles.codeInner}>
          <div style={styles.codeHeader}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Quick Configuration</h2>
            <div style={styles.codeTabs}>
              {['settings', 'memory', 'hooks'].map((tab) => (
                <button
                  key={tab}
                  style={styles.codeTab(activeTab === tab)}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'settings' ? 'settings.json' : tab === 'memory' ? 'memory' : 'hooks'}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.codeBlock}>
            <div style={styles.codeDots}>
              <div style={styles.codeDot('#ff5f57')} />
              <div style={styles.codeDot('#febc2e')} />
              <div style={styles.codeDot('#28c840')} />
            </div>
            <div style={styles.codeContent}>
              <pre style={styles.pre}>
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section style={styles.quickstart} id="quickstart">
        <div style={styles.quickstartInner}>
          <div style={styles.quickstartHeader}>
            <div style={styles.sectionLabel}>Get Started</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Start</h2>
            <p style={{ color: theme.colors.onSurfaceVariant }}>Get running in under 5 minutes</p>
          </div>
          <div style={styles.steps}>
            {steps.map((step) => (
              <div key={step.num} style={styles.step}>
                <div style={styles.stepNumber}>{step.num}</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepContentH3}>{step.title}</h3>
                  <p style={styles.stepContentP}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLinks}>
            <Link to="/pillars" style={styles.footerLink}>Pillars</Link>
            <Link to="/skills" style={styles.footerLink}>Skills</Link>
            <Link to="/api" style={styles.footerLink}>API</Link>
            <a href="https://github.com/LSDIPPOLLC/pi-harness" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>GitHub</a>
          </div>
          <p style={styles.footerCopy}>MIT License • Built for pi coding agent</p>
        </div>
      </footer>
    </>
  );
}


