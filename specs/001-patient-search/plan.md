# Implementation Plan: Recherche Patient

**Branch**: `001-patient-search` | **Date**: 2026-04-27 | **Spec**: [specs/001-patient-search/spec.md]
**Input**: Feature specification from `/specs/001-patient-search/spec.md`

## Summary
Implementation of the Patient Search screen (`PatientSearchView`), the entry point of the ARIA workflow. This view allows practitioners to find existing patients via name or NIR, create new dossiers, and initiate diagnostic sessions using mock data stored in Pinia.

## Technical Context

**Language/Version**: Vue.js 3.5, Vite 6
**Primary Dependencies**: Pinia 2, Vue Router 4, Axios, Tailwind CSS 3
**Storage**: Memory-only mock data in Pinia (no persistence for MVP)
**Testing**: Manual validation via developer checklist (no automated tests per constitution)
**Target Platform**: Desktop only (1440x900)
**Project Type**: Web Application (SPA)
**Performance Goals**: FCP ≤ 1.2s, Search response < 300ms
**Constraints**: GDPR compliance (no patient data in localStorage, no NIR in plain text in lists)
**Scale/Scope**: < 200 patients (local filtering sufficient)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Folder structure follows non-negotiable layout (`components/ui`, `components/patients`, etc.)
- [x] Uses `<script setup>` (Composition API) exclusively
- [x] Logic is handled in Views and Stores, UI components are purely presentational
- [x] Tailwind design tokens used for all styles (no hardcoded hex)
- [x] Material Symbols Outlined used for iconography
- [x] Routes protected by `requiresAuth` guard
- [x] No patient data stored in `localStorage`

## Project Structure

### Documentation (this feature)

```text
specs/001-patient-search/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # Patient entity definition
├── quickstart.md        # Manual verification steps
├── contracts/           
│   └── interfaces.md    # Store and Component contracts
└── checklists/
    └── requirements.md  # Quality validation
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── main.css             # Tailwind imports
├── components/
│   ├── layout/
│   │   ├── AppSideNav.vue   # Step 1 active
│   │   └── AppTopBar.vue    # Practitioner info
│   ├── patients/
│   │   ├── PatientSearchForm.vue
│   │   └── PatientResultsTable.vue
│   └── ui/
│       └── PaginationBar.vue
├── router/
│   └── index.js             # Route /patients
├── services/
│   ├── api.js               # Axios instance stub
│   └── patients.js          # Future API calls
├── stores/
│   ├── auth.js              # Mock auth
│   └── patients.js          # Mock list + search logic
├── views/
│   └── PatientSearchView.vue # Entry point
└── main.js                  # App bootstrap
```

**Structure Decision**: Web application structure with clear separation between layouts, UI primitives, and domain-specific patient components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
