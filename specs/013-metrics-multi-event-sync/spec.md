# Feature Specification: Synchronized Multi-Event Metrics Display

**Feature Branch**: `013-metrics-multi-event-sync`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "Handle 1 or 2 metrics WebSocket events. Replacement of metrics state, null filtering, and conditional posterior visibility synced with global progress."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Real-time Multi-Stage Discovery (Priority: P1)

As a practitioner, I want to see the biomechanical metrics as they are progressively calculated (sagittal view results first, followed by posterior results if available), so that I can begin reviewing data immediately while the analysis continues.

**Why this priority**: High. This ensures the UI accurately reflects the backend's multi-pass processing logic and provides the most up-to-date data without manual refreshing.

**Independent Test**: Can be tested by receiving a first `metrics` event (sagittal) and verifying the UI updates, then receiving a second `metrics` event (full set) and verifying the UI replaces the old data with the new superset.

**Acceptance Scenarios**:

1. **Given** an analysis is in the extraction phase, **When** a `metrics` event with `vue_posterieure_disponible: false` is received, **Then** the UI displays the sagittal metrics and hides the posterior section.
2. **Given** sagittal metrics are already displayed, **When** a subsequent `metrics` event with `vue_posterieure_disponible: true` is received, **Then** the UI replaces the metrics state and reveals the posterior section with the newly available data.
3. **Given** any metrics event, **When** a metric field is `null`, **Then** that specific metric row is not displayed in the preview grid.

---

### User Story 2 - Integrated Progress Feedback (Priority: P1)

As a practitioner, I want the global progress bar and status message to update whenever metrics are received, so that the metrics calculation phase is seamlessly integrated into the overall pipeline tracking.

**Why this priority**: Critical for visual consistency. The `metrics` event serves a double purpose: delivering data and reporting progress.

**Independent Test**: Verify that the global progress bar (`pct`) and the status message update to the values provided in the `metrics` event payload.

**Acceptance Scenarios**:

1. **Given** a `metrics` event with `pct: 38` and `message: "Métriques sagittales calculées"`, **When** received, **Then** the progress bar moves to 38% and the status message is updated accordingly.

---

### Edge Cases

- **Out of Order Events**: What if the 2nd event arrives before the 1st? (Requirement: Since each event is a superset/replacement, the UI should always display the most recently received data, provided `pct` does not regress).
- **Missing Posterior Video**: If the user only provided one video, will the 2nd event ever arrive? (Assumption: No, the backend will send only one event with `vue_posterieure_disponible: false`, and the UI should stay in that state).
- **Redundant Fields**: How to handle internal flags? (Requirement: `vue_posterieure_disponible` is a control flag and MUST NOT be displayed as a metric row).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST process WebSocket messages of `type: "metrics"`.
- **FR-002**: System MUST replace the existing metrics state entirely with the incoming `metrics` object from the event payload.
- **FR-003**: System MUST update the global progress bar using the `pct` field and the status display using the `message` field from the metrics event.
- **FR-004**: System MUST filter out all metric fields with a `null` value from the UI display, except for the control flag `vue_posterieure_disponible`.
- **FR-005**: System MUST hide or disable the "Vue Postérieure" section if `vue_posterieure_disponible` is `false`.
- **FR-006**: System MUST show the "Vue Postérieure" section if `vue_posterieure_disponible` is `true`.
- **FR-007**: System MUST NOT display the `vue_posterieure_disponible` flag as a visible metric in the grid.

### Key Entities *(include if feature involves data)*

- **Metrics Event**: The WebSocket message container (`type`, `pct`, `message`, `metrics`).
- **Biomechanical Metrics**: The set of calculated values (cadence, angles, etc.) received in the payload.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Metrics UI reflects the latest WebSocket payload with less than 100ms latency.
- **SC-002**: No stale data from the 1st `metrics` event persists after the 2nd event is processed.
- **SC-003**: 100% of `null` fields are successfully hidden from the practitioner's view.

## Assumptions

- **Superset Logic**: Assumes that if a second `metrics` event is sent, it contains all the data from the first event plus new fields (it is a complete state replacement).
- **Progress Monotonicity**: Assumes the `pct` in the 2nd event will be greater than or equal to the `pct` in the 1st event.
- **Event Type Recognition**: Assumes the `websocket` store is already configured to route events based on the `type` field.
