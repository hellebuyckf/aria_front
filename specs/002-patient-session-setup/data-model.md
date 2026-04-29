# Data Model: Patient Session Setup

## Entities

### SessionContext
- **sessionId**: `string | null` (Format: `SES-timestamp`)
- **patientId**: `string` (FK to Patient.id)
- **timestamp**: `ISO8601String` (Session initiation time)
- **status**: `idle | analysis | report`
- **profil**: `ProfilPatient` (Nested object)
- **pathologie**: `Pathologie` (Nested object)
- **videos**: `VideoFiles` (Nested object)
- **chaussure**: `ProfilChaussure` (Nested object)
- **entrainement**: `TrainingConnect` (Nested object)

### ProfilPatient (Value Object)
- **age**: `string` (Integer positive)
- **taille**: `string` (cm)
- **poids**: `string` (kg)
- **kmSemaine**: `string`
- **niveauPratique**: `debutant | intermediaire | avance | competiteur`

### Pathologie (Value Object)
- **type**: `string` (One of 6 MVP pathologies)
- **cote**: `bilateral | gauche | droit`
- **severite**: `legere | moderee | severe`

### VideoFiles (Value Object)
- **sagittale**: `File | null` (Mandatory for launch)
- **posterieure**: `File | null` (Optional)

### ProfilChaussure (Value Object)
- **marque**: `string`
- **modele**: `string`
- **drop**: `number`
- **stabilite**: `string`
- **amorti**: `string`
- **poidsType**: `string`
- **dynamisme**: `string`

### TrainingConnect (Value Object)
- **stravaConnecte**: `boolean`
- **garminConnecte**: `boolean`

## Validation Rules
- **Age/Taille/Poids/Km**: Must be positive integers.
- **Video Sagittale**: Must be present and < 2GB.
- **Pathology**: Must be one of the pre-defined list items.
