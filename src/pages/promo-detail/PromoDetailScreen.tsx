import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { baseImgURL } from '../../utils/axios';
import { Promo } from '../../entity/PromoEntity';

const PromoDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ promo: Promo }>();
  const promo = location.state?.promo;

  const historyBack = () => {
    history.goBack();
  };

  if (!promo) {
    return (
      <div>
        <h1>Promo tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <div className="history-back" onClick={historyBack}></div>
        <div className="promodetail-img">
          <img src={baseImgURL + 'promo/' + promo.link_gambar} alt="" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PromoDetail;
