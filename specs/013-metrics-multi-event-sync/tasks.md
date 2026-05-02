# Tasks: Multi-Event Metrics Sync

**Input**: Design documents from `/specs/013-metrics-multi-event-sync/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Foundational (Store Synchronization)

- [x] T001 [P] Refactor `handleEvent` in `src/stores/websocket.js` to treat `metrics` events as progress updates (syncing `pct` and `message`)
- [x] T002 [P] Implement complete state replacement for the `metrics` object in `src/stores/websocket.js` upon receiving a new `metrics` event

---

## Phase 2: User Story 1 - Real-time Multi-Stage Discovery (Priority: P1)

**Goal**: Seamlessly update the UI when the backend sends sagittal, then posterior metrics.

**Independent Test**: Use the updated mock mode to verify that the metrics grid updates twice, adding the posterior section in the second pass.

- [x] T003 [US1] Update the `watch` logic in `src/components/analysis/MetricsPreviewGrid.vue` to trigger a new staggered reveal when posterior data becomes available
- [x] T004 [US1] Ensure `showPosterior` computed property in `src/components/analysis/MetricsPreviewGrid.vue` is driven strictly by the `vue_posterieure_disponible` flag

---

## Phase 3: User Story 2 - Integrated Progress Feedback (Priority: P1)

**Goal**: Metrics events contribute to the global progress bar.

**Independent Test**: Observe the progress bar jumping to the specific `pct` value provided in the metrics payload.

- [x] T005 [US2] Verify `AnalysisProgressBar` reflects progress from `metrics` events via the synchronized `websocket` store

---

## Phase 4: Polish & Verification

- [x] T006 [P] Update `connectMock` in `src/stores/websocket.js` to simulate the two-stage metrics arrival sequence
- [x] T007 Run all manual verification scenarios from `specs/013-metrics-multi-event-sync/quickstart.md`
- [x] T008 [P] Perform final build check with `npm run build`
