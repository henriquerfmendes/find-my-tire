import { createTheme, ThemeOptions } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/montserrat';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

declare module '@mui/material/styles' {
  interface Palette {
    cardHeader: string;
    filterPaper: string;
  }
  interface PaletteOptions {
    cardHeader: string;
    filterPaper: string;
  }
}

const colors = {
  background: '#2D2D2D',
  surface: '#393939',
  cardHeader: '#232323',
  filterPaper: '#323232',
  primary: '#3B82F6',
  primaryDark: '#2D2D2D',
  success: '#22C55E',
  error: '#EF4444',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: 'rgba(255,255,255,0.08)',
  badgeGreenBg: '#2D4D2D', 
  badgeRedBg: '#4D2D2D',
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: colors.border,
    cardHeader: colors.cardHeader,
    filterPaper: colors.filterPaper,
  },
  typography: {
    fontFamily: [
      'Inter',
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      color: colors.textPrimary,
    },
    h2: {
      fontWeight: 600,
      color: colors.textPrimary,
    },
    h3: {
      fontWeight: 600,
      color: colors.textPrimary,
    },
    h4: {
      fontWeight: 600,
      color: colors.textPrimary,
    },
    h5: {
      fontWeight: 500,
      color: colors.textPrimary,
    },
    h6: {
      fontWeight: 500,
      color: colors.textPrimary,
    },
    subtitle1: {
      fontWeight: 500,
      color: colors.textSecondary,
    },
    subtitle2: {
      fontWeight: 500,
      color: colors.textSecondary,
    },
    body1: {
      fontWeight: 400,
      color: colors.textPrimary,
    },
    body2: {
      fontWeight: 400,
      color: colors.textSecondary,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(100, 100, 101, 0.04)',
          color: colors.textPrimary,
          '&:hover': {
            background: 'transparent',
          },
        },
        contained: {
          background: 'rgba(100, 100, 101, 0.04)',
          color: '#fff',
          '&:hover': {
            background: colors.primaryDark,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: colors.filterPaper,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: colors.surface,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          background: colors.cardHeader,
          color: colors.textPrimary,
          '& .MuiCardHeader-title': {
            color: colors.textPrimary,
          },
          '& .MuiCardHeader-subheader': {
            color: colors.textSecondary,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          fontSize: '0.95em',
          padding: '0 10px',
        },
        colorSuccess: {
          backgroundColor: colors.badgeGreenBg,
          color: colors.success,
        },
        colorError: {
          backgroundColor: colors.badgeRedBg,
          color: colors.error,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: colors.border,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: colors.surface,
          color: colors.textPrimary,
          fontWeight: 600,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions, ptBR);

export default theme; 