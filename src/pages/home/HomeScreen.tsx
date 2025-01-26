import React from 'react';
import {IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar,} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Keyboard, Pagination, Scrollbar, Zoom,} from 'swiper/modules';
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
import slide from '../../assets/slide.png';
import arrowIcon from '../../assets/arrow-right.svg';
import biodama from '../../assets/mybiodama.png';
import shopicon from '../../assets/shopping-bag-solid.svg';
import guntea from '../../assets/gun-tea.png';
import {useGetList} from "../../common/hooks/useApi";
import {Produk} from "../../entities/produk";
import {ResponseListType} from "../../common/interface/response-type";

const HomeScreen: React.FC = () => {
    const {
        data: produk,
        error,
        isLoading
    } = useGetList<ResponseListType<Produk[]>>({
        name: 'produk',
        endpoint: '/produk',
        params: {
            limit: 5
        }
    })

    const history = useHistory();

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
                {/* User Info Section */}
                <div className="user-info-wrap">
                    <div className="user-info">
                        <div className="user-details">
                            <div className="user-avatar">
                                <img src={whitelogo} alt="User Logo"/>
                            </div>
                            <div className="user-data">
                                <h2>Shafwan</h2>
                                <p>Member selama 60 hari</p>
                            </div>
                        </div>
                        <div className="points-balance">
                            <div className="points">
                                <img src={point} alt="Points"/>
                                <p>25 poin</p>
                            </div>
                            <div className="cashback">
                                <img src={cashback} alt="Cashback"/>
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
                    <SwiperSlide>
                        <div className="promo-banner">
                            <img src={slide} alt="Slide"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="promo-banner">
                            <img src={slide} alt="Slide"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="promo-banner">
                            <img src={slide} alt="Slide"/>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className="produk-section">
                    <div className="produk-header">
                        <div className="section-header">
                            <h4>ProdukScreen Pilihan</h4>
                            <div className="arrow-icon" onClick={navigateToProduk}>
                                <img src={arrowIcon} alt="Go to ProdukScreen Page"/>
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
                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Menjaga daya <br/>
                                        tahan tubuh
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#e82a44'}}
                                    >
                                        40 pil
                                    </div>
                                    <div className="produk-image">
                                        <img src={biodama} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Mybiodima isi 40pil / botol</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Kesuburan dan Vitalitas Pria
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#29a03e'}}
                                    >
                                        12 sachet
                                    </div>
                                    <div className="produk-image">
                                        <img src={guntea} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Bio Gun Tea 1 Box</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* produk 3 */}
                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Detox,perut buncit & Kolestrol
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#ffbd07'}}
                                    >
                                        10 sachet
                                    </div>
                                    <div className="produk-image">
                                        <img src={biodama} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Mybiodima isi 40pil / botol</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="produk-section">
                    <div className="produk-header">
                        <div className="section-header">
                            <h4>ProdukScreen Bundling</h4>
                            <div className="arrow-icon" onClick={navigateToBundling}>
                                <img src={arrowIcon} alt=""/>
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
                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Menjaga daya <br/>
                                        tahan tubuh
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#e82a44'}}
                                    >
                                        40 pil
                                    </div>
                                    <div className="produk-image">
                                        <img src={biodama} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Mybiodima isi 40pil / botol</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Kesuburan dan Vitalitas Pria
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#29a03e'}}
                                    >
                                        12 sachet
                                    </div>
                                    <div className="produk-image">
                                        <img src={biodama} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Mybiodima isi 40pil / botol</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* produk 3 */}
                        <SwiperSlide>
                            <div className="produk-card">
                                <div className="produk-list-header">
                                    <div className="produk-logo">
                                        <img src={logo} alt=""/>
                                        <span>
                      OFFICIAL
                      <br/>
                      STORE
                    </span>
                                    </div>
                                    <div className="produk-desc">
                                        Detox,perut buncit & Kolestrol
                                    </div>
                                    <div
                                        className="produk-satuan"
                                        style={{background: '#ffbd07'}}
                                    >
                                        10 sachet
                                    </div>
                                    <div className="produk-image">
                                        <img src={biodama} alt=""/>
                                    </div>
                                </div>
                                <div className="produk-info">
                                    <h2>Mybiodima isi 40pil / botol</h2>
                                    <p>
                                        Harga: <span className="price">Rp350.000</span>
                                    </p>
                                    <p>
                                        Cashback: <span className="cashback">Rp45.000</span>
                                    </p>
                                    <div className="shopicon">
                                        <div>
                                            <img src={shopicon}/>
                                        </div>
                                        {' '}
                                        <div>5 terjual</div>
                                    </div>
                                    <IonRouterLink className="produk-link" routerLink="/produk">
                                        <span>Lihat</span>
                                    </IonRouterLink>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomeScreen;
