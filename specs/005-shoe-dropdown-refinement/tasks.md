# Tasks: Shoe Dropdown Refinement

**Input**: Design documents from `/specs/005-shoe-dropdown-refinement/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification prioritized per MVP guidelines.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verification and preparation

- [x] T001 Verify `src/stores/shoes.js` exposes `brands` and `search` functionality as per previous implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare shared logic and UI patterns for searchable dropdowns

- [x] T002 [P] Implement gender mapping utility ("Homme" -> "homme", "Femme" -> "femme") in `src/utils/shoeMapping.js`
- [x] T003 [P] Design a reusable "Searchable Dropdown" UI pattern within `src/components/session/ProfilChaussureCard.vue` (replacing native selects)

**Checkpoint**: Shared UI patterns and mapping logic ready for story-specific integration.

---

## Phase 3: User Story 1 - Brand Selection from Dropdown (Priority: P1) 🎯 MVP

**Goal**: Select a brand from a searchable list to populate the store's brand state.

**Independent Test**: Click the "Marque" field, type "Asi", select "Asics", and verify `modelValue.marque` is "Asics".

### Implementation for User Story 1

- [x] T004 [US1] Convert "Marque" field to a custom searchable dropdown in `src/components/session/ProfilChaussureCard.vue`
- [x] T005 [US1] Bind the brand dropdown to `shoeStore.brands` in `src/components/session/ProfilChaussureCard.vue`

**Checkpoint**: Brand selection is fully functional using the new searchable dropdown pattern.

---

## Phase 4: User Story 2 - Model Selection with Multi-level Filtering (Priority: P1)

**Goal**: Filter models by both brand and gender, and auto-populate data.

**Independent Test**: Select "Brooks" and "Femme", open the Model list, and verify only Brooks women's models are visible.

### Implementation for User Story 2

- [x] T006 [US2] Implement the "Disable Modèle" logic when `gender` is missing in `src/components/session/ProfilChaussureCard.vue`
- [x] T007 [US2] Update the model search call to include both the selected brand and the mapped gender in `src/components/session/ProfilChaussureCard.vue`
- [x] T008 [US2] Ensure the model selection auto-fills technical fields using the existing `mapShoeToUI` utility

**Checkpoint**: Multi-level filtering is active, ensuring data consistency and accuracy.

---

## Phase 5: User Story 3 - Dependent Reset (Priority: P2)

**Goal**: Clear model and technical fields when the brand changes.

**Independent Test**: Select a complete shoe (Asics Nimbus), then change the brand to "Nike" and verify that "Nimbus" and its technical fields are cleared.

### Implementation for User Story 3

- [x] T009 [US3] Add a watcher on `props.modelValue.marque` to trigger `resetChaussure` (excluding the brand itself) when changed in `src/components/session/ProfilChaussureCard.vue`

**Checkpoint**: Data integrity is preserved during brand changes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UX refinements and final validation

- [x] T010 [P] Add a "Gender Required" tooltip/hint to the disabled Model field in `src/components/session/ProfilChaussureCard.vue`
- [x] T011 [P] Perform final UI alignment and spacing check for the refined card in `src/components/session/ProfilChaussureCard.vue`
- [x] T012 Run all verification scenarios from `specs/005-shoe-dropdown-refinement/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Prerequisite for Brand/Model consistency.
- **User Story 2 (P1)**: Depends on US1 being active.
- **User Story 3 (P2)**: Depends on US2 and US1.

### Parallel Opportunities

- Gender mapping (T002) and UI design (T003) can start in parallel.
- Polish tasks (T010, T011) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Foundational UI (Searchable pattern).
2. Complete US1 (Brand selection).
3. Complete US2 (Model selection with gender filter).
4. **VALIDATE**: Ensure a correct shoe can be selected end-to-one.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (Brand dropdown).
3. Add US2 (Gender-filtered model dropdown).
4. Add US3 (Automatic reset on brand change).
5. Final UX Polish.
