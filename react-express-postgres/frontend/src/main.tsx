import 'css/common.css';

import { KeycloakProvider } from '@bcgov/keycloak-react';
import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from 'state/providers';
import theme from 'theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </UserProvider>
    </KeycloakProvider>
  </React.StrictMode>,
);
