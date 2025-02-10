import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { Reward } from '../../../entity/RewardEntity';
import { baseImgURL } from '../../../utils/axios';
import './RewardDetail.css';

const RewardDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ reward: Reward }>();
  const reward = location.state?.reward;
  const historyBack = () => {
    history.goBack();
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="reward-header padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Detail Reward</h4>
        </div>
        <div className="reward-detail padding-lr-20">
            <img className='reward-img' src={baseImgURL + 'reward/' + reward.link_gambar} alt="" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RewardDetail;
