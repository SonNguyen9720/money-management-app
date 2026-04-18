# Technical Design Document

## Money Management Web Application

## 1. Overview

### 1.1 Purpose

This document defines the technical design for a web-based money management application that helps users manage personal finances, including wallets, transactions, budgets, savings goals, reminders, and reports.

### 1.2 Objectives

The application should allow users to:

* track income and expenses
* organize transactions by category
* manage multiple wallets/accounts
* create and monitor budgets
* define savings goals
* view dashboards and reports
* receive bill and budget reminders

### 1.3 MVP Scope

The first version includes:

* user authentication
* wallet management
* transaction management
* category management
* budget tracking
* savings goals
* reminders
* dashboard
* reports
* profile/settings

### 1.4 Out of Scope for MVP

Not included in the first release:

* bank sync
* OCR receipt scan
* AI financial recommendations
* investment tracking
* collaborative family finance

---

## 2. System Architecture

### 2.1 High-Level Architecture

```text
[ Web Browser ]
      |
      v
[ ReactJS Frontend SPA ]
      |
      v
[ Spring Boot REST API ]
      |
      v
[ PostgreSQL Database ]
```

### 2.2 Architecture Style

Recommended architecture:

* **Frontend**: Single Page Application using ReactJS
* **Backend**: RESTful API using Spring Boot
* **Database**: PostgreSQL
* **Authentication**: JWT
* **Deployment**: frontend and backend deployed separately

### 2.3 Recommended Tech Stack

#### Frontend

* ReactJS
* TypeScript
* React Router
* React Query or TanStack Query
* Zustand or Redux Toolkit
* React Hook Form
* Zod or Yup validation
* Tailwind CSS or Material UI
* Recharts / Chart.js / ApexCharts

#### Backend

* Java Spring Boot
* Spring Web
* Spring Security
* Spring Data JPA
* Bean Validation
* PostgreSQL

#### Infrastructure

* Docker
* Nginx
* CI/CD pipeline
* Cloud or VPS hosting

---

## 3. Users and Roles

### 3.1 Roles

For MVP:

* USER
* ADMIN

### 3.2 USER Capabilities

A user can:

* manage own profile
* manage own wallets
* manage own transactions
* manage own budgets
* manage own savings goals
* manage own reminders
* view own dashboards and reports

### 3.3 ADMIN Capabilities

Admin can:

* manage default categories
* monitor platform metrics
* manage configurations

For MVP, admin UI can be minimal or skipped.

---

## 4. Functional Requirements

## 4.1 Authentication and User Management

Features:

* register
* login
* logout
* refresh token/session
* forgot password
* update profile
* change password
* set preferred currency
* set timezone/language

---

## 4.2 Wallet Management

Users can:

* create wallet
* update wallet
* archive/delete wallet
* set initial balance
* define wallet type

Wallet types:

* CASH
* BANK
* E_WALLET
* CREDIT_CARD
* CUSTOM

---

## 4.3 Transaction Management

Users can:

* add income
* add expense
* add transfer
* edit transaction
* delete transaction
* add notes
* assign category
* assign wallet
* add tags
* filter and search transaction history

Transaction types:

* INCOME
* EXPENSE
* TRANSFER

---

## 4.4 Category Management

Users can:

* use system default categories
* create custom categories
* edit custom categories
* classify category by type

Category types:

* INCOME
* EXPENSE

---

## 4.5 Budget Management

Users can:

* create monthly budgets
* create category budgets
* track used amount
* view remaining amount
* receive overspending warnings

---

## 4.6 Savings Goal Management

Users can:

* create savings goal
* define target amount
* define target date
* contribute manually
* track progress

---

## 4.7 Reminder Management

Users can:

* create bill reminders
* set due date
* configure repeat rules
* mark as paid
* view overdue reminders

---

## 4.8 Dashboard

Dashboard should display:

* total balance
* monthly income
* monthly expense
* budget progress
* spending by category
* recent transactions
* savings goal progress

---

## 4.9 Reports

Reports should support:

* monthly summary
* category spending report
* income vs expense trend
* wallet summary
* cash flow report
* CSV export

---

## 5. Non-Functional Requirements

### 5.1 Performance

* fast page transitions
* dashboard should load quickly
* transaction list should support pagination
* smooth filtering and search UX

