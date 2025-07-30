// src/pages/Login.js
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login Successful",
        description: "You're being redirected...",
      });
      navigate('/profile');
    } catch (error) {
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to access your courses and profile
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </button>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}