import React, { useState } from 'react';
import callcenter from '../assets/chat-bubble-typing.svg';
import closeBtn from '../assets/close.svg';
import { Produk } from '../entity/ProdukEntity';
import { baseImgURL } from '../utils/axios';
import logo from '../assets/logo-khukha.png';
import './Footer.css';

interface ProdukDetailFooterProps {
  handleKeranjangClick: () => void;
  handleBeliClick: () => void;
  isKeranjang: () => void;
  isBeli: () => void;
  actionType: 'keranjang' | 'beli' | null;
  showHiddenDiv: boolean;
  setShowHiddenDiv: (value: boolean) => void;
  produk: Produk;
}

const ProdukDetailFooter: React.FC<ProdukDetailFooterProps> = ({
  handleKeranjangClick,
  handleBeliClick,
  isKeranjang,
  isBeli,
  actionType,
  showHiddenDiv,
  setShowHiddenDiv,
  produk,
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="footer footer-detail">
      <div className="footer-detail-wrap">
        <div className="call-center">
          <div>
            <img src={callcenter} alt="Home" />
          </div>
          <div>Call center</div>
        </div>
        <div className="keranjang" onClick={isKeranjang}>
          + Keranjang
        </div>
        <div className="beli bn-btn" onClick={isBeli}>
          Beli sekarang
        </div>
      </div>

      {/* Hidden footer div */}
      {showHiddenDiv && (
        <div className="aksi_produk">
          <div className="hidden-produk">
            <div className="produk_thumb">
              <div className="produk-logo">
                <img src={logo} alt="" />
                <span>
                  OFFICIAL
                  <br />
                  STORE
                </span>
              </div>
              <img src={`${baseImgURL}produk/${produk.link_gambar}`} alt="" />
            </div>
            <div className="produk_data">
              <h3>Rp. {new Intl.NumberFormat('id-ID').format(produk.harga)}</h3>
              <span>Stok: 20</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="produk_qty">
            <div className="produk_qty_label">Jumlah</div>
            <div className="produk_qty_control">
              <button className="qty_btn" onClick={decreaseQuantity}>
                -
              </button>
              <div className="qty_value">{quantity}</div>
              <button className="qty_btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="produk_btn">
            {actionType === 'keranjang' && (
              <button className="keranjang_btn" onClick={handleKeranjangClick}>
                Masukkan Keranjang
              </button>
            )}
            {actionType === 'beli' && (
              <button className="beli_btn" onClick={handleBeliClick}>
                Beli Sekarang
              </button>
            )}
          </div>

          {/* Close Button */}
          <div className="close_popup" onClick={() => setShowHiddenDiv(false)}>
            <img src={closeBtn} alt="Close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdukDetailFooter;
