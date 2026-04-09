import { describe, it, expect, vi } from 'vitest';
import { mockStorage } from './mockStorage';

// Quick mock for global localStorage testing
const storage: Record<string, string> = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, value) => { storage[key] = value; },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
  length: 0,
  key: () => null
} as any;

describe('Performance Data Generation', () => {
  it('handles generating and storing 5000 mock items quickly (sub-2s)', async () => {
    const start = performance.now();
    const txs = Array.from({ length: 5000 }).map((_, i) => ({
      id: `mock-${i}`,
      userId: 'test-user',
      walletId: 'w1',
      categoryId: 'c1',
      type: 'expense',
      amount: Math.random() * 100,
      date: new Date().toISOString(),
      note: 'test generated',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    // Assume setting it takes minimal time locally
    await mockStorage.set('transactions_perf', txs);
    
    const end = performance.now();
    
    expect(end - start).toBeLessThan(2000);
    expect(txs.length).toBe(5000);
  });
});
