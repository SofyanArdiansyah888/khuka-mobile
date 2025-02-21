import '../daftar-member/Daftar.css';
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {usePost} from "../../../common/hooks/useApi";
import Swal from "sweetalert2";
import {IonContent, IonPage} from "@ionic/react";
import InputPassword from "../../../components/forms/InputPassword";

export default function UbahPasswordPage() {
    const history = useHistory();
    const initialPayload = {
        password_lama: '',
        password: '',
        password_confirmation: '',
    }
    const [payload, setPayload] = useState(initialPayload);
    const {mutate, isPending} = usePost({
        name: 'update-password',
        endpoint: 'update-password',
        onSuccess: async () => {
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil Update Password',
            })
        },
        onError: () => {

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
        mutate(payload)
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