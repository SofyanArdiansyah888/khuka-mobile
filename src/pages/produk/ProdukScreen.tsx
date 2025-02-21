import React, { useEffect, useState } from 'react';
import {IonContent,IonPage,IonRefresher,IonRefresherContent} from '@ionic/react';
import { baseImgURL } from '../../utils/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { Autoplay, Keyboard, Pagination, Scrollbar } from 'swiper/modules';
import { getUserCashback } from '../../utils/poin';
import { useGetList } from '../../common/hooks/useApi';
import { ResponseListType } from '../../common/interface/response-type';
import { Produk } from '../../entity/ProdukEntity';
import { Promo } from '../../entity/PromoEntity';
import logo from '../../assets/logo-khukha.png';
import shopicon from '../../assets/shopping-bag-solid.svg';
import Skeleton from 'react-loading-skeleton';
import useAuth from '../../common/hooks/useAuth';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './Produk.css';

const ProdukScreen: React.FC = () => {
  const history = useHistory();
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await getUser(); // Fetch user from IndexedDB
      if (storedUser) {
        setUser(storedUser);
      }
    };

    fetchUserData();
  }, []);
  const {
    data: promoVertical,
    isLoading,
    refetch: refetchPromo,
  } = useGetList<ResponseListType<Promo[]>>({
    name: 'promo',
    endpoint: '/promo',
    params: { tipe: 'produk' },
  });
  const {
    data: produks,
    isLoading: isProdukLoading,
    refetch: refetchProduk,
  } = useGetList<ResponseListType<Produk[]>>({
    name: 'produk',
    endpoint: '/produk',
    params: {},
  });
  const produkList = produks?.data || []; // Ensure it's always an array
  const featuredProduk = produkList.length > 0 ? produkList[0] : null;
  const remainingProduk = produkList.length > 1 ? produkList.slice(1) : [];

  const navigateToProdukDetail = (produk: any) => {
    history.push(`/produk-detail/${produk.id}`, { produk });
  };
  async function swipeToRefresh() {
    await refetchPromo();
    await refetchProduk();
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">Semua Produk</h4>
          <p className="header_subtitle">
            Belanja sekarang dan dapatkan cashbacknya
          </p>
        </div>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            await swipeToRefresh();
            e.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {isLoading || isProdukLoading ? (
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
                {promoVertical?.data.map((promo, index) => (
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
                            getUserCashback(user, featuredProduk)
                          )}
                        </span>
                      </p>
                      <div className="shopicon">
                        <div>
                          <img src={shopicon} />
                        </div>
                        <div>
                          {featuredProduk.penjualan_detail_count} terjual
                        </div>
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
                          getUserCashback(user, item)
                        )}
                      </span>
                    </p>
                    <div className="shopicon">
                      <div>
                        <img src={shopicon} />
                      </div>
                      <div>{item.penjualan_detail_count} terjual</div>
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
