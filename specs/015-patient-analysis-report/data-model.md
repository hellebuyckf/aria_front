# Data Model: Patient Analysis Report

## Entity: `ARIAReport`

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | String | Unique session identifier. |
| `patient_id` | String | Patient identifier. |
| `date` | String (ISO) | Session date. |
| `pathologie` | String | Detected or declared pathology. |
| `confiance` | Enum | 'élevée' \| 'modérée' \| 'faible' |
| `chaussure` | Object | `{ marque, modele, drop_mm }` |
| `profil` | Object | `{ age, poids_kg, taille_cm, km_semaine, niveau }` |
| `metriques` | Array | List of `MetriqueRapport` objects. |
| `anomalies` | Array | List of `Anomalie` objects. |
| `alerte_equipement`| Object \| null| Conditional equipment warning. |
| `protocole` | Object | `{ intro, phases[] }` |
| `sources` | Array | List of bibliography references. |
| `meta` | Object | `{ confiance_keypoints, nb_cycles, modele }` |

## Sub-Entity: `MetriqueRapport`

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique metric key (e.g., 'cadence'). |
| `label` | String | Display name. |
| `norme` | String | Reference range (e.g., "170 - 185 spm"). |
| `valeur`| String \| null | Patient measurement (e.g., "158 spm"). |
| `statut`| Enum \| null | 'anormal' \| 'limite' \| 'normal' |

## Validation Rules
- **Formatting**: Dates must be parsed and localized to French (e.g., "22 avril 2026").
- **Safety**: High drops (>8mm) must trigger orange styling in the UI header.
