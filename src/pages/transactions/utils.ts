export const inferStatus = (dateString: string): 'Pending' | 'Completed' => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Set time to 0 to compare just dates
  const dDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return dDate >= dNow ? 'Pending' : 'Completed';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();

  if (isToday) {
    const month = date.toLocaleString('default', { month: 'short' });
    return `Today, ${month} ${date.getDate()}`;
  }
  
  return date.toLocaleString('default', { month: 'long', day: 'numeric' });
};

export const formatAmount = (amount: number, type: 'income' | 'expense' | 'transfer'): string => {
  const prefix = type === 'income' ? '+' : '-';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  
  return `${prefix}${formatted}`;
};
