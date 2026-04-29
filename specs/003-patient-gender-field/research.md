# Research: Patient Gender Field

## Decision: Data Model and State Management

- **Decision**: Add `sexe` field to the `profil` object in `useSessionStore`.
- **Rationale**: The `profil` object in `useSessionStore` already manages patient-specific clinical parameters (age, height, weight). Adding `sexe` here ensures consistency with existing patterns and allows easy pre-filling from the patient store.
- **Alternatives considered**: Storing it at the root of the session store. Rejected because it's a patient attribute, not a session metadata like `horodatage`.

## Decision: UI Component Implementation

- **Decision**: Implement the gender selection using custom radio button buttons in `ProfilPatientCard.vue`, matching the style of the "Niveau de pratique" buttons.
- **Rationale**: The user specifically requested radio buttons. Using the same design pattern as "Niveau de pratique" (horizontal buttons that act as radios) maintains visual consistency and provides a better touch/click target than standard browser radio inputs.
- **Alternatives considered**: Standard `<input type="radio">`. Rejected as it would clash with the custom aesthetic of the current UI.

## Decision: Pre-filling Logic

- **Decision**: Update `usePatientsStore` mock data to include `sexe` for existing patients and update `initialiser` in `useSessionStore` to map this field.
- **Rationale**: Required to fulfill User Story 2 (pre-filled gender).
- **Alternatives considered**: None.
