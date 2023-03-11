import { KeycloakWrapper } from 'keycloak';
import { Footer, Header } from 'layouts';
import { LandingPage } from 'pages';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <KeycloakWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </KeycloakWrapper>
    </Router>
  );
};

export default AppRouter;
