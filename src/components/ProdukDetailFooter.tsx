import React from 'react';
import callcenter from '../assets/chat-bubble-typing.svg';
import './Footer.css';

interface ProdukDetailFooterProps {
    handleKeranjangClick: () => void;
  }

const ProdukDetailFooter: React.FC<ProdukDetailFooterProps> = ({ handleKeranjangClick }) => {
  return (
    <div className="footer footer-detail">
      <div className="footer-detail-wrap">
        <div className="call-center">
          <div>
            <img src={callcenter} alt="Home" />
          </div>
          <div>Call center</div>
        </div>
        <div className="keranjang" onClick={handleKeranjangClick}>+ Keranjang</div>
        <div className="beli bn-btn">Beli sekarang</div>
      </div>
    </div>
  );
};

export default ProdukDetailFooter;
