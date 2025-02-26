import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo-khukha.png';
import eye from '../../assets/eye.svg';
import eyeoff from '../../assets/eye-off.svg';
import khukhaVideo from '../../assets/khukha-video.mp4';
import { setItem } from '../../utils/khukhaDBTemp';
import { usePost } from "../../common/hooks/useApi";
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory();
  const [kode_ref, setReferall] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Using usePost hook
  const loginMutation = usePost({
    name: 'login',
    endpoint: '/login',
    onSuccess: async (data) => {
      await setItem('auth_token', data.token);
      await setItem('user', JSON.stringify(data.user));
      onLogin();
      setTimeout(() => {
        history.push('/home');
      }, 200); 
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    loginMutation.mutate({
      kode_ref,
      password,
    });
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push('/forgot-password');
  };

  return (
    <div className="login-content">
      {/* Video Background */}
      <video autoPlay muted loop className="background-video">
        <source src={khukhaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-container">
        <div className='login-headerx'>
        <img src={logo} alt="App Logo" className="logo" />
        <h1 className="login_title">
          Login & Mulai Belanja.
        </h1>
        </div>
        
        {error && (
          <p
            style={{
              background: 'rgb(205 21 21 / 60%)',
              textAlign: 'center',
              padding: '10px 20px',
              color: '#fff',
            }}
          >
            {error}
          </p>
        )}
        <form className="login_form" onSubmit={handleLogin}>
          <div className="form-item">
            <input
              type="text"
              placeholder="Kode Referall"
              value={kode_ref}
              onChange={(e) => setReferall(e.target.value)}
            />
          </div>
          <div className="form-item">
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? eye : eyeoff}
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <button
              type="button"
              className="lupa-link"
              onClick={handleForgotPasswordClick}
            >
              Lupa?
            </button>
          </div>
          <button type="submit" className="loginbtn" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
