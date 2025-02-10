import React, { useState, useEffect } from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonRouterLink } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import homeImage from '../assets/home.svg';
import homeActiveImage from '../assets/home-active.svg';
import produkImage from '../assets/produk.svg';
import produkActiveImage from '../assets/produk-active.svg';
import keranjangImage from '../assets/keranjang.svg';
import keranjangActiveImage from '../assets/keranjang-active.svg';
import riwayatImage from '../assets/riwayat.svg';
import riwayatActiveImage from '../assets/riwayat-active.svg';
import akunImage from '../assets/akun.svg';
import akunActiveImage from '../assets/akun-active.svg';
import rewardImage from '../assets/gift.svg';
import rewardActiveImage from '../assets/gift-active.svg';

// Import CSS for the footer
import './Footer.css';

const Footer: React.FC = () => {
  const location = useLocation();
  const [keranjangCount, setKeranjangCount] = useState<number>(0);
  // Function to calculate the number of items in the cart
  useEffect(() => {
    const storedKeranjang = JSON.parse(
      localStorage.getItem('keranjang') || '[]'
    );
    setKeranjangCount(storedKeranjang.length);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <IonTabBar className="footer" slot="bottom">
      <IonTabButton
        className="tab-button"
        tab="home"
        selected={isActive('/home')}
      >
        <IonRouterLink routerLink="/home">
          <img
            src={isActive('/home') ? homeActiveImage : homeImage}
            alt="Home"
          />
          <IonLabel
            className={isActive('/home') ? 'active-label' : 'inactive-label'}
          >
            Home
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton
        className="tab-button"
        tab="produk"
        selected={isActive('/produk')}
      >
        <IonRouterLink routerLink="/produk">
          <img
            src={isActive('/produk') ? produkActiveImage : produkImage}
            alt="Produk"
          />
          <IonLabel
            className={isActive('/produk') ? 'active-label' : 'inactive-label'}
          >
            Produk
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton
        className="tab-button"
        tab="keranjang"
        selected={isActive('/keranjang')}
      >
        <IonRouterLink routerLink="/keranjang">
        {keranjangCount > 0 && <div className="keranjang-count">{keranjangCount}</div>}
          <img
            src={isActive('/keranjang') ? keranjangActiveImage : keranjangImage}
            alt="Keranjang"
          />
          <IonLabel
            className={
              isActive('/keranjang') ? 'active-label' : 'inactive-label'
            }
          >
            Keranjang 
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton
        className="tab-button"
        tab="riwayat"
        selected={isActive('/riwayat')}
      >
        <IonRouterLink routerLink="/riwayat">
          <img
            src={isActive('/riwayat') ? riwayatActiveImage : riwayatImage}
            alt="Riwayat"
          />
          <IonLabel
            className={isActive('/riwayat') ? 'active-label' : 'inactive-label'}
          >
            Riwayat
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>
      <IonTabButton
        className="tab-button"
        tab="riwayat"
        selected={isActive('/riwayat')}
      >
        <IonRouterLink routerLink="/reward">
          <img
            src={isActive('/reward') ? rewardActiveImage : rewardImage}
            alt="Reward"
          />
          <IonLabel
            className={isActive('/reward') ? 'active-label' : 'inactive-label'}
          >
            Rewards
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton
        className="tab-button"
        tab="akun"
        selected={isActive('/akun')}
      >
        <IonRouterLink routerLink="/akun">
          <img
            src={isActive('/akun') ? akunActiveImage : akunImage}
            alt="Akun"
          />
          <IonLabel
            className={isActive('/akun') ? 'active-label' : 'inactive-label'}
          >
            Akun
          </IonLabel>
        </IonRouterLink>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
