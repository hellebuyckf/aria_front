# Data Model: Clinical Report

## API Response: `POST /api/sessions/{session_id}/generate`

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | String | Unique identifier. |
| `statut` | String | Current session status (e.g., 'rapport'). |
| `rapport_url` | String | Endpoint for PDF download. |
| `report` | Object | The detailed clinical data. |

## Report Entity Details

| Field | Type | Description |
|-------|------|-------------|
| `pathologie` | String | Main diagnostic finding. |
| `confiance` | Enum | 'élevée', 'modérée', 'faible'. |
| `justification_diagnostic` | String | AI-generated reasoning text. |
| `metriques_anormales` | String[] | List of problematic metrics with values. |
| `recommandations` | String[] | Ordered list of clinical advice. |
| `references_pubmed` | String[] | Scientific paper citations. |
| `avertissement` | String | Legal disclaimer text. |
| `date_generation` | String (ISO) | Timestamp of report creation. |
