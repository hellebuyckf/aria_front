# Quickstart: Progressive Metrics Display

## Verification Guide

### 1. Progressive Reveal
- Start the application in Mock Mode (`VITE_MOCK_WS=true`).
- Start a mock analysis session.
- Wait for the metrics phase.
- **Expected**: Metrics do NOT appear simultaneously. They pop in one after another from top-to-bottom with a noticeable short delay.

### 2. Null Filtering
- Inspect the mock payload in `websocket.js`. Ensure at least one metric is `null`.
- **Expected**: The null metric is skipped entirely, and the next available metric appears 120ms after its predecessor.

### 3. Posterior View Toggle
- Simulate a session where `vue_posterieure_disponible: false`.
- **Expected**: The posterior metrics group is hidden, and the grid only shows the primary sagittal metrics.
