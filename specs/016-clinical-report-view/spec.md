# Feature Specification: Clinical Report View

**Feature Branch**: `016-clinical-report-view`  
**Created**: Saturday, May 2, 2026  
**Status**: Draft  
**Input**: User description: "Implement ReportView.vue to display clinical results, handle 409 status for ongoing analysis, show various data sections with specific styling (confidence badges, metrics with icons, lists), and provide a PDF download button."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review Clinical Analysis Results (Priority: P1)

As a practitioner, I want to review the detailed clinical report for a patient's session so that I can validate the AI's diagnostic reasoning and see specific recommendations.

**Why this priority**: Core value of the application; the report is the final output of the biomechanical analysis.

**Independent Test**: Can be fully tested by navigating to the report route for a completed session and verifying all sections (Pathology, Justification, Metrics, Recommendations, References, Warning) are rendered with correct data and styling.

**Acceptance Scenarios**:

1. **Given** a session with a completed analysis, **When** I navigate to the report page, **Then** I see a loading spinner, and then the full report content appears.
2. **Given** a session where the analysis is still in progress, **When** I navigate to the report page, **Then** the system shows a message "Analyse encore en cours".
3. **Given** a confidence level of "élevée", **When** viewed in the header, **Then** the confidence badge is red.

---

### User Story 2 - Export Report to PDF (Priority: P2)

As a practitioner, I want to download a PDF version of the clinical report so that I can save it in the patient's physical file or share it externally.

**Why this priority**: Necessary for documentation and clinical workflow integration.

**Independent Test**: Click the "Télécharger le PDF" button and verify a new tab opens with the PDF content.

**Acceptance Scenarios**:

1. **Given** a rendered report, **When** I click "Télécharger le PDF", **Then** the browser opens the PDF generation URL in a new tab.

---

### Edge Cases

- **Analysis timeout/Backend error**: If the POST request fails with a 500 error, a descriptive error message is shown to the user.
- **Empty Metrics**: If `metriques_anormales` is an empty list, the "Métriques anormales" section header is not displayed.
- **Unauthorized Access**: If the user is not authenticated, they should be redirected to the login page (handled by global guards, but worth noting).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch report data via `POST /api/sessions/{session_id}/generate` upon component mount.
- **FR-002**: System MUST display a centered loading spinner while the report is being fetched.
- **FR-003**: System MUST handle HTTP 409 status by displaying "Analyse encore en cours".
- **FR-004**: System MUST render a header with the pathology title and a color-coded confidence badge:
    - Élevée: Red
    - Modérée: Orange
    - Faible: Green
- **FR-005**: System MUST render the diagnostic justification as a text paragraph.
- **FR-006**: System MUST list abnormal metrics with a ⚠️ icon.
- **FR-007**: System MUST display recommendations as a numbered list.
- **FR-008**: System MUST display PubMed references as a list in small gray text.
- **FR-009**: System MUST display a disclaimer warning at the bottom on a light gray background with small text.
- **FR-010**: System MUST provide a "Télécharger le PDF" button that opens `GET /api/sessions/{session_id}/report` in a new browser tab.

### Key Entities *(include if feature involves data)*

- **Clinical Report**: The data model returned by the backend containing the analysis results, diagnostic confidence, metrics, recommendations, and legal warnings.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Report data is successfully rendered on screen within 2 seconds of the API call completion.
- **SC-002**: The PDF download button correctly directs the user to the PDF endpoint 100% of the time.
- **SC-003**: "Analysis in progress" state is shown immediately when a 409 status is received.

## Assumptions

- **Session ID**: Assumes the `session_id` is always available in the route parameters.
- **Backend Availability**: Assumes the `generate` endpoint handles the internal report finalization if it hasn't been done yet.
- **Authentication**: Assumes the user is already authenticated (route meta `requiresAuth`).
