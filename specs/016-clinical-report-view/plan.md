# Implementation Plan: Clinical Report View

**Branch**: `016-clinical-report-view` | **Date**: Saturday, May 2, 2026 | **Spec**: [specs/016-clinical-report-view/spec.md](spec.md)
**Input**: Feature specification from `/specs/016-clinical-report-view/spec.md`

## Summary

Implement a clinical report view (`ReportView.vue`) that fetches analysis results via a `POST /api/sessions/{session_id}/generate` call. The view handles ongoing analysis states (409), renders detailed clinical sections (justification, metrics, recommendations, references, and warnings) with specific color-coded badges and icons, and provides a PDF export functionality.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Axios (via central service), Tailwind CSS v4, Material Symbols  
**Storage**: Local reactive state (`report` ref)  
**Testing**: Manual visual verification and mock data testing  
**Target Platform**: Web (Desktop focus for clinical use)
**Project Type**: Web application (Frontend component)  
**Performance Goals**: Data rendering < 2s post-API; smooth loading state  
**Constraints**: Handle 409 Conflict status; PDF download via new tab; RGPD compliant disclaimer styling  
**Scale/Scope**: 1 View, 6+ data sections

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | View placed in `src/views/`. |
| II. State Management | ✅ PASS | Local ref used as per user request (no global store needed). |
| III. Communication | ✅ PASS | Uses centralized Axios instance with error handling. |
| IV. Workflow & UX | ✅ PASS | Final step in sequential clinician workflow. |
| V. Design System | ✅ PASS | Adheres to Tailwind v4 tokens and Material Symbols. |

## Project Structure

### Documentation (this feature)

```text
specs/016-clinical-report-view/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # 409 handling and PDF strategy (Phase 0)
├── data-model.md        # Report JSON interface (Phase 1)
├── quickstart.md        # Mock verification guide (Phase 1)
└── checklists/
    └── requirements.md  # Specification quality check
```

### Source Code (repository root)

```text
src/
├── views/
│   └── ReportView.vue    # Orchestrator view
└── services/
    └── api.js           # Centralized API service (existing)
```

**Structure Decision**: Single orchestrator view implementation to minimize component overhead for this specific report layout, as requested.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| No sub-components | Direct request for a single view ref. | Modular components might be overkill for a static data layout. |
