# Feature Specification: Patient Analysis Report

**Feature Branch**: `015-patient-analysis-report`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: Detailed specification for the interactive web-based clinical report view (ReportView).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clinical Summary Review (Priority: P1)

As a practitioner, I want to see a clear summary of the patient's identity and clinical context at the top of the report, so that I can quickly verify I am reviewing the correct data before starting the consultation.

**Why this priority**: Foundational safety and validation step. Essential for patient safety (correct patient match).

**Independent Test**: Navigate to the report view and verify that the 5-column header (Patient, Pathology, Session, Shoe, Profile) correctly displays the data from the session, with the shoe drop highlighted in orange if > 8mm.

**Acceptance Scenarios**:

1. **Given** a session for PAT-2026-042, **When** I open the report, **Then** I see the patient ID, date, shoe information, and profile data in a structured `bg-surface-container` table.
2. **Given** a shoe with 12mm drop, **When** viewed in the header, **Then** the drop value is displayed in orange text.

---

### User Story 2 - Real-time Biomechanical Metrics Analysis (Priority: P1)

As a practitioner, I want to compare the patient's biomechanical metrics against pathological norms with clear color-coded statuses, so that I can immediately identify risk factors.

**Why this priority**: Core clinical value of the ARIA system. This is the primary data used for diagnosis.

**Independent Test**: Verify that the biomechanical metrics table correctly maps statuses (Anormal, Limite, Normal) to the specified background and text colors and handles `null` values as `—`.

**Acceptance Scenarios**:

1. **Given** a metric with "anormal" status, **When** displayed in the table, **Then** it shows red text on a light red background.
2. **Given** a metric value is missing (`null`), **When** displayed, **Then** it shows a gray em-dash (`—`).

---

### User Story 3 - Anomaly Correlation & RAG Insights (Priority: P1)

As a practitioner, I want to see identified anomalies with their clinical correlations and PubMed references, so that I can understand the AI's reasoning and verify it against scientific literature.

**Why this priority**: Ensures transparency and "explainability" of the AI's diagnostic reasoning, which is critical for clinical trust.

**Independent Test**: Verify that anomaly blocks have the correct red left border and that PubMed reference indices clink to the sources section.

**Acceptance Scenarios**:

1. **Given** a list of anomalies, **When** rendered, **Then** each block has a 4px red left border and citations are styled as blue clickable anchors.

---

### User Story 4 - Customized Rehabilitation Protocol (Priority: P2)

As a practitioner, I want to see a structured 3-phase rehabilitation protocol tailored to the patient's metrics, so that I can provide them with a clear recovery plan.

**Why this priority**: High value for the patient's recovery, but secondary to the primary diagnostic results.

**Independent Test**: Verify the 3 phases (weeks 1-3, 4-7, 8-12) are displayed in distinct cards with dark blue headers.

**Acceptance Scenarios**:

1. **Given** a generated report, **When** viewing the protocol, **Then** 3 distinct phase cards are visible, each containing a list of bulleted exercises.

---

### User Story 5 - Report Portability & Continuation (Priority: P2)

As a practitioner, I want to download the official PDF report and have the option to start a new session, so that I can finalize the patient's visit and move to the next task.

**Why this priority**: Necessary for documentation and clinical workflow efficiency.

**Independent Test**: Verify the PDF download button triggers an API request and that the "New Session" button redirects to the patient search.

**Acceptance Scenarios**:

1. **Given** a finished report, **When** I click "Télécharger le PDF", **Then** the browser initiates a file download with the correct naming convention.

---

### Edge Cases

- **What happens when the report is not found (404)?** The system displays a user-friendly message stating that the report is not yet available and might still be processing.
- **How does the system handle an empty anomalies list?** The section header is still shown, but the area displays a "No anomalies detected" placeholder.
- **Equipment Alert Visibility**: The equipment alert block MUST be hidden if the payload's `alerte_equipement` field is null.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch and display the `ARIAReport` JSON from `GET /api/sessions/{sessionId}/report`.
- **FR-002**: System MUST render a 5-section layout mirroring the official 2-page PDF hierarchy.
- **FR-003**: System MUST color-code metric statuses: Anormal (Red/Pink), Limite (Orange/Peach), Normal (Green/Light Green).
- **FR-004**: System MUST apply orange highlighting to the shoe drop in the header if it exceeds 8mm.
- **FR-005**: System MUST provide clickable inline citations in the anomalies section that anchor to the `id="sources"` section.
- **FR-006**: System MUST hide the "Vue postérieure" sections if `vue_posterieure_disponible` is false or metrics are null.
- **FR-007**: System MUST support a print-friendly CSS mode (`@media print`) that hides the navigation sidebar and action buttons.
- **FR-008**: System MUST display a legal disclaimer and technical footer with keypoint confidence metrics.

### Key Entities *(include if feature involves data)*

- **ARIA Report**: The primary data object containing patient metadata, metrics, anomalies, and rehabilitation protocol.
- **Biomechanical Metric**: A specific measurement (e.g., Cadence) with an associated status and norm.
- **Clinical Anomaly**: An identified deviation from normal gait with associated bibliographic references.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Report page loads with full data in under 500ms after the completion event.
- **SC-002**: 100% visual fidelity between the web report and the 2-page reference PDF structure.
- **SC-003**: 100% accuracy in status badge color mapping as per acceptance criteria.
- **SC-004**: PDF download button successfully initiates a download in all tested browsers.

## Assumptions

- **Stable Report Data**: Assumes `aria_middle` has finished writing the report to the database before the user arrives on this screen.
- **Centralized API**: Assumes the report PDF generation service is available at the specified endpoint.
- **Standard Screens**: Assumes a minimum screen width of 1280px for the full report layout; smaller screens will use a single-column stack.
- **Mock Data**: Uses the specific case of PAT-2026-042 for all mock and demonstration scenarios.
