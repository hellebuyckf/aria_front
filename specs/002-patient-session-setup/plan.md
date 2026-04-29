# Implementation Plan: Saisie Patient / Configuration de Session

**Branch**: `002-patient-session-setup` | **Date**: 2026-04-27 | **Spec**: [specs/002-patient-session-setup/spec.md]
**Input**: Feature specification from `/specs/002-patient-session-setup/spec.md`

## Summary
Implementation of the `SessionSetupView`, where clinicians input anthropometric data, pathology details, and upload analysis videos. The state is managed via `useSessionStore` in memory (GDPR compliant), and the UI follows a modular card-based design with real-time feedback in the sidebar badge.

## Technical Context

**Language/Version**: Vue.js 3.5, Vite 6  
**Primary Dependencies**: Pinia 2, Vue Router 4, Tailwind CSS 4, Material Symbols Outlined  
**Storage**: Memory-only Pinia store (No persistence/localStorage per GDPR)  
**Testing**: Manual validation via developer checklist  
**Target Platform**: Desktop (1440x900)  
**Project Type**: Web Application (SPA)  
**Performance Goals**: Redirection to analysis < 300ms  
**Constraints**: 2GB video file limit, no persistent session storage  
**Scale/Scope**: 1 View, 5 Components, 1 Store

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Folder structure follows non-negotiable layout (`components/session/`, `stores/`, etc.)
- [x] Uses `<script setup>` (Composition API) exclusively
- [x] Logic handled in Views and Stores, Cards are presentation-heavy but managed by orchestrator
- [x] Tailwind 4 theme extended with `primary-dark` and `accent` tokens
- [x] Material Symbols Outlined used for all iconography
- [x] No patient data stored in `localStorage` (Session store only)

## Project Structure

### Documentation (this feature)

```text
specs/002-patient-session-setup/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # Session entity definition
├── quickstart.md        # Manual verification steps
├── contracts/           
│   └── interfaces.md    # Store and Component contracts
└── tasks.md             # Implementation tasks (Phase 2)
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── main.css             # Tailwind 4 imports + @theme
├── components/
│   ├── layout/
│   │   ├── AppSideNav.vue   # Update: props badgePatient, actions
│   │   └── AppTopBar.vue    # Update: session info
│   └── session/
│       ├── ProfilPatientCard.vue
│       ├── PathologieCard.vue
│       ├── VideoDepotCard.vue
│       ├── ProfilChaussureCard.vue
│       └── DonneesEntrainementCard.vue
├── stores/
│   └── session.js           # New: Session state
└── views/
    └── SessionSetupView.vue # Main orchestrator
```

**Structure Decision**: Standard Vue 3 / Pinia structure with clinical domain components grouped in `src/components/session/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
