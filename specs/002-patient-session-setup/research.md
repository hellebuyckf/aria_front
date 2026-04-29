# Research: Saisie Patient / Configuration de Session

**Feature**: 002-patient-session-setup
**Date**: 2026-04-27

## Decision: Large Video File Handling in Memory
- **Rationale**: For the MVP, videos are kept in memory using `File` objects. To prevent browser crashes with 2GB files, we will use `URL.createObjectURL` for previews and store only the `File` reference in Pinia. We will implement a client-side size check (2GB limit) and a warning threshold (500MB) as specified in the risks section of the user prompt.
- **Alternatives considered**: Stream-based uploads (rejected as no backend persistence is required for MVP).

## Decision: OAuth Connection Simulation
- **Rationale**: We will use a simple boolean flag `isConnected` in the `useSessionStore` for both Strava and Garmin. The UI will toggle this state after a short simulated delay (e.g., 800ms) to mimic the redirection return, without actual token exchange.
- **Alternatives considered**: Mocking the entire OAuth redirect flow with route guards (rejected as overkill for MVP).

## Decision: Tailwind 4 Color Token Harmonization
- **Rationale**: We will extend the `src/assets/main.css` `@theme` block with `--color-primary-dark` (#0D3878) and `--color-accent` (#5EC8F2). This aligns with the "Unified Interface" clarification and ensures semantic consistency with the project's design system.
- **Alternatives considered**: Arbitrary hex classes `bg-[#0D3878]` (rejected for maintenance).

## Decision: Real-time Sidebar Badge Logic
- **Rationale**: The `useSessionStore` will expose a computed `badgeSidebar`. The `AppSideNav.vue` will be updated to accept a `badgePatient` prop. The layout (likely `App.vue` or a wrapper) will pass the store's computed value to the sidebar. This ensures the badge updates instantly as the practitioner selects a pathology.
- **Alternatives considered**: Emitting events from the card to the sidebar (rejected for tighter state integration).
