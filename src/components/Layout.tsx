import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Pages where footer should be hidden
  const excludedPaths = ['/login', '/forgotpassword'];
  const isRewardDetail = location.pathname.startsWith('/reward-detail/');
  const isProdukDetail = location.pathname.startsWith('/produk-detail/');
  const isCheckout = location.pathname.startsWith('/checkout');
  const isPembayaran = location.pathname.startsWith('/pembayaran'); 
  const showFooter = !excludedPaths.includes(location.pathname) && !isProdukDetail  && !isCheckout && !isPembayaran && !isRewardDetail;

  return (
    <div className="layout-container">
     <main className={`main-content ${isProdukDetail ? 'produk-detail-page' : ''}`}>
      {children}
      {showFooter && <Footer />}
    </main>
    </div>
  );
};

export default Layout;
