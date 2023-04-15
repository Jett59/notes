import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  }), [prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Hello</h1>
    </ThemeProvider>
  );
}
