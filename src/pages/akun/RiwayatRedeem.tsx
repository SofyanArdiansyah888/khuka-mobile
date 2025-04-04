import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { fetchRiwayatCashback, fetchRiwayatReward } from '../../utils/api';
import Skeleton from 'react-loading-skeleton';
import keranjangkosong from '../../assets/keranjang-kosong.svg';
import logo from '../../assets/logo-khukha.png';
import useAuth from '../../common/hooks/useAuth';
import shoppingIcon from '../../assets/shopping-bag.svg';
import 'react-loading-skeleton/dist/skeleton.css';

const RiwayatRedeem: React.FC = () => {
  const history = useHistory();
  const [riwayatReward, setRiwayatReward] = useState<any[]>([]);
  const [riwayatCashback, setRiwayatCashback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'Reward' | 'Cashback'>('Reward');

  const fetchUserData = async () => {
    setIsLoading(true);
    const storedUser = await getUser();
    if (storedUser) {
      const dataRewards = await fetchRiwayatReward(storedUser.id);
      setRiwayatReward(dataRewards.data);
      const dataCashback = await fetchRiwayatCashback(storedUser.id);
      setRiwayatCashback(dataCashback.data);
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

  const renderData = () => {
    const dataToRender =
      activeTab === 'Reward' ? riwayatReward : riwayatCashback;
    const noDataMessage =
      activeTab === 'Reward'
        ? 'Tidak ada riwayat penukaran reward'
        : 'Tidak ada riwayat penukaran cashback';
    return dataToRender.length > 0 ? (
      dataToRender.map((item, index) => (
        <div key={index} className="keranjang-item riwayat-items">
          <div className="riwayat_header">
            <div className="riwayat_header_icon">
              <img src={shoppingIcon} />
            </div>
            <div className="riwayat_header_title riwayat_item">
              <div className="riwayat_ambil_title">
                {activeTab === 'Reward'
                  ? item.reward.reward
                  : `Cashback Rp. ${new Intl.NumberFormat('id-ID').format(
                      item.cashback
                    )}`}
              </div>
              <div
                className="riwayat_tgl_transaksi"
                style={{ marginTop: '2px', marginBottom: '2px' }}
              >
                Tgl Request:{' '}
                {new Date(item.tgl_redeem).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>              
              {item.tgl_approve && (
                <div className="riwayat_tgl_transaksi">
                  Tgl Approve:{' '}
                  {new Date(item.tgl_approve).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              )}
              {item.id_penjualan && (
                <div className="riwayat_tgl_transaksi">
                  Catatan: Cashback digunakan sebagai diskon pada pembelian produk dengan nomor order <b>{item.penjualan.nomor_penjualan}</b>.
                </div>
              )}
            </div>
            <div
              className={`riwayat_header_status ${
                item.status_request === 'Belum Disetujui'
                  ? 'status_expired'
                  : 'status_selesai'
              }`}
            >
              {item.status_request === 'Belum Disetujui'
                ? 'Belum Disetujui'
                : 'Disetujui'}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="keranjang-kosong">
        <p className="keranjang-title">{noDataMessage}</p>
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="keranjang-header padding-lr-20 no-default-header header-with-back">
          <div
            className="history-back non-absolute"
            onClick={() => history.goBack()}
          ></div>
          <h4 className="header_title">Riwayat Penukaran Poin & Cashback</h4>
        </div>

        <div className="riwayat-tabs">
          {['Reward', 'Cashback'].map((tab) => (
            <div
              key={tab}
              className={`riwayat-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as 'Reward' | 'Cashback')}
            >
              {tab}
            </div>
          ))}
        </div>

        {isLoading ? (
          <Skeleton count={3} />
        ) : (
          <div className="padding-lr-20">{renderData()}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RiwayatRedeem;
