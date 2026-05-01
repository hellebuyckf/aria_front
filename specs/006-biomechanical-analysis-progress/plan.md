# Implementation Plan: Biomechanical Analysis Progress

**Branch**: `006-biomechanical-analysis-progress` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/006-biomechanical-analysis-progress/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-biomechanical-analysis-progress/spec.md`

## Summary

Implement a real-time analysis monitoring view (`AnalysisView.vue`) that consumes WebSocket events to display a 7-stage pipeline progress, a system event log, and live biomechanical metrics preview.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Pinia, Vue Router, Tailwind CSS v4, WebSockets  
**Storage**: Memory-based (useSessionStore, useWebSocketStore)  
**Testing**: Manual E2E verification using Mock mode and Backend integration  
**Target Platform**: Web (Desktop - Clinical environment)
**Project Type**: Web application (Frontend)  
**Performance Goals**: UI responsiveness (60 FPS), WebSocket latency < 100ms  
**Constraints**: RGPD compliance (no patient data in localStorage), Sequential workflow locking  
**Scale/Scope**: 1 View, 1 Store, 9 Components, 7-stage pipeline

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ⚠️ VIOLATION | Components placed in `src/components/analysis/` (not in non-negotiable list). Justified by step 2 domain. |
| II. State Management | ✅ PASS | Logic moved to `useWebSocketStore`. |
| III. Communication | ✅ PASS | WebSocket lifecycle managed via `onUnmounted`. |
| IV. Workflow & UX | ✅ PASS | Linear progress with real-time feedback. |
| V. Design System | ✅ PASS | Tailwind v4 tokens and Manrope font. |

## Project Structure

### Documentation (this feature)

```text
specs/006-biomechanical-analysis-progress/
├── spec.md              # Specification
├── plan.md              # This file
├── research.md          # WebSocket resilience and threshold logic
├── data-model.md        # WebSocket event types and store state
├── quickstart.md        # Mock mode and verification guide
└── contracts/
    └── ws-contract.md   # WebSocket message schema
```

### Source Code (repository root)

```text
src/
├── components/
│   └── analysis/        # New domain components
│       ├── AnalysisProgressBar.vue
│       ├── ErrorBanner.vue
│       ├── LogLine.vue
│       ├── MetricCell.vue
│       ├── MetricsPreviewGrid.vue
│       ├── PipelineStepItem.vue
│       ├── PipelineStepList.vue
│       ├── RealTimeLog.vue
│       └── WsAlertBanner.vue
├── stores/
│   └── websocket.js     # WebSocket management
├── views/
│   └── AnalysisView.vue # Orchestrator view
└── router/
    └── index.js         # Navigation guard and route
```

**Structure Decision**: Single project structure with domain-specific component grouping under `src/components/analysis/` to handle the complexity of the 7-stage pipeline.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New component domain `analysis/` | Separates high-frequency update logic from other session parts. | Mixing with `session/` components would clutter the folder. |
