# Feature Specification: Multipart Session Upload

**Feature Branch**: `008-fix-session-multipart`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: Fix POST /api/sessions to use multipart/form-data with specific mandatory and optional fields including video files.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reliable Session Creation with Video (Priority: P1)

As a practitioner, I want to upload a patient's session data and clinical video so that ARIA can begin the biomechanical analysis.

**Why this priority**: This is the core functionality required to start any analysis. Without a successful upload, the system is unusable.

**Independent Test**: Can be fully tested by submitting a new session with at least a patient ID and a sagittal video file, and verifying that the backend returns a successful session ID.

**Acceptance Scenarios**:

1. **Given** a valid patient ID and a sagittal video file, **When** I submit the session, **Then** the request is sent as `multipart/form-data` and a session ID is received.
2. **Given** a missing patient ID or missing sagittal video, **When** I attempt to submit, **Then** the system prevents the submission and shows a validation error.

---

### User Story 2 - Comprehensive Clinical Context (Priority: P2)

As a practitioner, I want to include additional clinical details (age, weight, pathology, etc.) during the session upload so that the analysis report is more accurate and personalized.

**Why this priority**: Improves the quality of the generated report but is secondary to the successful initiation of the analysis itself.

**Independent Test**: Can be tested by submitting a session with all optional fields filled and verifying that the data is correctly received by the backend (demonstrated by the data appearing in the subsequent analysis/report views).

**Acceptance Scenarios**:

1. **Given** clinical data (age, height, weight, etc.) is provided, **When** I submit the session, **Then** these fields are included in the multipart form data as individual fields.
2. **Given** a shoe profile is provided, **When** I submit the session, **Then** the shoe profile is sent as a JSON string within the `profil_chaussure` form field.

---

### Edge Cases

- **Large Video Files**: How does the system handle an upload of a 500MB+ video file? (Assumption: UI should show an upload progress indicator or handle timeout gracefully).
- **Invalid File Type**: What if a PDF is selected instead of an MP4 for `video_sagittale`? (System MUST validate file extension/mime-type before submission).
- **Network Interruption**: How does the system handle a disconnect during the multipart upload? (System SHOULD allow for a retry without losing the clinical data already entered).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST send the `POST /api/sessions` request using the `multipart/form-data` content type.
- **FR-002**: System MUST include `patient_id` as a mandatory string field.
- **FR-003**: System MUST include `video_sagittale` as a mandatory file field (MP4).
- **FR-004**: System MUST support optional fields: `pathologie_declaree` (string), `age` (integer), `taille_cm` (integer), `poids_kg` (float), `km_semaine` (integer), `niveau_pratique` (string).
- **FR-005**: System MUST include the optional `video_posterieure` as a file field (MP4).
- **FR-006**: System MUST send the `profil_chaussure` as a JSON-encoded string within a form field if provided.
- **FR-007**: System MUST NOT set the `Content-Type` header manually for the multipart request (letting the browser/fetch API set it with the correct boundary).

### Key Entities *(include if feature involves data)*

- **Session Data**: The collection of clinical information and media files that define a new biomechanical analysis.
- **Shoe Profile**: A structured object containing `marque` and `drop_mm`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of sessions submitted with mandatory fields result in a successful 200/201 response from the backend.
- **SC-002**: Zero "422 Unprocessable Entity" errors related to missing boundaries or incorrect field names.
- **SC-003**: Upload completion time for a standard 10MB video is under 5 seconds on a standard clinical broadband connection.

## Assumptions

- **Video Format**: Assumes the browser environment provides standard `File` objects for the videos via `<input type="file">`.
- **Backend Readiness**: Assumes the backend is already configured to accept these specific field names and the multipart format.
- **Single Request**: Assumes all session data (files + metadata) are sent in a single atomic POST request.
