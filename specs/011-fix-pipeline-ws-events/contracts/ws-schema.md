# WebSocket Message Schema: ARIA Pipeline

## Event: Progress

Sent periodically as the processing moves through LangGraph nodes.

```json
{
  "type": "progress",
  "etape": "video" | "diagnostic" | "rag" | "rapport",
  "pct": number,
  "message": string
}
```

## Event: Completed

Sent when the final PDF/Web report is ready.

```json
{
  "type": "completed",
  "etape": "rapport",
  "rapport_url": string
}
```

## Event: Error

Sent if any agent or node fails.

```json
{
  "type": "error",
  "etape": "pipeline",
  "message": string
}
```

## Internal Events

Must be ignored by UI state logic.

```json
{ "type": "ping" }
{ "type": "connected", "session_id": "string" }
```
