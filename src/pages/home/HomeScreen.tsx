import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay,Keyboard,Pagination,Scrollbar,Zoom} from 'swiper/modules';
import { calculateMemberDuration } from '../../utils/calculateDuration';
import { fetchPromo, fetchProduk } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import './Home.css';
import logo from '../../assets/logo-khukha.png';
import whitelogo from '../../assets/khukha-white.svg';
import cashback from '../../assets/cashback.png';
import point from '../../assets/diamond.png';
import arrowIcon from '../../assets/arrow-right.svg';
import shopicon from '../../assets/shopping-bag-solid.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [poinCashback, setPoinCashback] = useState<any>(null);
  const [promoData, setPromoData] = useState<any[]>([]);
  const [ProdukDataPilihan, setProdukDataPilihan] = useState<any[]>([]);
  const [ProdukBundling, setProdukBundling] = useState<any[]>([]);
  const [memberDuration, setMemberDuration] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if data is already present in localStorage (to avoid re-fetching)
    const storedUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    );
    const storedPromoData = JSON.parse(
      localStorage.getItem('promoData') || '[]'
    );
    const storedProdukDataPilihan = JSON.parse(
      localStorage.getItem('produkDataPilihan') || '[]'
    );
    const storedProdukBundling = JSON.parse(
      localStorage.getItem('produkBundling') || '[]'
    );

    if (
      Object.keys(storedUser).length > 0 && 
      storedPromoData.length &&
      storedProdukDataPilihan.length &&
      storedProdukBundling.length
    ) {
      setPromoData(storedPromoData);
      setProdukDataPilihan(storedProdukDataPilihan);
      setProdukBundling(storedProdukBundling);
      setUser(storedUser);

      if (storedUser?.tgl_member) {
        const durationText = calculateMemberDuration(storedUser.tgl_member);
        setMemberDuration(durationText);
      }
      const storedPoinCashback = JSON.parse(localStorage.getItem('poincashback') || '{}');
      setPoinCashback(storedPoinCashback);
      
      setLoading(false);
    } else {
      setLoading(true);
      const fetchData = async () => {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          setUser(storedUser);

          const storedPoinCashback = JSON.parse(localStorage.getItem('poincashback') || '{}');
          setPoinCashback(storedPoinCashback);

          if (storedUser?.tgl_member) {
            const durationText = calculateMemberDuration(storedUser.tgl_member);
            setMemberDuration(durationText);
          }

          const promos = await fetchPromo('home');
          setPromoData(promos.data);
          localStorage.setItem('promoData', JSON.stringify(promos.data));

          const pilihan = await fetchProduk('5', 'pilihan');
          setProdukDataPilihan(pilihan.data);
          localStorage.setItem(
            'produkDataPilihan',
            JSON.stringify(pilihan.data)
          );

          const bundling = await fetchProduk('5', 'paket');
          setProdukBundling(bundling.data);
          localStorage.setItem('produkBundling', JSON.stringify(bundling.data));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);
  const navigateToProdukDetail = (produk: any) => {
    history.push(`/produk-detail/${produk.id}`, { produk });
  };
  const navigateToPromoDetail = (promo: any) => {
    history.push(`/promo-detail/${promo.id}`, { promo });
  };
  const navigateToProduk = () => {
    history.push('/produk');
  };

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          // Skeleton container
          <>
            <div style={{ padding: '20px' }}>
              <Skeleton width={312} height={50} />
              <Skeleton
                width={312}
                height={150}
                style={{ marginTop: '20px' }}
              />
              <Skeleton width={135} height={10} style={{ marginTop: '47px' }} />
              <Skeleton width={185} height={10} />
            </div>
            <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
              <Skeleton width={141} height={287} />
              <Skeleton width={141} height={287} />
              <Skeleton width={141} height={287} />
            </div>
          </>
        ) : (
          <>
            <div className="user-info-wrap">
              <div className="user-info">
                <div className="user-details">
                  <div className="user-avatar">
                    <img src={whitelogo} alt="User Logo" />
                  </div>
                  <div className="user-data">
                    <h2>{user?.nama}</h2>
                    <p>Member sejak {memberDuration}</p>
                  </div>
                </div>
                <div className="points-balance">
                  <div className="points">
                    <img src={point} alt="Points" />
                    <p>{poinCashback.total_poin} poin</p>
                  </div>
                  <div className="cashback">
                    <img src={cashback} alt="Cashback" />
                    <p>Rp.{new Intl.NumberFormat('id-ID').format(poinCashback.total_cashback)}</p>
                  </div>
                </div>
              </div>
            </div>

            <Swiper
              className="promo-swiper"
              spaceBetween={1}
              slidesPerView={1}
              loop={true}
              modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
            >
              {promoData.map((promo, index) => (
                <SwiperSlide key={index}  onClick={() => navigateToPromoDetail(promo)}>
                  <div className="promo-banner">
                    <img
                      src={baseImgURL + 'promo/' + promo.link_gambar}
                      alt={promo.judul}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="produk-section">
              <div className="produk-header">
                <div className="section-header">
                  <h4>Produk Pilihan</h4>
                  <div className="arrow-icon" onClick={navigateToProduk}>
                    <img src={arrowIcon} alt="Go to Produk Page" />
                  </div>
                </div>
                <p className="produk_subtitle">
                  Belanja sekarang dan dapatkan cashbacknya
                </p>
              </div>

              <Swiper
                className="produk-swiper"
                slidesPerView={2.4}
                spaceBetween={20}
              >
                {ProdukDataPilihan.map((pilihan, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="produk-card"
                      onClick={() => navigateToProdukDetail(pilihan)}
                    >
                      <div className="produk-list-header">
                        <div className="produk-logo">
                          <img src={logo} alt="" />
                          <span>
                            OFFICIAL
                            <br />
                            STORE
                          </span>
                        </div>
                        <div className="produk-desc">
                          {pilihan.deskripsi_singkat}
                        </div>
                        <div
                          className={`produk-satuan ${
                            pilihan.judul.includes('MyColon')
                              ? 'mycolon'
                              : pilihan.judul.includes('Fit Zim')
                              ? 'fitzim'
                              : pilihan.judul.includes('Gun Tea')
                              ? 'biogun'
                              : pilihan.judul.includes('Mybiodima')
                              ? 'biodima'
                              : ''
                          }`}
                        >
                          {pilihan.total_isi} {pilihan.satuan.nama}
                        </div>
                        <div className="produk-image">
                          <img
                            src={baseImgURL + 'produk/' + pilihan.link_gambar}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="produk-info">
                        <h2>{pilihan.judul}</h2>
                        <p>
                          Harga:{' '}
                          <span className="price">
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(
                              pilihan.harga
                            )}
                          </span>
                        </p>
                        <p>
                          Cashback:{' '}
                          <span className="cashback">
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(
                              user?.member_level === 'AO'
                                ? pilihan.ao_cashback
                                : user?.member_level === 'Agent'
                                ? pilihan.agen_cashback
                                : pilihan.konsumen_cashback
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
            </div>
            <div className="produk-section">
              <div className="produk-header">
                <div className="section-header">
                  <h4>Produk Bundling</h4>
                  <div className="arrow-icon" onClick={navigateToProduk}>
                    <img src={arrowIcon} alt="" />
                  </div>
                </div>
                <p className="produk_subtitle">
                  Lebih banyak belanja, lebih banyak rewardnya
                </p>
              </div>
              <Swiper
                className="produk-swiper"
                slidesPerView={2.4}
                spaceBetween={20}
              >
                {ProdukBundling.map((paket, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="produk-card"
                      onClick={() => navigateToProdukDetail(paket)}
                    >
                      <div
                        className={`produk-list-header ${
                          paket.judul.includes('MyColon')
                            ? 'mycolon'
                            : paket.judul.includes('Fit Zim')
                            ? 'fitzim'
                            : paket.judul.includes('Gun Tea')
                            ? 'biogun'
                            : paket.judul.includes('Mybiodima')
                            ? 'biodima'
                            : ''
                        }`}
                      >
                        <div className="produk-logo">
                          <img src={logo} alt="" />
                          <span>
                            OFFICIAL
                            <br />
                            STORE
                          </span>
                        </div>
                        <div className="produk-desc">
                          {paket.deskripsi_singkat}
                        </div>
                        <div className="produk-satuan">
                          {paket.total_isi} {paket.satuan.nama}
                        </div>
                        <div className="produk-image">
                          <img
                            src={baseImgURL + 'produk/' + paket.link_gambar}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="produk-info">
                        <h2>{paket.judul}</h2>
                        <p>
                          Harga:{' '}
                          <span className="price">
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(paket.harga)}
                          </span>
                        </p>
                        <p>
                          Cashback:{' '}
                          <span className="cashback">
                            Rp.{' '}
                            {new Intl.NumberFormat('id-ID').format(
                              user?.member_level === 'AO'
                                ? paket.ao_cashback
                                : user?.member_level === 'Agent'
                                ? paket.agen_cashback
                                : paket.konsumen_cashback
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
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
