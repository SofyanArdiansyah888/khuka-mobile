import {IonContent, IonModal} from "@ionic/react";
import questionIcon from "../../../assets/question.svg";
import React from "react";

export default function RewardConfirmModal(){
    return   <IonModal
        trigger="open-modal"
        initialBreakpoint={0.6}
        breakpoints={[0, 0.25, 0.5, 0.75]}
        handleBehavior="cycle"
        className={"reward-modal"}
    >
        <IonContent className="ion-padding">
            <div className="reward-confirmation">
                <div className="reward-confirmation__icon_wrapper">
                    <img src={questionIcon} className={'reward-confirmation__icon'} />
                </div>
                <div className="reward-confirmation__wrapper">
                    <p className="reward-confirmation__title">
                        Apakah kamu yakin ingin menukar reward ini?
                    </p>
                </div>


                <div className="reward-confirmation__details">
                    <div className="reward-confirmation__header">
                        <span>Uang Tunai Sebesar Rp875.000</span>
                    </div>
                    <div className="reward-confirmation__detail">
                        <span>Poin</span>
                        <strong>175 Poin</strong>
                    </div>
                    <div className="reward-confirmation__detail">
                        <span>Poin yang dimiliki</span>
                        <strong>600 Poin</strong>
                    </div>
                </div>

                <div className="reward-confirmation__actions">
                    <button className="reward-confirmation__button reward-confirmation__button--confirm">Tukar
                        Sekarang
                    </button>
                    <button className="reward-confirmation__button reward-confirmation__button--cancel">Batal
                    </button>
                </div>
            </div>

        </IonContent>
    </IonModal>
}