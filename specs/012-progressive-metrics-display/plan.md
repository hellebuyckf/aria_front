# Implementation Plan: Progressive Metrics Display

**Branch**: `012-progressive-metrics-display` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/012-progressive-metrics-display/spec.md](spec.md)
**Input**: Feature specification from `/specs/012-progressive-metrics-display/spec.md`

## Summary

Implement a progressive display for the biomechanical metrics grid. Instead of showing all metrics simultaneously upon WebSocket event receipt, the UI will reveal non-null metrics one by one with a 120ms staggered delay. Additionally, the "Vue postérieure" section will be conditionally hidden based on data availability.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Tailwind CSS v4, Pinia (useWebSocketStore)  
**Storage**: N/A (UI-only state)  
**Testing**: Manual verification using `connectMock` in `useWebSocketStore`.  
**Target Platform**: Web (Desktop)
**Project Type**: Web application (Frontend)  
**Performance Goals**: Smooth transition animations (300ms fade), strict 120ms stagger delay.  
**Constraints**: Scoped CSS, adherence to ARIA v2.0 design tokens.  
**Scale/Scope**: Refinement of `MetricsPreviewGrid.vue` and `MetricCell.vue`.

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Surgical updates to existing analysis domain components. |
| II. State Management | ✅ PASS | Local animation state managed within component via composition API. |
| III. Communication | ✅ PASS | Reacts to existing `type: "metrics"` WebSocket event. |
| IV. Workflow & UX | ✅ PASS | Enhances real-time feedback as mandated by Principle IV. |
| V. Design System | ✅ PASS | Uses Tailwind tokens and standard fade transitions. |

## Project Structure

### Documentation (this feature)

```text
specs/012-progressive-metrics-display/
├── plan.md              # This file
├── research.md          # Staggered animation strategy (Phase 0)
├── data-model.md        # Metric order and normalization (Phase 1)
└── quickstart.md        # Verification guide (Phase 1)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── analysis/
│       ├── MetricCell.vue           # Animation target
│       └── MetricsPreviewGrid.vue   # Orchestrator of the progressive reveal
└── stores/
    └── websocket.js                 # Mock data update (if needed)
```

**Structure Decision**: Refinement of existing stable components within the `analysis` component domain.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Local `setTimeout` in loop | Required for the specific 120ms UX timing requested. | Pure CSS animations can't easily sync with dynamic data lengths from WS. |
