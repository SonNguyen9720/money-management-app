# Quickstart

## Architecture Context

Because we are following a strict Mock-First API Strategy (Constitution II), you won't need to spin up a Docker container or connect to a physical Spring Boot backend to implement the core MVP features. 

The entire data layer runs locally inside the browser.

## Using the Mock Service Layer

All "API" interactions must go through asynchronous service layer functions that wrap our mock data store. Do not write to `localStorage` directly in component files.

### 1. Integrating with TanStack Query

Instead of using `fetch` or `axios`, map your React Query functions to the service layer:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/services';

export function WalletList() {
  const queryClient = useQueryClient();

  const { data: wallets, isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => walletService.getWallets()
  });

  const generateWallet = useMutation({
    mutationFn: walletService.createWallet,
    onSuccess: () => {
      // Refresh list
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
    }
  });

  // ...
}
```

### 2. Mock Latency

The service layer intentionally injects latency (e.g., `await delay(500)`) to ensure UI loading states (skeletons, spinners) behave correctly as they would with a real backend.

### 3. Developer Tools

A special utility `seedMockDatabase()` is available during development to pre-populate `localStorage` with an authenticated session, example wallets, categories, and past transactions for visualizing the charts.
