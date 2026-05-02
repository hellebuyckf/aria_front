# Quickstart: RAG Phase Completion Fix (Ready Event)

## Verification Guide

### 1. Mock Sequence Test
- Set `VITE_MOCK_WS=true` in `.env.local`.
- Start the app and navigate to Analysis.
- Wait for the RAG step to complete.
- **Expected**:
  - The UI does NOT hang on the RAG spinner.
  - The progress bar reaches 100% (Phase 1).
  - The "Générer le rapport" button becomes clickable.
  - A green checkmark appears next to "RAG".

### 2. Manual Event Simulation
- Use a browser WebSocket debugger or manual payload push.
- Send: `{"type": "ready", "etape": "rag", "pct": 100}`.
- **Expected**: The UI immediately transitions to the "Ready" state.

### 3. State Check
- Verify that previous steps ("Video", "Diagnostic") are marked as done if they weren't already.
