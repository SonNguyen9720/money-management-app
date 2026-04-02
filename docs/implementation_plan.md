# Money Management App — Implementation Plan (v3)

## Overview

Build a **React 19 + TypeScript SPA** for personal finance management. The app uses **mock data initially** with an **abstracted API service layer** designed for easy swap to a Spring Boot backend later. The design follows **"The Editorial Vault"** design system from Stitch — light-mode, editorial-luxury, no-border philosophy.

### Key Decisions (from your feedback)

| Decision | Answer |
|----------|--------|
| Backend integration | **Mock data now**, API layer abstracted for Spring Boot later |
| API architecture | **Axios + TanStack Query included** with mock service implementations swappable to real APIs |
| Auth screens | **Login + Register screens added** (from Stitch) |
| Dark mode | **Light mode only** for MVP |
| Onboarding | **First-time setup wizard included** |

---

## Source of Truth: Stitch Screens (13 total)

| # | Screen | Stitch ID | Route |
|---|--------|-----------|-------|
| 1 | **Login** | `e40b4d0567154e47a25348099a93a9a9` | `/login` |
| 2 | **Register** | `00ac10e3ea454de8b3db0d5b34d3fe08` | `/register` |
| 3 | **Onboarding Wizard** | *(new, not in Stitch)* | `/onboarding` |
| 4 | **Overview Dashboard** | `3565c9b4c70049ddb843301cde9baac1` | `/dashboard` |
| 5 | **Financial Dashboard** | `0f52ce882bc3464996a7b4bf94fa96f9` | `/dashboard` (variant) |
| 6 | **Transactions List** | `e8ad9ab7c85e45e0934ea46c461a6f16` | `/transactions` |
| 7 | **Wallet Management** | `cc02bbc7d26c4e7a8dcf093b3d324a93` | `/wallets` |
| 8 | **Wallet Management (Sidebar)** | `b8b524ae6ae14e158fa45a3813907268` | `/wallets` |
| 9 | **Budget Management** | `d2ec13bb08a24fd3b83eb86afb4b42d0` | `/budgets` |
| 10 | **Savings Goals** | `47eb696a6b0c42559d78ed17ce64699e` | `/goals` |
| 11 | **Reminders & Bills** | `82ea26589e5e4a1e81499f01265f4b5b` | `/reminders` |
| 12 | **Reports & Analytics** | `2dfa6bd30bda444cbbe4189f759ddc52` | `/reports` |
| 13 | **Notifications & Alerts** | `ff539113ad9040baa1a7d4e05bbe2975` | `/notifications` |

---

## Auth Screens (from Stitch)

### Login Screen — "Access Your Portfolio"

- **Layout**: Split panel — left brand panel + right form panel
- **Left panel**: Editorial branding area
  - Tagline: *"Security as an Art."*
  - Description: *"Welcome to the intersection of high-end financial management and editorial precision. Your assets, curated and protected."*
  - Status badge: *"Fully Encrypted Vault"*
  - Background: `primary` → `primary-container` gradient
- **Right panel**: Login form
  - Title: *"Access Your Portfolio"*
  - Subtitle: *"Enter your credentials to manage your secure assets."*
  - Fields: Email, Password
  - "Forgot Password?" link
  - "Sign In" button (primary, full-round)
  - *"Don't have an account? Request access"* → links to `/register`
  - Footer: *"© 2024 Editorial Vault"*

### Register Screen — "Create your vault"

- **Layout**: Split panel (same structure as login)
- **Left panel**: Same brand area
- **Right panel**: Registration form
  - Title: *"Create your vault"*
  - Subtitle: *"Join the world's most curated financial ecosystem."*
  - Fields: Full Name, Email, Password, Confirm Password
  - "Create Account" button (primary, full-round)
  - *"Already have an account? Login"* → links to `/login`
  - Bottom tabs: Login (icon: `login`) | Register (icon: `person_add`)
  - Footer links: Privacy Policy, Terms of Service, Compliance

---

## Onboarding Wizard

A **first-time setup flow** shown after registration (or on first app visit). Step-by-step wizard with Editorial Vault styling:

| Step | Title | Content |
|------|-------|---------|
| 1 | **Welcome** | "Welcome to The Editorial Vault" — brief product intro, "Get Started" button |
| 2 | **Currency** | Choose default currency (USD, EUR, GBP, VND, etc.) with country flags |
| 3 | **First Wallet** | Create first wallet: name, type (Cash/Bank/E-Wallet/Credit Card), initial balance |
| 4 | **Monthly Income** | Set approximate monthly income |
| 5 | **Categories** | Select common spending categories from preset list (toggle chips) |
| 6 | **First Budget** | Create a monthly budget with the selected categories |
| 7 | **Complete** | "Your vault is ready" — summary + "Go to Dashboard" button |

