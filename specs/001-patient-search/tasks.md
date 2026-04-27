# Tasks: Recherche Patient

**Input**: Design documents from `/specs/001-patient-search/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create `src/assets/main.css` with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and Google Fonts import (Manrope)
- [x] T002 [P] Create `src/main.js` to initialize Vue 3 app, Pinia (`createPinia()`), and Vue Router, importing `main.css`
- [x] T003 [P] Create `src/App.vue` as root component containing only `<RouterView />`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 [P] Create `src/stores/auth.js` with mock practitioner data and `isAuthenticated: true` default for MVP
- [x] T005 [P] Create `src/stores/patients.js` with `MOCK_PATIENTS`, state (`list`, `searchQuery`, `pagination`), and basic actions (`search`, `setActive`, `fetchPage`, `loadMock`)
- [x] T006 [P] Create `src/services/api.js` with Axios instance, `baseURL` from env, and global response interceptor for error logging
- [x] T007 [P] Create `src/services/patients.js` as service stub for `getAll` and `getById` returning mock data
- [x] T008 [P] Create `src/router/index.js` with routes for `/patients` (PatientSearchView), `/patients/new`, and `/session/:patientId/setup`, including `requiresAuth` guard
- [x] T009 [P] Create `src/components/layout/AppTopBar.vue` with practitioner name, role, logout button, and height `h-16`
- [x] T010 [P] Create `src/components/layout/AppSideNav.vue` with 4-step vertical stepper (width `w-[240px]`) and ARIA branding

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Recherche par nom (Priority: P1) 🎯 MVP

**Goal**: Filter patients by name in the store and display them in a table.

**Independent Test**: Searching for "MARTIN" filters the table to show Jean-Pierre MARTIN.

- [x] T011 [P] [US1] Create `PatientSearchForm.vue` in `src/components/patients/` with name input, `person` icon, and 300ms debounce search emit
- [x] T012 [P] [US1] Create `PatientResultsTable.vue` in `src/components/patients/` with columns (ID, Nom, Prénom, Dernière session), hover effects, and skeleton loader (4 pulse lines)
- [x] T013 [US1] Create `PatientSearchView.vue` in `src/views/` as orchestrator using `AppSideNav` (currentStep=1), `AppTopBar`, `PatientSearchForm`, and `PatientResultsTable`

**Checkpoint**: User Story 1 functional (local filtering by name works).

---

## Phase 4: User Story 3 - Sélection et lancement de session (Priority: P1) 🎯 MVP

**Goal**: Navigate to session setup when clicking the 'run' icon for a patient.

**Independent Test**: Clicking the 'run' icon on a patient row redirects to `/session/PAT-2024-089/setup`.

- [x] T014 [US3] Add `directions_run` filled icon button (round `bg-primary`, `w-9 h-9`) to `PatientResultsTable.vue` and emit `start-session`
- [x] T015 [US3] Implement `onStartSession` handler in `PatientSearchView.vue` to set `activePatient` in store and navigate to setup route

**Checkpoint**: User Story 3 functional (can start a session for a selected patient).

---

## Phase 5: User Story 2 - Recherche par NIR (Priority: P2)

**Goal**: Filter patients by NIR with automatic formatting.

**Independent Test**: Entering "175..." in the NIR field automatically formats to "1 75..." and filters results accordingly.

- [x] T016 [US2] Add NIR input with `fingerprint` icon to `PatientSearchForm.vue`, implementing `formatNir` utility (15 digits, `1 00 00...`) and updating store search logic

**Checkpoint**: User Story 2 functional (NIR search with formatting works).

---

## Phase 6: User Story 4 - Création d'un nouveau patient (Priority: P2)

**Goal**: Redirect to the new patient creation view.

**Independent Test**: Clicking "Nouveau patient" redirects to `/patients/new`.

- [x] T017 [US4] Add "Nouveau patient" outlined button with `person_add` icon to `PatientSearchForm.vue` and implement redirect handler in `PatientSearchView.vue`

**Checkpoint**: User Story 4 functional (redirection to creation view works).

---

## Phase 7: User Story 5 - Pagination des résultats (Priority: P3)

**Goal**: Navigate through paginated results (4 per page).

**Independent Test**: Clicking page 2 updates the table with the next 4 patients and scrolls to the top.

- [x] T018 [P] [US5] Create `PaginationBar.vue` in `src/components/ui/` with item counter, page buttons, and prev/next chevrons
- [x] T019 [US5] Integrate `PaginationBar` in `PatientSearchView.vue` and implement `onPageChange` with scroll-to-top logic

**Checkpoint**: User Story 5 functional (pagination works).

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Visual verification, GDPR audit, and build production.

- [x] T020 [P] Verify pixel-perfect UI vs `code.html` mockup (colors, spacing, typography)
- [x] T021 [P] Verify full user flows (Search -> Select -> Navigate) and edge cases (empty search, timeout)
- [x] T022 [P] Perform GDPR audit: Ensure NIR values are NEVER rendered in the DOM or stored in `localStorage`
- [x] T023 [P] Execute production build (`npm run build`) and verify bundle integrity (no unused variables/imports)


---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (P1) and US3 (P1) are priority 1 - should be completed first
  - US2, US4, US5 can follow in sequential or parallel order
- **Polish (Final Phase)**: Depends on all user stories being complete

---

## Parallel Execution Examples

### Parallel 1: Foundational Setup
- T004: Auth Store (`src/stores/auth.js`)
- T006: API Service (`src/services/api.js`)
- T009: Top Bar (`src/components/layout/AppTopBar.vue`)

### Parallel 2: User Story 1 Parts
- T011: Search Form (`src/components/patients/PatientSearchForm.vue`)
- T012: Results Table (`src/components/patients/PatientResultsTable.vue`)

---

## Implementation Strategy

### MVP First (User Story 1 & 3 Only)
1. Complete Phase 1 & 2.
2. Implement Phase 3 (Search by name).
3. Implement Phase 4 (Start session).
4. **VALIDATE**: Ensure a practitioner can search for a patient and start a session.

### Incremental Delivery
1. Add Phase 5 (NIR support).
2. Add Phase 6 (Create patient flow).
3. Add Phase 7 (Pagination).
4. Final Polish.
