import React, { useState } from 'react';
import { Card, Button } from '../../components/primitives';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';

export default function Settings() {
  const { user, login } = useAuthStore();
  const [currency, setCurrency] = useState(user?.preferences?.currency || 'USD');
  const [timezone, setTimezone] = useState(user?.preferences?.timezone || 'UTC');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const updatedUser = await userService.updatePreferences(user.id, { currency, theme: 'light', timezone });
      login(updatedUser);
      setMessage('Preferences saved successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Settings</h2>
      <form onSubmit={handleSave}>
        <div className="input-group">
          <label>Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="input-field">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Timezone</label>
          <select value={timezone} onChange={e => setTimezone(e.target.value)} className="input-field">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
          </select>
        </div>

        {message && <p style={{ color: message.includes('success') ? 'var(--success-color)' : 'var(--danger-color)' }}>{message}</p>}
        
        <Button type="submit" disabled={loading} style={{ marginTop: 'var(--spacing-md)' }}>
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </Card>
  );
}