- Progress indicator: thin 4px bar at top (Editorial Vault style)
- Skip option on optional steps
- Data saved to Zustand stores immediately
- Route: `/onboarding` — redirected to after first registration

---

## The Editorial Vault — Design System

*(Unchanged from v2 — full detail in previous version. Key summary below:)*

- **Light mode only** — background `#fbf9f8`, cards `#ffffff`
- **No borders, no dividers** — tonal layering only
- **Fonts**: Manrope (headlines) + Inter (body)
- **Icons**: Google Material Symbols
- **Buttons**: full-round primary (`9999px` radius)
- **Shadows**: ultra-diffused ambient only (`0 8px 24px rgba(27,28,28,0.06)`)
- **Progress bars**: thin 4px, full rounding
- **Growth**: `#acf4a4` bg / `#307231` text
- **Expense**: `#ffdad6` bg / `#930010` text

---

## Tech Stack (Updated)

| Concern | Choice | Rationale |
|---------|--------|-----------|
| **Framework** | React 19 + TypeScript | Already scaffolded |
| **Build Tool** | Vite 8 | Already in place |
| **Routing** | React Router v7 | SPA routing + auth guards |
| **Server State** | **TanStack Query v5** | Caching, refetching — mock now, real API later |
| **Client State** | **Zustand v5** + `persist` | Auth, UI, preferences → localStorage |
| **Forms** | React Hook Form v7 + Zod | Schema validation |
| **HTTP Client** | **Axios** | Interceptors for JWT — mock now, real API later |
| **Styling** | Vanilla CSS (custom properties) | Full control over Editorial Vault tokens |
| **Charts** | Recharts v2 | Dashboard, reports |
| **Icons** | Google Material Symbols | Matches Stitch |
| **Toast** | Sonner | Notifications |
| **Dates** | date-fns | Formatting |
| **Testing** | Vitest + RTL | Vite-native |

> [!IMPORTANT]
> **API Layer Strategy**: We include Axios + TanStack Query from day one, but wrap them behind a **service abstraction layer**. Mock implementations return static data. When the Spring Boot backend is ready, we swap mock services for real API calls — zero component changes needed.

---

## API Service Abstraction Pattern

```typescript
// src/services/types.ts — Interface contract
export interface IWalletService {
  getAll(): Promise<Wallet[]>;
  getById(id: string): Promise<Wallet>;
  create(data: CreateWalletDTO): Promise<Wallet>;
  update(id: string, data: UpdateWalletDTO): Promise<Wallet>;
  delete(id: string): Promise<void>;
}

// src/services/mock/walletService.mock.ts — Mock implementation
export class MockWalletService implements IWalletService {
  async getAll(): Promise<Wallet[]> {
    // Read from localStorage / seed data
    return getMockWallets();
  }
  // ...
}

// src/services/api/walletService.api.ts — Real API (for later)
export class ApiWalletService implements IWalletService {
  constructor(private client: AxiosInstance) {}
  async getAll(): Promise<Wallet[]> {
    const { data } = await this.client.get('/api/wallets');
    return data;
  }
  // ...
}

// src/services/index.ts — Service registry (swap here)
import { MockWalletService } from './mock/walletService.mock';
// import { ApiWalletService } from './api/walletService.api'; // Uncomment later

const USE_MOCK = true; // Toggle when backend is ready

export const walletService: IWalletService = USE_MOCK
  ? new MockWalletService()
  : new ApiWalletService(apiClient);

// src/hooks/useWallets.ts — TanStack Query hook (never changes)
export function useWallets() {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: () => walletService.getAll(),
  });
}
```

