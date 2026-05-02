# Implementation Plan: Multi-Event Metrics Sync

**Branch**: `013-metrics-multi-event-sync` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/013-metrics-multi-event-sync/spec.md](spec.md)
**Input**: Feature specification from `/specs/013-metrics-multi-event-sync/spec.md`

## Summary

Implement the logic to handle multiple `metrics` type WebSocket events. The UI will treat each event as a complete state replacement for biomechanical data, while also extracting and reporting global progress (`pct`) and status messages. This ensures the clinician sees sagittal data early, followed by posterior data if available.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Pinia (`useWebSocketStore`), Tailwind CSS v4  
**Storage**: N/A (Reactive state only)  
**Testing**: Manual E2E using updated `connectMock` to simulate multi-event sequence  
**Target Platform**: Web (Desktop)
**Project Type**: Web application (Frontend)  
**Performance Goals**: UI update latency < 100ms post-WebSocket receipt  
**Constraints**: Complete state replacement for metrics (superset logic); sync `pct` and `message` to global progress.  
**Scale/Scope**: Refinement of `useWebSocketStore` and `MetricsPreviewGrid.vue`.

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Surgical updates to existing components. |
| II. State Management | ✅ PASS | Leverages centralized `websocket` store. |
| III. Communication | ✅ PASS | Refines existing WebSocket message handler. |
| IV. Workflow & UX | ✅ PASS | Directly addresses real-time feedback mandate. |
| V. Design System | ✅ PASS | Adheres to contrast and typography tokens. |

## Project Structure

### Documentation (this feature)

```text
specs/013-metrics-multi-event-sync/
├── plan.md              # This file
├── research.md          # State replacement and sync strategy (Phase 0)
├── data-model.md        # Event schema for double-event logic (Phase 1)
└── quickstart.md        # Verification scenarios (Phase 1)
```

### Source Code (repository root)

```text
src/
├── stores/
│   └── websocket.js     # Update handler for multi-event support
└── components/
    └── analysis/
        └── MetricsPreviewGrid.vue # Update reactivity and posterior logic
```

**Structure Decision**: Refinement of existing stable components within the `analysis` component domain.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Metrics replacement vs merge | Backend sends a complete superset in the 2nd event. | Merging would require complex diffing logic; replacement is more robust. |
