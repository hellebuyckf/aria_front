# Data Model: Progressive Metrics

## Metric Configuration (Order & Metadata)

| Key | Label | Unit | Norm |
|-----|-------|------|------|
| `cadence` | Cadence | foulées/min | 170–180 |
| `angle_attaque_pied` | Attaque pied | ° | < 5° avant-pied |
| `flexion_genou_impact` | Flexion genou impact | ° | 15–25° |
| `inclinaison_tronc` | Inclinaison tronc | ° | 5–10° |
| `oscillation_verticale` | Oscillation verticale | cm | < 8 cm |
| `ratio_contact_suspension` | Contact / suspension | | 0.35–0.65 |
| `pelvic_drop` | Pelvic drop | ° | < 5° |
| `valgus_genou` | Valgus genou | ° | < 8° |
| `asymetrie_charge` | Asymétrie charge | % | < 10% |
| `oscillation_laterale_hanche` | Oscillation latérale | cm | < 3 cm |
| `pronation_pied` | Pronation | ° | < 8° |

## Progressive State
- **Trigger**: `useWebSocketStore.lastEvent` where `type === 'metrics'`.
- **Filtering**: `METRICS_ORDER.filter(m => payload.metrics[m.key] !== null)`.
- **Timer**: 120ms per revealed item.
