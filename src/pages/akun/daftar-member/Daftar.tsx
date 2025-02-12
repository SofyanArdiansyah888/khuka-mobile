import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Daftar.css';

const DaftarMember: React.FC = () => {
  const [datakab, setDataKab] = useState<any[]>([]);
  const history = useHistory();
  const [kodeRef, setKodeRef] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [noKtp, setNoKtp] = useState('');
  const [noKtpError, setNoKtpError] = useState(false);
  const [noHp, setNoHp] = useState('');
  const [noHpLain, setNoHpLain] = useState('');
  const [alamat, setAlamat] = useState('');
  const [id_kab, setKabupaten] = useState('');
  const [kabupatenError, setKabupatenError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const historyBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const storedDataKab = JSON.parse(localStorage.getItem('kabupaten') || '{}');
    setDataKab(storedDataKab);
  }, []);

  const handleDaftar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNoKtpError(false);
    setKabupatenError(false);

    if (noKtp.length !== 16) {
      setNoKtpError(true);
      setLoading(false);
      return;
    }
    if (!id_kab) {
      setKabupatenError(true);
      setLoading(false);
      return;
    }

    // Simulate API request
    setTimeout(() => {
      console.log({
        kodeRef,
        nama,
        email,
        noKtp,
        noHp,
        noHpLain,
        alamat,
        id_kab,
        password,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="reward-header padding-lr-20 no-default-header">
          <div
            className="history-back non-absolute"
            onClick={historyBack}
          ></div>
          <h4 className="header_title">Pendaftaran Member Khukha</h4>
        </div>
        <div className="padding-lr-20">
          <form
            className="daftar_form"
            onSubmit={handleDaftar}
            autoComplete="off"
          >
            <div className="form-item">
              <label>Kode Referall</label>
              <input
                type="text"
                value={kodeRef}
                onChange={(e) => setKodeRef(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label>Nama</label>
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
              <label>No KTP</label>
              <input
                type="tel"
                value={noKtp}
                onChange={(e) => setNoKtp(e.target.value)}
                required
              />
              {noKtpError && (
                <p className="error-text">No KTP harus 16 digit!</p>
              )}
            </div>
            <div className="form-item">
              <label>No HP</label>
              <input
                type="tel"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label>No HP Lain (Optional)</label>
              <input
                type="tel"
                value={noHpLain}
                onChange={(e) => setNoHpLain(e.target.value)}
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
              {kabupatenError && (
                <p className="error-text">Kabupaten wajib dipilih!</p>
              )}
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
