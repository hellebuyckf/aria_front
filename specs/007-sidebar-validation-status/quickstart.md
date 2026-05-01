# Quickstart: Sidebar Validation Status

## Verification Guide

### 1. Saisie View
- Start the application.
- Navigate to `/session/:patientId/setup` (Saisie).
- **Expected**: "Saisie" in sidebar is blue (active) and does NOT have a green checkmark.

### 2. Analysis View
- Navigate to `/session/:sessionId/analysis`.
- **Expected**:
  - "Saisie" in sidebar shows a green checkmark and "Validé" label.
  - "Analyse" is active.

### 3. Report View (Future Proofing)
- If navigating to `/session/:sessionId/report`.
- **Expected**:
  - Both "Saisie" and "Analyse" show green checkmarks and "Validé" labels.
