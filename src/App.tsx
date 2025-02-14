import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './common/hooks/useAuth';

import HomeScreen from './pages/home/HomeScreen';
import LoginScreen from './pages/login/LoginScreen';
import ProdukScreen from './pages/produk/ProdukScreen';
import ProdukDetail from './pages/produk-detail/ProdukDetailScreen';
import PromoDetail from './pages/promo-detail/PromoDetailScreen';
import KeranjangScreen from './pages/keranjang/KeranjangScreen';
import RiwayatScreen from './pages/riwayat/RiwayatScreen';
import RewardScreen from './pages/reward/RewardScreen';
import RewardDetail from './pages/reward/detail/RewardDetail';
import AkunScreen from './pages/akun/AkunScreen';
import Checkout from './pages/checkout/Checkout';
import DaftarMember from './pages/akun/daftar-member/Daftar';
import Profil from './pages/akun/profil/Profil';
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
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    // Simulate async loading (e.g., checking session or performing authentication checks)
    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Public Route: Login */}
          <Route exact path="/login">
            <LoginScreen onLogin={handleLogin} />
          </Route>

          {/* Layout wraps the protected routes */}
          <Layout>
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/home"
              component={HomeScreen}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/produk"
              component={ProdukScreen}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/produk-detail/:id"
              component={ProdukDetail}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/promo-detail/:id"
              component={PromoDetail}
            />
           
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/keranjang"
              component={KeranjangScreen}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/checkout"
              component={Checkout}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/riwayat"
              component={RiwayatScreen}
            />
             <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/reward"
              component={RewardScreen}
            />
             <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/reward-detail/:id"
              component={RewardDetail}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/akun"
              component={AkunScreen}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/akun/daftar-member"
              component={DaftarMember}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/akun/profil"
              component={Profil}
            />
          </Layout>

          {/* Default redirect to /login or /home */}
          <Route exact path="/">
            <Redirect to={isAuthenticated ? '/home' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
