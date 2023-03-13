import { ErrorBoundary } from 'components/common';
import { KeycloakWrapper } from 'keycloak';
import { Footer, Header } from 'layouts';
import { LandingPage } from 'pages';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
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