This pattern applies to **every feature**: wallets, transactions, categories, budgets, goals, reminders, dashboard, reports.

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── router/
│   │   ├── index.tsx             # createBrowserRouter
│   │   ├── routes.tsx            # All route definitions
│   │   ├── ProtectedRoute.tsx    # Auth guard → redirect to /login
│   │   └── PublicRoute.tsx       # Guest only → redirect to /dashboard
│   ├── providers/
│   │   └── AppProviders.tsx      # QueryClient + Router + Toast
│   └── store/
│       ├── authStore.ts          # user, token, isAuthenticated, isOnboarded
│       ├── uiStore.ts            # sidebar, modals, search
│       └── settingsStore.ts      # currency, locale, dateFormat
│
├── components/
│   ├── common/                   # Button, Card, Input, Modal, Badge, Icon, Select, etc.
│   ├── feedback/                 # Skeleton, EmptyState, ErrorState
│   ├── layout/
│   │   ├── AppLayout.tsx         # Sidebar + Header + Content
│   │   ├── AuthLayout.tsx        # Split-panel layout for Login/Register
│   │   ├── Sidebar.tsx           # "Premium Tier" nav
│   │   ├── Header.tsx            # Page title + quick-add
│   │   └── MobileNav.tsx         # Bottom tabs
│   ├── charts/                   # AreaChart, BarChart, DonutChart, ChartCard
│   ├── forms/                    # FormField, AmountInput, CategoryPicker, etc.
│   └── finance/                  # BalanceDisplay, TransactionItem, BudgetProgressBar, etc.
│
├── features/
│   ├── auth/
│   │   ├── LoginPage.tsx         # "Access Your Portfolio" — matches Stitch
│   │   ├── RegisterPage.tsx      # "Create your vault" — matches Stitch
│   │   ├── ForgotPasswordPage.tsx
│   │   └── schemas/
│   │       └── authSchemas.ts    # Zod: loginSchema, registerSchema
│   │
│   ├── onboarding/
│   │   ├── OnboardingPage.tsx    # Multi-step wizard container
│   │   ├── steps/
│   │   │   ├── WelcomeStep.tsx
│   │   │   ├── CurrencyStep.tsx
│   │   │   ├── WalletStep.tsx
│   │   │   ├── IncomeStep.tsx
│   │   │   ├── CategoriesStep.tsx
│   │   │   ├── BudgetStep.tsx
│   │   │   └── CompleteStep.tsx
│   │   └── OnboardingProgress.tsx # Thin 4px progress bar
│   │
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── BalanceOverview.tsx   # $142,580.45 with gradient card
│   │   ├── CashFlowCard.tsx     # Income / Expenses / Net
│   │   ├── TopBudgets.tsx
│   │   ├── RecentActivity.tsx
│   │   └── SavingsGoalCard.tsx
│   │
│   ├── transactions/
│   │   ├── TransactionsPage.tsx
│   │   ├── QuickAddTemplates.tsx
│   │   ├── TransactionGroup.tsx
│   │   ├── TransactionForm.tsx
│   │   └── TransactionFilters.tsx
│   │
│   ├── wallets/
│   │   ├── WalletsPage.tsx
│   │   ├── WalletCard.tsx
│   │   ├── WalletForm.tsx
│   │   ├── TransferForm.tsx
│   │   └── WalletActivity.tsx
│   │
│   ├── budgets/
│   │   ├── BudgetsPage.tsx
│   │   ├── BudgetCard.tsx
│   │   ├── BudgetForm.tsx
│   │   └── BudgetSummary.tsx
│   │
│   ├── goals/
│   │   ├── GoalsPage.tsx
│   │   ├── GoalCard.tsx
│   │   ├── GoalForm.tsx
│   │   └── ContributionForm.tsx
│   │
│   ├── reminders/
│   │   ├── RemindersPage.tsx
│   │   ├── ReminderCard.tsx
│   │   ├── ReminderForm.tsx
│   │   └── ReminderList.tsx
│   │
│   ├── reports/
│   │   ├── ReportsPage.tsx
│   │   ├── MonthlySummary.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   ├── CashFlowChart.tsx
│   │   └── ExportButton.tsx
│   │
│   ├── notifications/
│   │   ├── NotificationsPage.tsx
│   │   └── NotificationItem.tsx
│   │
│   └── settings/
│       ├── SettingsPage.tsx
│       ├── ProfileForm.tsx
│       ├── PreferencesForm.tsx
│       └── ThemeToggle.tsx
│
├── services/                     # ⭐ API abstraction layer
│   ├── types.ts                  # Service interfaces (IWalletService, etc.)
│   ├── index.ts                  # Service registry (swap mock ↔ real)
│   ├── apiClient.ts              # Axios instance (baseURL, JWT interceptors)
│   ├── endpoints.ts              # API endpoint constants (/api/wallets, etc.)
│   ├── mock/                     # Mock implementations (reads localStorage)
│   │   ├── auth.mock.ts
│   │   ├── wallet.mock.ts
│   │   ├── transaction.mock.ts
│   │   ├── category.mock.ts
│   │   ├── budget.mock.ts
│   │   ├── goal.mock.ts
│   │   ├── reminder.mock.ts
│   │   ├── dashboard.mock.ts
│   │   └── report.mock.ts
│   └── api/                      # Real API implementations (for later)
│       ├── auth.api.ts           # Skeleton ready for Spring Boot
│       ├── wallet.api.ts
│       ├── transaction.api.ts
│       ├── category.api.ts
│       ├── budget.api.ts
│       ├── goal.api.ts
│       ├── reminder.api.ts
│       ├── dashboard.api.ts
│       └── report.api.ts
│
├── hooks/                        # TanStack Query hooks (use services)
│   ├── useAuth.ts
│   ├── useWallets.ts
│   ├── useTransactions.ts
│   ├── useCategories.ts
│   ├── useBudgets.ts
│   ├── useGoals.ts
│   ├── useReminders.ts
│   ├── useDashboard.ts
│   ├── useReports.ts
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── useCurrency.ts
│
├── data/                         # Seed data matching Stitch mockups
│   ├── defaultCategories.ts
│   ├── seedData.ts
│   └── sampleTransactions.ts
│
├── types/                        # TypeScript types & enums
│   ├── wallet.types.ts
│   ├── transaction.types.ts
│   ├── category.types.ts
│   ├── budget.types.ts
│   ├── goal.types.ts
│   ├── reminder.types.ts
│   └── common.types.ts           # ApiResponse, PaginatedResponse, etc.
│
├── utils/
│   ├── format.ts
│   ├── calculations.ts
│   ├── constants.ts
│   └── cn.ts
│
├── styles/
│   ├── tokens.css                # Editorial Vault color tokens
│   ├── typography.css            # Manrope + Inter scales
│   ├── components.css            # Card, button, input, badge styles
│   ├── layout.css                # Sidebar, header, grid
│   └── animations.css            # Transitions, skeleton pulse
│
├── index.css
└── main.tsx
```

---

## Routing Architecture

```typescript
// Route structure
const routes = [
  // Public routes (guest only)
  { element: <PublicRoute />, children: [
    { path: '/login',      element: <LoginPage /> },
    { path: '/register',   element: <RegisterPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
  ]},

  // Onboarding (authenticated but not onboarded)
  { element: <OnboardingRoute />, children: [
    { path: '/onboarding', element: <OnboardingPage /> },
  ]},

  // Protected routes (authenticated + onboarded)
  { element: <ProtectedRoute />, children: [
    { element: <AppLayout />, children: [
      { path: '/',              redirect: '/dashboard' },
      { path: '/dashboard',     element: <DashboardPage /> },
      { path: '/transactions',  element: <TransactionsPage /> },
      { path: '/wallets',       element: <WalletsPage /> },
      { path: '/budgets',       element: <BudgetsPage /> },
      { path: '/goals',         element: <GoalsPage /> },
      { path: '/reminders',     element: <RemindersPage /> },
      { path: '/reports',       element: <ReportsPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/settings',      element: <SettingsPage /> },
    ]},
  ]},
];
```

**Auth flow**:
1. Not logged in → redirect to `/login`
2. Logged in but not onboarded → redirect to `/onboarding`
3. Logged in + onboarded → access app routes
4. Login/Register mock: store user in Zustand `authStore` → localStorage

---

## Development Phases

### Phase 1 — Foundation & Auth

**Scope**: Project setup, design system CSS, layout shell, auth flow, onboarding wizard

| Task | Files |
|------|-------|
| Install dependencies | `package.json` |
| Configure path aliases | `vite.config.ts`, `tsconfig.app.json` |
| Update HTML meta | `index.html` |
| Create CSS design system | `styles/tokens.css`, `typography.css`, `components.css`, `layout.css`, `animations.css` |
| Build core UI components | `components/common/*`, `components/feedback/*` |
| Build layout shell | `AppLayout`, `Sidebar`, `Header`, `MobileNav`, `AuthLayout` |
| Set up routing | `app/router/*` with auth guards |
| Set up Zustand stores | `authStore`, `uiStore`, `settingsStore` |
| Set up Axios client | `services/apiClient.ts` with JWT interceptor skeleton |
| Set up TanStack Query | `AppProviders.tsx` with QueryClient |
| Set up service layer | `services/types.ts`, `services/index.ts`, `services/mock/auth.mock.ts` |
| Build Login page | `features/auth/LoginPage.tsx` — matches Stitch "Login Screen" |
| Build Register page | `features/auth/RegisterPage.tsx` — matches Stitch "Register Screen" |
| Build Onboarding wizard | `features/onboarding/*` — 7-step setup flow |
| Create seed data | `data/seedData.ts`, `data/defaultCategories.ts` |

---

### Phase 2 — Dashboard & Wallets

**Scope**: Main dashboard + wallet management with mock data

| Task | Files |
|------|-------|
| Mock wallet service | `services/mock/wallet.mock.ts` |
| Mock dashboard service | `services/mock/dashboard.mock.ts` |
| TanStack Query hooks | `hooks/useWallets.ts`, `hooks/useDashboard.ts` |
| Zustand wallet store | `app/store/walletStore.ts` (for mock data persistence) |
| Build Dashboard page | `features/dashboard/*` — all 5 components |
| Build Wallets page | `features/wallets/*` — cards, forms, transfer |
| Build chart components | `components/charts/*` |
| Build finance components | `components/finance/*` |

---

### Phase 3 — Transactions, Budgets, Goals, Reminders

**Scope**: All remaining CRUD features with mock data

| Task | Files |
|------|-------|
| Mock services | `services/mock/transaction.mock.ts`, `budget.mock.ts`, `goal.mock.ts`, `reminder.mock.ts`, `category.mock.ts` |
| TanStack Query hooks | `hooks/useTransactions.ts`, `useBudgets.ts`, `useGoals.ts`, `useReminders.ts`, `useCategories.ts` |
| Build Transactions page | Quick-add templates, date-grouped list, filters, pagination |
| Build Budgets page | Progress bars (4px, threshold colors), category breakdowns |
| Build Goals page | Progress rings, contribution form, projected dates |
| Build Reminders page | Status groups, mark-as-paid, recurring indicators |

---

### Phase 4 — Reports, Notifications, Settings & Polish

**Scope**: Final pages + responsive polish

| Task | Files |
|------|-------|
| Mock services | `services/mock/report.mock.ts` |
| Build Reports page | Monthly summary, category breakdown, cash flow charts, CSV export |
| Build Notifications page | Budget/bill/goal alerts |
| Build Settings page | Profile, preferences, currency, theme |
| Responsive polish | Mobile bottom nav, tablet layout, 375px-1440px testing |
| Accessibility | ARIA labels, keyboard nav, focus states |
| Code splitting | Lazy load all pages |
| Error boundaries | Per-feature with retry |
| Pre-seed data | Populate on first visit with Stitch sample data |

---

## Backend Integration Guide (for later)

When the Spring Boot backend is ready, the integration requires **only 3 changes**:

```diff
// 1. src/services/index.ts — Flip the flag
- const USE_MOCK = true;
+ const USE_MOCK = false;

// 2. src/services/apiClient.ts — Set the base URL
- baseURL: 'http://localhost:3000', // placeholder
+ baseURL: 'http://localhost:8080', // Spring Boot

// 3. .env — Configure
+ VITE_API_BASE_URL=http://localhost:8080
+ VITE_USE_MOCK=false
```

The API service implementations in `services/api/*.api.ts` are already coded to match the REST API contract from [technical-spec.md](file:///d:/Workspace/SideProject/money-management-app/money-management-app/docs/technical-spec.md):

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/wallets
POST   /api/wallets
GET    /api/transactions?page=&type=&walletId=&startDate=&endDate=
POST   /api/transactions
GET    /api/categories
GET    /api/budgets
GET    /api/goals
POST   /api/goals/{id}/contributions
GET    /api/reminders
GET    /api/dashboard/summary
GET    /api/reports/monthly
GET    /api/reports/export/csv
```

**Zero component code changes required.**

---

## Verification Plan

### Automated
- `npm run build` — zero TypeScript errors
- `npm run lint` — zero ESLint errors
- Vitest: Zustand store CRUD operations
- Vitest: mock service data consistency
- Vitest: Zod schema validation (auth, transaction, wallet forms)
- Vitest: utility functions (currency format, budget thresholds, goal progress)

### Visual Verification (per Stitch screen)
1. ✅ Login → matches "Login Screen (No Biometrics)"
2. ✅ Register → matches "Register Screen"
3. ✅ Onboarding → editorial wizard flow
4. ✅ Dashboard → matches "Overview Dashboard (Sidebar)"
5. ✅ Transactions → matches "Transactions List"
6. ✅ Wallets → matches "Wallet Management"
7. ✅ Budgets → matches "Budget Management"
8. ✅ Goals → matches "Savings Goals"
9. ✅ Reminders → matches "Reminders & Bills"
10. ✅ Reports → matches "Reports & Analytics"
11. ✅ Notifications → matches "Notifications & Alerts"

### Responsive
- Test at 375px, 768px, 1024px, 1440px
- Mobile bottom nav renders below 1024px
- Sidebar collapses below 1024px

### Integration Readiness
- Flip `USE_MOCK = false` → verify TypeScript compiles
- All service interfaces match Spring Boot API contract from technical spec
