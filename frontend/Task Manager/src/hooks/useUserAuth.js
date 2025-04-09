import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export function useUserAuth() {
  const { user, loading, clearUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) return;
    if (!user) {
      clearUser();
      navigate('/login');
    }
  }, [user, loading, clearUser, navigate]);
}