### 5.2 Security

* password hashing
* JWT validation
* ownership checks on all resources
* HTTPS in production
* secure token handling

### 5.3 Usability

* transaction entry should be fast
* dashboard should be readable
* app should be responsive
* forms should have clear validation messages

### 5.4 Scalability

* backend should be stateless
* frontend should be modular
* API and UI should scale independently

### 5.5 Reliability

* consistent wallet balance updates
* atomic transaction processing
* recoverable error handling
* auditability for important actions

---

## 6. Frontend Design

### 6.1 Frontend Architecture

Recommended React project structure:

```text
src/
  app/
    router/
    providers/
    store/
  components/
    common/
    layout/
    charts/
    forms/
  features/
    auth/
    dashboard/
    wallets/
    transactions/
    categories/
    budgets/
    goals/
    reminders/
    reports/
    settings/
  hooks/
  services/
  api/
  utils/
  types/
  constants/
```

### 6.2 Recommended Frontend Approach

Use this structure:

* **React Router** for page routing
* **TanStack Query** for server state
* **Zustand** for lightweight client state
* **React Hook Form** for forms
* **Zod** for schema validation

This combination is clean and fast for MVP.

### 6.3 Main Pages

Pages for MVP:

* Login page
* Register page
* Dashboard page
* Wallet page
* Transaction page
* Add/Edit Transaction page
* Budget page
* Goal page
* Reminder page
* Reports page
* Settings/Profile page

### 6.4 Layout Structure

Suggested layout:

* left sidebar
* top navigation/header
* main content section
* floating or header quick-add transaction button

### 6.5 Reusable Components

You should build reusable components early:

* Button
* Input
* Select
* DatePicker
* Modal
* Confirm dialog
* Data table
* Transaction form
* Budget progress bar
* Chart card
* Empty state
* Error state
* Loading spinner

### 6.6 Form Validation

Validate:

* required fields
* amount > 0
* valid date
* wallet/category required when applicable
* targetAmount > 0
* budget amount > 0

---

## 7. Backend Design

### 7.1 Backend Architecture

Recommended Spring Boot layered design:

```text
controller
service
repository
entity
dto
mapper
security
exception
config
```

### 7.2 Backend Modules

#### Auth Module

* register
* login
* token generation
* password reset

#### User Module

* profile
* preferences
* password change

#### Wallet Module

* CRUD wallet
* archive wallet
* balance calculation

#### Transaction Module

* CRUD transaction
* filter/search
* pagination
* wallet balance adjustment
* transfer handling

#### Category Module

* default categories
* custom categories

#### Budget Module

* CRUD budget
* usage calculation
* overspending alert support

#### Goal Module

* CRUD savings goals
* contribution logic
* progress calculation

#### Reminder Module

* CRUD reminders
* due-date evaluation

#### Report Module

* summary aggregation
* chart/report APIs
* CSV export

---

## 8. Data Model

### 8.1 User

```text
User
- id: UUID
- email: String
- passwordHash: String
- fullName: String
- preferredCurrency: String
- timezone: String
- role: Enum(USER, ADMIN)
- createdAt: Timestamp
- updatedAt: Timestamp
```

### 8.2 Wallet

```text
Wallet
- id: UUID
- userId: UUID
- name: String
- type: Enum
- balance: Decimal
- initialBalance: Decimal
- currency: String
- status: Enum(ACTIVE, ARCHIVED)
- createdAt: Timestamp
- updatedAt: Timestamp
```

### 8.3 Category

```text
Category
- id: UUID
- userId: UUID nullable
- name: String
- type: Enum(INCOME, EXPENSE)
- icon: String
- color: String
- isDefault: Boolean
- createdAt: Timestamp
```

### 8.4 Transaction

```text
Transaction
- id: UUID
- userId: UUID
- walletId: UUID
- categoryId: UUID nullable
- type: Enum(INCOME, EXPENSE, TRANSFER)
- amount: Decimal
- note: String
- transactionDate: Timestamp
- referenceGroupId: UUID nullable
- createdAt: Timestamp
- updatedAt: Timestamp
```

### 8.5 Budget

```text
Budget
- id: UUID
- userId: UUID
- categoryId: UUID nullable
- name: String
- amount: Decimal
- periodType: Enum(MONTHLY)
- startDate: Date
- endDate: Date
- createdAt: Timestamp
- updatedAt: Timestamp
```

