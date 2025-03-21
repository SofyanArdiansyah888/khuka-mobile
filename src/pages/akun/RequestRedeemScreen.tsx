import React, {useEffect, useState} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
import './daftar-member/Daftar.css';
import {usePost, usePut} from "../../common/hooks/useApi";
import {handleErrorResponse} from "../../utils/utils";
import useAuth from "../../common/hooks/useAuth";

const RequestRedeemScreen: React.FC = () => {
    const {getUser} = useAuth();
    const history = useHistory();
    const [payload, setPayload] = useState({
        cashback: 0,
        id_member: null
    });


    useEffect(() => {
        (async () => {
          const result = await getUser()
            setPayload({
                ...payload,
                id_member: result.id
            })
            result.id
        })()
    }, []);

    const {mutate, isPending} = usePost({
        name: 'request-cashback',
        endpoint: '/request-redeem/cashback',
        onSuccess: async () => {

            await Swal.fire({
                icon: 'success',
                title: 'Redeem cashback sukses, silahkan menunggu verifikasi admin',
            });
            history.push('/akun');
        },
        onError: handleErrorResponse
    });



    const handlePayloadChange = (key: string, value: string) => {
        setPayload((prev) => ({...prev, [key]: value}));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({
            ...payload,
            cashback: payload.cashback.toString().replace(/\./g, "")
        });
    };

    return (
        <IonPage>
            <IonContent fullscreen className="daftar_page">
                <div className="header-with-back padding-lr-20 no-default-header">
                    <div className="history-back non-absolute" onClick={() => history.goBack()}></div>
                    <h4 className="header_title">Request Redeem Cashback</h4>
                </div>
                <div className="padding-lr-20">
                    <form className="daftar_form" onSubmit={handleUpdate} autoComplete="off">
                        <div className="form-item">
                            <label>Cashback</label>
                            <input
                                type="text"
                                value={payload.cashback.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                onChange={(e) => handlePayloadChange('cashback', e.target.value.toString().replace(/\./g, ""))}
                                required
                            />
                        </div>

                        <button type="submit" className="loginbtn" disabled={isPending}>
                            {isPending ? 'Mohon tunggu...' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RequestRedeemScreen;
