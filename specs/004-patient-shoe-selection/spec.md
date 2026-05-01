# Feature Specification: Patient Shoe Selection

**Feature Branch**: `004-patient-shoe-selection`  
**Created**: Wednesday, April 29, 2026  
**Status**: Draft  
**Input**: User description: "dans data/chaussure_all.jsonl tu as la base des données chaussure fait le lien avec Profil Chaussure de l'ecran Saisie patient, on peut mettre directement le modéle en saisissant les premiere lettre et/ou on peut directement choisir la marque pour filtrer les modéles, les autres champs sont rempli par les données de la chaussure récupérer"

## Clarifications

### Session 2026-04-29
- Q: How should the shoe database be handled for performance? → A: Pre-load into memory at session start.
- Q: What if a shoe is missing from the database? → A: Allow manual entry in all fields (Brand, Model, Drop, etc.).
- Q: Is there a way to reset the shoe selection? → A: Add a "Vider" (Clear) button to reset the entire shoe block.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Search and Select Shoe by Model (Priority: P1)

As a practitioner, I want to quickly find and select a patient's shoe model by typing its name so that I don't have to manually enter technical specifications.

**Why this priority**: Speed of data entry is critical for the clinical workflow. Automating technical field entry reduces errors and saves time.

**Independent Test**: Type "Nimbus" in the model field, select "Gel-Nimbus 25" from the suggestions, and verify that fields like Drop, Stabilité, and Amorti are automatically filled.

**Acceptance Scenarios**:

1. **Given** the "Profil Chaussure" block is visible, **When** I type the first letters of a model name, **Then** I should see a list of matching shoe models.
2. **Given** a list of suggestions is displayed, **When** I select a model, **Then** the "Marque", "Drop", "Stabilité", "Amorti", "Poids", and "Dynamisme" fields should be populated with data from the database.

---

### User Story 2 - Manual Entry and Override (Priority: P2)

As a practitioner, I want to manually enter or correct shoe details so that I can accommodate shoes not present in the database or correct data errors.

**Why this priority**: Ensures the system is usable even when the database is incomplete or contains errors.

**Independent Test**: Type a brand and model not in the database, manually fill all technical fields, and verify they are saved in the session.

**Acceptance Scenarios**:

1. **Given** a shoe model is not in the database, **When** I type into the "Marque" or "Modèle" fields, **Then** I should be able to continue typing and manually fill the other fields.
2. **Given** fields are auto-populated, **When** I click on an auto-filled field, **Then** I should be able to edit its value manually.

---

### User Story 3 - Reset Shoe Selection (Priority: P3)

As a practitioner, I want to clear all shoe data with a single click so that I can easily correct a mistake or start a new selection.

**Why this priority**: Improves UX by allowing quick recovery from incorrect selections.

**Independent Test**: Select a shoe, click the "Vider" button, and verify all shoe fields are cleared and the search is reset.

**Acceptance Scenarios**:

1. **Given** shoe data is filled (manually or via search), **When** I click the "Vider" button, **Then** all fields in the "Profil Chaussure" block should be reset to empty.

---

### Edge Cases

- **Model not in database**: Handled by User Story 2 (Manual Entry).
- **Data mismatch**: Handled by User Story 2 (Override).
- **Filtering by Gender**: The database contains a `sexe` field; the search should ideally be filtered by the patient's gender if already specified.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST pre-load the shoe database (`data/chaussure_all.jsonl`) into memory at application/session start for performance.
- **FR-002**: System MUST provide an autocomplete/search input for the shoe model name.
- **FR-003**: System MUST allow selecting a brand to filter the model search.
- **FR-004**: System MUST auto-populate "Drop", "Stabilité", "Amorti", "Poids", and "Dynamisme" fields when a model is selected.
- **FR-005**: System MUST allow manual entry and override of all fields if a shoe is missing from the database or data is incorrect.
- **FR-006**: System MUST provide a "Vider" (Clear) button to reset all shoe-related fields in the store and UI.
- **FR-007**: System SHOULD filter results based on the patient's gender if defined in the "Profil Patient" block.

### Key Entities *(include if feature involves data)*

- **Shoe Reference**: An entry from the database with attributes: Brand, Name, Drop, Stability, Cushioning, Weight, Dynamism, Gender.
- **Patient Shoe Profile**: The specific shoe configuration for the current patient session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Practitioners can find and select a shoe model in under 5 seconds.
- **SC-002**: 100% of data points from the selected database entry are correctly transferred to the UI fields.
- **SC-003**: The autocomplete list responds in under 200ms for each keystroke.

## Assumptions

- **Local Data**: The shoe database is stored locally in the `data/` directory.
- **Data Completeness**: It is assumed that the majority of shoes used by patients are present in the `jsonl` file.
- **UI Persistence**: Manual overrides are saved only for the current session and do not update the reference database.
