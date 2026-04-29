# Contracts: Patient Session Setup

## Pinia Store: `useSessionStore`

### State
- `sessionId`: `string | null`
- `patientId`: `string | null`
- `horodatage`: `string | null`
- `statut`: `idle | analysis | report`
- `profil`: `ProfilPatient`
- `pathologie`: `Pathologie`
- `videos`: `VideoFiles`
- `chaussure`: `ProfilChaussure`
- `entrainement`: `TrainingConnect`

### Getters
- `formulaireValide`: `boolean` (Returns true if `videos.sagittale !== null`)
- `badgeSidebar`: `string` (Formatted as `ID · PathologyLabel`)

### Actions
- `initialiser(patient: Patient): void`
- `connecterStrava(): void`
- `connecterGarmin(): void`
- `lancerAnalyse(): void` (Generates `sessionId`, updates `statut`)
- `reset(): void`

## Component Contracts

### `SessionSetupView.vue`
- **Route**: `/session/:patientId/setup`
- **Orchestrates**: Layout + 5 data entry cards.
- **Guard**: Redirect to `/patients` if `usePatientsStore.activePatient` is null.

### `VideoDepotCard.vue`
- **Props**: `sagittale: File | null`, `posterieure: File | null`
- **Events**: 
  - `update:sagittale(file: File | null)`
  - `update:posterieure(file: File | null)`

### `PathologieCard.vue`
- **Props**: `modelValue: Pathologie`
- **Events**: `update:modelValue`
