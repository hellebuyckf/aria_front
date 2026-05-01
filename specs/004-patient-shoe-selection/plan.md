# Implementation Plan: Patient Shoe Selection Integration

**Branch**: `004-patient-shoe-selection` | **Date**: Wednesday, April 29, 2026 | **Spec**: [specs/004-patient-shoe-selection/spec.md](spec.md)
**Input**: Integrate shoe database for autocomplete and auto-fill in patient profile.

## Summary

Implement a searchable shoe database integration for the "Profil Chaussure" block. The system will pre-load data from a JSONL file, provide autocomplete suggestions for model names (filterable by brand), auto-fill technical parameters (Drop, Stability, etc.), allow manual overrides, and provide a reset functionality.

## Technical Context

**Language/Version**: Vue 3 (Composition API)  
**State Management**: Pinia (`useShoeStore`, `useSessionStore`)  
**Data Source**: `data/chaussure_all.jsonl`  
**UI Components**: Custom autocomplete/searchable inputs in `ProfilChaussureCard.vue`.

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Encapsulated in `ProfilChaussureCard.vue`. |
| II. State Management | ✅ PASS | Using Pinia for data storage and search logic. |
| III. Backend Communication | ✅ PASS | Loading local data file. |
| IV. Workflow & UX | ✅ PASS | Enhances clinical workflow with automation and manual fallback. |
| V. Design & Performance | ✅ PASS | Pre-loading data ensures high performance. |

## Project Structure

### Documentation (this feature)

```text
specs/004-patient-shoe-selection/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Data loading & UX decisions
├── data-model.md        # DB schema & Mapping logic
├── quickstart.md        # Implementation checklist
└── tasks.md             # Implementation tasks
```

### Source Code

```text
src/
├── stores/
│   ├── shoes.js         # NEW: Shoe database store
│   └── session.js       # UPDATE: Reset logic
├── components/
│   └── session/
│       └── ProfilChaussureCard.vue # UPDATE: Autocomplete & Clear button
└── utils/
    └── shoeMapping.js   # NEW: Database to UI normalization
```

**Structure Decision**: Standard Pinia-driven Vue architecture.

## Complexity Tracking

*No major violations detected.*
