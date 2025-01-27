import React from 'react';
import Footer from './Footer';
import ProdukDetailFooter from './ProdukDetailFooter';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Pages where footer should be hidden
  const excludedPaths = ['/login', '/forgotpassword'];
  const isProdukDetail = location.pathname.startsWith('/produk-detail/'); 
  const showFooter = !excludedPaths.includes(location.pathname) && !isProdukDetail;

  return (
    <div className="layout-container">
      <main className="main-content">{children}</main>
      {isProdukDetail ? <ProdukDetailFooter /> : showFooter && <Footer />}
    </div>
  );
};

export default Layout;
