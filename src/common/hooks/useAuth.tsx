import {useEffect, useState} from 'react';

const SESSION_KEY = 'isAuthenticated';
const EXPIRATION_KEY = 'sessionExpiration';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const sessionActive = localStorage.getItem(SESSION_KEY) === 'true';
        const sessionExpiration = localStorage.getItem(EXPIRATION_KEY);
        const now = Date.now();

        if (sessionActive && sessionExpiration) {
            const expirationTime = parseInt(sessionExpiration, 10);

            if (now >= expirationTime) {
                handleLogout(); // Expire the session if time is up
            } else {
                setIsAuthenticated(true); // Update state to true
                const timer = setTimeout(handleLogout, expirationTime - now);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const handleLogin = () => {
        const expirationTime = Date.now() + 60 * 60 * 1000; // Session expires in 1 hour
        localStorage.setItem(SESSION_KEY, 'true');
        localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
        setIsAuthenticated(true); // Ensure the state is updated immediately
    };

    const handleLogout = () => {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
        setIsAuthenticated(false); // Update state to false
    };

    function getUser() {
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user') || '{}')
        } catch (error) {
            console.log("ERROR:", error)
        }
        return user;
    }

    return {isAuthenticated, handleLogin, handleLogout, getUser};
};

export default useAuth;
