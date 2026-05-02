# Research: RAG Phase Completion Fix (Ready Event)

## Decision: Ready Event Mapping

- **Decision**: Treat `type: "ready"` as a terminal event for Phase 1.
- **Rationale**: The backend sends a series of `progress` events for the RAG node, but the `ready` event is the definitive signal that all agents in Phase 1 (Video, Diagnosis, RAG) have finished their work.
- **Mapping**:
  - `ready` -> Set `AnalysisView` internal `showReportButton` to `true` (if applicable) or enable the "Générer" action.
  - Set all pipeline steps with IDs `video`, `diagnostic`, and `rag` to `status: "done"`.

## Decision: Performance Optimization (Spinner Shutdown)

- **Decision**: Force stop all animations in the `PipelineStepList` upon receipt of the `ready` event.
- **Rationale**: Prevents a "stuck" UI perception where a spinner might still be active despite the progress bar being at 100%.

## Decision: Mock Data Update

- **Decision**: Insert a `ready` event into the `websocket.js` mock sequence between the last RAG progress and the first Rapport generation event.
- **Rationale**: Allows the frontend team to verify the transition logic without waiting for a full GPU-intensive backend pass.
