# Implementation Plan: Pipeline WebSocket Events Fix

**Branch**: `011-fix-pipeline-ws-events` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/011-fix-pipeline-ws-events/spec.md](spec.md)
**Input**: Feature specification from `/specs/011-fix-pipeline-ws-events/spec.md`

## Summary

Fix the real-time pipeline progress display by correctly mapping backend WebSocket events (`etape`, `pct`, `message`) to the frontend UI steps. This involves updating the event handling logic in `useWebSocketStore` and the orchestration in `AnalysisView.vue` to ensure steps transition from idle to running to done as the analysis proceeds.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Pinia (`useWebSocketStore`), Vue Router  
**Storage**: N/A (Reactive state only)  
**Testing**: Manual E2E using Mock mode and Backend integration  
**Target Platform**: Web (Desktop)
**Project Type**: Web application (Frontend)  
**Performance Goals**: UI update latency < 50ms post-WebSocket receipt  
**Constraints**: Ignore `ping` and `connected` events; handle `completed` and `error` states  
**Scale/Scope**: Refinement of `websocket` store and `AnalysisView.vue`

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Logic remains in store/view. |
| II. State Management | ✅ PASS | Centralized in `useWebSocketStore`. |
| III. Communication | ✅ PASS | Refines existing WebSocket handler. |
| IV. Workflow & UX | ✅ PASS | Directly fixes sequential workflow feedback. |
| V. Design System | ✅ PASS | Uses existing pipeline UI components. |

## Project Structure

### Documentation (this feature)

```text
specs/011-fix-pipeline-ws-events/
├── plan.md              # This file
├── research.md          # Event mapping and handler logic (Phase 0)
├── data-model.md        # WebSocket event types (Phase 1)
├── quickstart.md        # Verification scenarios (Phase 1)
└── contracts/
    └── ws-schema.md     # Updated message schema
```

### Source Code (repository root)

```text
src/
├── stores/
│   └── websocket.js     # Update handleEvent logic
└── views/
    └── AnalysisView.vue # Update handlePipelineMapping logic
```

**Structure Decision**: Surgical fix within the existing WebSocket store and Analysis orchestrator view.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Grouping 7 UI steps into 4 backend stages | The backend sends 4 high-level stages, while the UI shows 7 granular steps. | Changing the backend to send 7 steps would require significant refactoring. |
