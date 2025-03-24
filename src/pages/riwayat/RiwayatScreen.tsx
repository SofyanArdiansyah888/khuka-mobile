import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { fetchRiwayat } from '../../utils/api';
import Skeleton from 'react-loading-skeleton';
import keranjangkosong from '../../assets/keranjang-kosong.svg';
import logo from '../../assets/logo-khukha.png';
import useAuth from '../../common/hooks/useAuth';
import shoppingIcon from '../../assets/shopping-bag.svg';
import 'react-loading-skeleton/dist/skeleton.css';
import './Riwayat.css';

const RiwayatScreen: React.FC = () => {
  const history = useHistory();
  const [riwayatData, setriwayatData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUser } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'Semua' | 'Belum' | 'Selesai' | 'Kadaluarsa'
  >('Semua');

  const fetchUserData = async () => {
    setIsLoading(true);
    const storedUser = await getUser();
    if (storedUser) {
      const datas = await fetchRiwayat(storedUser.id);
      setriwayatData(datas.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchUserData();
    event.detail.complete();
  };

  const filteredData = riwayatData.filter((item) => {
    if (activeTab === 'Belum') return item.status_penjualan === 'Order';
    if (activeTab === 'Selesai') return item.status_penjualan === 'Terbayar';
    if (activeTab === 'Kadaluarsa')
      return item.status_penjualan === 'Kadaluarsa';
    return true;
  });
  const riwayatClick = (item: any) => {
    if (item.status_penjualan === 'Order') {
      history.push('/pembayaran', {
        nomor_order: item.nomor_penjualan,
        riwayat_metode: item.metode,
        total_pembayaran: item.total_pembayaran,
        waktu_akhir_pembayaran: item.waktu_akhir_pembayaran,
      });
    } else if (item.status_penjualan === 'Terbayar') {
      history.push('/detail-riwayat', { riwayatData: item });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">Pesanan Saya</h4>
          <p className="header_subtitle">
            Kumpulkan poin dan tukarkan dengan uang tunai
          </p>
        </div>

        <div className="riwayat-tabs">
          {['Semua', 'Belum', 'Selesai', 'Kadaluarsa'].map((tab) => (
            <div
              key={tab}
              className={`riwayat-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() =>
                setActiveTab(
                  tab as 'Semua' | 'Belum' | 'Selesai' | 'Kadaluarsa'
                )
              }
            >
              {tab}
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className="padding-lr-20">
            {[1, 2, 3].map((index) => (
              <div key={index} className="keranjang-item riwayat-items">
                <div className="riwayat_header">
                  <div className="riwayat_header_icon">
                    <Skeleton circle width={40} height={40} />
                  </div>
                  <div className="riwayat_header_title riwayat_item">
                    <Skeleton width={200} height={20} />
                    <Skeleton width={150} height={15} />
                  </div>
                  <div className="riwayat_header_status">
                    <Skeleton width={10} height={20} />
                  </div>
                </div>
                <div className="riwayat_produk">
                  <div className="produk_item">
                    <div className="produk_thumb">
                      <Skeleton width={60} height={60} />
                    </div>
                    <div className="produk_judul riwayat_item">
                      <Skeleton width={180} height={20} />
                    </div>
                    <div className="produk_x_qty">
                      <Skeleton width={30} height={20} />
                    </div>
                    <div className="produk_x_harga">
                      <Skeleton width={80} height={20} />
                    </div>
                  </div>
                </div>
                <div className="riwayat_total_bayar">
                  <Skeleton width={200} height={20} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
        {filteredData.length === 0 ? (
          <div className="keranjang-kosong">
            <div className="img-wrap">
              <img src={keranjangkosong} alt="Riwayat Kosong" />
            </div>
            <p className="keranjang-title">Riwayat Pesanan masih kosong</p>
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
          <div className="padding-lr-20">
            {filteredData.map((item, index) => (
              <div key={index} className="keranjang-item riwayat-items">
                <div
                  className="riwayat_header"
                  onClick={() => riwayatClick(item)}
                >
                  <div className="riwayat_header_icon">
                    <img src={shoppingIcon} />
                  </div>
                  <div className="riwayat_header_title riwayat_item">
                    <div className="riwayat_ambil_title">
                      {item.pengambilan.nama_tempat}
                    </div>
                    <div className="riwayat_tgl_transaksi">
                      {new Date(item.tgl_penjualan).toLocaleDateString(
                        'id-ID',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                    </div>
                  </div>
                  <div
                    className={`riwayat_header_status ${
                      item.status_penjualan === 'Order'
                        ? 'status_menunggu'
                        : item.status_penjualan === 'Terbayar'
                        ? 'status_selesai'
                        : 'status_expired'
                    }`}
                  >
                    {item.status_penjualan === 'Order'
                      ? 'Menunggu Pembayaran'
                      : item.status_penjualan === 'Terbayar'
                      ? 'Selesai'
                      : item.status_penjualan}
                  </div>
                </div>
                <div className="riwayat_produk">
                  {item.detail
                    ?.slice(0, showAll ? item.detail.length : 1)
                    .map((detail: any, index: number) => (
                      <div
                        key={index}
                        className="produk_item"
                        onClick={() => riwayatClick(item)}
                      >
                        <div className="produk_thumb">
                          <div className="produk-logo">
                            <img src={logo} alt="" />
                            <span>
                              OFFICIAL
                              <br />
                              STORE
                            </span>
                          </div>
                          <img
                            className="img_riwayat"
                            src={`${baseImgURL}produk/${detail.produk.link_gambar}`}
                            alt=""
                          />
                        </div>
                        <div className="produk_judul riwayat_item">
                          {detail.produk.judul}
                        </div>
                        <div className="produk_x_qty">X{detail.qty}</div>
                        <div className="produk_x_harga">
                          {' '}
                          Rp.{' '}
                          {new Intl.NumberFormat('id-ID').format(
                            detail.total_harga
                          )}
                        </div>
                      </div>
                    ))}
                  {item.detail && item.detail.length > 1 && (
                    <div
                      className="lihat_semua_btn"
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? 'Tutup' : 'Lihat Semua'}
                    </div>
                  )}
                </div>
                <div className="riwayat_total_bayar">
                  <span>Total {item.detail.length} produk:</span> Rp.{' '}
                  {new Intl.NumberFormat('id-ID').format(item.total_pembayaran)}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RiwayatScreen;
