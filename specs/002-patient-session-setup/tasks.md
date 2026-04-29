# Tasks: Saisie Patient / Configuration de Session

**Input**: Design documents from `/specs/002-patient-session-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Design system harmonization and theme setup

- [x] T001 [P] Extend `src/assets/main.css` with new color tokens (`primary-dark: #0D3878`, `accent: #5EC8F2`) and verify visual stability

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state and layout updates required for all clinical modules

- [x] T002 [P] Create `src/stores/session.js` with complete state, `formulaireValide` computed, and actions (`initialiser`, `reset`, `lancerAnalyse`)
- [x] T003 [P] Modify `src/components/layout/AppSideNav.vue` to support `badgePatient` prop and bottom session actions
- [x] T004 [P] Modify `src/components/layout/AppTopBar.vue` to conditionally display patient ID and session timestamp
- [x] T005 [P] Update `src/router/index.js` with navigation guard for `/session/:patientId/setup` requiring `activePatient`

**Checkpoint**: Foundational store and layout ready - Clinical module implementation can begin

---

## Phase 3: User Story 1 - Profil Patient (Priority: P1) 🎯 MVP

**Goal**: Complete patient anthropometry and practice level.

**Independent Test**: Patient ID is read-only; Age/Taille/Poids accept only positive integers; Practice level highlights correctly.

- [x] T006 [P] [US1] Create `src/components/session/ProfilPatientCard.vue` with numeric validations and practice level pill selection

---

## Phase 4: User Story 2 - Pathologie (Priority: P1) 🎯 MVP

**Goal**: Select clinical pathology and side.

**Independent Test**: Selecting a pathology updates the sidebar badge in real-time.

- [x] T007 [P] [US2] Create `src/components/session/PathologieCard.vue` with 6 MVP pathologies and real-time store synchronization

---

## Phase 5: User Story 3 - Vidéos (Priority: P1) 🎯 MVP

**Goal**: Mandatory sagittal video selection.

**Independent Test**: Selecting an .mp4 file > 2GB is rejected; selecting a valid file shows success icon and enables launch.

- [x] T008 [P] [US3] Create `src/components/session/VideoDepotCard.vue` with memory-only file selection and 2GB size validation

---

## Phase 6: User Story 6 - Lancement (Priority: P1) 🎯 MVP

**Goal**: Assemble modules and trigger the analysis pipeline.

**Independent Test**: "Lancer" button is disabled if sagittal video is missing; successful launch redirects to `/analysis` route.

- [x] T009 [US6] Create `src/views/SessionSetupView.vue` as main orchestrator assembling all P1 cards and handling launch/cancel flows

**Checkpoint**: MVP scope (US1, US2, US3, US6) functional - Basic session configuration works

---

## Phase 7: User Story 4 - Profil Chaussure (Priority: P2)

**Goal**: Optional shoe profile configuration.

**Independent Test**: Form can be submitted even if shoe profile fields are left empty.

- [x] T010 [P] [US4] Create `src/components/session/ProfilChaussureCard.vue` with 7 technical dropdowns and integrate into `SessionSetupView.vue`

---

## Phase 8: User Story 5 - Entraînement (Priority: P3)

**Goal**: Simulated connection to training platforms.

**Independent Test**: Clicking 'Connecter' toggles status to '✓ Connecté' after simulated delay.

- [x] T011 [P] [US5] Create `src/components/session/DonneesEntrainementCard.vue` with simulated OAuth states and integrate into `SessionSetupView.vue`

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Visual verification, GDPR audit, and build production.

- [x] T012 [P] Verify pre-filling: Navigate from search -> check ID and clinical data are loaded on mount
- [x] T013 [P] Verify sidebar badge: Select 'Achille' -> confirm badge displays 'ID · Achille'
- [x] T014 [P] Verify 'Cancel' flow: Input data -> click Cancel -> confirm store reset and redirection to `/patients`
- [x] T015 [P] Verify navigation guard: Direct access to setup URL without active patient must redirect to search
- [x] T016 [P] Perform GDPR audit: Ensure 0% of session data is stored in `localStorage` or `sessionStorage`
- [x] T017 [P] Execute production build (`npm run build`) and verify bundle integrity

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all clinical modules.
- **Modules (Phase 3-8)**: Depend on Foundational. P1 stories (US1, US2, US3) should be prioritized.
- **Assemblage (US6)**: Depends on US1, US2, US3 for complete functional testing.
- **Polish (Phase 9)**: Depends on all user stories being integrated.

---

## Parallel Execution Examples

### Parallel 1: Foundational Layout
- T003: Side Nav update
- T004: Top Bar update
- T005: Router Guard

### Parallel 2: P1 Clinical Modules
- T006: Profil Patient Card
- T007: Pathologie Card
- T008: Video Depot Card

---

## Implementation Strategy

### MVP First (P1 Stories)
1. Complete Setup & Foundation.
2. Implement US1, US2, US3 components.
3. Assemble in US6 to deliver a functional launch flow.

### Incremental Delivery
1. Add Shoe Profile (US4).
2. Add Training Connect (US5).
3. Final Polish and GDPR validation.
