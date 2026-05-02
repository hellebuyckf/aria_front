# Data Model: Multi-Event Metrics

## WebSocket Payload Schema (Type: "metrics")

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | Yes | MUST be `"metrics"`. |
| `etape` | String | Yes | e.g., `"video"`. |
| `pct` | Number | Yes | Current overall progress (0-100). |
| `message` | String | Yes | Status message for the log. |
| `metrics` | Object | Yes | The complete map of metric values. |

## Metrics Object Detail

| Key | Type | Description |
|-----|------|-------------|
| `cadence` | Number | foulées/min |
| `angle_attaque_pied` | Number | ° |
| `flexion_genou_impact` | Number | ° |
| `inclinaison_tronc` | Number | ° |
| `oscillation_verticale` | Number | cm |
| `ratio_contact_suspension` | Number | 0.0 - 1.0 |
| `vue_posterieure_disponible` | Boolean | **Control Flag** (Internal). |
| `pelvic_drop` | Number | ° (nullable if 1st event) |
| `valgus_genou` | Number | ° (nullable if 1st event) |
| `asymetrie_charge` | Number | % (nullable if 1st event) |
| `oscillation_laterale_hanche` | Number | cm (nullable if 1st event) |
| `pronation_pied` | Number | ° (nullable if 1st event) |

## State Transition Rules

1. Receive Event E1 (`vue_posterieure_disponible: false`) -> Replace `store.metrics` -> Display sagittal metrics.
2. Receive Event E2 (`vue_posterieure_disponible: true`) -> Replace `store.metrics` -> Display full grid including posterior.
3. If `store.metrics[key] === null` -> Skip rendering for that specific row.
