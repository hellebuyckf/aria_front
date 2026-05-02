# Implementation Plan: RAG Phase Completion Fix (Ready Event)

**Branch**: `005-shoe-dropdown-refinement` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/014-fix-rag-ready-event/spec.md](spec.md)
**Input**: Feature specification from `/specs/014-fix-rag-ready-event/spec.md`

## Summary

Implement handling for the `ready` WebSocket event to signal the end of Phase 1 (Video + Diagnostic + RAG). This ensures the UI doesn't hang on the RAG spinner, marks all Phase 1 steps as complete, and unlocks the report generation action.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Pinia (`useWebSocketStore`), Tailwind CSS v4  
**Storage**: N/A (Reactive state)  
**Testing**: Manual E2E using updated mock sequence in `websocket.js`.  
**Target Platform**: Web (Desktop)
**Project Type**: Web application (Frontend)  
**Performance Goals**: Instant UI transition on event receipt.  
**Constraints**: Adhere to sequential workflow principles in constitution.  
**Scale/Scope**: Refinement of 1 view and 1 store.

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Surgical update to `AnalysisView.vue`. |
| II. State Management | ✅ PASS | Logic centralized in `useWebSocketStore`. |
| III. Communication | ✅ PASS | Extends existing WebSocket handler. |
| IV. Workflow & UX | ✅ PASS | Directly fixes sequential workflow feedback. |
| V. Design System | ✅ PASS | Uses existing ARIA v2.0 design tokens. |

## Project Structure

### Documentation (this feature)

```text
specs/014-fix-rag-ready-event/
├── plan.md              # This file
├── research.md          # State transition logic
├── data-model.md        # Ready event schema
└── quickstart.md        # Verification scenarios
```

### Source Code

```text
src/
├── stores/
│   └── websocket.js     # HandleEvent update
└── views/
    └── AnalysisView.vue # Pipeline mapping update
```

**Structure Decision**: Surgical refinement of existing state handling and orchestration.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Grouped step completion | Backend arch vs UI step mismatch. | Pure backend change would be higher risk. |
