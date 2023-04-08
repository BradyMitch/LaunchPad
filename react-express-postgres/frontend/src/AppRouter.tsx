import { ErrorBoundary, Loading } from 'components/common';
import { KeycloakWrapper } from 'keycloak';
import { Footer, Header } from 'layouts';
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy loaded components.
const LandingPage = lazy(() => import('pages/LandingPage'));

const AppRouter = () => {
  useEffect(() => {
    async function fetchConfig() {
      const configRes = await fetch(`/api/config`);
      const configuration = await configRes.json();
      (window as Window).configuration = configuration;
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
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading pageLayout />}>
                    <LandingPage />
                  </Suspense>
                }
              />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </KeycloakWrapper>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
