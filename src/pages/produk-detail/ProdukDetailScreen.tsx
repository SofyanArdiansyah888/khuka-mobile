import React, { useEffect, useState } from 'react';
import {IonContent,IonPage,IonToast} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { Produk } from '../../entity/ProdukEntity';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProdukDetailFooter from '../../components/ProdukDetailFooter';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import './ProdukDetail.css';
import logo from '../../assets/logo-khukha.png';
import point from '../../assets/diamond.png';
import cashback from '../../assets/cashback.png';
import arrowIcon from '../../assets/arrow-right.svg';
import shopicon from '../../assets/shopping-bag-solid.svg';

const ProdukDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ produk: Produk }>();
  //   const { id } = useParams<{ id: string }>();
  const produk = location.state?.produk;
  const [user, setUser] = useState<any>(null);
  const [produkLainnya, setProdukLainnya] = useState<Produk[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  // get produk lainnya except current id from localstorage
  useEffect(() => {
    if (produk) {
      const kategoriKey =
        produk.kategori === 'paket'
          ? 'produkBundling'
          : produk.kategori === 'pilihan'
          ? 'produkDataPilihan'
          : null;

      if (kategoriKey) {
        const storedData = JSON.parse(
          localStorage.getItem(kategoriKey) || '[]'
        );
        const filteredData = storedData.filter(
          (item: Produk) => item.id !== produk.id
        );
        setProdukLainnya(filteredData);
      }
    }
  }, [produk]);
  const navigateToProdukDetail = (produk: any) => {
    history.push(`/produk-detail/${produk.id}`, { produk });
  };
  const navigateToProduk = () => {
    history.push('/produk');
  };
  const handleKeranjangClick = () => {
    if (produk) {
      // Prevent double-click for the same product
      const existingKeranjang = JSON.parse(localStorage.getItem('keranjang') || '[]');
      const isProductInCart = existingKeranjang.some((item: Produk) => item.id === produk.id);

      if (isProductInCart) {
        // Show alert if product already in the cart
        setToastMessage('Produk sudah ada di keranjang belanja anda');
        setShowToast(true);
        return;
      }

      // Show loading toast
      setToastMessage('Tunggu sebentar yah...');
      setShowToast(true);
      setIsAddingToCart(true);

      // Simulate adding to cart after a delay
      setTimeout(() => {
        const updatedKeranjang = [...existingKeranjang, produk];
        localStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));

        // Show success message after product is added to cart
        setToastMessage('1 produk ditambahkan ke keranjang belanja anda');
        setIsAddingToCart(false);
        setShowToast(true);
      }, 1000); // Simulated loading time of 2 seconds
    }
  };

  const historyBack = () => {
    history.goBack();
  };

  if (!produk) {
    return (
      <div>
        <h1>Produk tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <div className="history-back" onClick={historyBack}></div>
        <div className="produk-detail produk-card">
          <div
            className={`produk-list-header ${
              produk.kategori === 'paket'
                ? produk.judul.includes('MyColon')
                  ? 'mycolon'
                  : produk.judul.includes('Fit Zim')
                  ? 'fitzim'
                  : produk.judul.includes('Gun Tea')
                  ? 'biogun'
                  : produk.judul.includes('Mybiodima')
                  ? 'biodima'
                  : ''
                : '' // No class if kategori !== 'paket'
            }`}
          >
            <div className="produk-logo">
              <img src={logo} alt="" />
              <span>
                {' '}
                OFFICIAL
                <br />
                STORE
              </span>
            </div>
            <div className="produk-desc">{produk.deskripsi_singkat}</div>
            <div
              className={`produk-satuan ${
                produk.judul.includes('MyColon')
                  ? 'mycolon'
                  : produk.judul.includes('Fit Zim')
                  ? 'fitzim'
                  : produk.judul.includes('Gun Tea')
                  ? 'biogun'
                  : produk.judul.includes('Mybiodima')
                  ? 'biodima'
                  : ''
              }`}
            >
              {produk.total_isi} {produk.satuan.nama}
            </div>
            <div className="produk-image">
              <img src={baseImgURL + 'produk/' + produk.link_gambar} alt="" />
            </div>
          </div>
          <div className="produk-info">
            <h3> Rp. {new Intl.NumberFormat('id-ID').format(produk.harga)}</h3>
            <h2>{produk.judul}</h2>
          </div>
          <div className="produk-cash-poin">
            <div className="cash-poin-img">
              <img src={point} alt="Points" />
            </div>
            <div className="cash-poin-text">
              <p>
                Dapatkan poin sebesar{' '}
                <b>
                  {user?.member_level === 'AO'
                    ? produk.ao_poin
                    : user?.member_level === 'Agent'
                    ? produk.agen_poin
                    : produk.konsumen_poin}{' '}
                  poin
                </b>
              </p>
            </div>
          </div>
          <div className="produk-cash-poin">
            <div className="cash-poin-img">
              <img src={cashback} alt="Cashback" />
            </div>
            <div className="cash-poin-text">
              <p>
                Dapatkan cashback sebesar Rp{' '}
                <b>
                  {new Intl.NumberFormat('id-ID').format(
                    user?.member_level === 'AO'
                      ? produk.ao_cashback
                      : user?.member_level === 'Agent'
                      ? produk.agen_cashback
                      : produk.konsumen_cashback
                  )}
                </b>
              </p>
            </div>
          </div>
          <div className="bn-divider"></div>
          <div className="produk-full-desc padding-lr-20">
            <h4>Deskripsi Produk</h4>
            <div
              className="produk-full-desc-content"
              dangerouslySetInnerHTML={{
                __html: produk.masterproduk.deskripsi,
              }}
            />
          </div>
          <div className="bn-divider"></div>
          <div className="produk-header">
            <div className="section-header">
              <h4>Produk Lainnya</h4>
              <div className="arrow-icon" onClick={navigateToProduk}>
                <img src={arrowIcon} alt="Go to Produk Page" />
              </div>
            </div>
            <p className="produk_subtitle">
              Belanja sekarang dan dapatkan cashbacknya
            </p>
          </div>
        </div>
        <Swiper className="produk-swiper" slidesPerView={2.4} spaceBetween={20}>
          {produkLainnya.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="produk-card"
                onClick={() => navigateToProdukDetail(item)}
              >
                <div className={`produk-list-header ${
              item.kategori === 'paket'
                ? item.judul.includes('MyColon')
                  ? 'mycolon'
                  : item.judul.includes('Fit Zim')
                  ? 'fitzim'
                  : item.judul.includes('Gun Tea')
                  ? 'biogun'
                  : item.judul.includes('Mybiodima')
                  ? 'biodima'
                  : ''
                : '' // No class if kategori !== 'paket'
            }`}>
                  <div className="produk-logo">
                    <img src={logo} alt="" />
                    <span>
                      OFFICIAL
                      <br />
                      STORE
                    </span>
                  </div>
                  <div className="produk-desc">{item.deskripsi_singkat}</div>
                  <div
                    className={`produk-satuan ${
                      item.judul.includes('MyColon')
                        ? 'mycolon'
                        : item.judul.includes('Fit Zim')
                        ? 'fitzim'
                        : item.judul.includes('Gun Tea')
                        ? 'biogun'
                        : item.judul.includes('Mybiodima')
                        ? 'biodima'
                        : ''
                    }`}
                  >
                    {item.total_isi} {item.satuan.nama}
                  </div>
                  <div className="produk-image">
                    <img
                      src={baseImgURL + 'produk/' + item.link_gambar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="produk-info">
                  <h2>{item.judul}</h2>
                  <p>
                    Harga:{' '}
                    <span className="price">
                      Rp. {new Intl.NumberFormat('id-ID').format(item.harga)}
                    </span>
                  </p>
                  <p>
                    Cashback:{' '}
                    <span className="cashback">
                      Rp.{' '}
                      {new Intl.NumberFormat('id-ID').format(
                        user?.member_level === 'AO'
                          ? item.ao_cashback
                          : user?.member_level === 'Agent'
                          ? item.agen_cashback
                          : item.konsumen_cashback
                      )}
                    </span>
                  </p>
                  <div className="shopicon">
                    <div>
                      <img src={shopicon} />
                    </div>
                    <div>5 terjual</div>
                  </div>
                  <div className="produk-link">
                    <span>Lihat</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ProdukDetailFooter handleKeranjangClick={handleKeranjangClick} />
      </IonContent>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
    
  );
};

export default ProdukDetail;
