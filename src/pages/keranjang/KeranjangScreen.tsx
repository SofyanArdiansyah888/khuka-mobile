import React, { useEffect, useState } from 'react';
import { IonContent, IonFooter, IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { pesananData,PesananProduk,updatePesananData } from '../../utils/pesananData';
import Swal from 'sweetalert2';
import keranjangkosong from '../../assets/keranjang-kosong.svg';
import logo from '../../assets/logo-khukha.png';
import './Keranjang.css';

const KeranjangScreen: React.FC = () => {
  const [keranjangData, setKeranjangData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storedKeranjang = JSON.parse(
      localStorage.getItem('keranjang') || '[]'
    );
    setKeranjangData(storedKeranjang.reverse()); // Reverse to show newest items first
  }, []);
 
  const updateQuantity = (index: number, newQuantity: number) => {
    setKeranjangData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].quantity = newQuantity;
      updatedData[index].total_harga = updatedData[index].harga * newQuantity;
      localStorage.setItem('keranjang', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const increaseQuantity = (index: number) => {
    updateQuantity(index, keranjangData[index].quantity + 1);
  };

  const decreaseQuantity = (index: number) => {
    if (keranjangData[index].quantity > 1) {
      updateQuantity(index, keranjangData[index].quantity - 1);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    Swal.fire({
      title: `Hapus ${selectedItems.length} barang?`,
      text: 'Produk yang kamu pilih akan dihapus dari keranjang',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Hapus',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedKeranjang = keranjangData.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setKeranjangData(updatedKeranjang);
        localStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
        setSelectedItems([]);
      }
    });
    
  };

  // Calculate total price when produk selected
  const totalBiaya = keranjangData
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.total_harga, 0);

    const handleCheckout = () => {
      if (selectedItems.length === 0) {
        setShowToast(true); // Show toast if nothing is selected
        return;
      }
    
      // Get only the selected products
      const selectedProduk: PesananProduk[] = keranjangData
        .filter((item) => selectedItems.includes(item.id))
        .map((item) => ({
          id_produk: item.id,
          quantity: item.quantity,
          harga: item.harga,
          total_harga: item.total_harga,
        }));
    
      // Update pesananData with total pembayaran and selected products
      updatePesananData({
        total_pembayaran: totalBiaya,
        pesananproduk: selectedProduk, // Add selected products
      });
    
      console.log('Updated Pesanan Data:', JSON.stringify(pesananData, null, 2));
    
      // Proceed to checkout
      // history.push('/checkout');
    };
    

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">Keranjang Saya</h4>
          <p className="header_subtitle">Kumpulkan poin dan cashback</p>
        </div>

        {keranjangData.length === 0 ? (
          <div className="keranjang-kosong">
            <div className="img-wrap">
              <img src={keranjangkosong} alt="Keranjang Kosong" />
            </div>
            <p className="keranjang-title">Keranjang belanja masih kosong</p>
            <p className="keranjang-subtitle">
              Kumpulkan poin dan tukarkan dengan uang tunai
            </p>
            <div
              className="belanja-sekarang bn-btn"
              onClick={() => history.push('/produk')}
            >
              Belanja Sekarang
            </div>
          </div>
        ) : (
          <>
            {selectedItems.length > 0 && (
              <div className="hapus_keranjang with_bottom_border padding-lr-20">
                <div className="hapus_text">
                  {selectedItems.length} Produk terpilih
                </div>
                <div className="hapus_aksi" onClick={handleDelete}>
                  Hapus
                </div>
              </div>
            )}
            <div className="padding-lr-20">
              {keranjangData.map((item, index) => (
                <div key={index} className="keranjang-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span className="checkbox-custom"></span>
                  </label>

                  <div className="isi_keranjang">
                    <div className="keranjang_img_produk produk_thumb">
                      <div className="produk-logo">
                        <img src={logo} alt="" />
                        <span>
                          OFFICIAL
                          <br />
                          STORE
                        </span>
                      </div>
                      <img
                        src={`${baseImgURL}produk/${item.link_gambar}`}
                        alt=""
                      />
                    </div>
                    <div className="keranjang_produk_desc">
                      <h4>{item.judul}</h4>
                      <div className="produk_info_desc">
                        <p>
                          Harga:{' '}
                          <span className="hargax">
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(item.harga)}
                          </span>
                        </p>
                        <p>
                          Cashback:{' '}
                          <span>
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(
                              item.cashback
                            )}
                          </span>
                        </p>
                        <p>
                          Poin: <span>{item.poin}</span>
                        </p>
                        <div className="produk_qty_control">
                          <button
                            className="qty_btn"
                            onClick={() => decreaseQuantity(index)}
                          >
                            -
                          </button>
                          <div className="qty_value">{item.quantity}</div>
                          <button
                            className="qty_btn"
                            onClick={() => increaseQuantity(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </IonContent>
      {keranjangData.length > 0 && (
        <IonFooter className="checkout_footer">
          <div className="checkout_box">
            <div className="checkout_text">
              <p>Total Belanja</p>
              <p className="total_biaya">
                Rp. {new Intl.NumberFormat('id-ID').format(totalBiaya)}
              </p>
            </div>
            <div className="checkout_btn">
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </IonFooter>
      )}

      {/* Toast notification */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Centang/pilih produk di keranjang sebelum checkout!"
        duration={2000}
        position="middle"
      />
    </IonPage>
  );
};

export default KeranjangScreen;
