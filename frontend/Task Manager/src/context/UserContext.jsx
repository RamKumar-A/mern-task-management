import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (err) {
        console.error('User not authenticated', err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  function updateUser(userData) {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    setLoading(false);
  }

  function clearUser() {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('User context used outside the provider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useUser, UserProvider };
