# Quickstart: Multi-Event Metrics Sync

## Verification Guide

### 1. Progressive Population
- Start the application in Mock mode.
- Observe the analysis screen.
- **Expected**:
  - A first update appears (~step 5 in mock) with sagittal metrics. The progress bar moves to ~38%.
  - A second update appears (~step 6 in mock) with posterior metrics added to the grid. The progress bar moves to ~40%.

### 2. State Replacement
- In the mock sequence, ensure the 2nd event has a different value for an existing metric (e.g., `cadence` moves from 147 to 148).
- **Expected**: The UI reflects the new value immediately, confirming replacement rather than merge.

### 3. Null Handling
- Send a `metrics` payload where `inclinaison_tronc` is `null`.
- **Expected**: The "Inclinaison tronc" row is completely absent from the grid, not showing a `null` or `0` value.
