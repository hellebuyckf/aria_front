# Tasks: Biomechanical Analysis Progress

**Input**: Design documents from `/specs/006-biomechanical-analysis-progress/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Phase 1: Setup (Infrastructure)

- [x] T001 [P] Configure application router for the analysis view in `src/router/index.js`
- [x] T002 [P] Add global "fade" transition and spinner animation in `src/assets/main.css`

---

## Phase 2: Foundational (WebSocket & Shared UI)

- [x] T003 Implement `useWebSocketStore` with reconnection logic and mock mode in `src/stores/websocket.js`
- [x] T004 [P] Create `WsAlertBanner.vue` for connection status alerts in `src/components/analysis/WsAlertBanner.vue`
- [x] T005 [P] Create `ErrorBanner.vue` for pipeline failure handling in `src/components/analysis/ErrorBanner.vue`

---

## Phase 3: User Story 1 - Progress Monitoring (Priority: P1)

**Goal**: Display real-time progress percentage and bar.

**Independent Test**: Verify that sending a progress event updates the percentage and fills the bar smoothly.

- [x] T006 [US1] Create `AnalysisProgressBar.vue` with real-time percentage and status label in `src/components/analysis/AnalysisProgressBar.vue`

---

## Phase 4: User Story 2 - Pipeline Tracking (Priority: P1)

**Goal**: Visualize the 7-stage processing pipeline.

**Independent Test**: Verify that stages transition from idle to running to done with accurate elapsed times.

- [x] T007 [P] [US2] Create `PipelineStepItem.vue` with state-specific styling and duration in `src/components/analysis/PipelineStepItem.vue`
- [x] T008 [US2] Create `PipelineStepList.vue` to orchestrate the 7 pipeline stages in `src/components/analysis/PipelineStepList.vue`

---

## Phase 5: User Story 4 - Metric Preview (Priority: P1)

**Goal**: Display biomechanical metrics as they are extracted.

**Independent Test**: Verify that metrics appear in the grid with correct normative status colors (red/orange/green).

- [x] T009 [P] [US4] Create `MetricCell.vue` with value and normative indicator in `src/components/analysis/MetricCell.vue`
- [x] T010 [US4] Create `MetricsPreviewGrid.vue` with threshold logic and label mapping in `src/components/analysis/MetricsPreviewGrid.vue`

---

## Phase 6: User Story 3 - Event Logging (Priority: P2)

**Goal**: Show a technical log of system events.

**Independent Test**: Verify that log lines appear in real-time and auto-scroll within the terminal-style panel.

- [x] T011 [P] [US3] Create `LogLine.vue` with timestamp and level-based color coding in `src/components/analysis/LogLine.vue`
- [x] T012 [US3] Create `RealTimeLog.vue` with auto-scroll and FIFO buffer in `src/components/analysis/RealTimeLog.vue`

---

## Phase 7: User Story 5 - Completion & Orchestration (Priority: P1)

**Goal**: Full view integration and automatic redirection.

**Independent Test**: Run a full mock sequence and verify redirection to the report after completion.

- [x] T013 [US1,US2,US3,US4,US5] Implement the orchestrator view `AnalysisView.vue` with layout and event handling in `src/views/AnalysisView.vue`

---

## Phase 8: Polish & Verification

- [x] T014 Perform end-to-end verification using mock mode (`VITE_MOCK_WS=true`)
- [x] T015 Verify WebSocket resilience (disconnection and reconnection behavior)
- [x] T016 Verify integration with the real backend (if available)
- [x] T017 Run final build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)** must be completed before any User Story tasks.
2. **User Stories (Phase 3, 4, 5, 6)** can be developed in parallel once foundations are ready.
3. **Orchestration (Phase 7)** depends on all previous UI components.
4. **Polish (Phase 8)** is the final step.

## Implementation Strategy

1. **MVP First**: Prioritize US1, US2, and US4 to provide immediate visual feedback.
2. **Incremental Delivery**: Foundations -> US1 (Progress) -> US2 (Pipeline) -> US4 (Metrics) -> US3 (Logs) -> US5 (Redirection).
3. **Mock-Driven**: Use the mock mode in `useWebSocketStore` to develop and test the entire UI without needing the real backend.
