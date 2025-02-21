import React, {useState} from 'react';
import {IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import useAuth from "../../../common/hooks/useAuth";
import {useGetList, usePost} from "../../../common/hooks/useApi";
import {ResponseListType} from "../../../common/interface/response-type";
import Swal from "sweetalert2";
import '../daftar-member/Daftar.css';

const ProfilPage: React.FC = () => {
    const {getUser} = useAuth();
    const history = useHistory();
    const initialPayload = {
        nama: '',
        member_level: 'Konsumen',
        email: '',
        nik: '',
        no_ktp: '',
        no_hp: '',
        alamat: '',
        id_kab: '',
        password: ''
    }
    const [payload, setPayload] = useState(initialPayload);
    const [noKtpError, setNoKtpError] = useState(false);
    const [kabupatenError, setKabupatenError] = useState(false);
    const {mutate, isPending} = usePost({
        name: 'profil',
        endpoint: 'profil',
        onSuccess: async () => {
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil Update',
            })
        },
        onError: (err: any) => {
                if (err.response && err.response.data.errors) {
                    const validationErrors = Object.values(err.response.data.errors).flat() as string[];
                    Swal.fire({
                        icon: 'error',
                        html: `<ul style="text-align: left; ">${validationErrors
                            .map(error => `<li style="color:red">${error}</li>`)
                            .join('')}</ul>`,
                    });
                } else if (err.response?.data?.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unexpected Error',
                        text: 'An unexpected error occurred. Please try again.',
                    });
                }
        }
    })

    const {
        data: datakab,
        refetch: refetchProduk,
    } = useGetList<ResponseListType<any[]>>({
        name: 'kabupaten',
        endpoint: '/kabupaten',
        params: {},
    });

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
        setNoKtpError(false);
        setKabupatenError(false);
        if (payload.nik.length !== 16) {
            setNoKtpError(true);
            return;
        }
        if (!payload.id_kab) {
            setKabupatenError(true);
            return;
        }
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
                    <h4 className="header_title">Profil</h4>
                </div>
                <div className="padding-lr-20">


                    <form
                        className="daftar_form"
                        onSubmit={handleDaftar}
                        autoComplete="off"
                    >

                        <div className="form-item">
                            <label>Nama Lengkap</label>
                            <input
                                type="text"
                                value={payload.nama}
                                onChange={(e) => handlePayloadChange('nama', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-item">
                            <label>Email</label>
                            <input
                                type="email"
                                value={payload.email}
                                onChange={(e) => handlePayloadChange('email', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-item">
                            <label>No KTP (16 Digits)</label>
                            {noKtpError && (
                                <p className="error-text">No KTP harus 16 digit!</p>
                            )}
                            <input
                                type="tel"
                                value={payload.nik}
                                onChange={(e) => handlePayloadChange('nik', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-item">
                            <label>No HP (Min 10 Digit)</label>
                            <input
                                type="tel"
                                value={payload.no_hp}
                                onChange={(e) => handlePayloadChange('no_hp', e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label>Alamat</label>
                            <textarea
                                value={payload.alamat}
                                onChange={(e) => handlePayloadChange('alamat', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-item" style={{marginBottom: '16px'}}>
                            <label>Kabupaten</label>
                            {kabupatenError && (
                                <p className="error-text">Kabupaten wajib dipilih!</p>
                            )}
                            <IonSelect
                                value={payload.id_kab}
                                onIonChange={(e) => handlePayloadChange('id_kab', e.detail.value)}
                                placeholder="Pilih Kabupaten"
                            >
                                {datakab?.data.map((kab: any) => (
                                    <IonSelectOption key={kab.id} value={kab.id}>
                                        {kab.nama}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
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

export default ProfilPage;
