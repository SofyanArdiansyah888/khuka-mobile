import React from 'react';
import {IonContent, IonFooter, IonLabel, IonModal, IonPage} from '@ionic/react';
import {useHistory, useLocation} from 'react-router-dom';
import {Reward} from '../../../entity/RewardEntity';
import {baseImgURL} from '../../../utils/axios';
import './RewardDetail.css';
import point from "../../../assets/diamond.png";
import logo from "../../../assets/logo-khukha.png";
import closeBtn from "../../../assets/close.svg";
import questionIcon from "../../../assets/question.svg"
import RewardConfirmModal from "./RewardConfirmModal";
import RewardCongratsModal from "./RewardCongratsModal";
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
                {/*HEADER*/}
                <div className="header-with-back padding-lr-20 no-default-header">
                    <div
                        className="history-back non-absolute"
                        onClick={historyBack}
                    ></div>
                    <h4 className="header_title">Detail Reward</h4>
                </div>

                {/*THUMBNAIL IMAGE*/}
                <div className="reward-detail padding-lr-20 with_bottom_border">
                    <img className='reward-img' src={baseImgURL + 'reward/' + reward.link_gambar} alt=""/>
                    <h2>Uang tunai sebesar Rp875.000</h2>
                    <div className="produk-cash-poin reward">
                        <div className="cash-poin-img"><img src={point} alt="Points"/></div>
                        <div className="cash-poin-text">
                            <p>
                                175 Point
                                {/*Dapatkan poin sebesar <b>{userPoints} poin</b>*/}
                            </p>
                        </div>
                    </div>
                </div>

                {/*DESKRIPSI*/}
                <div className={'padding-lr-20 padding-bottom with_bottom_border'}>
                    <h5>Deskripsi</h5>
                    <div className="full-desc-content">Reward uang tunai sebesar Rp875.000 bisa kamu dapatkan dan penjelasan lainnya bisa ditulis
                        disini</div>
                </div>


                <div className={'padding-lr-20 padding-bottom with_bottom_border'}>
                    <h5>Syarat & Ketentuan</h5>
                    <div className="full-desc-content">1. Reward uang tunai hanya berlaku selama periode dari tanggal 9-15 Februari 2025 2. Pastikan poin sudah cukup untuk melakukan penukaran 3. Setelah berhasil melakukan penukaran, laporan reward akan masuk ke dalam akun silahkan cek di halaman Riwayat Reward di halaman akun 4. Penjelasan lainnya bisa ditulis di sini</div>
                </div>


            </IonContent>

            <IonFooter className={'tukar-footer'}>
                <div className="beli bn-btn tukar-btn" id={"congrats-modal"}>
                    Tukar Sekarang - 175 Poin
                </div>
                <RewardConfirmModal />
                <RewardCongratsModal />
            </IonFooter>
        </IonPage>
    );
};

export default RewardDetail;
