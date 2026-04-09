import React from 'react';
import { Card } from '../../components/primitives';

export default function Charts({ data }: { data: { label: string, value: number, color: string }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <Card>
      <h3>Cash Flow Breakdown</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '8px', marginTop: 'var(--spacing-md)' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ paddingBottom: '4px', fontSize: '0.75rem' }}>{d.value.toFixed(2)}</div>
            <div style={{ width: '100%', backgroundColor: d.color, height: `${(d.value / max) * 100}%`, borderRadius: '4px 4px 0 0' }} />
            <div style={{ paddingTop: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{d.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
