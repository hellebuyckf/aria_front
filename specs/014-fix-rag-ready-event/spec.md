# Feature Specification: RAG Phase Completion Fix (Ready Event)

**Feature Branch**: `014-fix-rag-ready-event`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "Fix analysis screen stuck on RAG. Implement 'ready' event handling to signal end of Phase 1, mark steps as done, and unlock the report generation button."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Seamless Phase Transition (Priority: P1)

As a practitioner, I want the analysis screen to automatically proceed once the background RAG processing is finished, so that I can see the preliminary diagnostic results and generate the final report without manual intervention or page refresh.

**Why this priority**: Critical bug fix. Currently, the UI remains in a "running" state for the RAG step even after the backend has finished, confusing the user and blocking the workflow.

**Independent Test**: Can be fully tested by triggering a `ready` event from the backend (or mock) and verifying that the RAG step transitions from "running" to "done" and the "Générer le rapport" button becomes enabled.

**Acceptance Scenarios**:

1. **Given** the analysis is in the RAG step, **When** a `ready` WebSocket event is received, **Then** the "RAG" step in the UI is marked as completed and the global progress reaches 100%.
2. **Given** the `ready` event is received, **When** the transition occurs, **Then** all previous steps (Video, Diagnostic) are also confirmed as completed and their spinners stop.
3. **Given** the system is in the "ready" state, **When** the UI updates, **Then** the "Générer le rapport" button changes from disabled/hidden to enabled/visible.

---

### User Story 2 - Preliminary Diagnostic Review (Priority: P2)

As a practitioner, I want to see the preliminary diagnostic data immediately after Phase 1 finishes, so that I can verify the findings before committing to generating the full report.

**Why this priority**: Improves clinical accuracy and provides immediate value while the final report is being prepared.

**Independent Test**: Verify that the `diagnostic` object within the `ready` event payload is correctly rendered in the UI preview grid.

**Acceptance Scenarios**:

1. **Given** a `ready` event containing diagnostic data, **When** received, **Then** the UI metrics/results grid is populated with these new findings.

---

### Edge Cases

- **Out of Order Progress**: If a `progress` event for RAG arrives *after* the `ready` event (due to network jitter), the system MUST ignore the stale progress and remain in the `ready` state.
- **Connection Lost at Ready**: If the WebSocket disconnects exactly when `ready` is sent, the system MUST handle the reconnection and ideally re-verify the "ready" status if the session is still active.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST process WebSocket messages of `type: "ready"`.
- **FR-002**: Upon receiving `ready`, the system MUST set the global progress (`pct`) to 100%.
- **FR-003**: Upon receiving `ready`, the system MUST transition all Phase 1 pipeline steps ("video", "diagnostic", "rag") to the "done" state.
- **FR-004**: System MUST stop all active loading spinners in the pipeline list upon `ready`.
- **FR-005**: System MUST enable the "Générer le rapport" button (or equivalent finalization action) when the `ready` event is received.
- **FR-006**: System MUST update the UI with any `diagnostic` data provided in the `ready` event payload.
- **FR-007**: System MUST continue to ignore `ping` and `connected` events while processing the `ready` transition.

### Key Entities *(include if feature involves data)*

- **Ready Event**: WebSocket container signaling Phase 1 completion (`type`, `etape`, `pct`, `diagnostic`).
- **Phase 1 Pipeline**: The group of tasks including cinematic extraction, medical RAG, and preliminary diagnostics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The transition from RAG "running" to "ready" occurs in under 100ms after event receipt.
- **SC-002**: 100% of "ready" events result in a clickable report generation button.
- **SC-003**: No UI steps from Phase 1 remain in a "running" or "waiting" state after the `ready` event is processed.

## Assumptions

- **Event Ordering**: Assumes the backend sends `ready` only after all `progress` events for the RAG stage are emitted.
- **Payload Schema**: Assumes the `ready` event follows the schema: `{ "type": "ready", "etape": "rag", "pct": 100, "diagnostic": {...} }`.
- **Button Existence**: Assumes the "Générer le rapport" button already exists in the `AnalysisView.vue` template but is currently disabled or hidden.
