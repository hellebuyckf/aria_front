# Quickstart: Biomechanical Analysis Progress

## Verification Scenarios

### 1. Mock Mode (Frontend Only)
- Set `VITE_MOCK_WS=true` in `.env.local`.
- Start the app: `npm run dev`.
- Navigate to `/session/SES-MOCK/analysis`.
- **Expected**:
  - Progress bar starts filling.
  - 7 steps animate sequentially.
  - Terminal logs scroll.
  - Metrics appear at step 3.
  - Redirection button appears at 8s.

### 2. WebSocket Resilience
- Start the app without Mock mode.
- Navigate to analysis view.
- Disconnect your network.
- **Expected**: `WsAlertBanner` appears in orange ("reconnecting").
- Reconnect network.
- **Expected**: Banner disappears, analysis continues.

### 3. Pipeline Error
- Simulate an error by sending a `type: "error"` event.
- **Expected**:
  - `ErrorBanner` appears.
  - "Retry" sends a new analysis request.
  - "Cancel" resets the session and goes home.