### 8.6 SavingGoal

```text
SavingGoal
- id: UUID
- userId: UUID
- name: String
- targetAmount: Decimal
- currentAmount: Decimal
- targetDate: Date
- status: Enum(ACTIVE, COMPLETED, CANCELLED)
- createdAt: Timestamp
- updatedAt: Timestamp
```

### 8.7 Reminder

```text
Reminder
- id: UUID
- userId: UUID
- title: String
- amount: Decimal nullable
- dueDate: Date
- repeatType: Enum(NONE, WEEKLY, MONTHLY)
- status: Enum(PENDING, PAID, OVERDUE)
- createdAt: Timestamp
- updatedAt: Timestamp
```

---

## 9. Database Design Notes

### 9.1 Relationships

* one user has many wallets
* one user has many transactions
* one wallet has many transactions
* one user has many budgets
* one user has many saving goals
* one user has many reminders
* categories can be default or user-owned

### 9.2 Important Constraints

* wallet must belong to authenticated user
* transaction must belong to authenticated user
* budget/goal/reminder must belong to authenticated user
* category must be default or owned by authenticated user

### 9.3 Suggested Indexes

* transactions(user_id, transaction_date)
* transactions(wallet_id, transaction_date)
* wallets(user_id)
* budgets(user_id)
* saving_goals(user_id)
* reminders(user_id, due_date)

---

## 10. API Design

### 10.1 Authentication APIs

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

#### Refresh Token

```http
POST /api/auth/refresh
```

---

### 10.2 Wallet APIs

```http
GET    /api/wallets
POST   /api/wallets
GET    /api/wallets/{id}
PUT    /api/wallets/{id}
DELETE /api/wallets/{id}
```

---

### 10.3 Transaction APIs

```http
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/{id}
PUT    /api/transactions/{id}
DELETE /api/transactions/{id}
```

Query params:

* page
* size
* sort
* type
* walletId
* categoryId
* startDate
* endDate
* keyword

---

### 10.4 Category APIs

