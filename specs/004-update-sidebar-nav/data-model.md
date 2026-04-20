# Data Model: Update Sidebar Navigation

As this is primarily a UI and layout feature, there are no persistent database entities introduced. However, the client-side data structures for rendering the navigation are defined here.

## Client-Side Interfaces

### NavigationItem

Represents a single link within the sidebar navigation menu.

```typescript
interface NavigationItem {
  id: string;          // Unique identifier for the item
  label: string;       // Display text for the navigation link
  path: string;        // The React Router path to navigate to
  icon: React.FC;      // The icon component to render next to the label
  requiresAuth?: boolean; // Whether the route requires authentication (defaults to true)
}
```

### State Transitions

- **Route Change**: Clicking a `NavigationItem` triggers a client-side route change via React Router. The previously active item loses its active styling, and the newly matched route's item gains the active styling (maximum radius background, specific typography weight).
- **Responsive Transition**: Window resize events or CSS media queries trigger a layout shift from the persistent sidebar on desktop (`>= 1024px`) to the mobile navigation view (e.g., hamburger menu).
