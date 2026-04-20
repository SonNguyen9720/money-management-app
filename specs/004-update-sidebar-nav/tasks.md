# Tasks: Update Sidebar Navigation

**Input**: Design documents from `/specs/004-update-sidebar-nav/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Not requested — test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the sidebar CSS tokens, navigation data model, and Google Material Symbols icon dependency

- [X] T001 Add sidebar-specific CSS custom properties (widths, breakpoints) to `src/styles/tokens.css`
- [X] T002 Create the `NavigationItem` type definition and the navigation items constant array (Dashboard, Transactions, Wallets, Budgets, Goals, Reminders, Reports, Settings — matching the Stitch design) in `src/components/layout/navigationConfig.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the reusable Sidebar component and its CSS — MUST be complete before layout integration

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create the `Sidebar` component in `src/components/layout/Sidebar.tsx`. It must render: a branding header ("Premium Tier"), a list of `NavLink` items with Google Material Symbols icons, an active state using pill-shaped (`9999px`) highlights with `primary_fixed_dim` background, and a user profile/logout section at the bottom. All styling must follow the "Overview Dashboard (Sidebar)" Stitch screen exactly (light `#fbf9f8` background, no hard borders, ambient shadows, Manrope headings, Inter labels).
- [X] T004 [P] Create the sidebar stylesheet in `src/styles/sidebar.css`. Implement all styles for `.sidebar`, `.sidebar-brand`, `.sidebar-nav`, `.sidebar-nav-item`, `.sidebar-nav-item.active`, and the user profile section. Use only custom properties from `tokens.css`. No solid borders — use tonal layering per the Editorial Vault design system.

**Checkpoint**: Sidebar component is independently renderable and styled

---

## Phase 3: User Story 1 — Desktop Sidebar Navigation (Priority: P1) 🎯 MVP

**Goal**: Replace the top bar navigation with a persistent left sidebar on desktop, matching the Stitch design exactly.

**Independent Test**: Load the app on a desktop viewport (≥ 1024px). Confirm the top bar is gone, the sidebar is visible on the left, navigation links work, and the active route is visually highlighted.

### Implementation for User Story 1

- [X] T005 [US1] Refactor `AppLayout` in `src/pages/Root.tsx` to replace the `<header>` top nav with the new `<Sidebar />` component. Update the container to a horizontal flex/grid layout (sidebar fixed-width left column, `<main>` content fills remaining space). Remove all inline styles for the old header/nav. Move the alert banners (over-budget, overdue bills) into the main content area.
- [X] T006 [US1] Create the layout stylesheet in `src/styles/layout.css`. Define `.app-layout` (flex row, min-height 100vh), `.app-sidebar` (fixed width from token, e.g., 260px), `.app-main` (flex: 1, overflow-y auto, padding). Import from `Root.tsx`.
- [X] T007 [US1] Verify active route indication by ensuring `NavLink` in `Sidebar.tsx` applies the correct `className` callback for the `isActive` state (pill background with `primary_fixed_dim`, bold text with `on_primary_fixed_variant` color). Test by navigating through all routes: `/`, `/wallets`, `/categories`, `/budgets`, `/goals`, `/bills`, `/settings`.

**Checkpoint**: Desktop sidebar navigation is fully functional. Top bar is removed. Active states work.

---

## Phase 4: User Story 2 — Mobile/Responsive Navigation (Priority: P2)

**Goal**: Provide a usable navigation mechanism on mobile viewports (< 1024px) since the persistent sidebar doesn't fit.

**Independent Test**: Resize the browser to mobile width (< 1024px). Confirm the sidebar is hidden, a bottom navigation bar or hamburger menu is visible, and all routes are accessible.

### Implementation for User Story 2

- [X] T008 [US2] Create the `MobileNav` component in `src/components/layout/MobileNav.tsx`. Implement a bottom tab bar with 4 primary shortcuts (Dash, Pay, Stats, Set — matching the Stitch design's mobile bottom nav). Use Material Symbols icons and `NavLink` for routing. Include an active indicator matching the sidebar active style (pill shape, tonal highlight).
- [X] T009 [P] [US2] Create the mobile navigation stylesheet in `src/styles/mobile-nav.css`. Style `.mobile-nav` (fixed bottom, glassmorphism background per Editorial Vault — surface at 80% opacity with `backdrop-filter: blur(20px)`), `.mobile-nav-item`, and `.mobile-nav-item.active`.
- [X] T010 [US2] Add responsive media queries to `src/styles/layout.css`. At `< 1024px`: hide `.app-sidebar`, show `.mobile-nav`, and adjust `.app-main` padding-bottom to account for bottom nav height. At `≥ 1024px`: show `.app-sidebar`, hide `.mobile-nav`.
- [X] T011 [US2] Integrate `<MobileNav />` into `AppLayout` in `src/pages/Root.tsx`, rendering it alongside the `Sidebar`. CSS will handle visibility toggling based on viewport width.

**Checkpoint**: Navigation works on both desktop (sidebar) and mobile (bottom bar) viewports.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, visual fine-tuning, and build validation

- [X] T012 [P] Verify direct URL navigation correctly marks the active sidebar/mobile-nav item by testing deep links (e.g., navigating directly to `/budgets` should highlight "Budgets" in the sidebar).
- [X] T013 [P] Run `npm run build` and `npm run lint` to ensure zero errors.
- [X] T014 Run quickstart.md validation — follow the verification steps in `specs/004-update-sidebar-nav/quickstart.md` on both desktop and mobile viewports.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion; can run in parallel with US1
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Independent of US1

### Within Each User Story

- CSS/styles before component integration
- Component creation before layout integration
- Layout integration before route verification

### Parallel Opportunities

- T001 and T002 can run in parallel (different files)
- T003 and T004 can run in parallel (component vs. stylesheet)
- T008 and T009 can run in parallel within US2
- T012 and T013 can run in parallel during Polish

---

## Parallel Example: User Story 1

```bash
# Phase 2 — Launch foundational tasks together:
Task: "Create Sidebar component in src/components/layout/Sidebar.tsx"
Task: "Create sidebar stylesheet in src/styles/sidebar.css"

# Phase 3 — Sequential within US1:
Task: "Refactor AppLayout in src/pages/Root.tsx"
Task: "Create layout stylesheet in src/styles/layout.css"
Task: "Verify active route indication"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (tokens, nav config)
2. Complete Phase 2: Foundational (Sidebar component + CSS)
3. Complete Phase 3: User Story 1 (layout refactor)
4. **STOP and VALIDATE**: Desktop sidebar is fully functional
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Sidebar component ready
2. Add User Story 1 → Test desktop sidebar → Deploy/Demo (MVP!)
3. Add User Story 2 → Test mobile navigation → Deploy/Demo
4. Polish → Final validation across all viewports

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All styling MUST use `tokens.css` custom properties — no inline hex colors or ad-hoc CSS
- Navigation items must match the Stitch design exactly: Dashboard, Transactions, Wallets, Budgets, Goals, Reminders, Reports, Settings
- Mobile bottom bar uses the abbreviated labels from the Stitch design: Dash, Pay, Stats, Set
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
