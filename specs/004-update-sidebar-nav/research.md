# Research: Update Sidebar Navigation

## Context
The feature requires replacing the top navigation bar with a sidebar navigation menu on desktop viewports, falling back to a responsive menu on mobile viewports. The design must adhere to "The Editorial Vault" design compliance from the Google Stitch project "Wallet management", specifically the "Overview dashboard".

## Decisions

### 1. Navigation Architecture
- **Decision**: Implement a `Sidebar` component rendered within the main application layout (`src/components/layout/AppLayout` or similar), replacing the existing top navigation component. Use React Router's `NavLink` for routing.
- **Rationale**: Rendering at the layout level ensures navigation state persists across route changes without re-mounting. `NavLink` provides built-in `isActive` properties essential for the required active state visual updates.
- **Alternatives considered**: Rendering the sidebar within individual page components (rejected due to code duplication and performance overhead).

### 2. Styling Approach
- **Decision**: Use Vanilla CSS utilizing the custom properties defined in `src/styles/tokens.css`. Strictly apply "The Editorial Vault" guidelines: light-mode backgrounds (`var(--color-background)` or `#fbf9f8`), maximum radius (`9999px`) for active item highlights, specific typography (Manrope/Inter), and diffused ambient shadows.
- **Rationale**: Mandatory compliance with Core Principle III and Technology Constraints of the project constitution.
- **Alternatives considered**: Tailwind CSS or CSS-in-JS (rejected explicitly by the constitution).

### 3. Responsive Behavior
- **Decision**: Implement CSS media queries to transition from a fixed left sidebar on desktop (>= 1024px) to a mobile-friendly alternative (e.g., hamburger menu triggering an off-canvas drawer or a bottom navigation bar) on smaller viewports.
- **Rationale**: Ensures the application remains fully usable across all device sizes as dictated by the specification's P2 requirement.
- **Alternatives considered**: A persistent miniaturized sidebar on mobile (rejected due to consuming valuable horizontal screen space on small devices).
