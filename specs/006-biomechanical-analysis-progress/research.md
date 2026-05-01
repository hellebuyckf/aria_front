# Research: Biomechanical Analysis Progress

## Decision: Metric Thresholds (V2.0)

- **Decision**: Define static thresholds for the 8 key metrics to drive color coding.
- **Rationale**: Clinical accuracy requires clear visual boundaries for "Normal" vs "Pathological".
- **Thresholds**:
  - **Cadence**: < 165 (Red), 165-175 (Orange), > 175 (Green) spm.
  - **Oscillation Verticale**: > 12 (Red), 10-12 (Orange), < 10 (Green) cm.
  - **Angle Tibial**: > 15 (Red), 12-15 (Orange), < 12 (Green) °.
  - **Flexion Genou**: < 15 (Red), 15-20 (Orange), > 20 (Green) °.
  - **Penchée Tronc**: > 15 (Red), 10-15 (Orange), < 10 (Green) °.
  - **Attaque Pied**: Talon Prononcé (Red), Midfoot (Green), Avant-pied (Orange).

## Decision: WebSocket Resilience Strategy

- **Decision**: Implement a centralized `useWebSocketStore` with a custom reconnection loop.
- **Rationale**: Direct component-level WS handling leads to memory leaks and inconsistent state during reconnections.
- **Implementation**:
  - Use `setTimeout` for exponential backoff (1s, 2s, 4s).
  - State `wsStatus` ('idle', 'connecting', 'connected', 'reconnecting', 'failed') drives the global `WsAlertBanner`.
  - Global `reset()` action ensures clean state between sessions.

## Decision: Mock Mode Implementation

- **Decision**: Replay a sequence of JSON objects every 800ms when `VITE_MOCK_WS` is enabled.
- **Rationale**: Enables frontend development and demo without requiring a full GPU-intensive backend run.
- **Sequence**: 11 steps covering all 7 stages + metrics population + completion event.
