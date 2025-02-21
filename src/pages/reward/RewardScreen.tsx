import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { fetchRewards,fetchPoin } from '../../utils/api';
import { baseImgURL } from '../../utils/axios';
import { calculateMemberDuration } from '../../utils/calculateDuration';
import { useHistory } from 'react-router-dom';
import { useGetList } from '../../common/hooks/useApi';
import { ResponseListType } from '../../common/interface/response-type';
import { Reward } from '../../entity/RewardEntity';
import useAuth from '../../common/hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
import iconright from '../../assets/chevron-right.svg';
import whitelogo from '../../assets/khukha-white.svg';
import cashback from '../../assets/cashback.png';
import point from '../../assets/diamond.png';
import './Reward.css';
import 'react-loading-skeleton/dist/skeleton.css';

const RewardScreen: React.FC = () => {
  const history = useHistory();
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [poinCashback, setPoinCashback] = useState<any>(null);
  const [memberDuration, setMemberDuration] = useState<string>('');

   useEffect(() => {
     const fetchUserData = async () => {
       const storedUser = await getUser(); // Fetch user from IndexedDB
       if (storedUser) {
         setUser(storedUser);
         if (storedUser.tgl_member) {
           const durationText = calculateMemberDuration(storedUser.tgl_member);
           setMemberDuration(durationText);
         }
         const storedPoinCashback = await fetchPoin(storedUser.id);
         setPoinCashback(storedPoinCashback.data);
       }
     };
 
     fetchUserData();
   }, []);

  const {
      data: rewards,
      isLoading,
      refetch: refetchReward,
    } = useGetList<ResponseListType<Reward[]>>({
      name: 'rewards',
      endpoint: '/rewards',
      params: {},
    });

  const navigateToRewardDetail = (reward: any) => {
    history.push(`/reward-detail/${reward.id}`, { reward });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
      {isLoading ? (
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
                <p>{poinCashback?.total_poin ?? 0} poin</p>
              </div>
              <div className="cashback">
                <img src={cashback} alt="Cashback" />
                <p>
                  Rp.
                  {new Intl.NumberFormat('id-ID').format(
                    poinCashback?.total_cashback ?? 0
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
              {rewards?.data.map((item, index) => (
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
                          {new Intl.NumberFormat('id-ID').format(Number(item.poin))}
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
