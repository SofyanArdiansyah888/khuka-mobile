import { useState, useEffect } from 'react';
import { setItem, getItem, removeItem } from '../../utils/khukhaDBTemp';
const SESSION_KEY = 'isAuthenticated';
const EXPIRATION_KEY = 'sessionExpiration';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const sessionActive = (await getItem(SESSION_KEY)) === true;
      const sessionExpiration = await getItem(EXPIRATION_KEY);
      const now = Date.now();

      if (sessionActive && sessionExpiration) {
        const expirationTime = parseInt(sessionExpiration, 10);

        if (now >= expirationTime) {
          handleLogout(); // Expire session if time is up
        } else {
          setIsAuthenticated(true); // Update state
          const timer = setTimeout(handleLogout, expirationTime - now);
          return () => clearTimeout(timer);
        }
      }
    };

    checkSession();
  }, []);

  const handleLogin = () => {
    const expirationTime = Date.now() + 60 * 60 * 1000; // Session expires in 1 hour
    setItem(SESSION_KEY, 'true');
    setItem(EXPIRATION_KEY, expirationTime.toString());
    setIsAuthenticated(true); // Ensure the state is updated immediately
  };

  const handleLogout = () => {
    removeItem(SESSION_KEY);
    removeItem(EXPIRATION_KEY);
    setIsAuthenticated(false); // Update state to false
  };

  return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
