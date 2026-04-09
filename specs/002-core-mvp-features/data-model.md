# Data Model: Core MVP Features

This document outlines the primary entities and their relationships, designed for a JSON-compatible structure suitable for our `localStorage`-backed mock backend.

## Entities

### `User`
- `id`: string (UUID)
- `email`: string
- `passwordHash`: string (mocked)
- `preferences`: UserPreferences

### `UserPreferences`
- `currency`: string (e.g., 'USD', 'EUR')
- `theme`: 'light' (locked per Constitution III)
- `timezone`: string

### `Wallet`
- `id`: string (UUID)
- `userId`: string
- `name`: string
- `type`: 'bank' | 'cash' | 'credit'
- `balance`: number
- `currency`: string
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### `Category`
- `id`: string (UUID)
- `userId`: string (or null for system defaults)
- `name`: string
- `icon`: string
- `color`: string
- `type`: 'income' | 'expense' | 'transfer'
- `parentId`: string | null (for sub-categories)
- `isArchived`: boolean

### `Transaction`
- `id`: string (UUID)
- `userId`: string
- `walletId`: string
- `categoryId`: string
- `type`: 'income' | 'expense' | 'transfer'
- `amount`: number
- `date`: ISO 8601 string
- `note`: string | null
- `linkedTransactionId`: string | null (for transfers, linked to the destination internal transaction)
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### `Budget`
- `id`: string (UUID)
- `userId`: string
- `categoryId`: string | null (null means overall budget)
- `amount`: number
- `period`: 'monthly'
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### `Goal`
- `id`: string (UUID)
- `userId`: string
- `name`: string
- `targetAmount`: number
- `currentAmount`: number
- `targetDate`: ISO 8601 string | null
- `status`: 'active' | 'completed' | 'archived'
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### `Bill` (Reminder/Recurring)
- `id`: string (UUID)
- `userId`: string
- `name`: string
- `amount`: number
- `dueDate`: ISO 8601 string
- `isRecurring`: boolean
- `recurrenceInterval`: 'monthly' | 'yearly' | 'weekly' | null
- `isPaid`: boolean
- `categoryId`: string | null

## Relationships and Integrity
- **Resource Boundary**: Every entity has a `userId`. All operations to the mock layer MUST filter and enforce based on the authenticated user.
- **Transfers**: Handled as two separate `Transaction` entities. An expense from source wallet, and an income to the destination wallet. They are linked.

## State Management Architecture
- **Client State**: Zustand (`persist` middleware) will manage cross-cutting state like `activeTheme` (if any), auth tokens, and minimal user session data.
- **Server State**: React Query (TanStack Query v5) handles the fetching, caching, and mutation states for all entities over the mock service layer.
