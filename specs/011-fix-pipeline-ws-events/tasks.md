# Tasks: Pipeline WebSocket Events Fix

**Input**: Design documents from `/specs/011-fix-pipeline-ws-events/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Phase 1: Foundational (Store Refinement)

- [x] T001 [P] Implement event filtering to ignore `ping` and `connected` message types in `src/stores/websocket.js`
- [x] T002 [P] Update `handleEvent` in `src/stores/websocket.js` to ensure `pct` and `message` are correctly extracted from the new event schema

---

## Phase 2: User Story 1 - Real-Time Pipeline Progress (Priority: P1)

**Goal**: Correctly activate UI steps based on backend `etape` events.

**Independent Test**: Complete an analysis run and verify that each major stage ("Video", "Diagnostic", "RAG", "Rapport") highlights and completes in order.

- [x] T003 [US1] Consolidate the 7 granular steps into the 4 backend stages ("video", "diagnostic", "rag", "rapport") in `src/views/AnalysisView.vue`
- [x] T004 [US1] Refactor `handlePipelineMapping` in `src/views/AnalysisView.vue` to use the `etape` field instead of `substep`
- [x] T005 [US1] Implement logic to mark all previous steps as "done" when a new `etape` is received in `src/views/AnalysisView.vue`
- [x] T006 [US1] Handle the `completed` event to mark the final "rapport" step as done and show the report button in `src/views/AnalysisView.vue`

---

## Phase 3: User Story 2 - Accurate Progress Feedback (Priority: P1)

**Goal**: Ensure the global progress bar matches backend `pct`.

**Independent Test**: Verify that the progress bar reached exactly 43% when an event with `pct: 43` is received.

- [x] T007 [US2] Verify `AnalysisProgressBar.vue` correctly receives and displays the `pct` value from the store

---

## Phase 4: Polish & Verification

- [x] T008 [P] Update `connectMock` in `src/stores/websocket.js` to use the new `etape`-based schema for local testing
- [x] T009 Run all manual verification scenarios from `specs/011-fix-pipeline-ws-events/quickstart.md`
- [x] T010 [P] Perform final build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 1)** must be done first to support the new schema.
2. **User Story 1 (Phase 2)** is the core fix.
3. **Polish (Phase 4)** requires updated mock data for verification.

## Implementation Strategy

1. **Schema Alignment**: The frontend must adapt to the backend's 4-node LangGraph architecture.
2. **Sequential Logic**: Ensure that receiving a "rag" event automatically closes the "diagnostic" and "video" steps if they were somehow missed.
3. **Mock First**: Update the mock data immediately to verify the new mapping without needing the backend running.
