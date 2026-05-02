# Quickstart: Pipeline WebSocket Events Fix

## Verification Scenarios

### 1. Sequential Activation
- Initiate a mock analysis.
- **Expected**: "Extraction cinématique" (Step 1) becomes active immediately.

### 2. Transition to Diagnostic
- Wait for a `progress` event with `etape: "diagnostic"`.
- **Expected**: Step 1 turns green (Done), Step 2 becomes active.

### 3. Global Progress Update
- Observe the percentage and progress bar.
- **Expected**: Smooth updates corresponding exactly to the `pct` value in the WebSocket message.

### 4. Noise Filtering
- Check logs or console.
- **Expected**: `ping` messages do not trigger UI re-renders or state changes.
