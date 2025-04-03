import React from 'react';
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from '@ionic/react';
import {baseImgURL} from '../../utils/axios';
import {useHistory} from 'react-router-dom';
import {useGetList} from '../../common/hooks/useApi';
import {ResponseListType} from '../../common/interface/response-type';
import {Reward} from '../../entity/RewardEntity';
import Skeleton from 'react-loading-skeleton';
import iconright from '../../assets/chevron-right.svg';
import './Reward.css';
import 'react-loading-skeleton/dist/skeleton.css';
import HeaderPoint from "../../components/HeaderPoint";

const RewardScreen: React.FC = () => {
    const history = useHistory();
    const [poin, setPoin] = React.useState(0);
const [cashback, setCashback] = React.useState(0);
    const {
        data: rewards,
        isLoading,
        refetch: refetchReward,
    } = useGetList<ResponseListType<Reward[]>>({
        name: 'rewards',
        endpoint: '/rewards',
        params: {},
    });

    const navigateToRewardDetail = (reward: any) => {
        history.push(`/reward-detail/${reward.id}`, {reward,poin,cashback});
    };

    async function swipeToRefresh() {
        await refetchReward();
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonRefresher
                    slot="fixed"
                    onIonRefresh={async (e) => {
                        await swipeToRefresh();
                        e.detail.complete();
                    }}
                >
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {isLoading ? (
                    // Skeleton container
                    <>
                        <div style={{padding: '20px', display: 'flex', gap: '20px'}}>
                            <Skeleton width={150} height={200}/>
                            <Skeleton width={150} height={200}/>
                        </div>
                        <div
                            style={{
                                padding: '20px',
                                display: 'flex',
                                gap: '20px',
                                paddingTop: '0',
                            }}
                        >
                            <Skeleton width={150} height={200}/>
                            <Skeleton width={150} height={200}/>
                        </div>
                    </>
                ) : (
                    <>
                        <HeaderPoint
                            content={<div className="rewards-heading-text">
                                <h3>Tukarkan poin kamu</h3>
                                <p>Semakin banyak poin semakin besar rewardnya</p>
                            </div>}
                            ukuran={'kecil'}
                            onDataReceived={(poin, cashback) => {
                                setPoin(poin);
                                setCashback(cashback);
                            }}
                        />

                        <div className="all-produk padding-lr-20 rewards-wrap">
                            {rewards?.data.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="produk-card"
                                    onClick={() => navigateToRewardDetail(item)}
                                >
                                    <div className="produk-list-header">
                                        <img
                                            src={baseImgURL + 'reward/' + item.link_gambar}
                                            alt=""
                                        />
                                    </div>
                                    <div className="produk-info">
                                        <p>{item.reward}</p>
                                        <div className="poin-wrap">
                                            <div className="poin-item">
                                                <div className="poin">
                                                    {new Intl.NumberFormat('id-ID').format(Number(item.poin))} poin
                                                </div>
                                                <div className="poin-arrow">
                                                    <img src={iconright} alt="arrow right"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};
export default RewardScreen;
