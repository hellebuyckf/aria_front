# Tasks: Patient Gender Field

**Input**: Design documents from `/specs/003-patient-gender-field/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification is prioritized as per MVP guidelines. No automated test tasks requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing project structure and design tokens in `tailwind.config.js` and `src/assets/main.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update patient profile schema with `sexe` field in `src/stores/session.js`
- [x] T003 [P] Update mock data in `src/stores/patients.js` to include the `sexe` attribute for existing patients

**Checkpoint**: Foundation ready - store structure and mock data are prepared.

---

## Phase 3: User Story 1 - Gender Selection in Patient Profile (Priority: P1) 🎯 MVP

**Goal**: Record the patient's gender in the clinical profile via the UI.

**Independent Test**: Open the session setup page for a new patient, select "Femme", and verify the store state reflects "Femme".

### Implementation for User Story 1

- [x] T004 [US1] Add "Sexe" selection buttons (Homme/Femme) to `src/components/session/ProfilPatientCard.vue`
- [x] T005 [US1] Implement radio-style toggle logic for "Sexe" selection in `src/components/session/ProfilPatientCard.vue`
- [x] T006 [US1] Update `updateField` logic or add specific handler to emit gender changes in `src/components/session/ProfilPatientCard.vue`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Pre-filled Gender from Existing Profile (Priority: P2)

**Goal**: Pre-fill the gender selection if it's already recorded in the patient's folder.

**Independent Test**: Select a patient who has "Homme" in their mock data and verify that the "Homme" button is highlighted automatically in the setup view.

### Implementation for User Story 2

- [x] T007 [US2] Update `initialiser` function in `src/stores/session.js` to map `sexe` from the patient profile to the session state
- [x] T008 [US2] Ensure `ProfilPatientCard.vue` correctly reflects the pre-filled `modelValue.sexe` on mount

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [x] T009 [P] Run `quickstart.md` validation scenarios
- [x] T010 [P] Verify UI alignment and responsiveness of the new gender selection field

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories.
- **User Story 2 (P2)**: Depends on Store updates (Foundational) and Component Props (Story 1).

### Parallel Opportunities

- Store updates (T002, T003) can be done in parallel.
- Polish tasks (T009, T010) can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Setup & Foundational).
2. Complete Phase 3 (User Story 1 - UI & basic state update).
3. **VALIDATE**: Ensure selection works manually.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (Selection) -> Test.
3. Add US2 (Pre-filling) -> Test.
4. Final Polish.
