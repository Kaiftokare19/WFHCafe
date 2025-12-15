import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './LandingPage';

function App() {
  return (
    <ThemeProvider>
      <MUIThemeProviderWrapper />
    </ThemeProvider>
  );
}

const MUIThemeProviderWrapper: React.FC = () => {
  const { mode } = useTheme();
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode as 'light' | 'dark',
          primary: {
            main: '#C4B66F', // Gold color
            light: '#D4C68F',
            dark: '#B4A64F',
          },
          secondary: {
            main: '#44A08D', // Teal color
            light: '#64B0A0',
            dark: '#24807A',
          },
          background: {
            default: mode === 'dark' ? '#000000' : '#FAFAFA',
            paper: mode === 'dark' ? '#051814' : '#FFFFFF',
          },
          text: {
            primary: mode === 'dark' ? '#E0E0E0' : '#051814',
            secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(5, 24, 20, 0.7)',
          },
        },
        typography: {
          fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
          h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontSize: '3.5rem',
            '@media (max-width:600px)': {
              fontSize: '2.5rem',
            },
          },
          h2: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontSize: '2.75rem',
            '@media (max-width:600px)': {
              fontSize: '2rem',
            },
          },
          h3: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontSize: '2.25rem',
            '@media (max-width:600px)': {
              fontSize: '1.75rem',
            },
          },
          h4: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
          },
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 12,
                  transition: 'all 0.3s ease',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage />
    </MUIThemeProvider>
  );
};

// Create a context hook
const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    return { mode: 'dark' };
  }
  return context;
};

// Create a dummy context
const ThemeContext = React.createContext({ mode: 'dark' });

export default App;