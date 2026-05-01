# Feature Specification: Shoe Dropdown Refinement

**Feature Branch**: `005-shoe-dropdown-refinement`  
**Created**: Wednesday, April 29, 2026  
**Status**: Draft  
**Input**: User description: "dans l'ecran de saisie d'un patient Profil Chaussure, la marque doit être une liste deroulante, le modèle egalement, il doit s'adapter au disposion de la marque, de plus le modele est également filtré par le genre selectionné dans le blioc Profil Patient pour proposer les version homme ou femme"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Brand Selection from Dropdown (Priority: P1)

As a practitioner, I want to select a shoe brand from a predefined list so that I don't have to type it manually and avoid spelling errors.

**Why this priority**: Correct brand identification is the first step in narrowing down technical shoe data.

**Independent Test**: Click the Brand field, see a dropdown of all unique brands in the database, and select one.

**Acceptance Scenarios**:

1. **Given** a new patient session, **When** I click the "Marque" field, **Then** I should see a searchable dropdown list of available brands.
2. **Given** I select a brand, **Then** the "Modèle" field should be enabled and focused.

---

### User Story 2 - Model Selection with Multi-level Filtering (Priority: P1)

As a practitioner, I want the list of models to automatically update based on the selected brand and the patient's gender so that I can quickly find the exact shoe variant.

**Why this priority**: Critical for data accuracy. Models often differ technically between men and women (e.g., different weight/last).

**Independent Test**: Select "Asics" and a patient gender "Femme", then verify that the "Modèle" dropdown only shows Asics models designated for women (or mixed).

**Acceptance Scenarios**:

1. **Given** a brand is selected (e.g., Nike) and the patient is "Homme", **When** I open the "Modèle" dropdown, **Then** I should only see Nike models for men/unisex.
2. **Given** the patient gender is changed, **Then** the "Modèle" list should refresh to reflect the new gender context.

---

### User Story 3 - Dependent Reset (Priority: P2)

As a practitioner, I want the model selection to clear if I change the brand so that I don't accidentally save inconsistent data.

**Why this priority**: Prevents invalid data states (e.g., Brand: Asics, Model: Pegasus).

**Independent Test**: Select a brand and model, then change the brand and verify the model field is reset to empty.

**Acceptance Scenarios**:

1. **Given** a brand and model are already selected, **When** I select a different brand, **Then** the model selection MUST be cleared.

---

### Edge Cases

- **No gender selected**: If the patient's gender is not yet specified, the model dropdown should show all models for the selected brand (or show a prompt to select gender first).
- **Model not in list**: The user should still have the option to enter a custom model if it's missing from the database (e.g., "Autre / Saisie manuelle").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Marque" as a dropdown list containing all unique brands from the shoe database.
- **FR-002**: System MUST display "Modèle" as a dropdown list.
- **FR-003**: System MUST filter the "Modèle" list to only include entries matching the selected "Marque".
- **FR-004**: System MUST filter the "Modèle" list based on the gender selected in the "Profil Patient" card (mapped as: Homme -> 'homme', Femme -> 'femme').
- **FR-005**: If gender is not selected in the "Profil Patient" card, the system MUST disable the "Modèle" dropdown and display a tooltip or prompt indicating that gender selection is required.
- **FR-006**: Changing the "Marque" selection MUST reset the "Modèle" field to an empty state.
- **FR-007**: Autocomplete/Search within the dropdowns should be supported for quick navigation in large lists.

### Key Entities *(include if feature involves data)*

- **Shoe Database**: Source of truth for Brands and Models.
- **Patient Context**: Provides the 'Gender' filter.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Model list updates in under 100ms after brand or gender change.
- **SC-002**: 100% reduction in Brand/Model mismatches.
- **SC-003**: Average time to select a valid shoe configuration is reduced by 30% compared to free typing.

## Assumptions

- **Data Availability**: The shoe database loaded in memory (Feature 004) is correctly parsed and available.
- **UI Consistency**: The dropdowns will match the Tailwind-based design system of the current cards.
- **Gender Consistency**: "Mixte" shoes in the database are visible for both "Homme" and "Femme" patients.
