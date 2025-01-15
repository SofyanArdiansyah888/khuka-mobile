import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import logo from '../../assets/logo-khukha.png'; // Import logo image
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory(); // Initialize useHistory hook

  const handleLogin = () => {
    onLogin(); // Call the passed onLogin function
    history.push('/home'); // Redirect to home after login
  };

  return (
    <IonPage>
      <IonContent className="login-content ion-padding">
        <div className="login-container">
          <img src={logo} alt="App Logo" className="logo" />
          <h1 className="login_title">
            Login & <br />
            Mulai Belanja.
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevents the default form submission behavior
              handleLogin(); // Trigger login and redirect
            }}
          >
            <IonItem>
              <IonInput type="text" placeholder="Username" />
            </IonItem>
            <IonItem>
              <IonInput type="password" placeholder="Password" />
              <IonButton
                className="lupa"
                slot="end"
                fill="clear"
                href="/forgot-password"
              >
                Lupa?
              </IonButton>
            </IonItem>
            <IonButton
              className="loginbtn"
              type="submit"
              expand="block"
              fill="solid"
            >
              LOGIN
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginScreen;
