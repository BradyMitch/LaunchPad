import 'css/common.css';

import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import { AuthProvider, UserProvider } from 'providers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
);
