# Tasks: Analysis View UX Refinement

**Input**: Design documents from `/specs/009-analysis-view-ux-refinement/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Foundational (Blocking Prerequisites)

- [x] T001 Remove automatic redirection logic (`setTimeout`) upon analysis completion in `src/views/AnalysisView.vue`

---

## Phase 2: User Story 1 - Manual Report Navigation (Priority: P1)

**Goal**: Allow clinicians to manually navigate to the report after reviewing analysis data.

**Independent Test**: Complete a mock analysis and verify that the "Voir le rapport" button appears and remains on screen without auto-navigating.

- [x] T002 [US1] Ensure the "Voir le rapport" button correctly triggers `goToReport()` and is visible when `showReportButton` is true in `src/views/AnalysisView.vue`

---

## Phase 3: User Story 2 - High Visibility Logs (Priority: P2)

**Goal**: Improve log legibility against the dark terminal background.

**Independent Test**: Observe the log panel and verify that message text is bright white.

- [x] T003 [US2] Update the message text color to `text-white` (or ARIA white token) in `src/components/analysis/LogLine.vue`

---

## Phase 4: Polish & Verification

- [x] T004 Run all verification scenarios from `specs/009-analysis-view-ux-refinement/quickstart.md`
- [x] T005 [P] Perform final build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 1)** should be done first to break the auto-redirect.
2. **User Stories (Phase 2, 3)** can be done in any order.
3. **Polish (Phase 4)** is the final verification step.

## Implementation Strategy

1. **Surgical Edits**: These are small changes to existing stable components. Focus on maintaining current styling while applying the refinements.
2. **Mock-Driven Verification**: Use `VITE_MOCK_WS=true` to quickly reach the end of the analysis pipeline for testing.
