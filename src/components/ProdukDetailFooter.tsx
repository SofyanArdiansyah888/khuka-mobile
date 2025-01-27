import React from 'react';
// Import images from the assets folder
import callcenter from '../assets/chat-bubble-typing.svg';
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

const ProdukDetailFooter: React.FC = () => {
  return (
    <div className="footer footer-detail">
      <div className="footer-detail-wrap">
        <div className="call-center">
          <div>
            <img src={callcenter} alt="Home" />
          </div>
          <div>Call center</div>
        </div>
        <div className="keranjang">Keranjang</div>
        <div className="beli">Beli sekarang</div>
      </div>
    </div>
  );
};

export default ProdukDetailFooter;
