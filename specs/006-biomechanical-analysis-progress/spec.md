# Feature Specification: Biomechanical Analysis Progress

**Feature Branch**: `006-biomechanical-analysis-progress`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: Analysis view for real-time biomechanical processing tracking via WebSockets.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Real-Time Progress Monitoring (Priority: P1)

As a practitioner, I want to see a global progress percentage and a status label so that I can know at a glance the status of the analysis.

**Why this priority**: This is the core value proposition of the screen, providing immediate feedback on the long-running background process.

**Independent Test**: Can be tested by initiating an analysis and verifying that the progress bar and percentage (`pct`) update progressively from 0 to 100 based on incoming events.

**Acceptance Scenarios**:

1. **Given** an analysis is started, **When** progress updates are received, **Then** the percentage is displayed in bold text and the progress bar fills with a smooth transition.
2. **Given** an ongoing analysis, **When** a new progress value is received, **Then** the displayed value never decreases (`Math.max(current, incoming)`).

---

### User Story 2 - Pipeline Stage Tracking (Priority: P1)

As a practitioner, I want to see each of the 7 pipeline stages with their individual status and execution time so that I can understand the system's processing flow.

**Why this priority**: Critical for transparency and identifying which part of the complex analysis pipeline is currently active or where it might be bottlenecked.

**Independent Test**: Can be tested by observing the 7 stages transition from `idle` to `running` to `done` (or `error`) as the analysis proceeds.

**Acceptance Scenarios**:

1. **Given** a stage is starting, **When** the corresponding event is received, **Then** the stage shows a cyan animated spinner and a "Running..." label.
2. **Given** a stage is completed, **When** the completion event is received, **Then** it displays a green checkmark and the measured execution time.

---

### User Story 3 - System Event Logging (Priority: P2)

As a practitioner, I want to see a real-time journal of system events so that I have technical visibility into the processing details.

**Why this priority**: Provides granular detail for power users and helps in diagnosing issues that aren't captured by high-level stage updates.

**Independent Test**: Verify that a "terminal" panel displays timestamped log messages with appropriate color badges (INFO, OK, WARN, ERROR) and auto-scrolls.

**Acceptance Scenarios**:

1. **Given** new system messages are emitted, **When** they are received by the frontend, **Then** they appear at the bottom of the log with the current timestamp and auto-scroll.
2. **Given** a long-running analysis, **When** the log exceeds 50 lines, **Then** the oldest messages are removed (FIFO).

---

### User Story 4 - Live Metric Preview (Priority: P1)

As a practitioner, I want to see biomechanical metrics appear in real-time as they are produced so that I can start evaluating the results before the full report is ready.

**Why this priority**: Delivers early value and makes the application feel "alive" and highly responsive to the data processing.

**Independent Test**: Verify that a grid of metrics populates dynamically with color-coded status indicators (Red/Orange/Green) as the `video_agent` produces data.

**Acceptance Scenarios**:

1. **Given** the extraction stage is active, **When** metrics are received, **Then** they appear in the grid with their values and status indicators.
2. **Given** a metric is not yet available, **When** the grid is displayed, **Then** it shows "Calcul..." in italic gray text.

---

### User Story 5 - Analysis Completion and Redirection (Priority: P1)

As a practitioner, I want to be automatically redirected to the report once the analysis is finished so that I can proceed to the next step of the clinical workflow without manual intervention.

**Why this priority**: Ensures a smooth handover from the processing phase to the results phase.

**Independent Test**: Verify that a "VIEW REPORT" button appears and an automatic redirection occurs 2 seconds after the "completed" event.

**Acceptance Scenarios**:

1. **Given** the analysis reaches 100%, **When** the `completed` event is received, **Then** all stages show `done` and a "VIEW REPORT" button appears.
2. **Given** the analysis is completed, **When** 2 seconds have passed, **Then** the system automatically redirects to the report view.

---

### Edge Cases

- **What happens when the WebSocket disconnects?** The system displays a persistent alert banner and attempts 3 automatic reconnections with exponential backoff.
- **How does the system handle a pipeline error?** The affected stage turns red, an error banner appears with a descriptive message, and the user is given options to "Retry" or "Cancel".
- **What if the inference server (vLLM) times out?** A specific error message is shown indicating that the server is not responding, and a partial report might be available.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a global progress bar and percentage that updates in real-time via WebSockets.
- **FR-002**: System MUST visualize 7 distinct pipeline stages: Ingestion, Extraction, Force Vectors, Medical RAG, Web Grounding, Protocol Generation, and Export.
- **FR-003**: System MUST measure and display the execution time for each stage locally on the frontend.
- **FR-004**: System MUST provide a terminal-style log area showing the last 50 system events with status-based color coding.
- **FR-005**: System MUST display a grid of 8 key biomechanical metrics that populates dynamically as data becomes available.
- **FR-006**: System MUST prevent navigation away from the analysis view (except via "Cancel") while processing is active.
- **FR-007**: System MUST automatically redirect to the report view 2 seconds after a successful `completed` event is received.
- **FR-008**: System MUST handle WebSocket reconnections gracefully with a visual indicator and retry logic.

### Key Entities *(include if feature involves data)*

- **Analysis State**: Represents the current progress, active stage, log history, and extracted metrics for the session.
- **Biomechanical Metrics**: A set of calculated values (Cadence, Vertical Oscillation, Tibial Angle, etc.) with associated normative status indicators.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Progress bar updates reflect WebSocket events with less than 100ms UI latency.
- **SC-002**: System successfully handles automatic redirection to the report in 100% of successful analysis cases.
- **SC-003**: Log terminal correctly maintains a FIFO buffer of exactly 50 messages during heavy event traffic.
- **SC-004**: UI remains responsive (60 FPS) even when multiple metrics and log messages are arriving simultaneously.

## Assumptions

- **Stable Patient Data**: Assumes that `useSessionStore` already contains the necessary patient ID and context before entering the analysis view.
- **WebSocket Protocol**: Assumes the backend (`aria_middle`) follows the established event format (`type`, `etape`, `substep`, `message`, `metrics`, etc.).
- **Desktop Focus**: Assumes the primary use case is a desktop browser in a clinical setting; mobile-specific optimizations are out of scope.
- **Mock Mode**: Assumes a mock sequence exists for demonstration and testing purposes that simulates the full 7-stage pipeline.
