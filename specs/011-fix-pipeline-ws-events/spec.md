# Feature Specification: Pipeline WebSocket Events Fix

**Feature Branch**: `011-fix-pipeline-ws-events`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "Fix pipeline step display using WebSocket events. Backend sends events with etape, pct, and message fields. Frontend needs to correctly map these to UI step activation and progress."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Real-Time Pipeline Progress (Priority: P1)

As a practitioner, I want to see the active step of the analysis pipeline highlighted in real-time, so that I can understand which phase of the biomechanical processing is currently executing.

**Why this priority**: High. This is a fix for broken core functionality where pipeline steps remain grayed out despite backend processing.

**Independent Test**: Initiate an analysis and verify that as `progress` events arrive for different `etape` values ("video", "diagnostic", etc.), the corresponding UI steps transition from "idle" to "running" and then to "done".

**Acceptance Scenarios**:

1. **Given** an analysis is started, **When** a `progress` event with `etape: "video"` is received, **Then** the "Video" step in the UI becomes active and displays the message from the event.
2. **Given** a current active step, **When** a `progress` event for the *next* `etape` is received, **Then** the previous step is marked as "completed" and the new step becomes active.
3. **Given** an ongoing analysis, **When** a `completed` event is received, **Then** all steps are marked as "done" and the progress bar reaches 100%.

---

### User Story 2 - Accurate Progress Feedback (Priority: P1)

As a practitioner, I want the global progress bar to accurately reflect the `pct` value sent by the backend, so that I have a reliable estimate of the total remaining time.

**Why this priority**: High. Prevents user confusion caused by mismatched progress metrics.

**Independent Test**: Verify that the global progress bar updates smoothly to the exact `pct` value received in every `progress` event.

**Acceptance Scenarios**:

1. **Given** a `progress` event with `pct: 43`, **When** received by the frontend, **Then** the progress bar width is updated to exactly 43%.

---

### Edge Cases

- **Ping/Connection Messages**: The system MUST ignore `type: "ping"` and `type: "connected"` messages in the UI logic.
- **Pipeline Errors**: If a `type: "error"` is received, the current active step MUST transition to an error state.
- **Skipped Steps**: If the backend skips an internal step (not sent via WS), the frontend should handle the transition to the next received step gracefully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST parse incoming WebSocket JSON messages following the `type`, `etape`, `pct`, and `message` schema.
- **FR-002**: System MUST identify the active pipeline stage by mapping the `etape` field to the UI steps: "video" -> Step 1, "diagnostic" -> Step 2, "rag" -> Step 3, "rapport" -> Step 4.
- **FR-003**: System MUST update the global progress bar using the `pct` field (0-100).
- **FR-004**: System MUST display the `message` field text under the currently active pipeline step.
- **FR-005**: System MUST mark a step as "Terminé" as soon as a `progress` event for a subsequent stage is received or a `completed` event arrives.
- **FR-006**: System MUST mark all steps as "Terminé" upon receiving a `type: "completed"` event.

### Key Entities *(include if feature involves data)*

- **WebSocket Event**: Data structure received from the backend containing pipeline metadata.
- **Pipeline State**: Reactive state in the frontend tracking the status of all 4 major stages.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: UI pipeline steps successfully transition to "active" state in 100% of successful WebSocket transmissions.
- **SC-002**: UI message display latency after WebSocket receipt is under 50ms.

## Assumptions

- **Event Order**: Assumes the backend sends `etape` values in the chronological order of the pipeline.
- **Component Availability**: Assumes `AnalysisView.vue` and `useWebSocketStore` are the primary locations for this logic.
- **Mapping Logic**: Assumes the existing 7 steps in the UI will be mapped/grouped into the 4 backend stages ("video", "diagnostic", "rag", "rapport").
