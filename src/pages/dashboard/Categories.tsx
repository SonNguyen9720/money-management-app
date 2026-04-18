import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { categoryService } from '../../services/categoryService';
import { Card, Input, Button } from '../../components/primitives';

export default function CategoriesPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
  const [icon, setIcon] = useState('🔖');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: () => categoryService.getCategories(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (newCategory: any) => categoryService.createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setName('');
    }
  });

  const archiveMutation = useMutation({
    mutationFn: (id: string) => categoryService.archiveCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      createMutation.mutate({
        userId: user.id,
        name,
        type,
        icon,
        color: '#0ea5e9'
      });
    }
  };

  const activeCategories = categories?.filter(c => !c.isArchived) || [];
  
  return (
    <div>
      <h2>Manage Categories</h2>
      
      <Card style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3>Create New Category</h3>
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <div className="input-group">
              <label>Type</label>
              <select value={type} onChange={e => setType(e.target.value as any)} className="input-field">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <Input label="Icon (Emoji)" value={icon} onChange={e => setIcon(e.target.value)} required />
          </div>
          <Button type="submit" disabled={createMutation.isPending}>Add Category</Button>
        </form>
      </Card>

      {isLoading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
          {activeCategories.map(cat => (
            <Card key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ marginRight: '8px' }}>{cat.icon}</span>
                <strong>{cat.name}</strong>
              </div>
              <Button variant="danger" onClick={() => archiveMutation.mutate(cat.id)}>Del</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
