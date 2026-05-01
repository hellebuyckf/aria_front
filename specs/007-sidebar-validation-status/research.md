# Research: Sidebar Validation Status

## Decision: Logic for "Done" status

- **Decision**: The sidebar will determine if a step is "Done" based on the `activeStep` prop.
- **Rationale**: If `activeStep` is 2 (Analysis), then step 1 (Saisie) is implicitly done. This avoids adding a complex state management system for UI-only status.
- **Implementation**: In `AppSideNav.vue`, a step will be considered "Done" if its index is less than the `activeStep`.

## Decision: Visual representation

- **Decision**: Use a green checkmark icon from Material Symbols Outlined and a "Validé" sub-label.
- **Rationale**: Matches the user's explicit request and the ARIA v2.0 design system for "Success" states.
- **Color**: Tailwind `text-green-500` or `#4ade80` equivalent.

## Alternatives Considered

- **Global Store State**: Explicitly tracking `saisieDone` in `useSessionStore`. Rejected because the requirement is strictly UI-linked to the current phase of the workflow, and derived state from `activeStep` is simpler and more robust for this MVP.
