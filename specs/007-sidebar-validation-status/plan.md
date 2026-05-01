# Implementation Plan: Sidebar Validation Status

**Branch**: `007-sidebar-validation-status` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/007-sidebar-validation-status/spec.md](spec.md)
**Input**: Feature specification from `/specs/007-sidebar-validation-status/spec.md`

## Summary

Implement visual feedback in the sidebar (`AppSideNav.vue`) to show the "Saisie" step as "Validé" with a green checkmark when the user is on the analysis page. This improves clinical workflow clarity.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Vue Router, Tailwind CSS v4, Material Symbols  
**Storage**: N/A (UI-only state derived from route)  
**Testing**: Manual visual verification in browser  
**Target Platform**: Web (Desktop)
**Project Type**: Web application (Frontend)  
**Performance Goals**: Instant UI update on route change  
**Constraints**: Consistent styling with ARIA v2.0 design system  
**Scale/Scope**: Refinement of `AppSideNav.vue` and possibly `AnalysisView.vue` orchestration.

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Refinement of existing `AppSideNav.vue` in `layout/`. |
| II. State Management | ✅ PASS | Derived state from route or props. |
| IV. Workflow & UX | ✅ PASS | Directly addresses Principle IV (Sequential Workflow & UX). |
| V. Design System | ✅ PASS | Uses Tailwind v4 tokens and Material Symbols. |

## Project Structure

### Documentation (this feature)

```text
specs/007-sidebar-validation-status/
├── plan.md              # This file
├── research.md          # Implementation logic (Phase 0)
├── data-model.md        # UI state transitions (Phase 1)
├── quickstart.md        # Verification guide (Phase 1)
└── tasks.md             # Implementation tasks
```

### Source Code

```text
src/
├── components/
│   └── layout/
│       └── AppSideNav.vue # Main component to update
└── views/
    └── AnalysisView.vue   # Orchestrator to ensure correct state
```

**Structure Decision**: Update existing layout component to support conditional "Done" state based on active step or specific route.
