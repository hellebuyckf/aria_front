# Quickstart: Analysis View UX Refinement

## Verification Guide

### 1. Log Visibility Test
- Start the application: `npm run dev`.
- Ensure `VITE_MOCK_WS=true` is set.
- Navigate to `/session/SES-mock/analysis`.
- **Expected**: Incoming messages in the terminal panel are white, providing high contrast against the dark blue background.

### 2. Manual Completion Test
- Allow the mock analysis to run to 100%.
- Wait for the "Analyse terminée" status and the "Voir le rapport" button.
- **Expected**: 
  - The "Voir le rapport" button appears at the bottom right.
  - The system **does not** automatically redirect you to the report page after 2 seconds.
  - You can read all log lines and metrics for as long as you want.

### 3. Navigation Test
- Click the "Voir le rapport" button.
- **Expected**: Immediate navigation to the report view for the current session.
