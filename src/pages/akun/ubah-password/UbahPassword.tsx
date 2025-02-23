import '../daftar-member/Daftar.css';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {usePost} from "../../../common/hooks/useApi";
import Swal from "sweetalert2";
import {IonContent, IonPage} from "@ionic/react";
import InputPassword from "../../../components/forms/InputPassword";
import {handleErrorResponse} from "../../../utils/utils";
import useAuth from "../../../common/hooks/useAuth";
import {removeItem} from "../../../utils/khukhaDBTemp";

export default function UbahPasswordPage() {
    const history = useHistory();
    const {getUser} = useAuth();
    const [payload, setPayload] = useState({
        password_lama: '',
        password: '',
        password_confirmation: '',
    });
    const {mutate, isPending} = usePost({
        name: 'update-password',
        endpoint: '/update-password',
        onError: handleErrorResponse,
        onSuccess: async () => {
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil Update Password',
            })
            await removeItem('user');
            await removeItem('auth_token');
            await removeItem('isAuthenticated');
            await removeItem('sessionExpiration');
            history.push('/login');
        }
    })

    function handlePayloadChange(key: string, value: string) {
        setPayload((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const handleDaftar = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = await getUser();
        if(payload.password !== payload.password_confirmation) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Password konfirmasi harus sama dengan password baru',
            });
            return;
        }
        mutate({
            ...payload,
            kode_ref: user?.kode_ref
        })
    };

    return (
        <IonPage>
            <IonContent fullscreen className="daftar_page">

                <div className="header-with-back padding-lr-20 no-default-header">
                    <div
                        className="history-back non-absolute"
                        onClick={() => history.goBack()}
                    ></div>
                    <h4 className="header_title">Ubah Password</h4>
                </div>
                <div className="padding-lr-20">
                    <form
                        className="daftar_form"
                        onSubmit={handleDaftar}
                        autoComplete="off"
                    >
                        <InputPassword
                            label={"Password Lama"}
                            value={payload.password_lama}
                            onChange={(e) => handlePayloadChange('password_lama', e.target.value)}
                        />
                        <InputPassword
                            value={payload.password}
                            onChange={(e) => handlePayloadChange('password', e.target.value)}
                        />
                        <InputPassword
                            label={"Konfirmasi Password"}
                            value={payload.password_confirmation}
                            onChange={(e) => handlePayloadChange('password_confirmation', e.target.value)}
                        />

                        <button type="submit" className="loginbtn" disabled={isPending}>
                            {isPending ? 'Mohon tunggu...' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};