import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;