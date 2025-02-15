import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { fetchRewards } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import { calculateMemberDuration } from '../../utils/calculateDuration';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import iconright from '../../assets/chevron-right.svg';
import whitelogo from '../../assets/khukha-white.svg';
import cashback from '../../assets/cashback.png';
import point from '../../assets/diamond.png';
import './Reward.css';

const RewardScreen: React.FC = () => {
  const history = useHistory();
  const [rewards, setRewards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [poinCashback, setPoinCashback] = useState<any>(null);
  const [memberDuration, setMemberDuration] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if data is already present in localStorage (to avoid re-fetching)
    const storedRewards = JSON.parse(
      localStorage.getItem('allRewards') || '[]'
    );
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    

    if (Object.keys(storedUser).length > 0 && storedRewards.length) {
      setRewards(storedRewards);
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
  const navigateToRewardDetail = (reward: any) => {
    console.log(reward.id);
    history.push(`/reward-detail/${reward.id}`, { reward });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
      {loading ? (
          // Skeleton container
          <>
            <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
              <Skeleton width={150} height={200} />
              <Skeleton width={150} height={200} />
            </div>
            <div
              style={{
                padding: '20px',
                display: 'flex',
                gap: '20px',
                paddingTop: '0',
              }}
            >
              <Skeleton width={150} height={200} />
              <Skeleton width={150} height={200} />
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
                <p>
                  Rp.
                  {new Intl.NumberFormat('id-ID').format(
                    poinCashback.total_cashback
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="rewards-heading-text">
            <h3>Tukarkan poin kamu</h3>
            <p>Semakin banyak poin semakin besar rewardnya</p>
          </div>
        </div>
       
            <div className="all-produk padding-lr-20 rewards-wrap">
              {rewards.map((item, index) => (
                <div
                  key={item.id}
                  className="produk-card"
                  onClick={() => navigateToRewardDetail(item)}
                >
                  <div className="produk-list-header">
                    <img
                      src={baseImgURL + 'reward/' + item.link_gambar}
                      alt=""
                    />
                  </div>
                  <div className="produk-info">
                    <p>{item.reward}</p>
                    <div className="poin-wrap">
                      <div className="poin-item">
                        <div className="poin">
                          {new Intl.NumberFormat('id-ID').format(item.poin)}
                        </div>
                        <div className="poin-arrow">
                          <img src={iconright} alt="arrow right" />
                        </div>
                      </div>
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
export default RewardScreen;
