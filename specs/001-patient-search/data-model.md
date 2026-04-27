# Data Model: Patient Search

## Entities

### Patient
- **id**: `string` (UUID or specific format like "PAT-YYYY-NNN")
- **lastName**: `string` (Always stored in UPPERCASE)
- **firstName**: `string`
- **lastSession**: `ISO8601String | null`
- **nir**: `string` (15 digits, raw storage, formatted for display)

### Session (Reference)
- **id**: `string`
- **patientId**: `string` (FK to Patient.id)
- **status**: `string`

## Relationships
- A **Patient** can have multiple **Sessions**.
- A **Session** belongs to exactly one **Patient**.
