# Feature Specification: Analysis View UX Refinement

**Feature Branch**: `009-analysis-view-ux-refinement`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "Refine Analysis View: ensure 'Voir le rapport' button is available at completion, remove automatic redirection, and set log text color to white."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manual Report Navigation (Priority: P1)

As a practitioner, I want to manually choose when to view the analysis report after completion, so that I can review the logs and metrics at my own pace before leaving the analysis screen.

**Why this priority**: Essential for clinical review. Auto-redirection was frustrating for users who wanted to see the final logs.

**Independent Test**: Complete an analysis (real or mock) and verify that the "Voir le rapport" button appears and remains visible without the system automatically switching pages.

**Acceptance Scenarios**:

1. **Given** an analysis is finished, **When** the `completed` event is received, **Then** the "Voir le rapport" button becomes visible and the user stays on the current page.
2. **Given** the analysis is finished, **When** I click "Voir le rapport", **Then** I am navigated to the report screen.

---

### User Story 2 - High Visibility Logs (Priority: P2)

As a practitioner, I want the system logs to be highly legible against the dark background, so that I can easily monitor technical details during processing.

**Why this priority**: Improves accessibility and visual comfort in clinical environments.

**Independent Test**: Open the analysis view and verify that incoming log messages are displayed in white text instead of gray.

**Acceptance Scenarios**:

1. **Given** the real-time log panel, **When** messages are displayed, **Then** the primary message text uses a white color token.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a "Voir le rapport" button immediately upon receiving the `type: "completed"` WebSocket event.
- **FR-002**: The system MUST NOT automatically redirect the user to the report page after analysis completion.
- **FR-003**: The Real-Time Log panel MUST display message content in white text to ensure high contrast against the dark background.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of completed analyses result in the "Voir le rapport" button appearing without auto-redirection.
- **SC-002**: Text contrast in the log panel meets or exceeds accessibility standards for dark mode.

## Assumptions

- **Existing Components**: Assumes `AnalysisView.vue`, `RealTimeLog.vue`, and `LogLine.vue` are the targets for these refinements.
- **State Management**: Assumes the `websocket` store correctly emits the `completed` event.
