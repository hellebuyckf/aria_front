# Implementation Plan: Patient Gender Field

**Branch**: `003-patient-gender-field` | **Date**: Wednesday, April 29, 2026 | **Spec**: [specs/003-patient-gender-field/spec.md](spec.md)
**Input**: Feature specification from `/specs/003-patient-gender-field/spec.md`

## Summary

Add a "Sexe" (gender) field with "Homme" and "Femme" radio-style buttons to the Patient Profile block. The field will be integrated into the Pinia session store and support pre-filling from existing patient data.

## Technical Context

**Language/Version**: Vue.js 3 (Composition API)  
**Primary Dependencies**: Tailwind CSS v4, Pinia  
**Storage**: Memory only (Pinia stores), mocked in `src/stores/patients.js`  
**Testing**: Manual verification as per MVP guidelines  
**Target Platform**: Web (Desktop focus for clinical portal)
**Project Type**: Frontend Web Application  
**Performance Goals**: Instant UI response, <2s for selection completion  
**Constraints**: Must match existing UI design system (Material Symbols, Tailwind tokens)
**Scale/Scope**: Single field addition with data flow integration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Adding to existing domain component `src/components/session/ProfilPatientCard.vue`. |
| II. State Management | ✅ PASS | Using `useSessionStore` for data flow. Components communicate via props/events. |
| III. Backend Communication | ✅ PASS | Using mock data in stores as per current MVP state. |
| IV. Workflow & UX | ✅ PASS | Linear integration into Saisie step. |
| V. Design & Performance | ✅ PASS | Using Tailwind tokens and Material Symbols. |

## Project Structure

### Documentation (this feature)

```text
specs/003-patient-gender-field/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Research findings and decisions
├── data-model.md        # Updated data structures
├── quickstart.md        # Brief implementation guide
├── contracts/           
│   └── ui-contract.md   # UI interaction contract
└── tasks.md             # Implementation tasks (Phase 2)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── session/
│       └── ProfilPatientCard.vue # UI modification
├── stores/
│   ├── patients.js             # Mock data update
│   └── session.js              # State update
```

**Structure Decision**: Standard Vue 3 structure with Pinia stores and domain-specific components.
