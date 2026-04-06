export const theme = {
  colors: {
    bg: '#0e0e0e',
    surface: '#0e0e0e',
    surfaceContainer: '#1a1a1a',
    surfaceContainerHigh: '#20201f',
    surfaceContainerHighest: '#262626',
    surfaceContainerLow: '#131313',
    surfaceContainerLowest: '#000000',
    primary: '#a3a6ff',
    primaryContainer: '#9396ff',
    primaryDim: '#5c5ffd',
    onPrimary: '#0e00a4',
    secondary: '#50e1f9',
    secondaryDim: '#3cd2eb',
    tertiary: '#c3ffcd',
    tertiaryDim: '#5bef90',
    onSurface: '#ffffff',
    onSurfaceVariant: '#adaaaa',
    error: '#ff6e84',
    outline: '#767575',
    outlineVariant: '#484847',
    gradientStart: '#5c5ffd',
    gradientEnd: '#3cd2eb',
  },
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  html { scroll-behavior: smooth; }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.onSurface};
    line-height: 1.6;
  }
  
  a { color: inherit; text-decoration: none; }
  
  code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  }
`;
