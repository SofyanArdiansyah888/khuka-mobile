import React, { useEffect, useState } from 'react';
import { IonContent,IonHeader, IonPage,IonTitle,IonToolbar,IonRouterLink,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay,Keyboard,Pagination, Scrollbar,Zoom,} from 'swiper/modules';
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
import { fetchPromo,fetchProduk } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const Home: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [promoData, setPromoData] = useState<any[]>([]);
  const [ProdukDataPilihan, setProdukDataPilihan] = useState<any[]>([]);
  const [ProdukBundling, setProdukBundling] = useState<any[]>([]);
  const [memberDuration, setMemberDuration] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const calculateMemberDuration = (tgl_member: string) => {
    const currentDate = new Date();
    const memberDate = new Date(tgl_member);
    const diffTime = currentDate.getTime() - memberDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears >= 1) {
      return `${diffYears} tahun lalu`;
    } else if (diffMonths >= 1) {
      return `${diffMonths} bulan lalu`;
    } else {
      return `${diffDays} hari lalu`;
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);

        if (storedUser?.tgl_member) {
          const durationText = calculateMemberDuration(storedUser.tgl_member);
          setMemberDuration(durationText);
        }

        const promos = await fetchPromo('home');
        setPromoData(promos.data);

        const pilihan = await fetchProduk('5', 'pilihan');
        setProdukDataPilihan(pilihan.data);

        const bundling = await fetchProduk('5', 'paket');
        setProdukBundling(bundling.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToProduk = () => {
    history.push('/produk');
  };

  const navigateToBundling = () => {
    history.push('/produk-bundling');
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
          <div style={{height:'150px',padding:'10px'}}>
      <div className="user-info">
        <div className="user-details">
          <div>
          <Skeleton circle={true} height={30} width={30} />
          </div>
          <div className="user-data">
            <h2>
              <Skeleton width={100} />
            </h2>
            <p>
              <Skeleton width={110} />
            </p>
          </div>
        </div>
        <div className="points-balance">
          <div className="points">
            <Skeleton circle={true} height={10} width={10} />
            <p>
              <Skeleton width={50} />
            </p>
          </div>
          <div className="cashback">
            <Skeleton circle={true} height={10} width={10} />
            <p>
              <Skeleton width={50} />
            </p>
          </div>
        </div>
      </div>
    </div>
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
                <p>25 poin</p>
              </div>
              <div className="cashback">
                <img src={cashback} alt="Cashback" />
                <p>Rp 125.000</p>
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
                <SwiperSlide key={index}>
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
                  <div className="produk-card">
                    <div className="produk-list-header">
                      <div className="produk-logo">
                        <img src={logo} alt="" />
                        <span>
                          {' '}
                          OFFICIAL
                          <br />
                          STORE
                        </span>
                      </div>
                      <div className="produk-desc">
                        {pilihan.deskripsi_singkat}
                      </div>
                      <div
                        className="produk-satuan"
                        style={{ background: '#e82a44' }}
                      >
                        {pilihan.total_isi} {pilihan.satuan.nama}
                      </div>
                      <div className="produk-image">
                        <img  src={baseImgURL + 'produk/' + pilihan.link_gambar} alt="" />
                      </div>
                    </div>
                    <div className="produk-info">
                      <h2>{pilihan.judul}</h2>
                      <p>
                        Harga:{' '}
                        <span className="price">
                          Rp.{' '}
                          {new Intl.NumberFormat('id-ID').format(pilihan.harga)}
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
                        </div>{' '}
                        <div>5 terjual</div>
                      </div>
                      <IonRouterLink
                        className="produk-link"
                        routerLink="/produk"
                      >
                        <span>Lihat</span>
                      </IonRouterLink>
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
              <div className="arrow-icon" onClick={navigateToBundling}>
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
                  <div className="produk-card">
                    <div className="produk-list-header">
                      <div className="produk-logo">
                        <img src={logo} alt="" />
                        <span>
                          {' '}
                          OFFICIAL
                          <br />
                          STORE
                        </span>
                      </div>
                      <div className="produk-desc">
                        {paket.deskripsi_singkat}
                      </div>
                      <div
                        className="produk-satuan"
                        style={{ background: '#e82a44' }}
                      >
                        {paket.total_isi} {paket.satuan.nama}
                      </div>
                      <div className="produk-image">
                        <img  src={baseImgURL + 'produk/' + paket.link_gambar} alt="" />
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
                        </div>{' '}
                        <div>5 terjual</div>
                      </div>
                      <IonRouterLink
                        className="produk-link"
                        routerLink="/produk"
                      >
                        <span>Lihat</span>
                      </IonRouterLink>
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
