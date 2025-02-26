import {IonContent, IonModal} from "@ionic/react";
import React, {Dispatch, SetStateAction, useRef} from "react";

export default function RewardCongratsModal({congratsModal, setCongratsModal}: {
    congratsModal: boolean,
    setCongratsModal: Dispatch<SetStateAction<boolean>>
}) {
    return <IonModal
        isOpen={congratsModal}
        initialBreakpoint={0.55}
        breakpoints={[0, 0.25, 0.5, 0.75]}
        handleBehavior="cycle"
        className={"reward-modal"}
    >
        <IonContent className="ion-padding">
            <div className="congrats">
                <div className="congrats__content">
                    <div className="congrats__icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#d4a017"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 12l2 2 4-4"/>
                        </svg>
                    </div>
                    <h2 className="congrats__title">Selamat!</h2>
                    <p className="congrats__text">
                        Penukaran poin kamu untuk <br/>
                        <strong>Uang Tunai Sebesar Rp875.000</strong> <br/>
                        akan segera diproses
                    </p>
                    <p className="congrats__text congrats__text--small">
                        Silahkan cek notifikasi WhatsApp secara berkala
                    </p>
                    <div className="congrats__note">
                        <div className="congrats__note-icon">ℹ️</div>
                        <div className="congrats__note-text">
                            Setelah menyelesaikan penukaran, pihak Khukha akan menghubungi kamu
                            untuk konfirmasi lanjut
                        </div>
                    </div>
                    <button className="congrats__button" onClick={() => setCongratsModal(false)}>Oke</button>
                </div>
            </div>

        </IonContent>
    </IonModal>
}