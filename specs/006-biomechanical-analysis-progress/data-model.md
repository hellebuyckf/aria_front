# Data Model: Biomechanical Analysis Progress

## Pinia Store: `useWebSocketStore`

### State
| Field | Type | Description |
|-------|------|-------------|
| `connected` | Boolean | Physical WS connection status |
| `wsStatus` | String | 'idle', 'connecting', 'connected', 'reconnecting', 'failed' |
| `pct` | Number | Global progress percentage (0-100) |
| `logEntries` | Array | FIFO list of `{ timestamp, level, message }` (max 50) |
| `metrics` | Object | Current biomechanical values from backend |
| `error` | Object | `{ message, etape, status }` if failure occurs |
| `lastEvent` | Object | The raw last event received for orchestration |

### Logic (State Transitions)
- `pct` only updates if `incoming > current`.
- `logEntries` pushes new entries to the end; shifts if length > 50.
- `wsStatus` moves to 'reconnecting' on close, then 'failed' after 3 attempts.

## Pipeline Step Mapping
Stages are indexed 1 to 7.

| Stage | Trigger (`substep`) | State Change |
|-------|--------------------|--------------|
| 1. Ingestion | `ingestion` | Stage 1 -> `running` |
| 2. Extraction | `extraction` | Stage 1 -> `done`, Stage 2 -> `running` |
| 3. Calcul | `calcul` | Stage 2 -> `done`, Stage 3 -> `running` |
| 4. RAG Medical | `medical` | Stage 3 -> `done`, Stage 4 -> `running` |
| 5. Web Grounding | `web` | Stage 4 -> `done`, Stage 5 -> `running` |
| 6. Protocole | `generation` | Stage 5 -> `done`, Stage 6 -> `running` |
| 7. Export | `export` | Stage 6 -> `done`, Stage 7 -> `running` |
| Complete | `type: "completed"` | All stages -> `done`, `pct` -> 100 |
