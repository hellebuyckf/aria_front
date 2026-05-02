# Tasks: Progressive Metrics Display

**Input**: Design documents from `/specs/012-progressive-metrics-display/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Setup (Infrastructure)

- [x] T001 [P] Update `useWebSocketStore` mock metrics in `src/stores/websocket.js` to ensure some `null` values for testing staggered reveal

---

## Phase 2: Foundational (Animation Readiness)

- [x] T002 [P] Update `src/components/analysis/MetricCell.vue` to accept a `visible` prop and wrap the entire cell content in `<Transition name="fade">`

---

## Phase 3: User Story 1 - Real-time Result Discovery (Priority: P1)

**Goal**: Display metrics one by one with a 120ms delay.

**Independent Test**: Complete a mock analysis and verify that metrics pop in sequentially rather than appearing all at once.

- [x] T003 [US1] Define `METRICS_ORDER` metadata array and reactive `revealedKeys` set in `src/components/analysis/MetricsPreviewGrid.vue`
- [x] T004 [US1] Implement staggered 120ms reveal loop (using `setTimeout`) triggered by the `metrics` event in `src/components/analysis/MetricsPreviewGrid.vue`
- [x] T005 [US1] Update `MetricsPreviewGrid.vue` template to bind the `visible` state of `MetricCell` to the presence of its key in `revealedKeys`

---

## Phase 4: User Story 2 - Context-Aware Metric Layout (Priority: P2)

**Goal**: Hide posterior metrics if the posterior view was not recorded.

**Independent Test**: Simulate a session without posterior video and verify that the "Vue postérieure" section is hidden.

- [x] T006 [US2] Group metrics into "Sagittale" and "Postérieure" categories in `src/components/analysis/MetricsPreviewGrid.vue`
- [x] T007 [US2] Implement conditional rendering to hide the posterior group if `vue_posterieure_disponible` is false or all posterior metrics are null in `src/components/analysis/MetricsPreviewGrid.vue`

---

## Phase 5: Polish & Verification

- [x] T008 [P] Final visual alignment check (grid spacing, transition smoothness) in `src/components/analysis/MetricsPreviewGrid.vue`
- [x] T009 Run all manual verification scenarios from `specs/012-progressive-metrics-display/quickstart.md`
- [x] T010 [P] Perform final build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)** must be completed before the progressive reveal logic can be visually verified.
2. **User Story 1 (Phase 3)** is the core feature and should be prioritized.
3. **User Story 2 (Phase 4)** refines the layout based on available data.
4. **Polish (Phase 5)** ensures production-ready quality.

## Implementation Strategy

1. **Timing**: Use exactly 120ms delay as requested to ensure a professional, non-rushed perception of data arrival.
2. **Null Safety**: Ensure the staggered loop skips `null` keys to avoid 120ms gaps where nothing appears.
3. **Transitions**: Ensure the `fade` transition defined in `main.css` is used for consistency.
