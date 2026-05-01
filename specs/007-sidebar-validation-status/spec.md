# Feature Specification: Sidebar Validation Status

**Feature Branch**: `007-sidebar-validation-status`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "lorsque l'utilisteur est sur la page d'analyse biomecanique, dans le bandeau gauche saisie patient doit être validé et avec un signe check vert comme sur l'image"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Completed Step Visual Feedback (Priority: P1)

As a practitioner, I want to see a clear visual indication that the previous step ("Saisie Patient") is completed and validated when I am on the analysis page, so that I have confidence in the workflow progress.

**Why this priority**: Essential for the "sequential workflow" principle of the ARIA constitution, ensuring the user understands which steps are finalized.

**Independent Test**: Can be tested by navigating to the Analysis page and verifying that the "Saisie" item in the sidebar displays a green checkmark and a "Validé" status.

**Acceptance Scenarios**:

1. **Given** I am on the "Analyse Biomécanique" page, **When** I look at the sidebar, **Then** the "Saisie" step displays a green check icon and the label "Validé".
2. **Given** I am on the "Saisie" page, **When** I look at the sidebar, **Then** the "Saisie" step does NOT show the validated status (it shows the "Active" status).

---

### Edge Cases

- **What happens if the analysis fails?** The "Saisie" step should remain validated as the input data itself is still valid; only the analysis phase is in error.
- **What if I navigate back to "Saisie"?** The "Saisie" step should revert to its active state (without the checkmark) to allow editing, but the logic should handle the "Validated" state when moving forward again.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST update the sidebar UI state based on the current active route.
- **FR-002**: The "Saisie" step in the sidebar MUST display a green check icon (Material Symbols: `check`) when the user is on the "Analysis" view.
- **FR-003**: The "Saisie" step MUST display the sub-label "Validé" in green when the user is on the "Analysis" view.
- **FR-004**: The sidebar component MUST accept a state or prop that indicates which steps are "Done".

### Key Entities *(include if feature involves data)*

- **Navigation Step**: Represents a phase in the clinical workflow (Saisie, Analyse, Rapport, Recommandations).
- **Step Status**: Current state of a navigation step (`waiting`, `active`, `done`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of users on the Analysis page see the "Saisie" step as validated.
- **SC-002**: Visual consistency with the provided reference image (Green #4ade80 or theme equivalent).

## Assumptions

- **Component Availability**: Assumes `AppSideNav.vue` is the component responsible for rendering the sidebar.
- **Router Integration**: Assumes the sidebar determines the current step via the `activeStep` prop or by inspecting the current route.
- **Material Symbols**: Assumes Material Symbols Outlined is available for the check icon.
