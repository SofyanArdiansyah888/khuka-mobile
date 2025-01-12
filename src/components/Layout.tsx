import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Pages where footer should be hidden
  const excludedPaths = ['/login', '/forgotpassword'];
  const showFooter = !excludedPaths.includes(location.pathname);

  return (
    <div className="layout-container">
      <main className="main-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
