import React, {useEffect, useState} from 'react';
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Keyboard, Pagination, Scrollbar, Zoom} from 'swiper/modules';
import {getUserCashback} from '../../utils/poin';
import {baseImgURL} from '../../utils/axios';
import {useGetList} from '../../common/hooks/useApi';
import {Promo} from '../../entity/PromoEntity';
import {ResponseListType} from '../../common/interface/response-type';
import {Produk} from '../../entity/ProdukEntity';
import logo from '../../assets/logo-khukha.png';
import arrowIcon from '../../assets/arrow-right.svg';
import shopicon from '../../assets/shopping-bag-solid.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';
import HeaderPoint from "../../components/HeaderPoint";
import useAuth from "../../common/hooks/useAuth";

const Home: React.FC = () => {
  const history = useHistory();

  const {getUser} = useAuth()
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    (async() => {
      setUser(await getUser());
    })()
  }, []);

  const {
    data: promos,
    isLoading,
    refetch: refetchPromo,
  } = useGetList<ResponseListType<Promo[]>>({
    name: 'promo',
    endpoint: '/promo',
    params: { tipe: 'home' },
  });

  const {
    data: pilihans,
    isLoading: isPilihanLoading,
    refetch: refetchPilihan,
  } = useGetList<ResponseListType<any[]>>({
    name: 'produk-pilihan',
    endpoint: '/produk',
    params: {
      limit: 5,
      kategori: 'pilihan',
    },
  });
  const {
    data: produks,
    isLoading: isProdukLoading,
    refetch: refetchProduk,
  } = useGetList<ResponseListType<Produk[]>>({
    name: 'produk',
    endpoint: '/produk',
    params: {
      limit: 5,
      kategori: 'paket',
    },
  });

  const navigateToProdukDetail = (produk: any) =>
    history.push(`/produk-detail/${produk.id}`, { produk });

  const navigateToPromoDetail = (promo: any) =>
    history.push(`/promo-detail/${promo.id}`, { promo });

  const navigateToProduk = () => history.push('/produk');

  async function swipeToRefresh() {
    await refetchPromo();
    await refetchPilihan();
    await refetchProduk();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            await swipeToRefresh();
            e.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {isLoading || isPilihanLoading || isProdukLoading ? (
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
            <HeaderPoint/>
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
              {promos?.data?.map((promo, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => navigateToPromoDetail(promo)}
                >
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
                {pilihans?.data.map((pilihan, index) => (
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
                              getUserCashback(user, pilihan)
                            )}
                          </span>
                        </p>
                        <div className="shopicon">
                          <div>
                            <img src={shopicon} />
                          </div>
                          <div>{pilihan.penjualan_detail_count} terjual</div>
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
                {produks?.data?.map((paket, index) => (
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
                              getUserCashback(user, paket)
                            )}
                          </span>
                        </p>
                        <div className="shopicon">
                          <div>
                            <img src={shopicon} />
                          </div>
                          <div>{paket.penjualan_detail_count} terjual</div>
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
