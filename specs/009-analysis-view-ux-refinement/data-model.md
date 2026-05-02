# Data Model: Analysis View UX Transitions

This document defines the simplified UI state transitions for the analysis view after refinement.

## Redirection State Machine

| Event | Previous State | New State | UI Action |
|-------|----------------|-----------|-----------|
| `type: "progress"` | `processing` | `processing` | Update bar, add log line. |
| `type: "completed"` | `processing` | `completed` | Show "Voir le rapport" button. |
| Click "Voir le rapport"| `completed` | `navigating` | `router.push('/report')`. |

## Key Differences from v1.0
- **Auto-transition removed**: There is no longer a time-based transition from `completed` to `navigating`.
- **User Control**: The `navigating` state is now exclusively triggered by an explicit user click.
