import {useEffect, useState} from 'react';
import {getItem,setItem,removeItem} from '../../utils/khukhaDBTemp';

const SESSION_KEY = 'isAuthenticated';
const EXPIRATION_KEY = 'sessionExpiration';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkSession = async () => {
          const sessionActive = await getItem(SESSION_KEY) === 'true';
          const sessionExpiration = await getItem(EXPIRATION_KEY);
          const now = Date.now();
      
          if (sessionActive && sessionExpiration) {
            const expirationTime = parseInt(sessionExpiration, 10);
      
            if (now >= expirationTime) {
              handleLogout();
            } else {
              setIsAuthenticated(true);
              const timer = setTimeout(handleLogout, expirationTime - now);
              return () => clearTimeout(timer);
            }
          } else {
            setIsAuthenticated(false);
          }
        };
      
        checkSession();
      }, [isAuthenticated]); // Re-check when `isAuthenticated` changes
      
    

    const handleLogin = async () => {
        const expirationTime = Date.now() + 60 * 60 * 1000; // Session expires in 1 hour
    
        await setItem(SESSION_KEY, 'true');
        await setItem(EXPIRATION_KEY, expirationTime.toString());
    
        setIsAuthenticated(true); // Ensure the state updates immediately
    };
    
    const handleLogout = async () => {
        await removeItem(SESSION_KEY);
        await removeItem(EXPIRATION_KEY);
    
        setIsAuthenticated(false); // Update state to false
    };
    

    const getUser = async () => {
        try {
            const userData = await getItem('user'); // Retrieve user from IndexedDB
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("ERROR:", error);
            return null;
        }
    };
    

    return {isAuthenticated, handleLogin, handleLogout, getUser};
};

export default useAuth;
