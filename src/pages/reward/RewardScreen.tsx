import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { fetchRewards } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import logo from '../../assets/logo-khukha.png';
import './Reward.css';

const RewardScreen: React.FC = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if data is already present in localStorage (to avoid re-fetching)
    const storedRewards = JSON.parse(
      localStorage.getItem('allRewards') || '[]'
    );
    if (storedRewards.length) {
      setRewards(storedRewards);
      setLoading(false);
    } else {
      setLoading(true);
      const fetchData = async () => {
        try {
          const dataReward = await fetchRewards();
          setRewards(dataReward.data);
          localStorage.setItem('allRewards', JSON.stringify(dataReward.data));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="keranjang-header padding-lr-20 no-default-header">
          <h4 className="header_title">KHU-KHA Rewards</h4>
          <p className="header_subtitle">
            Belanja sekarang dan dapatkan reward menarik dari kami!
          </p>
        </div>
        <div className="all-produk padding-lr-20 rewards-wrap">
          {rewards.map((item, index) => (
            <div className="produk-card">
              <div className="produk-list-header">
                <div className="produk-logo">
                  <img src={logo} alt="" />
                  <span>
                    OFFICIAL
                    <br />
                    REWARD
                  </span>
                </div>
                <div className="produk-desc">{new Intl.NumberFormat('id-ID').format(item.poin)} poin</div>
                <div className="produk-satuan">rewards</div>
                <div className="produk-image">
                  <img src={baseImgURL + 'reward/' + item.link_gambar} alt="" />
                </div>
              </div>
              <div className="produk-info">
                <div
                  className="full-desc-content"
                  dangerouslySetInnerHTML={{
                    __html: item.reward,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default RewardScreen;
