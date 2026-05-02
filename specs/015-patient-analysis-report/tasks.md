# Tasks: Patient Analysis Report

**Input**: Design documents from `/specs/015-patient-analysis-report/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Phase 1: Setup (Infrastructure & Store)

- [x] T001 [P] Implement `useReportStore` with `fetchReport`, `downloadPdf`, and `reset` actions in `src/stores/report.js`
- [x] T002 [P] Configure the report route in `src/router/index.js`
- [x] T003 [P] Add the `@media print` CSS block and generic report print styles in `src/assets/main.css`

---

## Phase 2: Foundational (Generic Data Row Components)

- [x] T004 [P] Create the `MetricRow.vue` component for individual metric display in `src/components/report/MetricRow.vue`
- [x] T005 [P] Create the `ExerciceItem.vue` component for rehab protocol entries in `src/components/report/ExerciceItem.vue`

---

## Phase 3: User Story 1 - Clinical Summary (Priority: P1)

**Goal**: Display patient identity and clinical context header.

**Independent Test**: Navigate to the report for patient `PAT-2026-042` and verify the header table shows correct age, weight, and orange drop (12mm).

- [x] T006 [US1] Create the `ReportHeader.vue` 5-column identity table in `src/components/report/ReportHeader.vue`

---

## Phase 4: User Story 2 - Biomechanical Metrics (Priority: P1)

**Goal**: Display metric table with color-coded normative statuses.

**Independent Test**: Verify the table correctly labels cadence as "Anormal" (Red) and flexion genou as "Normal" (Green).

- [x] T007 [US2] Create the `MetricsTable.vue` container for biomechanical measurements in `src/components/report/MetricsTable.vue`

---

## Phase 5: User Story 3 - Anomaly Correlation (Priority: P1)

**Goal**: Show identified anomalies with PubMed reference links.

**Independent Test**: Click a citation `[1]` in an anomaly card and verify it scrolls/anchors to the sources section.

- [x] T008 [P] [US3] Create the `AnomalieCard.vue` component with red border and citation links in `src/components/report/AnomalieCard.vue`
- [x] T009 [US3] Create the `AnomaliesList.vue` container for correlation blocks in `src/components/report/AnomaliesList.vue`

---

## Phase 6: User Story 4 - Equipment Alert & Protocol (Priority: P2)

**Goal**: Display conditional alerts and the 3-phase rehabilitation plan.

**Independent Test**: Verify the "Alerte équipement" is visible for PAT-2026-042 (Ghost 16) and hidden for subjects with drop <= 8mm.

- [x] T010 [US4] Create the `AlerteEquipement.vue` conditional orange alert block in `src/components/report/AlerteEquipement.vue`
- [x] T011 [P] [US4] Create the `PhaseCard.vue` component with dark blue header in `src/components/report/PhaseCard.vue`
- [x] T012 [US4] Create the `ProtocoleSection.vue` orchestrator for phases in `src/components/report/ProtocoleSection.vue`

---

## Phase 7: User Story 6/8 - References & Footer (Priority: P2)

**Goal**: Display bibliography and RGPD disclaimer.

**Independent Test**: Verify the technical footer displays 87% confidence and 42 cycles.

- [x] T013 [P] [US6] Create the `SourcesList.vue` component with numbered PubMed references in `src/components/report/SourcesList.vue`
- [x] T014 [P] [US8] Create the `ReportFooter.vue` component with disclaimer and meta in `src/components/report/ReportFooter.vue`

---

## Phase 8: Orchestration & Polish

**Goal**: Assemble the full report and implement final UX actions.

**Independent Test**: Verify that clicking "Télécharger le PDF" triggers a file download without leaving the page.

- [x] T015 [US1,US2,US3,US4,US5] Implement the `ReportView.vue` orchestrator with skeleton loading and fetch logic in `src/views/ReportView.vue`
- [x] T016 Perform final visual alignment and spacing audit against the reference PDF
- [x] T017 Verify PDF download functionality using Blob-to-URL strategy
- [x] T018 Verify print layout fidelity via browser print preview (`Cmd+P`)
- [x] T019 Run final production build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 1/2)** must be completed first.
2. **User Stories (Phase 3-7)** can be implemented in parallel once foundational items are ready.
3. **Orchestration (Phase 8)** requires all child components to be complete.

## Implementation Strategy

1. **Skeleton First**: The orchestrator (`ReportView`) should handle the loading state early to ensure a professional initial perception.
2. **Mock Data Reliance**: Use the provided `MOCK_REPORT` in the store for 100% of UI development to ensure alignment with the clinical reference.
3. **Print-First Styling**: When building components, use Tailwind `print:hidden` or pure CSS `@media print` immediately to avoid a large cleanup phase at the end.
