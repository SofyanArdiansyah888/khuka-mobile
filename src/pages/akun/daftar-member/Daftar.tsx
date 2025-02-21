import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import { fetchKabupaten } from '../../../utils/api';
import { getItem } from '../../../utils/khukhaDBTemp';
import { useHistory } from 'react-router-dom';
import api from '../../../utils/axios';
import Swal from 'sweetalert2';
import './Daftar.css';

const DaftarMember: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [datakab, setDataKab] = useState<any[]>([]);
  const history = useHistory();
  const [sponsor_ref, setKodeRef] = useState('');
  const [nama, setNama] = useState('');
  const [member_level, setLevel] = useState('Konsumen');
  const [email, setEmail] = useState('');
  const [nik, setNoKtp] = useState('');
  const [noKtpError, setNoKtpError] = useState(false);
  const [no_hp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [id_kab, setKabupaten] = useState('');
  const [kabupatenError, setKabupatenError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const historyBack = () => {
    history.goBack();
  };

   useEffect(() => {
      const fetchData = async () => {
              try {
                const storedUser = JSON.parse(await getItem('user') || '{}');
                setUser(storedUser);
                // console.log(storedUser)
                if (storedUser.kode_ref) {
                  setKodeRef(storedUser.kode_ref);
                }
      
                const storedKabupaten = await fetchKabupaten();
                setDataKab(storedKabupaten.data);    
               
              
              } catch (error) {
                console.error('Error fetching data:', error);
              } finally {
               
              }
            };
      
            fetchData();
     
            setLevel('Konsumen');
     
    }, []);


  const handleDaftar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNoKtpError(false);
    setKabupatenError(false);

    if (nik.length !== 16) {
      setNoKtpError(true);
      setLoading(false);
      return;
    }
    if (!id_kab) {
      setKabupatenError(true);
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/daftar-member', {
        sponsor_ref,
        nama,
        email,
        member_level,
        nik,
        no_hp,
        alamat,
        id_kab,
        password,
      });
      if(response.data.success){
        Swal.fire({
          icon: 'success',
          title: 'Pendaftaran Berhasil!',
          html: '<p>Selamat! Anda telah terdaftar sebagai Member.</p> <p>Segera melakukan pembayaran sebesar Rp. 250.000,- untuk mengaktifkan Akun Anda.</p>',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to "info-pembayaran" page after clicking OK
          // history.push('/akun');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    
    } catch (err: any) {
      if (err.response && err.response.data.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat() as string[];
    
        // Display errors in SweetAlert2
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
     finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="daftar_page">
   
        <div className="header-with-back padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Pendaftaran Member Khukha</h4>
        </div>
        <div className="padding-lr-20">
          {errors.length > 0 && (
            <ul className="text-red-500 list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <form
            className="daftar_form"
            onSubmit={handleDaftar}
            autoComplete="off"
          >
            
            <div className="form-item">
              <label>Nama Lengkap</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={nik}
                onChange={(e) => setNoKtp(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label>No HP (Min 10 Digit)</label>
              <input
                type="tel"
                value={no_hp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>
         
            <div className="form-item">
              <label>Alamat</label>
              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>
            <div className="form-item" style={{ marginBottom: '16px' }}>
              <label>Kabupaten</label>
              {kabupatenError && (
                <p className="error-text">Kabupaten wajib dipilih!</p>
              )}
              <IonSelect
                value={id_kab}
                onIonChange={(e) => setKabupaten(e.detail.value)}
                placeholder="Pilih Kabupaten"
              >
                {datakab.map((kab: any) => (
                  <IonSelectOption key={kab.id} value={kab.id}>
                    {kab.nama}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
            <div className="form-item">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="passwordx"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Tutup' : 'Lihat'}
                </button>
              </div>
            </div>
            <button type="submit" className="loginbtn" disabled={loading}>
              {loading ? 'Mohon tunggu...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DaftarMember;
