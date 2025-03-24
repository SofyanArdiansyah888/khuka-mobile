import React, {useState} from 'react';
import {IonContent, IonFooter, IonPage} from '@ionic/react';
import {useHistory, useLocation} from 'react-router-dom';
import {Reward} from '../../../entity/RewardEntity';
import {baseImgURL} from '../../../utils/axios';
import './RewardDetail.css';
import point from "../../../assets/diamond.png";
import RewardConfirmModal from "./RewardConfirmModal";
import RewardCongratsModal from "./RewardCongratsModal";

const RewardDetail: React.FC = () => {
    const history = useHistory();
    const [confirmModal,setConfirmModal] = useState(false)
    const [congratsModal,setCongratsModal] = useState(false)
    const location = useLocation<{ reward: Reward; poin: number; }>();
    const reward = location.state?.reward;
    const poin = location.state?.poin ?? 0;
    return (
        <IonPage>
            <IonContent fullscreen>
                {/*HEADER*/}
                <div className="header-with-back padding-lr-20 no-default-header">
                    <div
                        className="history-back non-absolute"
                        onClick={() =>history.goBack() }
                    ></div>
                    <h4 className="header_title">Detail Reward</h4>
                </div>

                {/*THUMBNAIL IMAGE*/}
                <div className="reward-detail padding-lr-20 with_bottom_border">
                    <img className='reward-img' src={baseImgURL + 'reward/' + reward.link_gambar} alt=""/>
                    <h2>{reward?.reward}</h2>
                    <div className="produk-cash-poin reward">
                        <div className="cash-poin-img"><img src={point} alt="Points"/></div>
                        <div className="cash-poin-text">
                            <p>{reward?.poin} Point</p>
                        </div>
                    </div>
                </div>

                {/*DESKRIPSI*/}
                <div className={'reward-desc padding-lr-20 padding-bottom with_bottom_border'}>
                    <h5>Deskripsi</h5>
                    <div className="full-desc-content">Reward uang tunai sebesar Rp875.000 bisa kamu dapatkan dan
                        penjelasan lainnya bisa ditulis
                        disini
                    </div>
                </div>

                {/*SYARAT & KETENTUAN*/}
                <div className={'reward-desc padding-lr-20 padding-bottom with_bottom_border'}>
                    <h5>Syarat & Ketentuan</h5>
                    <div className="full-desc-content">1. Reward uang tunai hanya berlaku selama periode dari tanggal
                        9-15 Februari 2025 2. Pastikan poin sudah cukup untuk melakukan penukaran 3. Setelah berhasil
                        melakukan penukaran, laporan reward akan masuk ke dalam akun silahkan cek di halaman Riwayat
                        Reward di halaman akun 4. Penjelasan lainnya bisa ditulis di sini
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
                    poin ={poin}
                />
                <RewardCongratsModal
                    congratsModal={congratsModal}
                    setCongratsModal={setCongratsModal}
                />
            </IonFooter>
        </IonPage>
    );
};

export default RewardDetail;
