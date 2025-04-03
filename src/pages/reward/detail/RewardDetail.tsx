import React, { useEffect, useState } from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchSyarat } from '../../../utils/api';
import { Reward } from '../../../entity/RewardEntity';
import { baseImgURL } from '../../../utils/axios';
import './RewardDetail.css';
import point from '../../../assets/diamond.png';
import RewardConfirmModal from './RewardConfirmModal';
import RewardCongratsModal from './RewardCongratsModal';

const RewardDetail: React.FC = () => {
  const history = useHistory();
  const [confirmModal, setConfirmModal] = useState(false);
  const [congratsModal, setCongratsModal] = useState(false);
  const location = useLocation<{ reward: Reward; poin: number }>();
  const reward = location.state?.reward;
  const poin = location.state?.poin ?? 0;
  const [nilaiUang, setNilaiUang] = useState<string>('');
  const [syaratData, setSyarat] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetchSyarat();
      setSyarat(data.data);
    };
    fetchUserData();
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        {/*HEADER*/}
        <div className="header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={() => history.goBack()}
          ></div>
          <h4 className="header_title">Detail Reward</h4>
        </div>

        {/*THUMBNAIL IMAGE*/}
        <div className="reward-detail padding-lr-20 with_bottom_border">
          <img
            className="reward-img"
            src={baseImgURL + 'reward/' + reward.link_gambar}
            alt=""
          />
          <h2>{reward?.reward}</h2>
          <div className="produk-cash-poin reward">
            <div className="cash-poin-img">
              <img src={point} alt="Points" />
            </div>
            <div className="cash-poin-text">
              <p>{reward?.poin} Point</p>
            </div>
          </div>
        </div>

        {/*DESKRIPSI*/}
        <div
          className={
            'reward-desc padding-lr-20 padding-bottom with_bottom_border'
          }
        >
          <h5>Deskripsi</h5>
          <div className="full-desc-content">
            {reward?.deskripsi}
          </div>
        </div>

        {/*SYARAT & KETENTUAN*/}
        <div
          className={
            'reward-desc padding-lr-20 padding-bottom with_bottom_border'
          }
        >
          <h5>Syarat & Ketentuan</h5>
          <div className="full-desc">
            {syaratData.map((item, index) => (
              <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: item.deskripsi,
              }}
            />
            ))}
          </div>
        </div>
      </IonContent>

      <IonFooter className={'tukar-footer'}>
        <div
          className="beli bn-btn tukar-btn"
          onClick={() => setConfirmModal(true)}
        >
          Tukar Sekarang - {reward?.poin} Poin
        </div>
        <RewardConfirmModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          setCongratsModal={setCongratsModal}
          setNilaiUang={setNilaiUang}
          poin={poin}
        />
        <RewardCongratsModal
          congratsModal={congratsModal}
          setCongratsModal={setCongratsModal}
          nilaiUang={nilaiUang}
        />
      </IonFooter>
    </IonPage>
  );
};

export default RewardDetail;
