# Tasks: Clinical Report View

**Input**: Design documents from `/specs/016-clinical-report-view/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Setup (Infrastructure)

- [x] T001 [P] Ensure the report route `/session/:sessionId/report` is correctly configured in `src/router/index.js`
- [x] T002 Verify existence of centralized Axios instance in `src/services/api.js`

---

## Phase 2: Foundational (Data Fetching & Error Handling)

**Goal**: Fetch report data and handle 409 status.

**Independent Test**: Manually navigate to a report URL and verify the loading spinner appears, then either the report data or the "In progress" message (if 409) is displayed.

- [x] T003 Implement initial reactive state (report, loading, error, inProgress) in `src/views/ReportView.vue`
- [x] T004 Implement `fetchReport` logic using `onMounted` with `POST /api/sessions/{session_id}/generate` and handle 409 Conflict in `src/views/ReportView.vue`

---

## Phase 3: User Story 1 - Clinical Results Rendering (Priority: P1)

**Goal**: Render all report sections with specified styling.

**Independent Test**: Load a mock report and visually verify that the pathology header, confidence badge, metrics, and recommendations match the clinical requirements.

- [x] T005 [US1] Implement the Report Header with pathology title and color-coded confidence badge in `src/views/ReportView.vue`
- [x] T006 [US1] Implement the Justification section (text paragraph) in `src/views/ReportView.vue`
- [x] T007 [US1] Implement the Abnormal Metrics list with ⚠️ icons in `src/views/ReportView.vue`
- [x] T008 [US1] Implement the Recommendations numbered list in `src/views/ReportView.vue`
- [x] T009 [US1] Implement the PubMed References list (small gray text) in `src/views/ReportView.vue`
- [x] T010 [US1] Implement the Avertissement/Disclaimer block at the bottom in `src/views/ReportView.vue`

---

## Phase 4: User Story 2 - PDF Export (Priority: P2)

**Goal**: Enable PDF download via external tab.

**Independent Test**: Click "Télécharger le PDF" and verify a new tab opens pointing to the report download URL.

- [x] T011 [US2] Implement the "Télécharger le PDF" button and its `window.open` logic in `src/views/ReportView.vue`

---

## Phase 5: Polish & Verification

- [x] T012 Perform final UI audit (padding, font sizes, contrast) in `src/views/ReportView.vue`
- [x] T013 Run all manual verification scenarios from `specs/016-clinical-report-view/quickstart.md`
- [x] T014 [P] Perform final production build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)** must be completed before visual rendering.
2. **User Story 1 (Phase 3)** is the main implementation phase.
3. **Polish (Phase 5)** ensures production-ready quality.

## Implementation Strategy

1. **Surgical Update**: Since `ReportView.vue` might already exist or have a placeholder, focus on implementing the new local-ref logic and specific 409 handling.
2. **Tailwind-First**: Use Tailwind classes for all styling to maintain consistency with the ARIA v2.0 design system.
3. **Mock First**: Use the mock JSON from the spec to verify all UI branches (Red/Orange/Green badges) before testing with a live backend.
