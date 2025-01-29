import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Promo } from '../../entity/PromoEntity';
import { baseImgURL } from '../../utils/axios';
import back from '../../assets/arrow-left.svg';
import './Promo.css'

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
      <IonHeader className="padding-lr-20">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={historyBack} className="back-button">
              <img src={back} alt="Back" />
            </IonButton>
          </IonButtons>
          <IonTitle>Promo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="promo-detail-img">
          <img src={baseImgURL + 'promo/' + promo.link_gambar} alt="" />
        </div>
        <div className="promo-detail-info full-desc padding-lr-20">
          <h4>{promo.judul}</h4>
          <div
            className="full-desc-content"
            dangerouslySetInnerHTML={{
              __html: promo.deskripsi,
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PromoDetail;
