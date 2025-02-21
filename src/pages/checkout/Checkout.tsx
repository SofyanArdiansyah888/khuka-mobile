import React, { useEffect, useState } from 'react';
import { IonContent, IonToast, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { pesananData, updatePesananData } from '../../utils/pesananData';
import { fetchMetode, fetchPengambilan, fetchPoin } from '../../utils/api';
import { setItem,getItem } from '../../utils/khukhaDBTemp';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCart } from '../../components/CartContext';
import api from '../../utils/axios';
import Swal from 'sweetalert2';
import shoppingIcon from '../../assets/shopping-bag.svg';
import cardIcon from '../../assets/credit-card.svg';
import fileIcon from '../../assets/file-text.svg';
import './Checkout.css';

const Checkout: React.FC = () => {
  const history = useHistory();
  const { keranjangCount, setKeranjangCount } = useCart();
  const [tempat, setTempat] = useState<any[]>([]);
  const [dataMetode, setMetode] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [poinCashback, setPoinCashback] = useState<any>({
    total_poin: 0,
    total_cashback: 0,
  });
  const [selectedTempat, setSelectedTempat] = useState<string | null>(
    pesananData.id_ambil || null
  );
  const [selectedBank, setSelectedBank] = useState<string | null>(
    pesananData.id_metode || null
  );
  const [selectedCashback, setSelectedCashback] = useState<string>('tidak');
  const [cashbackUsed, setCashbackUsed] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const totalHarga = pesananData.total_harga || 0;
  const grandTotal = totalHarga - cashbackUsed;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(await getItem('user') || '{}');
        const storedPoinCashback = await fetchPoin(storedUser.id);
        setPoinCashback(storedPoinCashback);
        const datatempat = await fetchPengambilan();
        setTempat(datatempat.data);

        const metodedata = await fetchMetode();
        setMetode(metodedata.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const historyBack = () => {
    updatePesananData({
      cashback_diskon: 0,
      id_metode: '',
      id_ambil: '',
      total_pembayaran: 0,
    });
    history.goBack();
  };

  const handleTempatChange = (id: string) => {
    setSelectedTempat(id);
    updatePesananData({ id_ambil: id });
  };

  const handleBankChange = (id: string) => {
    setSelectedBank(id);
    updatePesananData({ id_metode: id });
  };

  const handleCashbackChange = (value: string) => {
    if (value === 'ya') {
      const maxCashback = poinCashback.data.total_cashback || 0;

      if (maxCashback > 0) {
        Swal.fire({
          title: 'Gunakan Cashback',
          input: 'text',
          inputAttributes: {
            inputmode: 'numeric',
          },
          showCancelButton: true,
          confirmButtonText: 'Gunakan',
          cancelButtonText: 'Batal',
          inputValue: '',
          didOpen: () => {
            const inputElement = Swal.getInput();

            if (inputElement) {
              inputElement.addEventListener('input', (event) => {
                let rawValue = (event.target as HTMLInputElement).value.replace(
                  /\D/g,
                  ''
                ); // Remove non-numeric
                let formattedValue = new Intl.NumberFormat('id-ID').format(
                  parseInt(rawValue || '0', 10)
                );
                (event.target as HTMLInputElement).value = formattedValue;
              });
            }
          },
          preConfirm: (inputValue) => {
            // Convert formatted string back to number
            const numericValue =
              parseInt(inputValue.replace(/\D/g, ''), 10) || 0;

            if (numericValue <= 0) {
              return Swal.showValidationMessage(
                'Masukkan jumlah cashback yang valid!'
              );
            }
            if (numericValue > maxCashback) {
              return Swal.showValidationMessage(
                `Maksimal cashback yang bisa digunakan adalah Rp.${new Intl.NumberFormat(
                  'id-ID'
                ).format(maxCashback)}`
              );
            }
            return numericValue;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const cashbackValue = result.value;
            const updatedGrandTotal = totalHarga - cashbackValue;

            setSelectedCashback('ya');
            setCashbackUsed(cashbackValue);
            updatePesananData({
              cashback_diskon: cashbackValue,
              total_pembayaran: updatedGrandTotal,
            });
          } else {
            setSelectedCashback('tidak');
            setCashbackUsed(0);
            updatePesananData({
              cashback_diskon: 0,
              total_pembayaran: totalHarga,
            });
          }
        });
      } else {
        setToastMessage('Anda tidak memiliki Cashback untuk saat ini');
        setShowToast(true);
        setSelectedCashback('tidak');
        setCashbackUsed(0);
      }
    } else {
      setSelectedCashback('tidak');
      setCashbackUsed(0);
      updatePesananData({
        cashback_diskon: 0,
        total_pembayaran: totalHarga,
      });
    }
  };

  const isBayarDisabled = () => {
    if (!pesananData) return true; // If pesananData is undefined, disable the button

    const { cashback_diskon, pesananproduk, ...requiredFields } = pesananData;

    // Check if all required fields (except cashback_diskon) are not empty
    const allFieldsFilled = Object.values(requiredFields).every(
      (value) => value !== '' && value !== null && value !== undefined
    );

    // Ensure pesananproduk array has at least one product
    const hasProducts =
      Array.isArray(pesananproduk) && pesananproduk.length > 0;

    return !(allFieldsFilled && hasProducts);
  };
  const onClickBayar = async () => {
    try {
      // Show loading SweetAlert
      Swal.fire({
        title: 'Memproses Pesanan...',
        text: 'Mohon tunggu',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Send pesananData to Laravel backend
      const response = await api.post('/pesanan', pesananData);

      // If successful, show success alert
      if (response.data.success) {
        const nomorOrder = response.data.nomor_order; 
      Swal.fire({
        icon: 'success',
        title: 'Pesanan Berhasil!',
        text: 'Pesanan Anda telah dikonfirmasi. Segera lakukan pembayaran',
        confirmButtonText: 'Lanjut ke Pembayaran',
      }).then( async () => {
        // Retrieve the current cart (keranjang) from localStorage
        const storedKeranjang = JSON.parse(
          await getItem('keranjang') || '[]'
        );

        // Create a Set of product IDs from pesananData to remove
        const productsToRemove = new Set(
          pesananData.pesananproduk.map(
            (item: { id_produk: number }) => item.id_produk
          )
        );

        // Filter out the products that are in the order
        const updatedKeranjang = storedKeranjang.filter(
          (item: { id: number }) => !productsToRemove.has(item.id)
        );
        // Update localStorage with the new keranjang data
        setItem('keranjang', JSON.stringify(updatedKeranjang));

        // Update the cart count in the context
        setKeranjangCount(updatedKeranjang.length);

        // Redirect to pembayaran page
        history.push({
          pathname: '/pembayaran',
          state: { nomor_order: nomorOrder, metode: dataMetode },
        });
      });
    }
    } catch (error) {
      console.error('Error submitting order:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat memproses pesanan.',
      });
    }
  };

  // console.log('Updated Pesanan Data:', JSON.stringify(pesananData, null, 2));
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="checkout_header_wrap header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Checkout</h4>
        </div>
        {loading ? (
          // Skeleton container
          <>
            <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
              <Skeleton width={320} height={300} />
            </div>
            <div
              style={{
                padding: '20px',
                display: 'flex',
                gap: '20px',
                paddingTop: '0',
              }}
            >
              <Skeleton width={320} height={300} />
            </div>
          </>
        ) : (
          <>
            <div className="padding-lr-20">
              <div className="checkout_header">
                <div className="checkout_icon">
                  <img src={shoppingIcon} alt="shopping-icon" />
                </div>
                <div className="checkout_title">Pengambilan Barang</div>
              </div>
            </div>
            <div className="padding-lr-20">
              <IonSelect
                placeholder="Pilih Tempat Pengambilan"
                value={selectedTempat}
                onIonChange={(e) => handleTempatChange(e.detail.value)}
              >
                {tempat.map((item) => (
                  <IonSelectOption key={item.id} value={item.id}>
                    {item.nama_tempat}
                  </IonSelectOption>
                ))}
              </IonSelect>
              {selectedTempat && (
                <div className="selected_tempat_detail">
                  {tempat
                    .filter((item) => item.id === selectedTempat)
                    .map((item) => (
                      <div key={item.id} className="selected_tempat_card">
                        <h4 className='nama_tempat'>{item.nama_tempat}</h4>
                        <p className='checkout_alamat'>{item.alamat}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="bn-divider"></div>
            <div className="padding-lr-20">
              <div className="checkout_header">
                <div className="checkout_icon">
                  <img src={cardIcon} alt="card-icon" />
                </div>
                <div className="checkout_title">Metode Pembayaran</div>
              </div>
            </div>
            <div className="items_wraps">
              {dataMetode.map((item, index) => (
                <div className="item with_bottom_border" key={index}>
                  <div className="padding-lr-20">
                    <div className="checkout_metode">
                      <div className="bank_img">
                        {item.link_gambar && (
                          <img src={baseImgURL + 'bank/' + item.link_gambar} />
                        )}
                      </div>
                      <div className="nama_bank">{item.judul}</div>
                      <div className="bank_radio">
                        <label className="radio-container">
                          <input
                            type="radio"
                            name="bank-radio"
                            checked={selectedBank === item.id}
                            onChange={() => handleBankChange(item.id)}
                          />
                          <span className="radio-custom"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bn-divider"></div>
            <div className="padding-lr-20">
              <div className="checkout_header">
                <div className="checkout_icon">
                  <img src={fileIcon} alt="file-icon" />
                </div>
                <div className="checkout_title">Cashback</div>
              </div>
              <div className="ringkasan_item">
                <div>Gunakan Cashback Anda?</div>
                <div className="gunakan_cashback">
                  <label className="radio-container">
                    Ya
                    <input
                      type="radio"
                      name="cashback-radio"
                      checked={selectedCashback === 'ya'}
                      onChange={() => handleCashbackChange('ya')}
                    />
                    <span className="radio-custom"></span>
                  </label>
                  <label className="radio-container">
                    Tidak
                    <input
                      type="radio"
                      name="cashback-radio"
                      checked={selectedCashback === 'tidak'}
                      onChange={() => handleCashbackChange('tidak')}
                    />
                    <span className="radio-custom"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="bn-divider"></div>
            <div className="padding-lr-20">
              <div className="checkout_header">
                <div className="checkout_icon">
                  <img src={fileIcon} alt="file-icon" />
                </div>
                <div className="checkout_title">Ringkasan Transaksi</div>
              </div>
              <div className="ringkasan_item">
                <div>Total Harga Produk</div>
                <div className="total_harga">
                  Rp.{new Intl.NumberFormat('id-ID').format(totalHarga)}
                </div>
              </div>
              <div className="ringkasan_item">
                <div>Diskon Cashback</div>
                <div className="total_harga">
                  -Rp.{new Intl.NumberFormat('id-ID').format(cashbackUsed)}
                </div>
              </div>
              <div className="ringkasan_item">
                <div>Total Pembayaran</div>
                <div className="total_pembayaran">
                  Rp.{new Intl.NumberFormat('id-ID').format(grandTotal)}
                </div>
              </div>
            </div>
            <div className="footer footer-detail">
              <button
                onClick={onClickBayar}
                disabled={isBayarDisabled()}
                className="checkout_btn btn_khu"
              >
                Bayar Sekarang
              </button>
            </div>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={toastMessage}
              duration={2000}
              position="middle"
              style={{
                '--background': '#000',
                '--color': '#fff',
              }}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
