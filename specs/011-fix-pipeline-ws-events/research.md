# Research: Pipeline WebSocket Events Fix

## Decision: Event Schema Consolidation

- **Decision**: The frontend will strictly follow the 4-stage mapping provided by the backend for UI updates.
- **Rationale**: The backend emits `etape` values: `video`, `diagnostic`, `rag`, and `rapport`. These represent the core processing nodes. 
- **Mapping**:
  - `video`: Maps to Granular Steps 1, 2, 3 (Ingestion, Extraction, Calcul).
  - `diagnostic`: Internal backend processing (mapped to progress bar only, or hidden step).
  - `rag`: Maps to Granular Steps 4, 5 (Medical RAG, Web Grounding).
  - `rapport`: Maps to Granular Steps 6, 7 (Generation, Export).

## Decision: Event Handler Implementation

- **Decision**: Implement a filter in `handleEvent` to ignore high-frequency noise like `ping`.
- **Logic**:
  ```javascript
  if (evt.type === 'ping' || evt.type === 'connected') return
  if (evt.type === 'progress') {
    // update state
  } else if (evt.type === 'completed') {
    // mark all done
  }
  ```
- **Rationale**: Prevents unnecessary reactive updates and state drift for non-progress messages.

## Decision: Pipeline State Transition

- **Decision**: A step transitions to `running` on the first `progress` event for that stage and to `done` when the next stage's event arrives.
- **Rationale**: Provides immediate visual feedback to the clinician that the system has moved to the next processing block.
