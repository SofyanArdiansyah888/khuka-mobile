import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './hooks/useAuth';

import Home from './pages/Home';
import Login from './pages/Login';
import Produk from './pages/Produk';
import ProdukBundling from './pages/ProdukBundling';
import Keranjang from './pages/Keranjang';
import Riwayat from './pages/Riwayat';
import Akun from './pages/Akun';
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
            <Login onLogin={handleLogin} />
          </Route>

          {/* Layout wraps the protected routes */}
          <Layout>
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/home"
              component={Home}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/produk"
              component={Produk}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/produk-bundling"
              component={ProdukBundling}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/keranjang"
              component={Keranjang}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/riwayat"
              component={Riwayat}
            />
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              exact
              path="/akun"
              component={Akun}
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
