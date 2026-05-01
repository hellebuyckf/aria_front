# UI Contract: WebSocket Events

## Event Schema (JSON)

Every message received from the WebSocket follows this structure:

```json
{
  "type": "progress" | "error" | "completed",
  "etape": "video" | "diagnostic" | "rag" | "rapport",
  "substep": "ingestion" | "extraction" | "calcul" | "medical" | "web" | "generation" | "export",
  "pct": number,
  "message": string,
  "level": "INFO" | "OK" | "WARN" | "ERROR" | "ACTION",
  "metrics": {
    "cadence": number | null,
    "oscillation_verticale": number | null,
    "angle_tibial": number | null,
    "flexion_genou": number | null,
    "penchee_tronc": number | null,
    "attaque_pied": "talon_prononce" | "midfoot" | "avant_pied" | null,
    "longueur_foulee": string | null,
    "stabilite_cheville": string | null
  } | null
}
```

## Error Handling

When `type === "error"`:
- `message` contains the human-readable error.
- `etape` indicates where the failure happened to mark the UI pipeline correctly.

## Completion

When `type === "completed"`:
- All data for the report is confirmed as stored on the backend.
- The UI should stop the WS connection and allow redirection.
