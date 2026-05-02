# Data Model: Ready Event Schema

This document defines the structure of the new `ready` event and its impact on the frontend state.

## WebSocket Event: `ready`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | Yes | MUST be `"ready"`. |
| `etape`| String | Yes | MUST be `"rag"` to signal Phase 1 end. |
| `pct` | Number | Yes | Value: 100. |
| `diagnostic`| Object | No | Preliminary results for UI grid population. |

## State Transitions

- **Store Level**: `useWebSocketStore.handleEvent` parses the payload and updates `pct`.
- **View Level**: `AnalysisView` watches for `lastEvent.type === 'ready'` and:
  1. Iterates through `steps` and sets all steps where `id` is in `['video', 'diagnostic', 'rag']` to `status: 'done'`.
  2. Unlocks the interaction for report generation.
