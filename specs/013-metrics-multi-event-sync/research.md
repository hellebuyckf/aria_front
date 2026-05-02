# Research: Multi-Event Metrics Sync

## Decision: Full State Replacement

- **Decision**: Upon receiving a WebSocket event of `type: "metrics"`, the frontend will overwrite the current `metrics` state in `useWebSocketStore` with the new payload.
- **Rationale**: The backend implementation sends a complete snapshot of all available metrics in every `metrics` event. The second event (posterior) is a superset of the first (sagittal). Overwriting ensures that we don't carry over stale calculations if a metric value changes between passes, and it simplifies the UI rendering logic.

## Decision: Progress Synchronization

- **Decision**: The `metrics` event will be treated as a high-priority progress update.
- **Rationale**: Even though it's not a `type: "progress"` event, it contains `pct` and `message` fields. These must be fed into the same reactive properties that drive the `AnalysisProgressBar` to maintain visual continuity.
- **Implementation**: In `handleEvent`, add a specific branch for `evt.type === 'metrics'` that calls the same progress update logic as `type === 'progress'`.

## Decision: Posterior View Section Toggle

- **Decision**: Drive the visibility of the "Vue Postérieure" section exclusively through the `vue_posterieure_disponible` boolean flag.
- **Rationale**: This flag is the authoritative signal from the backend that a second camera view was successfully processed. If `false`, the section should be hidden or show a "Not available" state to prevent the clinician from looking for missing data.
