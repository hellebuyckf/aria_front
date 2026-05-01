# Tasks: Sidebar Validation Status

**Input**: Design documents from `/specs/007-sidebar-validation-status/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Setup (Infrastructure)

- [x] T001 [P] Verify Material Symbols "check" availability and base styles in `src/components/layout/AppSideNav.vue`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T002 Add `activeStep` prop (Number, default: 1) to `src/components/layout/AppSideNav.vue`
- [x] T003 Refactor the static `steps` array into a computed property that derives status ('active', 'done', 'waiting') from `activeStep` in `src/components/layout/AppSideNav.vue`

---

## Phase 3: User Story 1 - Completed Step Visual Feedback (Priority: P1)

**Goal**: Show "Saisie patient" as validated when on the analysis page.

**Independent Test**: Navigate to the Analysis page and verify "Saisie patient" has a green checkmark and "Validé" label.

- [x] T004 [US1] Update the template in `src/components/layout/AppSideNav.vue` to display the green check icon for 'done' steps
- [x] T005 [US1] Update the template in `src/components/layout/AppSideNav.vue` to display the green "Validé" label for 'done' steps
- [x] T006 [US1] Pass `active-step="2"` from `src/views/AnalysisView.vue` and `active-step="1"` from `src/views/SessionSetupView.vue` to `AppSideNav`

---

## Phase 4: Polish & Verification

- [x] T007 [P] Perform visual alignment check (icon size, spacing, font weight) in `src/components/layout/AppSideNav.vue`
- [x] T008 Run all verification scenarios from `specs/007-sidebar-validation-status/quickstart.md`

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)** must be completed before UI updates.
2. **User Story 1 (Phase 3)** depends on Phase 2 logic being active.
3. **Polish (Phase 4)** is the final step.

## Implementation Strategy

1. **Incremental Update**: Add the prop first, then the logic, then the UI.
2. **Visual Matching**: Ensure the green color matches `#4ade80` (Tailwind `green-400`) as requested.
