# Quickstart: Patient Gender Field

## Implementation Steps

### 1. Update Patient Store (Mock Data)
Modify `src/stores/patients.js` to add `sexe: 'Homme'` or `sexe: 'Femme'` to the `profil` object of mock patients.

### 2. Update Session Store
- Add `sexe: ''` to the initial state of the `profil` ref in `src/stores/session.js`.
- Ensure the `initialiser` function correctly handles the `sexe` field (this should be automatic if spreading `patient.profil`).

### 3. Update ProfilPatientCard Component
- Add the "Sexe" selection UI above the "Niveau de pratique" section.
- Use a row of two buttons (Homme / Femme) that look like the "Niveau de pratique" buttons.
- Bind the buttons to `modelValue.sexe` and emit `update:modelValue` on click.

## Verification

1. Select a patient (e.g., Jean DUPONT).
2. Go to the Saisie page.
3. Verify that the gender is correctly pre-selected in the "Profil Patient" card.
4. Change the selection and verify (via Vue Devtools or console) that the session store state is updated.
