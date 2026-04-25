export interface NavigationItem {
  id: string;
  label: string;
  mobileLabel?: string;
  path: string;
  icon: string; // Material Symbols icon name
  mobileIcon?: string;
  requiresAuth?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    mobileLabel: 'Dash',
    path: '/',
    icon: 'dashboard',
    mobileIcon: 'dashboard'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: '/transactions',
    icon: 'receipt_long'
  },
  {
    id: 'wallets',
    label: 'Wallets',
    path: '/wallets',
    icon: 'account_balance_wallet'
  },
  {
    id: 'budgets',
    label: 'Budgets',
    path: '/budgets',
    icon: 'pie_chart'
  },
  {
    id: 'goals',
    label: 'Goals',
    path: '/goals',
    icon: 'ads_click'
  },
  {
    id: 'reminders',
    label: 'Reminders',
    mobileLabel: 'Pay',
    path: '/bills', // Based on existing Root.tsx mapping
    icon: 'notifications_active',
    mobileIcon: 'event_repeat'
  },
  {
    id: 'reports',
    label: 'Reports',
    mobileLabel: 'Stats',
    path: '/reports',
    icon: 'insert_chart',
    mobileIcon: 'query_stats'
  },
  {
    id: 'settings',
    label: 'Settings',
    mobileLabel: 'Set',
    path: '/settings',
    icon: 'settings',
    mobileIcon: 'settings'
  }
];
