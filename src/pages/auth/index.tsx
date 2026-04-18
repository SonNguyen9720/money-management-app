import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Input, Button } from '../../components/primitives';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const user = await authService.login(email, password);
        login(user);
        navigate('/');
      } else {
        const user = await authService.register(email, password);
        login(user);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          {isLogin ? 'Login' : 'Create an account'}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input 
            label="Email" 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            label="Password" 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <div className="input-error" style={{ marginBottom: 'var(--spacing-md)' }}>{error}</div>}
          <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer' }}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </Card>
    </div>
  );
}
