import React, {useEffect, useState} from 'react';
import {IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import useAuth from "../../../common/hooks/useAuth";
import {useGetList, usePost} from "../../../common/hooks/useApi";
import {ResponseListType} from "../../../common/interface/response-type";
import Swal from "sweetalert2";
import '../daftar-member/Daftar.css';
import {setItem} from "../../../utils/khukhaDBTemp";
import {handleErrorResponse} from "../../../utils/utils";

const ProfilPage: React.FC = () => {
    const {getUser} = useAuth();
    const history = useHistory();
    const [payload, setPayload] = useState({
        id: '',
        nama: '',
        nik: '',
        no_ktp: '',
        no_hp: '',
        alamat: '',
        id_kab: '',
    });
    const [noKtpError, setNoKtpError] = useState(false);
    const [kabupatenError, setKabupatenError] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getUser();
            if (user) {
                setPayload({
                    id: user.id,
                    nama: user.nama,
                    nik: user.nik,
                    no_ktp: user.no_ktp,
                    no_hp: user.no_hp,
                    alamat: user.alamat,
                    id_kab: user.id_kab,
                });
            }
        })()
    }, [getUser]);

    const {mutate, isPending} = usePost({
        name: 'update-profil',
        endpoint: '/update-profil',
        onSuccess: async () => {
            const user = await getUser();
            // UPDATE INDEX DB JIKA SUKSES
            await setItem('user', {
                ...user,
                ...payload
            })
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil Update Data Profil',
            });
        },
        onError: handleErrorResponse
    });

    const {data: datakab} = useGetList<ResponseListType<any[]>>({
        name: 'kabupaten',
        endpoint: '/kabupaten',
        params: {},
    });

    const handlePayloadChange = (key: string, value: string) => {
        setPayload((prev) => ({...prev, [key]: value}));
    };

    const handleUpdate = async (e: React.FormEvent) => {
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

        mutate(payload);
    };

    return (
        <IonPage>
            <IonContent fullscreen className="daftar_page">
                <div className="header-with-back padding-lr-20 no-default-header">
                    <div className="history-back non-absolute" onClick={() => history.goBack()}></div>
                    <h4 className="header_title">Profil</h4>
                </div>
                <div className="padding-lr-20">
                    <form className="daftar_form" onSubmit={handleUpdate} autoComplete="off">
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
                            <label>No KTP (16 Digits)</label>
                            {noKtpError && <p className="error-text">No KTP harus 16 digit!</p>}
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
                            {kabupatenError && <p className="error-text">Kabupaten wajib dipilih!</p>}
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
