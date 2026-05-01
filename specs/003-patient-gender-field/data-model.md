# Data Model: Patient Gender Field

## Patient Profile (Updated)

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `age` | String/Number | Patient age in years | Must be >= 0 |
| `taille` | String/Number | Patient height in cm | Must be >= 0 |
| `poids` | String/Number | Patient weight in kg | Must be >= 0 |
| `sexe` | String | Patient biological gender | `Homme` \| `Femme` |
| `kmSemaine` | String/Number | Average km run per week | Must be >= 0 |
| `niveauPratique` | String | Experience level | `debutant` \| `intermediaire` \| `avance` \| `competiteur` |

## State Transitions

### Initializing Session
When a patient is selected and the session is initialized:
1. `useSessionStore.initialiser(patient)` is called.
2. The `sexe` field from the patient record is copied to `sessionStore.profil.sexe`.

### Updating Profile
When the practitioner interacts with the UI:
1. `ProfilPatientCard.vue` emits `update:modelValue`.
2. `useSessionStore.profil` is updated with the new `sexe` value.
