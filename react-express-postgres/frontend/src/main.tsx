import 'css/common.css';

import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import { KeycloakProvider } from 'keycloak';
import { UserProvider } from 'providers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

// Get configuration variables from API.
const configRes = await fetch(`/api/config`);
const configuration = await configRes.json();
(window as any).configuration = configuration;

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
