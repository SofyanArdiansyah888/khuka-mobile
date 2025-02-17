import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Pages where footer should be hidden
  const excludedPaths = ['/login', '/forgotpassword'];
  const isProdukDetail = location.pathname.startsWith('/produk-detail/'); 
  const isCheckout = location.pathname.startsWith('/checkout'); 
  const showFooter = !excludedPaths.includes(location.pathname) && !isProdukDetail  && !isCheckout;

  return (
    <div className="layout-container">
      <main className="main-content">{children}
      {showFooter && <Footer />}
      </main>
      
    </div>
  );
};

export default Layout;
