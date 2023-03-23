import { ErrorBoundary } from 'components/common';
import { KeycloakWrapper } from 'keycloak';
import { Footer, Header } from 'layouts';
import { LandingPage } from 'pages';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  useEffect(() => {
    async function fetchConfig() {
      const configRes = await fetch(`/api/config`);
      const configuration = await configRes.json();
      (window as any).configuration = configuration;
    }

    fetchConfig(); // Get configuration variables from API.
  }, []);

  return (
    <Router>
      <ErrorBoundary context="Wrapper of AppRouter.tsx">
        <KeycloakWrapper>
          <Header />
          <ErrorBoundary context="Routes of AppRouter.tsx">
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </KeycloakWrapper>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
