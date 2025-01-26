import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import logo from '../assets/logo-khukha.png'; // Import logo image
import api from '../utils/axios'; // Import Axios instance
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory(); // Initialize useHistory hook
  const [kode_ref, setReferall] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', {
        kode_ref,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin();
      history.push('/home');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push('/forgot-password');
  };

  return (
    <div className="login-content">
      <div className="login-container">
        <img src={logo} alt="App Logo" className="logo" />
        <h1 className="login_title">
          Login & <br />
          Mulai Belanja.
        </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="lupa-link"
              onClick={handleForgotPasswordClick}
            >
              Lupa?
            </button>
          </div>
          <button
            type="submit"
            className="loginbtn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
