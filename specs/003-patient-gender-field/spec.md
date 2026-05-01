# Feature Specification: Patient Gender Field

**Feature Branch**: `003-patient-gender-field`  
**Created**: Wednesday, April 29, 2026  
**Status**: Draft  
**Input**: User description: "ajouter le sexe dans le bloc Profil Patient de la page saisie patient, faire un bouton radio Homme, Femme"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gender Selection in Patient Profile (Priority: P1)

As a practitioner, I want to record the patient's gender in the clinical profile so that the gait analysis can take biological sex into account for reference data.

**Why this priority**: Biological sex is a fundamental parameter in clinical analysis and gait reference benchmarks. It is essential for a complete patient profile.

**Independent Test**: Can be fully tested by selecting a gender option in the "Profil Patient" card during session setup and verifying it is correctly captured in the session state.

**Acceptance Scenarios**:

1. **Given** the patient session setup page is open, **When** I look at the "Profil Patient" card, **Then** I should see a "Sexe" field with "Homme" and "Femme" radio buttons.
2. **Given** I am setting up a session, **When** I select "Homme", **Then** the "Femme" option should be deselected (and vice-versa).
3. **Given** I have selected a gender, **When** I proceed with the session, **Then** the selected gender should be saved as part of the patient's profile.

---

### User Story 2 - Pre-filled Gender from Existing Profile (Priority: P2)

As a practitioner, I want the gender to be pre-filled if it was already recorded in the patient's folder to save time during session setup.

**Why this priority**: Improves efficiency for returning patients and ensures data consistency across sessions.

**Independent Test**: Select a patient who already has a gender defined in their profile and verify the corresponding radio button is selected upon loading the session setup page.

**Acceptance Scenarios**:

1. **Given** a patient with "Femme" recorded in their profile is selected, **When** I enter the session setup page, **Then** the "Femme" radio button should be selected by default.

---

### Edge Cases

- **No selection**: What happens if the practitioner doesn't select any gender? (Assumption: The field is mandatory for clinical accuracy).
- **Update selection**: How does the system handle a change in gender selection before starting the analysis? (Expected: UI updates immediately and state reflects the latest choice).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a "Sexe" field within the "Profil Patient" block on the session setup page.
- **FR-002**: System MUST provide exactly two options for gender: "Homme" and "Femme".
- **FR-003**: System MUST use radio buttons for gender selection to ensure mutual exclusivity.
- **FR-004**: System MUST persist the selected gender in the patient profile/session state.
- **FR-005**: System MUST pre-select the gender if it is already available in the patient's data.

### Key Entities *(include if feature involves data)*

- **Patient Profile**: Contains clinical data including age, height, weight, and now gender.
- **Session**: Captures all parameters including the patient profile for a specific gait analysis session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Practitioners can select the patient's gender in less than 2 seconds.
- **SC-002**: 100% of gender selections are correctly persisted in the session data.
- **SC-003**: The UI layout remains consistent and visually aligned with other fields in the "Profil Patient" card.

## Assumptions

- **Mandatory Field**: Gender is assumed to be a required field for the gait analysis models.
- **Binary Choice**: Following the specific request, only "Homme" and "Femme" options are provided for this clinical context.
- **Styling**: The radio buttons will follow the project's existing UI design system (Material Symbols and Tailwind colors).
