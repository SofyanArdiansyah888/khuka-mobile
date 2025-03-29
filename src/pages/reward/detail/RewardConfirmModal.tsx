import {IonContent, IonModal} from "@ionic/react";
import questionIcon from "../../../assets/question.svg";
import React, {Dispatch, SetStateAction} from "react";
import {useLocation} from "react-router-dom";
import {Reward} from "../../../entity/RewardEntity";
import {usePost} from "../../../common/hooks/useApi";
import {handleErrorResponse} from "../../../utils/utils";
import useAuth from "../../../common/hooks/useAuth";

export default function RewardConfirmModal({
    confirmModal,
    setConfirmModal,
    setCongratsModal,
    setNilaiUang,
    poin,
}: {
    confirmModal: boolean;
    setConfirmModal: Dispatch<SetStateAction<boolean>>;
    setCongratsModal: Dispatch<SetStateAction<boolean>>;
    setNilaiUang: Dispatch<SetStateAction<string | ''>>
    poin: number;
}) {
    const location = useLocation<{ reward: Reward }>();
    const reward = location.state?.reward;
    const {getUser} = useAuth()

    const {mutate, isPending} = usePost({
        name: 'request-redeem',
        endpoint: '/request-redeem',
        onSuccess: async () => {
            setNilaiUang(reward?.nilai_uang || "Rp.0,-");
            setCongratsModal(true);
            setConfirmModal(false);
        },
        onError: handleErrorResponse
    });


    async function handleTukarSekarang(){
        const user = await getUser()
        mutate({
            ...reward,
            id_member: user?.id,
            id_reward: reward.id,
            jumlah_cashback: reward.nilai_uang,
        })
    }
    return (
        <IonModal
            isOpen={confirmModal}
            initialBreakpoint={0.6}
            breakpoints={[0, 0.25, 0.5, 0.75]}
            handleBehavior="cycle"
            className={"reward-modal"}
        >
            <IonContent className="ion-padding">
                <div className="reward-confirmation">
                    <div className="reward-confirmation__icon_wrapper">
                        <img src={questionIcon} className={'reward-confirmation__icon'}/>
                    </div>
                    <div className="reward-confirmation__wrapper">
                        <p className="reward-confirmation__title">
                            Apakah kamu yakin ingin menukar reward ini?
                        </p>
                    </div>

                    <div className="reward-confirmation__details">
                        <div className="reward-confirmation__header">
                            <span>{reward?.reward}</span>
                        </div>
                        <div className="reward-confirmation__detail">
                            <span>Poin</span>
                            <strong>{reward?.poin} Poin</strong>
                        </div>
                        <div className="reward-confirmation__detail">
                            <span>Poin yang dimiliki</span>
                            <strong>{poin} Poin</strong>
                        </div>
                    </div>

                    <div className="reward-confirmation__actions">
                        <button
                            className="reward-confirmation__button reward-confirmation__button--confirm"
                            onClick={handleTukarSekarang}
                            disabled={isPending}
                        >
                            {isPending ? "Loading..." : "Tukar Sekarang"}
                        </button>
                        <button
                            className="reward-confirmation__button reward-confirmation__button--cancel"
                            onClick={() => setConfirmModal(false)}
                        >Batal
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    )
}
