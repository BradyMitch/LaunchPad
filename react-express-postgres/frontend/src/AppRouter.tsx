import { Footer, Header } from 'layouts';
import { LandingPage } from 'pages';
import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthService } from 'services/auth';

const AppRouter = () => {
  const { setUserInfo } = useAuthService();

  useEffect(() => {
    // Get the current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const token = searchParams.get('token');
    if (token) {
      setUserInfo(token);
      // Remove the 'paramToRemove' query parameter
      searchParams.delete('token');

      // Create a new URL with the updated search parameters
      const newUrl = `${url.origin}${
        url.pathname === '/' ? '' : url.pathname
      }${searchParams.toString()}`;

      // Update the URL without reloading the page
      window.history.pushState({}, '', newUrl);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
