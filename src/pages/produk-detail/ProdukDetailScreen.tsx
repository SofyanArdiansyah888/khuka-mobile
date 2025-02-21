import React, { useEffect, useState } from 'react';
import { IonContent, IonFooter, IonPage, IonRefresher, IonRefresherContent, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { Produk } from '../../entity/ProdukEntity';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getUserPoints, getUserCashback } from '../../utils/poin';
import { useCart } from '../../components/CartContext';
import { useGetList } from '../../common/hooks/useApi';
import { ResponseListType } from '../../common/interface/response-type';
import ProdukDetailFooter from '../../components/ProdukDetailFooter';
import './ProdukDetail.css';
import logo from '../../assets/logo-khukha.png';
import point from '../../assets/diamond.png';
import cashback from '../../assets/cashback.png';
import arrowIcon from '../../assets/arrow-right.svg';
import shopicon from '../../assets/shopping-bag-solid.svg';
import keranjangImage from '../../assets/keranjang.svg';
import useAuth from '../../common/hooks/useAuth';

const ProdukDetail: React.FC = () => {
  const { keranjangCount } = useCart();
  const history = useHistory();
  const { getUser } = useAuth();
  const location = useLocation<{ produk: Produk }>();
  const produk = location.state?.produk;
  const [user, setUser] = useState<any>(null);
  const [showHiddenDiv, setShowHiddenDiv] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'keranjang' | 'beli' | null>(
    null
  );

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
    data: produks,
    isLoading,
    refetch: refetchProduk,
  } = useGetList<ResponseListType<Produk[]>>({
    name: 'produk',
    endpoint: '/produk',
    params: {
      limit: 5,
    },
  });
  const produkLainnya =
    produks?.data?.filter((item: Produk) => item.id !== produk?.id) || [];
  const navigateToProdukDetail = (produk: any) => {
    history.push(`/produk-detail/${produk.id}`, { produk });
  };
  const keranjangPage = () => {
    history.push('/keranjang');
  };
  const navigateToProduk = () => {
    history.push('/produk');
  };
  const keranjangClick = () => {
    setActionType('keranjang');
    setShowHiddenDiv(true);
  };
  const beliClick = () => {
    setActionType('beli');
    setShowHiddenDiv(true);
  };
  const historyBack = () => {
    history.goBack();
  };

  const userPoints = getUserPoints(user, produk);
  const userCashback = getUserCashback(user, produk);

  if (!produk) {
    return (
      <div>
        <h1>Produk tidak ditemukan</h1>
      </div>
    );
  }

  async function swipeToRefresh() {
    await refetchProduk();
  }

  return (
    <IonPage>
      <IonContent>
        <div className={`produk_detail_wrap ${showHiddenDiv ? 'active' : ''}`}>
          <div className="history-back" onClick={historyBack}></div>
           <IonRefresher
                    slot="fixed"
                    onIonRefresh={async (e) => {
                      await swipeToRefresh();
                      e.detail.complete();
                    }}
                  >
                    <IonRefresherContent></IonRefresherContent>
                  </IonRefresher>
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
              <div className="produk_detail_keranjang" onClick={keranjangPage}>
                {keranjangCount > 0 && (
                  <div className="keranjang-count">{keranjangCount}</div>
                )}
                <img src={keranjangImage} alt="Keranjang" />
              </div>

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
              <h3>
                {' '}
                Rp. {new Intl.NumberFormat('id-ID').format(produk.harga)}
              </h3>
              <h2>{produk.judul}</h2>
            </div>
            <div className="produk-cash-poin with_top_border">
              <div className="cash-poin-img">
                <img src={point} alt="Points" />
              </div>
              <div className="cash-poin-text">
                <p>
                  Dapatkan poin sebesar <b>{userPoints} poin</b>
                </p>
              </div>
            </div>
            <div className="produk-cash-poin with_top_border">
              <div className="cash-poin-img">
                <img src={cashback} alt="Cashback" />
              </div>
              <div className="cash-poin-text">
                <p>
                  Dapatkan cashback sebesar Rp{' '}
                  <b>{new Intl.NumberFormat('id-ID').format(userCashback)}</b>
                </p>
              </div>
            </div>
            <div className="bn-divider"></div>
            <div className="full-desc padding-lr-20">
              <h4>Deskripsi Produk</h4>
              <div
                className="full-desc-content"
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
          <Swiper
            className="produk-swiper"
            slidesPerView={2.4}
            spaceBetween={20}
          >
            {produkLainnya.map((item, index) => (
              <SwiperSlide key={index}>
                <div
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </IonContent>
      <IonFooter>
        <ProdukDetailFooter
          actionType={actionType}
          isKeranjang={keranjangClick}
          isBeli={beliClick}
          showHiddenDiv={showHiddenDiv}
          setShowHiddenDiv={setShowHiddenDiv}
          produk={produk}
          userPoints={userPoints}
          userCashback={userCashback}
        />
      </IonFooter>
    </IonPage>
  );
};

export default ProdukDetail;
