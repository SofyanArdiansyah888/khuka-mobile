import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { forgotPassword, otpCheck } from '../../utils/api';
import logo from '../../assets/logo-khukha.png';
import './Login.css';

const Forgot: React.FC = () => {
  const history = useHistory();
  const [kode_ref, setReferall] = useState('');
  const [no_hp, setHp] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [timer, setTimer] = useState(120); // 2-minute countdown

  useEffect(() => {
    let interval: any;
    if (timer > 0 && isOtpVisible) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isOtpVisible) {
      clearInterval(interval);
      setError('Waktu habis, silakan minta OTP baru.');
    }
    return () => clearInterval(interval);
  }, [timer, isOtpVisible]);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await forgotPassword({ kode_ref, no_hp });
      if (response.success) {
        setIsOtpVisible(true); // Show OTP input after success
        setTimer(120); // Reset the timer
      } else {
        setError(response.message || 'Gagal memproses permintaan');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      if (err.response && [400, 422].includes(err.response.status)) {
        const messageData = err.response.data.message;
        setError(typeof messageData === 'object' ? Object.values(messageData).flat().join(' ') : messageData);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await otpCheck({ otp });
      if (response.success) {
        clearInterval(timer);
        await Swal.fire({
          icon: 'success',
          title: 'OTP Valid!',
          text: 'Kami telah mengirimkan password baru ke HP Anda.',
          confirmButtonText: 'OK'
        });
        history.push('/login');
      } else {
        setError(response.message || 'OTP tidak valid.');
      }
    } catch (err: any) {
      if (err.response && [400, 422].includes(err.response.status)) {
        const messageData = err.response.data.message;
        setError(typeof messageData === 'object' ? Object.values(messageData).flat().join(' ') : messageData);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const historyBack = () => {
    history.goBack();
  };

  return (
    <div className="login-content padding-lr-20">
      <div className="header-with-back no-default-header">
        <div className="history-back non-absolute" onClick={historyBack}></div>
      </div>
      <div className="login-container" style={{justifyContent:'center',height:'75vh'}}>
        {error && (
          <p style={{ background: 'rgb(205 21 21 / 60%)', textAlign: 'center', padding: '10px 20px', color: '#fff' }}>
            {error}
          </p>
        )}

        {!isOtpVisible ? (
          <form className="login_form" onSubmit={handleForgot}>
            <h1 className="login_title lupa_pass">Lupa Password?</h1>
            <p className="lupa_subtitle">Masukkan kode Ref & No HP Anda</p>
            <div className="form-item">
              <input type="text" placeholder="Kode Referall" value={kode_ref} onChange={(e) => setReferall(e.target.value)} />
            </div>
            <div className="form-item">
              <input type="text" placeholder="No HP" value={no_hp} onChange={(e) => setHp(e.target.value)} />
            </div>
            <button type="submit" className="loginbtn" disabled={isSubmitting}>{isSubmitting ? 'Sedang mengirim...' : 'SUBMIT'}</button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h2>Masukkan Kode OTP</h2>
            <p>Waktu tersisa: {`${Math.floor(timer / 60)}:${timer % 60}`}</p>
            <div className="form-item">
              <input type="text" maxLength={6} placeholder="Masukkan OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <button type="submit" className="loginbtn" disabled={timer === 0 || isSubmitting}>{isSubmitting ? 'Memverifikasi OTP...' : 'SUBMIT'}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgot;
