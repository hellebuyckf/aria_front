# Quickstart: Patient Analysis Report

## Verification Guide

### 1. View Transition
- Complete an analysis session (mock or real).
- **Expected**: Once the analysis reaches 100%, the "Voir le rapport" button appears. Clicking it takes you to `/session/:id/report`.

### 2. Visual Fidelity
- Compare the web view against the reference PDF (PAT-2026-042).
- **Checklist**:
  - [ ] 5-column header matches exactly.
  - [ ] Shoe drop (12mm) is orange.
  - [ ] Metrics table has correct status badge colors (Anormal=Red, Limite=Orange, Normal=Green).
  - [ ] Anomalies have red left borders.
  - [ ] Phase cards have dark blue headers.

### 3. PDF Download
- Click "Télécharger le PDF".
- **Expected**: A download starts immediately named `aria_rapport_PAT-2026-042_2026-04-22.pdf`.

### 4. Print Mode
- Press `Cmd+P` (or `Ctrl+P`).
- **Expected**: The print preview only shows the report content. The sidebar, topbar, and blue action buttons are hidden.