```http
GET    /api/categories
POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

---

### 10.5 Budget APIs

```http
GET    /api/budgets
POST   /api/budgets
GET    /api/budgets/{id}
PUT    /api/budgets/{id}
DELETE /api/budgets/{id}
```

---

### 10.6 Goal APIs

```http
GET    /api/goals
POST   /api/goals
GET    /api/goals/{id}
PUT    /api/goals/{id}
DELETE /api/goals/{id}
POST   /api/goals/{id}/contributions
```

---

### 10.7 Reminder APIs

```http
GET    /api/reminders
POST   /api/reminders
GET    /api/reminders/{id}
PUT    /api/reminders/{id}
DELETE /api/reminders/{id}
```

---

### 10.8 Dashboard APIs

```http
GET /api/dashboard/summary
GET /api/dashboard/spending-by-category
GET /api/dashboard/recent-transactions
GET /api/dashboard/budget-overview
GET /api/dashboard/goals-overview
```

---

### 10.9 Report APIs

```http
GET /api/reports/monthly
GET /api/reports/category
GET /api/reports/cash-flow
GET /api/reports/export/csv
```

---

## 11. Business Logic Rules

### 11.1 Transaction Rules

#### Expense

* subtract amount from wallet balance

#### Income

* add amount to wallet balance

#### Transfer

* subtract from source wallet
* add to destination wallet
* link transfer records with referenceGroupId

#### Update/Delete Transaction

When a transaction changes:

* reverse previous wallet effect
* apply new wallet effect
* keep balances consistent

This part must be transactional in backend.

---

### 11.2 Budget Rules

Formula:

```text
budgetUsed = sum(expenseTransactions)
budgetRemaining = budgetAmount - budgetUsed
usagePercent = budgetUsed / budgetAmount * 100
```

Thresholds:

* 80% = warning
* 100%+ = exceeded

---

### 11.3 Savings Goal Rules

Formula:

```text
progressPercent = currentAmount / targetAmount * 100
```

Rules:

* targetAmount > 0
* contribution > 0
* status becomes COMPLETED when currentAmount >= targetAmount

---

### 11.4 Reminder Rules

Rules:

* overdue when dueDate < currentDate and status != PAID
* repeated reminder updates next due date based on repeatType

---

## 12. Security Design

### 12.1 Authentication

* JWT access token
* refresh token mechanism
* BCrypt password hashing

### 12.2 Authorization

Each secured API must verify:

* user is authenticated
* resource belongs to user

### 12.3 Frontend Security Notes

* avoid storing access token in insecure places if possible
* prefer secure cookie strategy if architecture allows
* guard private routes
* handle token expiration centrally

### 12.4 Validation

Validate:

* email format
* password rules
* amount positivity
* valid ownership
* valid date range
* budget and goal constraints

---

## 13. Error Handling

Use a consistent response shape:

```json
{
  "timestamp": "2026-03-29T10:15:00Z",
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Amount must be greater than zero",
  "path": "/api/transactions"
}
```

Common error types:

* validation error
* unauthorized
* forbidden
* not found
* business rule error
* internal server error

Frontend should map errors into:

* field validation messages
* toast notification
* page-level error state

---

## 14. UI/UX Design Notes

### 14.1 Navigation

Suggested sidebar items:

* Dashboard
* Transactions
* Wallets
* Budgets
* Goals
* Reminders
* Reports
* Settings

### 14.2 UX Priorities

* quick add transaction
* clear filters
* useful dashboard cards
* readable charts
* easy edit/delete actions
* visible budget warnings
* good empty states

### 14.3 Responsive Design

Primary target:

* desktop-first
* tablet-friendly
* basic mobile web support

---

## 15. Logging and Monitoring

Log:

* login/logout
* transaction create/update/delete
* transfer actions
* wallet archive/delete
* backend exceptions

Metrics:

* API response time
* error rate
* active sessions
* transaction creation success rate

---

## 16. Testing Strategy

### 16.1 Frontend Testing

Use:

* React Testing Library
* Vitest or Jest

Test:

* page rendering
* form behavior
* validation
* route protection
* component behavior
* API state handling

### 16.2 Backend Testing

Test:

* service logic
* repository queries
* controller integration
* security rules
* transactional balance updates

### 16.3 End-to-End Testing

Use:

* Playwright or Cypress

Critical flows:

* register/login
* create wallet
* add income
* add expense
* create transfer
* create budget
* create goal
* generate report

---

## 17. Deployment Design

### 17.1 Frontend Deployment

* build React app
* deploy static files via Nginx, Vercel, Netlify, or S3 + CDN

### 17.2 Backend Deployment

* Spring Boot in Docker
* reverse proxy with Nginx
* environment-based config

### 17.3 Database

* PostgreSQL
* migration via Flyway or Liquibase
* automated backup

---

## 18. Suggested Development Phases

### Phase 1

* auth
* profile/settings
* wallet module
* transaction module

### Phase 2

* category module
* dashboard
* budget module

### Phase 3

* goals
* reminders
* reports

### Phase 4

* export
* admin support
* optimization and refactor

---

## 19. Suggested Project Structure

### React Frontend

```text
src/
  app/
  components/
  features/
  hooks/
  services/
  api/
  utils/
  types/
  constants/
```

### Spring Boot Backend

```text
com.example.moneyapp
  auth
  user
  wallet
  transaction
  category
  budget
  goal
  reminder
  report
  common
  security
  config
```

---

## 20. Recommended React Stack for This App

For your case, I recommend:

* **ReactJS + TypeScript**
* **Vite**
* **React Router**
* **TanStack Query**
* **Zustand**
* **React Hook Form**
* **Zod**
* **Tailwind CSS**
* **Recharts**

This stack is very suitable for:

* dashboard-heavy applications
* forms
* tables
* fast MVP development
* maintainable codebase

---

## 21. Final Recommendation

Your best architecture now is:

* **Frontend**: ReactJS
* **Backend**: Spring Boot
* **Database**: PostgreSQL

Recommended final setup:

* React SPA with Vite
* Spring Boot REST API
* PostgreSQL
* JWT authentication
* Docker for local development and deployment

---

## 22. Best Next Step

The next most useful document is one of these:

* **development backlog with epics and user stories**
* **database schema design**
* **REST API contract**
* **React project folder/module setup**
* **Spring Boot project skeleton**

The most practical next step is to turn this into a **development-ready backlog with epics, user stories, and tasks**.
