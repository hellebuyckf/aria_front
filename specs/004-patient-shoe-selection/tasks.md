# Tasks: Patient Shoe Selection Integration

**Input**: Design documents from `/specs/004-patient-shoe-selection/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Manual verification is prioritized as per MVP guidelines. No automated test tasks requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify presence and integrity of `data/chaussure_all.jsonl` in the project root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Create `src/utils/shoeMapping.js` to handle normalization of database strings to UI enum values
- [x] T003 Create `src/stores/shoes.js` to load `data/chaussure_all.jsonl` and provide search functionality
- [x] T004 Update `src/stores/session.js` to include a `resetChaussure` action for clearing shoe state

**Checkpoint**: Foundation ready - store and utilities are available for UI integration.

---

## Phase 3: User Story 1 - Search and Select Shoe by Model (Priority: P1) 🎯 MVP

**Goal**: Find and select a shoe model via autocomplete to auto-populate technical fields.

**Independent Test**: Type "Nimbus" in the model field, select a suggestion, and verify all technical fields (Drop, Stability, etc.) are filled.

### Implementation for User Story 1

- [x] T005 [US1] Replace "Modèle" select with an autocomplete input in `src/components/session/ProfilChaussureCard.vue`
- [x] T006 [US1] Implement brand-aware filtering in the model search within `src/components/session/ProfilChaussureCard.vue`
- [x] T007 [US1] Implement auto-fill logic using the mapping utility in `src/components/session/ProfilChaussureCard.vue`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Manual Entry and Override (Priority: P2)

**Goal**: Allow practitioners to manually enter shoe details or override auto-populated values.

**Independent Test**: Manually type a custom brand and model, then change the auto-filled Drop value to a custom number.

### Implementation for User Story 2

- [x] T008 [US2] Ensure "Marque" and "Modèle" inputs allow free-form text entry in `src/components/session/ProfilChaussureCard.vue`
- [x] T009 [US2] Verify that all technical selection fields (Drop, Stabilité, etc.) accept and persist manual changes in `src/components/session/ProfilChaussureCard.vue`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Reset Shoe Selection (Priority: P3)

**Goal**: Clear all shoe data with a single click.

**Independent Test**: Fill the shoe card, click "Vider", and verify all fields are reset to empty.

### Implementation for User Story 3

- [x] T010 [US3] Add the "Vider" button next to the title in `src/components/session/ProfilChaussureCard.vue`
- [x] T011 [US3] Bind the "Vider" button to the `resetChaussure` action in `src/components/session/ProfilChaussureCard.vue`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and UI refinements

- [x] T012 [P] Perform final UI alignment check for the shoe card in `src/components/session/ProfilChaussureCard.vue`
- [x] T013 [P] Run all verification scenarios from `specs/004-patient-shoe-selection/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- Normalization utility (T002) and Store creation (T003) can be done in parallel within Phase 2.
- Polish tasks (T012, T013) can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Setup & Foundational).
2. Complete Phase 3 (User Story 1 - Autocomplete & Auto-fill).
3. **VALIDATE**: Ensure search and auto-population work.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (Search & Select) -> Test.
3. Add US2 (Manual Override) -> Test.
4. Add US3 (Reset Button) -> Test.
5. Final Polish.
