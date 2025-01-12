import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonRouterLink } from '@ionic/react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

// Import images from the assets folder
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

// Import CSS for the footer
import './Footer.css';

const Footer: React.FC = () => {
  const location = useLocation(); // This hook helps to track the current route

  // Function to determine if the current tab is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <IonTabBar className="footer" slot="bottom">
      <IonTabButton className="tab-button" tab="home" selected={isActive('/home')}>
        <IonRouterLink routerLink="/home">
          <img
            src={isActive('/home') ? homeActiveImage : homeImage}
            alt="Home"
          />
          <IonLabel className={isActive('/home') ? 'active-label' : 'inactive-label'}>Home</IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton className="tab-button" tab="produk" selected={isActive('/produk')}>
        <IonRouterLink routerLink="/produk">
          <img
            src={isActive('/produk') ? produkActiveImage : produkImage}
            alt="Produk"
          />
          <IonLabel className={isActive('/produk') ? 'active-label' : 'inactive-label'}>Produk</IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton className="tab-button" tab="keranjang" selected={isActive('/keranjang')}>
        <IonRouterLink routerLink="/keranjang">
          <img
            src={isActive('/keranjang') ? keranjangActiveImage : keranjangImage}
            alt="Keranjang"
          />
          <IonLabel className={isActive('/keranjang') ? 'active-label' : 'inactive-label'}>Keranjang</IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton className="tab-button" tab="riwayat" selected={isActive('/riwayat')}>
        <IonRouterLink routerLink="/riwayat">
          <img
            src={isActive('/riwayat') ? riwayatActiveImage : riwayatImage}
            alt="Riwayat"
          />
          <IonLabel className={isActive('/riwayat') ? 'active-label' : 'inactive-label'}>Riwayat</IonLabel>
        </IonRouterLink>
      </IonTabButton>

      <IonTabButton className="tab-button" tab="akun" selected={isActive('/akun')}>
        <IonRouterLink routerLink="/akun">
          <img
            src={isActive('/akun') ? akunActiveImage : akunImage}
            alt="Akun"
          />
          <IonLabel className={isActive('/akun') ? 'active-label' : 'inactive-label'}>Akun</IonLabel>
        </IonRouterLink>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
