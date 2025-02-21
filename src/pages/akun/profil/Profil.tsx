import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getItem, removeItem } from '../../../utils/khukhaDBTemp';
import { fetchPoin } from '../../../utils/api';
import { calculateMemberDuration } from '../../../utils/calculateDuration';
import whitelogo from '../../../assets/khukha-white.svg';
import point from '../../../assets/diamond.png';
import cashback from '../../../assets/cashback.png';

const Profil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [memberDuration, setMemberDuration] = useState<string>('');
  const history = useHistory();
  const [poinCashback, setPoinCashback] = useState<any>({
    total_poin: 0,
    total_cashback: 0,
  });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = JSON.parse((await getItem('user')) || '{}');
      setUser(storedUser);
      if (storedUser?.tgl_member) {
        const durationText = calculateMemberDuration(storedUser.tgl_member);
        setMemberDuration(durationText);
      }
      const storedPoinCashback = await fetchPoin(storedUser.id);
      setPoinCashback(storedPoinCashback.data);
    };
    loadUser();
  }, []);
  const historyBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="user-info-wrap akun-wrap">
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
                  Rp.{new Intl.NumberFormat('id-ID').format(poinCashback?.total_cashback ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="akun-container padding-lr-20 no-default-header">
          <h4 className="header_title">Profil</h4>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Profil;
