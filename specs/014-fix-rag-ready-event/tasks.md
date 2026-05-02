# Tasks: RAG Phase Completion Fix (Ready Event)

**Input**: Design documents from `/specs/014-fix-rag-ready-event/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Foundational (Store Update)

- [ ] T001 [P] Update `handleEvent` in `src/stores/websocket.js` to recognize and process the `ready` event type
- [ ] T002 Update the mock sequence in `src/stores/websocket.js` to include a `ready` event between RAG and Rapport stages for E2E testing

---

## Phase 2: User Story 1 - Seamless Phase Transition (Priority: P1)

**Goal**: Automatically mark Phase 1 steps as done when `ready` is received.

**Independent Test**: Complete an analysis in mock mode; verify all Phase 1 steps (Video, Diagnostic, RAG) show green checkmarks immediately after the RAG spinner stops.

- [ ] T003 [US1] Update `handlePipelineMapping` in `src/views/AnalysisView.vue` to handle the `ready` event type
- [ ] T004 [US1] Implement logic to mark steps with IDs `video`, `diagnostic`, and `rag` as `status: 'done'` upon receiving the `ready` event in `src/views/AnalysisView.vue`
- [ ] T005 [US1] Ensure the "Générer le rapport" button (or the orchestrator's next action) is enabled when the `ready` event is received in `src/views/AnalysisView.vue`

---

## Phase 3: User Story 2 - Preliminary Diagnostic Review (Priority: P2)

**Goal**: Display preliminary diagnostic data provided in the `ready` event.

**Independent Test**: Send a `ready` event with a diagnostic payload and verify the metrics grid reflects these values.

- [ ] T006 [US2] Update `AnalysisView.vue` to pass the `diagnostic` data from the `ready` event to the `metrics` store or grid component

---

## Phase 4: Polish & Verification

- [ ] T007 Run all verification scenarios from `specs/014-fix-rag-ready-event/quickstart.md`
- [ ] T008 [P] Perform final build check with `npm run build`

---

## Dependencies & Execution Order

1. **Foundational (Phase 1)** must be completed to allow the UI to receive the event.
2. **User Story 1 (Phase 2)** is the primary fix and should be prioritized.
3. **User Story 2 (Phase 3)** provides additional context but is secondary to the fix.
4. **Polish (Phase 4)** is the final step.

## Implementation Strategy

1. **Clean Shutdown**: Ensure that transitioning to 'done' via the `ready` event also clears any `message` or `substep` labels that might look confusing.
2. **Mock Synchronization**: Use the updated mock sequence to verify that the 100% progress jump at the end of Phase 1 is visually smooth.
