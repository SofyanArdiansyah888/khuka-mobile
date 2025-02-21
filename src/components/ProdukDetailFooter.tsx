import React, { useState } from 'react';
import { IonToast } from '@ionic/react';
import callcenter from '../assets/chat-bubble-typing.svg';
import closeBtn from '../assets/close.svg';
import { Produk } from '../entity/ProdukEntity';
import { baseImgURL } from '../utils/axios';
import { setItem,getItem } from '../utils/khukhaDBTemp';
import { useCart } from './CartContext';
import logo from '../assets/logo-khukha.png';
import './Footer.css';

interface ProdukDetailFooterProps {
  isKeranjang: () => void;
  isBeli: () => void;
  actionType: 'keranjang' | 'beli' | null;
  showHiddenDiv: boolean;
  setShowHiddenDiv: (value: boolean) => void;
  produk: Produk;
  userPoints: number; 
  userCashback: number;
}

const ProdukDetailFooter: React.FC<ProdukDetailFooterProps> = ({
  isKeranjang,
  isBeli,
  setShowHiddenDiv,
  showHiddenDiv,
  actionType,
  produk,
  userPoints,
  userCashback
}) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
   const { keranjangCount, setKeranjangCount } = useCart(); 

  const handleBeliClick = () => {
    console.log('beli clicked');
  };
  const handleKeranjangClick = async () => {
    if (produk) {
      const existingKeranjang = JSON.parse(await getItem('keranjang') || '[]');
  
      const isProductInCart = existingKeranjang.some(
        (item: any) => item.id === produk.id
      );
  
      if (isProductInCart) {
        setToastMessage(
          'Produk ini sudah ada di keranjang belanja anda sebelumnya. Pilih produk lainnya.'
        );
        setShowToast(true);
        setShowHiddenDiv(false);
        return;
      }
  
      setToastMessage('Tunggu sebentar yah...');
      setShowToast(true);
      setIsAddingToCart(true);
  
      setTimeout(() => {
        const newItem = {
          id: produk.id,
          link_gambar: produk.link_gambar,
          harga: produk.harga,
          total_harga: produk.harga * quantity,
          quantity: quantity,
          poin: userPoints,
          cashback: userCashback,
          judul:produk.judul
        };
  
        const updatedKeranjang = [...existingKeranjang, newItem];
        setItem('keranjang', JSON.stringify(updatedKeranjang));
        setKeranjangCount(updatedKeranjang.length);
        setToastMessage('Produk berhasil ditambahkan ke keranjang belanja.');
        setIsAddingToCart(false);
        setShowToast(true);
        setShowHiddenDiv(false);
      }, 1000);
    }
  };
  
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
              <h3>Rp. {new Intl.NumberFormat('id-ID').format(produk.harga * quantity)}</h3>
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
      <IonToast
  isOpen={showToast}
  message={toastMessage}
  position="middle"
  duration={2000}
  onDidDismiss={() => setShowToast(false)}
  style={{ '--background': 'black', '--color': 'white' }} // Sets background to black and text color to white
/>

    </div>
  );
};

export default ProdukDetailFooter;
