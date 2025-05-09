import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './common/hooks/useAuth';
import { CartProvider } from './components/CartContext'; // Import CartProvider

import HomeScreen from './pages/home/HomeScreen';
import LoginScreen from './pages/login/LoginScreen';
import ForgotScreen from './pages/login/Forgot';
import ProdukScreen from './pages/produk/ProdukScreen';
import ProdukDetail from './pages/produk-detail/ProdukDetailScreen';
import PromoDetail from './pages/promo-detail/PromoDetailScreen';
import KeranjangScreen from './pages/keranjang/KeranjangScreen';
import RiwayatScreen from './pages/riwayat/RiwayatScreen';
import RiwayatDetail from './pages/riwayat/riwayat-detail/RiwayatDetail';
import RewardScreen from './pages/reward/RewardScreen';
import RewardDetail from './pages/reward/detail/RewardDetail';
import AkunScreen from './pages/akun/AkunScreen';
import UbahPasswordPage from "./pages/akun/ubah-password/UbahPassword";
import RequestRedeemScreen from "./pages/akun/RequestRedeemScreen";
import MemberScreen from "./pages/akun/member/Member";
import DetailMemberScreen from "./pages/akun/member/Detail-Member";
import RiwayatRedeem from './pages/akun/RiwayatRedeem';
import DaftarMember from './pages/akun/daftar-member/Daftar';
import Profil from './pages/akun/profil/Profil';
import Checkout from './pages/checkout/Checkout';
import Pembayaran from './pages/checkout/Pembayaran';

import Layout from './components/Layout';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated, handleLogin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <IonApp>
      <CartProvider> {/* Wrap the entire app with CartProvider */}
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Public Route: Login */}
            <Route exact path="/login">
              <LoginScreen onLogin={handleLogin} />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotScreen/>
            </Route>

            {/* Layout wraps the protected routes */}
            <Layout>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/home">
                <HomeScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/produk">
                <ProdukScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/produk-detail/:id">
                <ProdukDetail />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/promo-detail/:id">
                <PromoDetail />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/keranjang">
                <KeranjangScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/checkout">
                <Checkout />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/pembayaran">
                <Pembayaran />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/riwayat">
                <RiwayatScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/detail-riwayat">
                <RiwayatDetail />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/reward">
                <RewardScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/reward-detail/:id">
                <RewardDetail />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun">
                <AkunScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/daftar-member">
                <DaftarMember />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/request-redeem">
                <RequestRedeemScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/riwayat-redeem">
                <RiwayatRedeem />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/list-member">
                <MemberScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/list-member/detail-member">
                <DetailMemberScreen />
              </PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/ubah-password"><UbahPasswordPage /></PrivateRoute>
              <PrivateRoute isAuthenticated={isAuthenticated} exact path="/akun/profil"><Profil /></PrivateRoute>
            </Layout>

            {/* Default redirect to /login or /home */}
            <Route exact path="/">
              <Redirect to={isAuthenticated ? '/home' : '/login'} />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </CartProvider> {/* Close CartProvider */}
    </IonApp>
  );
};

export default App;
