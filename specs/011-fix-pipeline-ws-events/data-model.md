# Data Model: Pipeline WebSocket Logic

## WebSocket Event Schema

| Field | Type | Description |
|-------|------|-------------|
| `type` | String | `progress`, `completed`, `error`, `ping`, `connected`. |
| `etape` | String | `video`, `diagnostic`, `rag`, `rapport`, `pipeline` (for errors). |
| `pct` | Number | Global progress percentage (0-100). |
| `message`| String | Human-readable log message. |
| `rapport_url`| String | URL to the generated report (only in `completed`). |

## UI Step Mapping

| Backend `etape` | Frontend Step ID | UI Step Label |
|-----------------|------------------|---------------|
| `video` | `video` | Extraction cinématique & Calculs |
| `diagnostic` | `diagnostic` | Analyse Diagnostique |
| `rag` | `rag` | Recherche & RAG Médical |
| `rapport` | `rapport` | Génération du Rapport |
