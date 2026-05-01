# Implementation Plan: Shoe Dropdown Refinement

**Branch**: `005-shoe-dropdown-refinement` | **Date**: Wednesday, April 29, 2026 | **Spec**: [specs/005-shoe-dropdown-refinement/spec.md](spec.md)
**Input**: Feature specification from `/specs/005-shoe-dropdown-refinement/spec.md`

## Summary

Refine the shoe selection interface to use dependent, searchable dropdowns for Brand and Model. The Model list will be strictly filtered by both the selected Brand and the Patient's Gender.

## Technical Context

**Language/Version**: Vue 3 (Composition API)  
**Primary Dependencies**: Pinia, Tailwind CSS v4  
**Storage**: Memory-based shoe database (`shoes.js` store)  
**Target Platform**: Web (Desktop)  
**Performance Goals**: Instant list filtering (<100ms)  

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Refinement of `ProfilChaussureCard.vue`. |
| II. State Management | ✅ PASS | Uses existing `useShoeStore` and `useSessionStore`. |
| IV. Workflow & UX | ✅ PASS | Improves clinical accuracy and speed via dependent filtering. |
| V. Design System | ✅ PASS | Consistent with Tailwind v4 theme. |

## Project Structure

### Documentation (this feature)

```text
specs/005-shoe-dropdown-refinement/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── ui-contract.md
```

### Source Code

```text
src/
├── components/
│   └── session/
│       └── ProfilChaussureCard.vue # Main implementation
└── stores/
    └── shoes.js                 # Existing store logic
```

**Structure Decision**: Refine existing UI component while leveraging standard Pinia store logic.
