import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { fetchPromo, fetchProduk } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { Autoplay, Keyboard, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import logo from '../../assets/logo-khukha.png';
import shopicon from '../../assets/shopping-bag-solid.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Produk.css';

const ProdukScreen: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [promoVertical, setPromoVertical] = useState<any[]>([]);
  const [featuredProduk, setFeaturedProduk] = useState<any>(null);
  const [remainingProduk, setRemainingProduk] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if data is already present in localStorage (to avoid re-fetching)
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    const storedPromoVertical = JSON.parse(
      localStorage.getItem('promoVertical') || '[]'
    );
    const storedAllProduk = JSON.parse(
      localStorage.getItem('allProduk') || '[]'
    );

    if (
      Object.keys(storedUser).length > 0 &&
      storedPromoVertical.length &&
      storedAllProduk.length
    ) {
      setPromoVertical(storedPromoVertical);
      setFeaturedProduk(storedAllProduk[0] || null);
      setRemainingProduk(storedAllProduk.slice(1));
      setUser(storedUser);
      setLoading(false);
    } else {
      setLoading(true);
      const fetchData = async () => {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          setUser(storedUser);

          const promos = await fetchPromo('produk');
          setPromoVertical(promos.data);
          localStorage.setItem('promoVertical', JSON.stringify(promos.data));

          const produk = await fetchProduk('null', 'null');
          localStorage.setItem('allProduk', JSON.stringify(produk.data));

          setFeaturedProduk(produk.data[0] || null); // First product
          setRemainingProduk(produk.data.slice(1));
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
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">Semua Produk</h4>
          <p className="header_subtitle">
            Belanja sekarang dan dapatkan cashbacknya
          </p>
        </div>
        {loading ? (
          // Skeleton container
          <>
            <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
              <Skeleton width={150} height={287} />
              <Skeleton width={150} height={287} />
            </div>
            <div
              style={{
                padding: '20px',
                display: 'flex',
                gap: '20px',
                paddingTop: '0',
              }}
            >
              <Skeleton width={150} height={287} />
              <Skeleton width={150} height={287} />
            </div>
          </>
        ) : (
          <>
            <div className="produk-first-row  padding-lr-20">
              <Swiper
                className="allproduk-swiper produk-item"
                spaceBetween={1}
                slidesPerView={1}
                loop={true}
                modules={[Autoplay, Keyboard, Pagination, Scrollbar]}
                autoplay={true}
                keyboard={true}
                pagination={true}
                scrollbar={true}
                zoom={true}
              >
                {promoVertical.map((promo, index) => (
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
              <div className="produk-wrap produk-item">
                {featuredProduk && (
                  <div
                    key={featuredProduk.id}
                    className="produk-card"
                    onClick={() => navigateToProdukDetail(featuredProduk)}
                  >
                    <div
                      className={`produk-list-header ${
                        featuredProduk.kategori === 'paket'
                          ? featuredProduk.judul.includes('MyColon')
                            ? 'mycolon'
                            : featuredProduk.judul.includes('Fit Zim')
                            ? 'fitzim'
                            : featuredProduk.judul.includes('Gun Tea')
                            ? 'biogun'
                            : featuredProduk.judul.includes('Mybiodima')
                            ? 'biodima'
                            : ''
                          : '' // No class if kategori !== 'paket'
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
                        {featuredProduk.deskripsi_singkat}
                      </div>
                      <div
                        className={`produk-satuan ${
                          featuredProduk.judul.includes('MyColon')
                            ? 'mycolon'
                            : featuredProduk.judul.includes('Fit Zim')
                            ? 'fitzim'
                            : featuredProduk.judul.includes('Gun Tea')
                            ? 'biogun'
                            : featuredProduk.judul.includes('Mybiodima')
                            ? 'biodima'
                            : ''
                        }`}
                      >
                        {featuredProduk.total_isi} {featuredProduk.satuan.nama}
                      </div>
                      <div className="produk-image">
                        <img
                          src={
                            baseImgURL + 'produk/' + featuredProduk.link_gambar
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="produk-info">
                      <h2>{featuredProduk.judul}</h2>
                      <p>
                        Harga:{' '}
                        <span className="price">
                          Rp.{' '}
                          {new Intl.NumberFormat('id-ID').format(
                            featuredProduk.harga
                          )}
                        </span>
                      </p>
                      <p>
                        Cashback:{' '}
                        <span className="cashback">
                          Rp.{' '}
                          {new Intl.NumberFormat('id-ID').format(
                            user?.member_level === 'AO'
                              ? featuredProduk.ao_cashback
                              : user?.member_level === 'Agent'
                              ? featuredProduk.agen_cashback
                              : featuredProduk.konsumen_cashback
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
                )}
              </div>
            </div>
            <div className="all-produk padding-lr-20">
              {remainingProduk.map((item, index) => (
                <div
                  key={item.id}
                  className="produk-card"
                  onClick={() => navigateToProdukDetail(item)}
                >
                  <div
                    className={`produk-list-header ${
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
              ))}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProdukScreen;
