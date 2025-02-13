import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import whitelogo from '../../../assets/khukha-white.svg';
import point from '../../../assets/diamond.png';
import cashback from '../../../assets/cashback.png';


const Profil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [memberDuration, setMemberDuration] = useState<string>('');
  const history = useHistory();

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
   
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
                <p>25 poin</p>
              </div>
              <div className="cashback">
                <img src={cashback} alt="Cashback" />
                <p>Rp 125.000</p>
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
