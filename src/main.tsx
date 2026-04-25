import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Root from './pages/Root'
import AuthPage from './pages/auth'
import SettingsPage from './pages/dashboard/Settings'
import WalletsPage from './pages/wallets'
import CategoriesPage from './pages/dashboard/Categories'
import BudgetsPage from './pages/budgeting/Budgets'
import GoalsPage from './pages/budgeting/Goals'
import BillsPage from './pages/dashboard/Bills'
import Dashboard from './pages/dashboard/index'
import TransactionsPage from './pages/transactions/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Root />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="bills" element={<BillsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
