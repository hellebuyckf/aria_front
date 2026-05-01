# Data Model: Sidebar Validation Status

## UI State Transitions

The `AppSideNav.vue` component uses an `activeStep` prop (Number) to drive its internal layout.

### Step Status Mapping

| Step Index | Active Step Prop | Logic Status | Visual Elements |
|------------|------------------|--------------|-----------------|
| 1 (Saisie) | 1 | `active` | Active styling (Primary color) |
| 1 (Saisie) | 2, 3, 4 | `done` | Green checkmark + "Validé" label |
| 2 (Analyse)| 1 | `waiting`| Disabled/Gray styling |
| 2 (Analyse)| 2 | `active` | Active styling |
| 2 (Analyse)| 3, 4 | `done` | Green checkmark + "Validé" label |

### Logic Formula
For any step `S` with index `i`:
- If `i == activeStep` -> `status = 'active'`
- If `i < activeStep` -> `status = 'done'`
- If `i > activeStep` -> `status = 'waiting'`
